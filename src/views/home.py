from flask import Blueprint, render_template, redirect, session


principal = Blueprint("inicio", __name__)

@principal.route("/")
def inict():
    user = session.get('user.id')
    return redirect('/home', user=user) 

@principal.route("/home")
def home():
    user = session.get('user.id')
    return render_template('message.html', user=user) 