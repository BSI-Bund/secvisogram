# This script will bootstrap translations of markdown documentation files in /docs/user from using the DeepL API.
# For using the API a authentication key is required, see https://www.deepl.com/docs-api/accessing-the-api/authentication/.
# Internal links to other markdown files will be changed to point to the same file with language code changed to the target one.
# It is highly recommended to check the resulting files manually.


import argparse
import glob
from pathlib import Path

import deepl


def main(args):

  translator = deepl.Translator(args.auth_key)

  for input_file in glob.glob(f"../docs/user/**/*.{args.source_lang}.md", recursive=True):
    input_path = Path(input_file)
    output_path = Path(input_file.replace(".en.", f".{args.target_lang}."))

    link_replace_source = f".{args.source_lang}.md"
    link_replace_target = f".{args.target_lang}.md"

    if not output_path.exists():
      print(f"translating from {input_path} to {output_path}")
      input_text = input_path.read_text()
      input_lines = input_text.splitlines()
      header = input_lines[0]
      source_text = "\n".join(input_lines[1:])
      if source_text.strip():
        translation = translator.translate_text(source_text, target_lang=args.target_lang.upper())
        target_text = translation.text.replace(link_replace_source, link_replace_target)
      else:
        target_text = ""
      full_target_text = header + "\n" + target_text + "\n"
      output_path.write_text(full_target_text)
    else:
      print(f"target file already exists - skipping!")


def parse_args():
  parser = argparse.ArgumentParser(
    description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
  )
  parser.add_argument(
    "-k",
    "--auth-key",
    dest="auth_key",
    type=str,
    help="Authentication Key for DeepL API",
  )
  parser.add_argument(
    "-t",
    "--target-lang",
    dest="target_lang",
    type=str,
    help="Target language, must be a valid language code supported by DeepL",
  )
  parser.add_argument(
    "-s",
    "--source_lang",
    dest="source_lang",
    default="en",
    type=str,
    help="The source language, used for matching documentation file names, defaults to 'en'",
  )
  return parser.parse_args()


if __name__ == "__main__":

  main(parse_args())
