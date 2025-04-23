from flask import Blueprint, request, render_template, url_for, flash, session, jsonify, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError

from models import User, db
from sqlalchemy import or_

Auth = Blueprint("auth", __name__)

@Auth.route("/login", methods=["GET", 'POST'])
def auth():
    if request.method == 'POST':
        action = request.form.get('action')  # 'login' o 'register' 
        if action == 'register':
            # Registro de usuario
            name_register = request.form.get('register-name')
            email_register = request.form.get('register-email')
            password_register = request.form.get('register-password')
            confirm_password = request.form.get('register-confirm-password')
            # accept_terms = request.form.get('accept_terms')
            if not all([name_register, email_register, password_register, confirm_password]):
                flash("Por favor, complete todos los campos.")
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            try:
                validate_email(email_register)
            except EmailNotValidError as e:
                flash(f"El email no es valido: Error {e}")
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            if password_register != confirm_password:
                flash('Las contraseñas no coinciden.')
                return jsonify({"redirect_url": url_for('auth.auth')})
        
            if User.query.filter(or_(User.username == name_register, User.email == email_register)).first():
                flash('El usuario o el email ya existen.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            hashed_password = generate_password_hash(password_register)
            new_user = User(username=name_register, password=hashed_password, email=email_register)
            try:
                db.session.add(new_user)
                db.session.commit()
                flash('Registro exitoso. Ahora puedes iniciar sesión.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            except Exception as e:
                db.session.rollback()
                flash(f'Error al registrar el usuario. Por favor, intenta nuevamente. {e}')
                return jsonify({"redirect_url": url_for('auth.auth')})

            
        elif action == 'login':
            # Login de usuario
            email_login = request.form.get("login-email")
            password_login = request.form.get('login-password')
            
            if not all([email_login, password_login]):
                flash('Por favor, ingrese email y contraseña.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            user = User.query.filter_by(email=email_login).first()
            confirm = check_password_hash(user.password, password_login)
            if user and confirm:
                session['user_id'] = user.id
                flash('Inicio de sesión exitoso.')
                return jsonify({"redirect_url": url_for('inicio.home')})
            else:
                flash('Credenciales incorrectas.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            
    elif request.method == "GET":
        return render_template('auth/auth.html')

@Auth.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('inicio.home'))