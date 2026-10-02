
def create_product_text(product):

    name =product.get("name", "")
    description =product.get("description",'')
    category =product.get("category", "")
    sub_category =product.get("subCategory","")

    text=(
        f"{name}"
        f"{description}"
        f"{category}"
        f"{sub_category}"

    )
    return text