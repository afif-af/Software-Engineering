from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics.pairwise import cosine_similarity


class ProductRecommender:

    def __init__(self, products):
        self.products =products

        self.vectorizer =TfidfTransformer(
            stop_words="english"
        )

        self.product_text=[
            self.create_text(products)
            for product in products
        ]

        self.tfidf_matrix =self.vectorizer.fit_transform(
            self.product_text
        )

        self.similarity_matrix =cosine_similarity(
            self.tfidf_matrix
        )

    def create_text(self, product):



    def recommend(self, product_id, n=5):
        index =None

        