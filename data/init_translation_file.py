# This script is used to initialize the translation files mapping keys to translation strings in different languages.
# It parses the CSAF JSON schema for "title" and "description" fields, generates camel case keys for those and maps
# them to the English source text.

import json


def snake_to_camel(snake_string):
  """convert a string from snake case to camel case"""
  return "".join(token[0].upper() + token[1:].lower() for token in snake_string.split("_"))


def to_key(inp, suffix=""):
  """convert an input string to a dict key according to internal rules
  optionally adding a suffix"""
  if inp:
    if inp.endswith("_t"):
      inp = inp[:-2]
    if "_t_" in inp:
      inp = inp.replace("_t_", "_")
    r = snake_to_camel(inp)
    r = r.replace("[]", "Items")
    return r.replace("Properties", "") + suffix
  return ""


translation_key_values = {}


def get_translation_keys_and_vals(path, itm):
  key_prefix = to_key("_".join(path))
  title_key = key_prefix + "Title"
  desc_key = key_prefix + "Description"
  if isinstance(itm, dict):
    if "title" in itm and "description" in itm:
      translation_key_values[title_key] = itm["title"]
      translation_key_values[desc_key] = itm["description"]
    for key, val in itm.items():
      get_translation_keys_and_vals(path + [key], val)


if __name__ == "__main__":

  with open("csaf_json_schema.json", "r") as f:
    schema = json.load(f)

  get_translation_keys_and_vals([], schema["$defs"])
  get_translation_keys_and_vals([], schema["properties"])

  with open("translations.en.json", "w") as fp:
    json.dump({"en": translation_key_values}, fp, indent=2, ensure_ascii=False)
