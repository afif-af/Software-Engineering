from pymongo import MongoClient

def get_products():
    client = MongoClient("mongodb://localhost:27017/")

    db =client['ecommerce']

    collection =db['products']

    products =list(collection.find({}))

    client.close()

    return products