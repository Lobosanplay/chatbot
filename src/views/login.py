from flask import Blueprint, request, render_template, redirect, url_for


login = Blueprint("auth", __name__)

@login.route("/login", methods=["GET", 'POST'])
def Login():
    if request.method == "POST":
        print(request.form["username"])
        print(request.form["password"])
        return redirect( url_for("inicio.home"))
    else:
        return render_template("auth/login.html")


