import os


def create_article():
    title = input("Enter your main heading: ")
    intro = input("Enter your introduction: ")

    article = f"\n## {title}\n\n{intro}\n\n"

    while True:
        section = input("Would you like to add a new section? (y/n) ").lower()
        if section == "n":
            break

        sub_heading = input("Enter your sub-heading: ")
        sub_content = input("Enter content for this sub-section: ")
        article += f"### {sub_heading}\n\n{sub_content}\n\n"

        add_quote = input(
            "Would you like to add a blockquote to this section? (y/n) ").lower()
        if add_quote == "y":
            quote = input("Enter your blockquote content: ")
            article += f"> {quote}\n\n"

        add_code = input(
            "Would you like to add a code snippet to this section? (y/n) ").lower()
        if add_code == "y":
            code = input("Enter your code: ")
            article += f"```python\n{code}\n```\n\n"

        add_list = input(
            "Would you like to add a list to this section? (y/n) ").lower()
        if add_list == "y":
            list_type = input("What type of list? (ordered/unordered): ")
            num_items = int(input("How many items in the list? "))
            list_content = ""
            for i in range(num_items):
                item = input(f"Enter item {i+1}: ")
                if list_type == "ordered":
                    list_content += f"{i+1}. {item}\n"
                else:
                    list_content += f"- {item}\n"
            article += f"{list_content}\n"

    return article


def create_mdx_template():
    # Prompt for input
    title = input("Enter the title: ")
    description = input("Enter the description: ")
    image = input("Enter the image path: ")
    published_at = input("Enter the published date (YYYY-MM-DD): ")
    author = input("Enter the author: ")
    is_published = input(
        "Is the post published (true/false): ").lower() == 'true'
    tags = input("Enter tags (comma-separated): ").split(',')

    # Create the directory and file paths
    directory_name = title.lower().replace(" ", "-")
    directory_path = os.path.join("content", directory_name)
    file_path = os.path.join(directory_path, "index.mdx")

    # Create the directory if it doesn't exist
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)

    # Get the article content
    article_content = create_article()

    # Create and write the MDX content
    with open(file_path, 'w') as mdx_file:
        mdx_file.write(f'---\n')
        mdx_file.write(f'title: "{title}"\n')
        mdx_file.write(f'description: "{description}"\n')
        mdx_file.write(f'image: "{image}"\n')
        mdx_file.write(f'publishedAt: "{published_at}"\n')
        mdx_file.write(f'updatedAt: "{published_at}"\n')
        mdx_file.write(f'author: "{author}"\n')
        mdx_file.write(f'isPublished: {str(is_published).lower()}\n')
        mdx_file.write(f'tags:\n')
        mdx_file.write(f'  - {", ".join(tags)}\n')
        mdx_file.write(f'---\n\n')
        mdx_file.write(article_content)

    print(f"MDX template created at {file_path}")


if __name__ == "__main__":
    create_mdx_template()
