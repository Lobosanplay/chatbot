from flask_login import UserMixin
from src.app import db
import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    google_id = db.Column(db.String(100))
    messages_left = db.Column(db.Integer, default=100)  # Límite diario

class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    message = db.Column(db.String(500))
    bot_reply = db.Column(db.String(500))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
