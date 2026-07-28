import re
import sys
import toml
import yaml

def convert_frontmatter(text):
    match = re.match(r"^\+\+\+\n(.*?)\n\+\+\+\n(.*)$", text, re.S)

    if not match:
        return text

    toml_data = toml.loads(match.group(1))
    body = match.group(2)

    yaml_text = yaml.dump(
        toml_data,
        allow_unicode=True,
        sort_keys=False,
        default_flow_style=False
    )

    return f"---\n{yaml_text}---\n{body}"


if __name__ == "__main__":
    filename = sys.argv[1]

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    converted = convert_frontmatter(content)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(converted)

    print(f"Converted: {filename}")