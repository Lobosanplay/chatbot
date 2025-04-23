from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime as dt


db = SQLAlchemy()


class User(UserMixin, db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255))
    google_id = db.Column(db.String(100))
    messages_left = db.Column(db.Integer, default=10, nullable=False)# Límite diario
    created_at = db.Column(db.DateTime, default=dt.utcnow)
    chats = db.relationship('ChatHistory', backref='user', lazy=True)


class ChatHistory(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    bot_reply = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=dt.utcnow, index=True)
