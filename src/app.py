from flask import Flask
# from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS

from config import Config, configurations
from views.login import Auth
from views.chat import chat
from views.home import principal

from models import db
from dotenv import load_dotenv

import openai
import os

# from flask_talisman import Talisman


load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
openai.api_key = os.getenv("OPENAI_API_KEY")
CORS(app)
# csrf = CSRFProtect(app)
# Talisman(app, force_https=True)
app.register_blueprint(chat)
app.register_blueprint(principal)
app.register_blueprint(Auth)


with app.app_context():
    db.create_all()

for rule in app.url_map.iter_rules():
    print(f"Endpoint: {rule.endpoint} - URL: {rule.rule}")


if __name__ == '__main__':
    app.config.from_object(configurations["development"])
    app.run()

