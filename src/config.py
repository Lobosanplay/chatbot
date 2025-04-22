import os

# Ruta al archivo de la base de datos
DB_FILE_PATH = os.path.join(os.path.dirname(__file__), "chat_ia.sqlite")

class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_FILE_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    
class DevelopmentConfig(Config):
    DEBUG=True

# Diccionario de configuraciones
configurations  = {
    "development": DevelopmentConfig
}
