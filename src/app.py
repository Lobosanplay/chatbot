
from flask import Flask
# from flask_wtf.csrf import CSRFProtect
# from flask_talisman import Talisman
from flask_cors import CORS

from authlib.integrations.flask_client import OAuth
from config import Config, configurations

from views.login import Auth
from views.chat import chat
from views.home import principal

from models import db
from dotenv import load_dotenv


import openai
import os

load_dotenv()  # carga las variables del archivo .env

# creamos la app
app = Flask(__name__)

# agregamos las configuraciones de la app
app.config.from_object(Config)

# iniciamos la base de datos con la app
db.init_app(app)

# obtenemos la API de openai
openai.api_key = os.getenv("OPENAI_API_KEY")

CORS(app)

# Configuración de OAuth
oauth = OAuth(app)

# csrf = CSRFProtect(app)
# Talisman(app, force_https=True)

# agregamos la Views con blueprint
app.register_blueprint(chat)
app.register_blueprint(principal)
app.register_blueprint(Auth)

# Registros de proveedores OAuth
oauth.register(
    name='google',
    client_id= os.getenv("GOOGLE_CLIENT_ID"),
    client_secret= os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'openid email profile'}
)

oauth.register(
    name='microsoft',
    client_id= os.getenv("MICROSOFT_CLIENT_ID"),
    client_secret= os.getenv("MICROSOFT_CLIENT_SECRET"),
    authorize_url='https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    access_token_url='https://login.microsoftonline.com/common/oauth2/v2.0/token',
    api_base_url='https://graph.microsoft.com/v1.0/',
    client_kwargs={'scope': 'User.Read'}
)

oauth.register(
    name='apple',
    client_id= os.getenv("APPLE_CLIENT_ID"),
    client_secret= os.getenv("APPLE_CLIENT_SECRET"),
    authorize_url='https://appleid.apple.com/auth/authorize',
    access_token_url='https://appleid.apple.com/auth/token',
    api_base_url='https://appleid.apple.com/auth',
    client_kwargs={'scope': 'name email'}
)

# generamos una base de datos con sus tablas si no la tiene
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.config.from_object(configurations["development"])
    app.run()

