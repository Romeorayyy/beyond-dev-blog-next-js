import os
import json


def generate_article_from_json(content):
    article = ""

    for section in content:
        type_ = section["type"]

        if type_ == "paragraph":
            article += f"{section['text']}\n\n"
        elif type_ == "blockquote":
            article += f"> {section['text']}\n\n"
        elif type_ == "codeblock":
            if section["language"] == "html" or section["language"] == "inline":
                article += f"```{section['language']}\n{section['code']}\n```\n\n"
            else:
                article += f"{section['code']}\n\n"
        elif type_ == "heading":
            article += f"{'#' * section['level']} {section['text']}\n\n"
        elif type_ == "list":
            for item in section["items"]:
                article += f"- {item}\n"
            article += "\n"
        elif type_ == "link":
            article += f"[{section['text']}]({section['href']})\n\n"
        elif type_ == "table":
            table_header = " | ".join(section["headers"])
            table_divider = "--- | " * (len(section["headers"]) - 1) + "---"
            article += f"{table_header}\n{table_divider}\n"
            for row in section["rows"]:
                table_row = " | ".join(row)
                article += f"{table_row}\n"
            article += "\n"

    return article


def create_mdx_from_json(data):
    # Extracting meta data
    meta = data["meta"]

    # Create the directory and file paths
    directory_name = meta["title"].lower().replace(" ", "-")
    directory_path = os.path.join(
        "/Users/randyyono/Desktop/git-personal-projects/blog-next-js/content", directory_name)
    file_path = os.path.join(directory_path, "index.mdx")

    # Create the directory if it doesn't exist
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)

    # Get the article content from json
    article_content = generate_article_from_json(data["content"])

    # Create and write the MDX content
    with open(file_path, 'w') as mdx_file:
        mdx_file.write(f'---\n')
        mdx_file.write(f'title: "{meta["title"]}"\n')
        mdx_file.write(f'description: "{meta["description"]}"\n')
        mdx_file.write(f'image: "{meta["image"]}"\n')
        mdx_file.write(f'publishedAt: "{meta["publishedAt"]}"\n')
        mdx_file.write(f'updatedAt: "{meta["updatedAt"]}"\n')
        mdx_file.write(f'author: "{meta["author"]}"\n')
        mdx_file.write(f'isPublished: {str(meta["isPublished"]).lower()}\n')
        mdx_file.write(f'tags:\n')
        for tag in meta["tags"]:
            mdx_file.write(f'  - {tag}\n')
        mdx_file.write(f'---\n\n')
        mdx_file.write(article_content)

    print(f"MDX template created at {file_path}")


def main():
    # Load the JSON data
    with open("/Users/randyyono/Desktop/git-personal-projects/blog-next-js/data.json", 'r') as json_file:
        data = json.load(json_file)

    create_mdx_from_json(data)


if __name__ == "__main__":
    main()
