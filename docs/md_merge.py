import argparse
import os
import re
import shutil
from argparse import BooleanOptionalAction
from collections import OrderedDict, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

MD_HEADER_REGEX = (
    r"^"            # start of line
    r"(\s{0,3})"    # Group 1: zero to three whitespaces, tabs etc (four and more spaces are no heading)
    r"(#{1,6})"     # Group 2: one or up to 6 '#'
    r"(\s{0,})"     # Group 3: zero or more whitespaces
    r"([^#].*)"     # Group 4: one or more chars but not starting with another #         
    r"$"            # end of line
)

MD_IMAGE_REGEX = (
    r"^"            # start of line
    r"(.*)"         # Group 1: optional preceding text
    r"(!\[)"        # Group 2: "!["
    r"(.*)"         # Group 3: optional alt text
    r"(\]\()"       # Group 4: "]("
    r"([^\s]*)"     # Group 5: image link
    r"\s*(.*)"      # Group 6: nothing or a whitespace and the optional image title, including quotes
    r"(\))"         # Group 7: closing parenthesis
    r'(.*)'         # Group 8: optional subsequent text
    r"$"            # end of line
)

MD_LINK_REGEX = (
    r"^"                        # start of line
    r"(.*)"                     # Group 1: optional preceding text
    r"(\[)"                     # Group 2: "["
    r"(.*)"                     # Group 3: link text
    r"(\]\()"                   # Group 4: "]("
    r"([a-zA-Z0-9.:\/#\-_]+)"   # Group 5: link
    r"(\))"                     # Group 6: closing parenthesis
    r"(.*)"                     # Group 7: optional subsequent text
    r"$"                        # end of line
)


@dataclass
class HeaderLine:
    depth: int
    text: str

    def to_text(self, new_depth: Optional[int] = None):
        hashes = "#" * new_depth if new_depth is not None else "#" * self.depth
        return f"{hashes} {self.text}"


@dataclass
class LinkLine:
    link: str
    link_text: str = ""
    preceding_text: str = ""
    subsequent_text: str = ""

    @property
    def is_external(self):
        return self.link.startswith("http")

    def to_text(self):
        raise NotImplementedError()


@dataclass
class ImageLine(LinkLine):
    title_text: str = ""

    def to_text(self):
        title_part = f' "{self.title_text}"' if self.title_text else ""
        return f'{self.preceding_text}![{self.link_text}]({self.link}{title_part}){self.subsequent_text}'


@dataclass
class TextLinkLine(LinkLine):

    def to_text(self):
        return f"{self.preceding_text}[{self.link_text}]({self.link}){self.subsequent_text}"

    @property
    def is_anchor_link(self):
        return self.link.startswith("#")


def parse_line(line: str):
    header_search = re.search(MD_HEADER_REGEX, line, re.IGNORECASE)
    if header_search:
        return HeaderLine(depth=len(header_search.group(2)), text=header_search.group(4))
    image_search = re.search(MD_IMAGE_REGEX, line, re.IGNORECASE)
    if image_search:
        return ImageLine(
            link=image_search.group(5),
            link_text=image_search.group(3),
            title_text=image_search.group(6)[1:-1],
            preceding_text=image_search.group(1),
            subsequent_text=image_search.group(8)
        )
    link_search = re.search(MD_LINK_REGEX, line, re.IGNORECASE)
    if link_search:
        return TextLinkLine(
            link=link_search.group(5),
            link_text=link_search.group(3),
            preceding_text=link_search.group(1),
            subsequent_text=link_search.group(7)
        )
    return line


def get_dir_content(dir_path: Path, language: str = "en", files_only=False):
    """lists the contents of a directory and sorts it alphabetically
    starting with files and then directories
    if files_only is set to True, directories will be excluded

    tries to fetch only markdown files with a language specific suffix

    Example:

        document-spec.en.md
        document-usage.en.md
        document
        vulnerabilities-spec.en.md
        vulnerabilities-usage.en.md
        vulnerabilities

    the results later on influence the ordering of content in a merged file
    """

    dirs = [p for p in os.listdir(dir_path) if os.path.isdir(dir_path / p)]
    files = get_md_language_files(dir_path, language)

    if files_only:
        return sorted(files)

    result = []
    for d in sorted(dirs):
        for f in sorted(files):
            if f.startswith(d):
                result.append(f)
        result.append(d)
    for f in sorted(files):
        if f not in result:
            result.append(f)

    return result


LANGUAGE_MD_FILE_NAME_PATTERN = "(.+)[.](.{2,3})[.]md"


def get_md_language_files(dir_path: Path, language: str = "en"):
    """tries to fetch all markdown files with a language specific suffix
    assumes that files in English (suffix '.en.md') are all present
    and uses these as fallback"""
    lang_to_file_prefix = defaultdict(list)
    for md_file in os.listdir(dir_path):
        match = re.match(LANGUAGE_MD_FILE_NAME_PATTERN, md_file)
        if match:
            lang = match.group(2)
            lang_to_file_prefix[lang].append(match.group(1))
    result = []
    for prefix in lang_to_file_prefix["en"]:
        expected_file = prefix + f".{language}.md"
        if prefix in lang_to_file_prefix[language]:
            result.append(expected_file)
        else:
            print(f"missing file '{expected_file}', falling back to English version")
            result.append(prefix + ".en.md")
    return result


