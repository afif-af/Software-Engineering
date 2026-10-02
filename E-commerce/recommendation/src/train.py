import pickle

from data_loader import get_products
from recommender import ProductRecommender


products =get_products()

print(f"Total products:{len(products)}")

recommender =ProductRecommender(products)


with open("models/recommender.pkl", "wb") as file:
    pickle.dump(recommender, file)

print("Recommendation model trained successfully")



