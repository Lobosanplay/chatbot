from flask import Blueprint, url_for,session, redirect

AuthP = Blueprint("Providers", __name__)


# validamos si intenta iniciar sesion con google, microsft, apple.
@AuthP.route('/login/<provider>')
def login_provider(provider):
    from app import oauth
    if provider not in ('google', 'microsoft', 'apple'):
        return 'Proveedor no soportado', 400
    redirect_uri = url_for('Providers.auth_callback', provider=provider, _external=True)
    return oauth.create_client(provider).authorize_redirect(redirect_uri)

# creamos los inicios de sesion por Google, Microsotf y Apple.
@AuthP.route('/auth/callback/<provider>')
def auth_callback(provider):
    from app import oauth
    client = oauth.create_client(provider)
    token = client.authorize_access_token()
    user_info = None

    if provider == 'google':
        resp = client.get('userinfo')
        user_info = resp.json()
    elif provider == 'microsoft':
        resp = client.get('me')
        user_info = resp.json()
    elif provider == 'apple':
        # Apple devuelve un id_token que debes decodificar
        id_token = token.get('id_token')
        # Aquí deberías decodificar el JWT para obtener info del usuario
        # Para simplificar, asumimos que ya tienes la info
        user_info = {'email': 'user@apple.com'}  # Placeholder

    # Guardar info en sesión
    session['user'] = user_info
    return redirect(url_for('inicio.home'))