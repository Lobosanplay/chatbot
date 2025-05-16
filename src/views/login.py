from flask import Blueprint, request, render_template, url_for, flash, session, jsonify, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError


from models import User, db
from sqlalchemy import or_

# creamos un blueprint
Auth = Blueprint("auth", __name__)

# creamos una api para el login y el register
@Auth.route("/api/login-register", methods=['POST'])
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
            
            # creamos las validacions de los campos
            if not all([name_register, email_register, password_register, confirm_password]):
                flash("Por favor, complete todos los campos.")
                return jsonify({"redirect_url": url_for('auth.login')})
            
            try:
                validate_email(email_register)
            except EmailNotValidError as e:
                flash(f"El email no es valido: Error {e}")
                return jsonify({"redirect_url": url_for('auth.login')})
            
            if password_register != confirm_password:
                flash('Las contraseñas no coinciden.')
                return jsonify({"redirect_url": url_for('auth.login')})
        
            if User.query.filter(or_(User.username == name_register, User.email == email_register)).first():
                flash('El usuario o el email ya existen.')
                return jsonify({"redirect_url": url_for('auth.login')})
            
            # hashed al password para seguridad
            hashed_password = generate_password_hash(password_register)
            
            # creamos usuario
            new_user = User(username=name_register, password=hashed_password, email=email_register)
            
            # guardamos usuario y si no, devolvemos un error
            try:
                db.session.add(new_user)
                db.session.commit()
                flash('Registro exitoso. Ahora puedes iniciar sesión.')
                return jsonify({"redirect_url": url_for('auth.login')})
            except Exception as e:
                db.session.rollback()
                flash(f'Error al registrar el usuario. Por favor, intenta nuevamente. {e}')
                return jsonify({"redirect_url": url_for('auth.login')})

            
        elif action == 'login':
            # Login de usuario
            email_login = request.form.get("login-email")
            password_login = request.form.get('login-password')
            
            # validamos si se escribieron el email y password
            if not all([email_login, password_login]):
                flash('Por favor, ingrese email y contraseña.')
                return jsonify({"redirect_url": url_for('auth.login')})
            
            # comprobamos si el email existe en la base de datos
            user = User.query.filter_by(email=email_login).first()
            
            # si todo esta bien iniciamos session, si no devolvemos un error
            if user and check_password_hash(user.password , password_login):
                session['user_id'] = user.id
                flash('Inicio de sesión exitoso.')
                return jsonify({"redirect_url": url_for('inicio.home')})
            else:
                flash('Credenciales incorrectas.')
                return jsonify({"redirect_url": url_for('auth.login')})
            
        
# creamos una visualizacion de el login
@Auth.route("/login", methods=["GET"])
def login():
    return render_template('auth/auth.html')

# creamos un logout simple.
@Auth.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('inicio.home'))