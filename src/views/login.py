from flask import Blueprint, request, render_template, redirect, url_for, flash
from werkzeug.security import generate_password_hash

from models import User, db
from sqlalchemy import or_

Auth = Blueprint("auth", __name__)

@Auth.route("/login", methods=["GET", 'POST'])
def auth():
    if request.method == 'POST':
        action = request.form.get('action')  # 'login' o 'register'

        if action == 'register':
            # Registro de usuario
            name_register = db.get('register-name')
            email_register = db.get('register-email')
            password_register = db.get('register-password')
            confirm_password = db.get('register-confirm-password')
            # accept_terms = db.get('accept_terms')
            if User.query.filter(or_(User.username == name_register, User.email == email_register)).first():
                flash('El usuario o el email ya existen.')
            elif password_register != confirm_password:
                flash('Las contraseñas no coinciden.')
            elif not all([name_register, email_register, password_register, confirm_password]):
                flash("Por favor, complete todos los campos.")
            else:
                hashed_password = generate_password_hash(password_register)
                new_user = User(username=name_register, password=hashed_password, email=email_register)
                try:
                    db.session.add(new_user)
                    db.session.commit()
                    flash('Registro exitoso. Ahora puedes iniciar sesión.')
                    return redirect(url_for('auth.auth'))
                except Exception as e:
                    db.session.rollback()
                    flash('Error al registrar el usuario. Por favor, intenta nuevamente.')

            
        elif action == 'login':
            # Login de usuario
            email_login = request.form.get("login-email")
            password_login = request.form.get('login-password')
            user = User.query.filter_by(email=email_login).first()
            if user and user.password == password_login:
                flash('Inicio de sesión exitoso.')
                # Aquí puedes establecer una sesión, por ejemplo:
                # session['user_id'] = user.id
                return redirect(url_for('inicio.home'))
            else:
                flash('Credenciales incorrectas.')
    return render_template('auth/auth.html')
