from flask import Blueprint, render_template, session


principal = Blueprint("inicio", __name__)

# creamos una instancia para home
@principal.route("/")
def home():
    user = session.get('user')
    return render_template('message.html', user=user) 