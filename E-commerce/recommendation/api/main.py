from fastapi import FastAPI
import pickle


app=FastAPI()

with open("models/recommender.pkl","wb") as file:
    recommender =pickle.load(file)


@app.get("/")
def home():
    return {
        "msg": "Recommendation API "
    }

@app.get("/recommend/{product_id}")
def recommend(product_id:str):
    products =recommender.recommend(
        product_id,
        n=5
    )
    return {
        "recommendations" :products
    }