from flask import Flask

from config import Config, runer
from views.login import login
from views.chat import chat
from views.home import principal
from models import db

import openai
import os

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
openai.api_key = os.getenv("OPENAI_API_KEY")

app.register_blueprint(login)
app.register_blueprint(chat)
app.register_blueprint(principal)



if __name__ == '__main__':
    app.config.from_object(runer["development"])
    app.run()

