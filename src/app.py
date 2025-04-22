from flask import Flask
from dotenv import load_dotenv

from config import Config, configurations
from views.login import Auth
from views.chat import chat
from views.home import principal
from models import db

import openai
import os

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
openai.api_key = os.getenv("OPENAI_API_KEY")

app.register_blueprint(Auth)
app.register_blueprint(chat)
app.register_blueprint(principal)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.config.from_object(configurations["development"])
    app.run()

