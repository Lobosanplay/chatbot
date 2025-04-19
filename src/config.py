import os

class DevelopmentConfig():
    DEBUG=True


DB_FILE_PATH = os.path.join(os.path.dirname(__file__), "chat_ia.sqlite")

class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_FILE_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "this-is-not-secret"
    

runer = {
    "development": DevelopmentConfig
}