LINK_COUNT = 1
IMG_COUNT = 1
PATH_TO_DEPTH_AND_CONTENT = OrderedDict()
PATH_TO_LINK_ID = defaultdict(list)


def parse_dir_recursive(
        start_dir: Path,
        current_dir: Path,
        output_dir: Path,
        language: str,
        depth=1,
        max_depth=-1,
        paths_relative_to_input_dir=False
):
    global LINK_COUNT
    global IMG_COUNT

    files_only = max_depth == 0

    dir_content = get_dir_content(current_dir, language, files_only=files_only)
    for dc in dir_content:
        path = current_dir / dc
        if path.is_file():
            file_lines = []
            for line in path.read_text().splitlines():
                parsed_line = parse_line(line)
                if isinstance(parsed_line, ImageLine) and not parsed_line.is_external:
                    new_image_name = f"md-merge-img-{IMG_COUNT}-" + Path(parsed_line.link).name
                    new_image_path = output_dir / "images" / new_image_name
                    shutil.copyfile(current_dir / parsed_line.link, new_image_path)
                    parsed_line.link = str(new_image_path.relative_to(output_dir))
                if isinstance(parsed_line, TextLinkLine) and not (parsed_line.is_external
                                                                  or parsed_line.is_anchor_link):
                    if paths_relative_to_input_dir:
                        linked_path = start_dir / parsed_line.link
                    else:
                        linked_path = path.parent / parsed_line.link
                    link_name = f"md-merge-link-{LINK_COUNT}"
                    parsed_line.link = "#" + link_name
                    PATH_TO_LINK_ID[linked_path].append(link_name)
                    LINK_COUNT += 1
                file_lines.append(parsed_line)
            PATH_TO_DEPTH_AND_CONTENT[path] = (depth, file_lines)
        elif path.is_dir():
            parse_dir_recursive(start_dir, path, output_dir, language, depth + 1, max_depth - 1, paths_relative_to_input_dir)


def main(args):

    global LINK_COUNT
    global IMG_COUNT
    global PATH_TO_DEPTH_AND_CONTENT
    global PATH_TO_LINK_ID

    LINK_COUNT = 1
    IMG_COUNT = 1
    PATH_TO_DEPTH_AND_CONTENT = OrderedDict()
    PATH_TO_LINK_ID = defaultdict(list)

    input_dir = Path(args.input)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "images").mkdir(exist_ok=True)

    parse_dir_recursive(
        input_dir,
        input_dir,
        output_dir,
        args.language,
        depth=args.depth,
        max_depth=args.max_depth,
        paths_relative_to_input_dir=args.paths_relative_to_input_dir
    )

    output_file_path = os.path.join(args.output, args.name)

    with open(output_file_path, "w+", encoding="UTF-8") as output_file:

        for file_path, (depth, content) in PATH_TO_DEPTH_AND_CONTENT.items():
            for linked_path, link_names in PATH_TO_LINK_ID.items():
                if not linked_path.exists():
                    raise ValueError(f"Linked file '{str(linked_path)}' does not exist! (link in '{str(file_path)}')")
                if file_path.samefile(linked_path):
                    for link_name in link_names:
                        link_anchor = f'<a name="{link_name}"></a>'
                        output_file.write(link_anchor + "\n")

            for line in content:
                text = line
                if isinstance(line, HeaderLine):
                    text = line.to_text(new_depth=depth)
                if isinstance(line, LinkLine):
                    text = line.to_text()
                output_file.write(text + "\n")
            output_file.write("\n")


def parse_args():
    parser = argparse.ArgumentParser(
        description="Merge multiple markdown files into one."
    )
    parser.add_argument(
        "-i",
        "--input",
        dest="input",
        default=".",
        type=handle_input_path,
        help="path to the input folder",
    )
    parser.add_argument(
        "-o",
        "--output",
        dest="output",
        default="./out/",
        type=handle_output_path,
        help="path to the output folder",
    )
    parser.add_argument(
        "-n",
        "--name",
        dest="name",
        default="output.md",
        type=str,
        help="name of the output document",
    )
    parser.add_argument(
        "-l",
        "--lang",
        dest="language",
        default="en",
        type=str,
        help="the language code used in the filenames (.<language>.md)",
    )
    parser.add_argument(
        "-d",
        "--depth",
        dest="depth",
        default=1,
        type=int,
        help="the initial depth of headers to consider, 1 will prepend a single '#' to header lines,"
             " another '#' will be added whenever descending into a subdirectory"
    )
    parser.add_argument(
        "-m",
        "--max-depth",
        dest="max_depth",
        default=-1,
        type=int,
        help="the maximum depth for stepping into subdirectories, -1 disables this feature"
    )
    parser.add_argument(
        "--paths-relative-to-input-dir",
        dest="paths_relative_to_input_dir",
        default=False,
        action=BooleanOptionalAction,
        type=bool,
        help="when this is set, paths inside markdown files are interpreted as relative to the top level input"
             " directory, otherwise, they are treated as relative to the markdown files they are contained in (default)"
    )
    return parser.parse_args()


def handle_input_path(path):
    if os.path.isdir(path):
        return path
    else:
        raise argparse.ArgumentTypeError(f"'{path}' is not a valid path")


def handle_output_path(path):
    if os.path.isdir(path):
        return path
    else:
        print("Output path does not yet exist. Creating...")
        os.makedirs(path)
        return path


if __name__ == "__main__":
    main(parse_args())
