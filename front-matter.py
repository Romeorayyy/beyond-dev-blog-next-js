import os


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
        mdx_file.write(f'<!-- Add your content here -->\n')

    print(f"MDX template created at {file_path}")


if __name__ == "__main__":
    create_mdx_template()
