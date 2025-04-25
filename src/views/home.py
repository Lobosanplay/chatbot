from flask import Blueprint, render_template, redirect, session


principal = Blueprint("inicio", __name__)

# creamos una instancia para home
@principal.route("/")
def inict():
    return redirect('/home') 

@principal.route("/home")
def home():
    user = session.get('user')
    return render_template('message.html', user=user) 