
// Agregar eventos a los botones
document.getElementById('login-toggle').addEventListener('click', () => setAction('login'));
document.getElementById('register-toggle').addEventListener('click', () => setAction('register'));

function setAction(action) {

  // Obtener referencias a los botones y formularios
  const loginToggleBtn = document.getElementById('login-toggle');
  const registerToggleBtn = document.getElementById('register-toggle');

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  const actionInput = document.getElementById('action');
  actionInput.value = action;
  if (action === 'login') {
    showLogin();
  } else  if (action == "register") {
    showRegister();
  }

  // Función para mostrar el formulario de login
  function showLogin() {
    loginForm.classList.add('active-form');
    registerForm.classList.remove('active-form');

    // Actualizar botones
    loginToggleBtn.classList.add('active');
    registerToggleBtn.classList.remove('active');
  }

  // Función para mostrar el formulario de registro
  function showRegister() {
    loginForm.classList.remove('active-form');
    registerForm.classList.add('active-form');

    // Actualizar botones
    registerToggleBtn.classList.add('active');
    loginToggleBtn.classList.remove('active');
  }

}
          
            
             // Función para mostrar/ocultar contraseña
        function togglePassword(inputId, icon) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Validación de fortaleza de contraseña
        document.getElementById('register-password')?.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            
            strengthBars.forEach(bar => bar.style.backgroundColor = '#ddd');
            
            if (password.length >= 8) {
                strengthBars[0].style.backgroundColor = 'red';
                strengthText.textContent = 'Débil';
            }
            if (password.length >= 12 && /[A-Z]/.test(password)) {
                strengthBars[1].style.backgroundColor = 'orange';
                strengthText.textContent = 'Moderada';
            }
            if (password.length >= 12 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password)) {
                strengthBars[2].style.backgroundColor = 'green';
                strengthText.textContent = 'Fuerte';
            }
        });

// Función para manejar el envío del formulario usando AJAX
function submitAuthForm(action) {
  var csrf_token = "{{ csrf_token() }}";
  // Crear un objeto FormData para recopilar los datos del formulario
  const formData = new FormData();

  // Agregar el campo 'action' para indicar si es login o register
  formData.append('action', action);
  

  if (action === 'register') {
      // Obtener los valores del formulario de registro
      formData.append('register-name', document.querySelector('#register-name').value);
      formData.append('register-email', document.querySelector('#register-email').value);
      formData.append('register-password', document.querySelector('#register-password').value);
      formData.append('register-confirm-password', document.querySelector('#register-confirm-password').value);
      // Si tienes un checkbox para aceptar términos, también puedes agregarlo
      // formData.append('accept-terms', document.querySelector('#accept-terms').checked);
  } else if (action === 'login') {
      // Obtener los valores del formulario de login
      formData.append('login-email', document.querySelector('#login-email').value);
      formData.append('login-password', document.querySelector('#login-password').value);
  }
  fetch('/api/login-register', {
    method: 'POST',
    body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.redirect_url) {
            window.open(data.redirect_url, '_self')
        } else {
            console.log('Respuesta:', data);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}