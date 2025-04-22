from flask import Blueprint, request, render_template, url_for, flash, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

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
                print("Por favor, complete todos los campos.")
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            if password_register != confirm_password:
                print('Las contraseñas no coinciden.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            if User.query.filter(or_(User.username == name_register, User.email == email_register)).first():
                print('El usuario o el email ya existen.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            hashed_password = generate_password_hash(password_register)
            new_user = User(username=name_register, password_hash=hashed_password, email=email_register)
            try:
                db.session.add(new_user)
                db.session.commit()
                print('Registro exitoso. Ahora puedes iniciar sesión.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            except Exception as e:
                db.session.rollback()
                print(f'Error al registrar el usuario. Por favor, intenta nuevamente. {e}')
                return jsonify({"redirect_url": url_for('auth.auth')})

            
        elif action == 'login':
            # Login de usuario
            email_login = request.form.get("login-email")
            password_login = request.form.get('login-password')
            
            if not all([email_login, password_login]):
                print('Por favor, ingrese email y contraseña.')
                return jsonify({"redirect_url": url_for('auth.auth')})
            
            user = User.query.filter_by(email=email_login).first()
            if user and check_password_hash(user.password_hash, password_login):
                # Aquí puedes establecer una sesión, por ejemplo:
                session['user_id'] = user.id
                print('Inicio de sesión exitoso.')
                return jsonify({"redirect_url": url_for('inicio.home')})
            else:
                print('Credenciales incorrectas.')
                return jsonify({"redirect_url": url_for('auth.auth')})
    return render_template('auth/auth.html')
