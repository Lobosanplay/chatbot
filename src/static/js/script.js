document.getElementById('chat-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const userInput = document.getElementById('user-input').value.trim();
    const responseParagraph = document.getElementById('bot-response');

    if (!userInput) {
        e.preventDefault(); // Evitar envío si está vacío
        alert('Por favor, escribe un mensaje antes de enviar.');
    }

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            "user-input": userInput
        }),
    })
    .then((response) => response.json())
    .then((data) => {

        // Opcional: agregar el mensaje del usuario y la respuesta al chat-messages
        const chatMessages = document.getElementById('chat-messages');

        // Crear y agregar el mensaje del usuario
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'message user-message';
        userMsgDiv.innerHTML = `
        <div class="message-content">
            <div class="avatar-ring">
                <i class="fa fa-user" aria-hidden="true"></i>
            </div>
            <div class="message-text">
                ${userInput}
            </div>
        </div>
        `;
        chatMessages.appendChild(userMsgDiv);

        // Crear y agregar la respuesta del bot
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'message bot-message';
        botMsgDiv.innerHTML = `
            <div class="avatar-container bot-avatar">
                <div class="avatar-ring">
                    <i class="fas fa-robot"></i>
                </div>
            </div>
            <div class="message-content">
                <div class="message-text">${data.response}</div>
            </div>`;
        chatMessages.appendChild(botMsgDiv);

        // Limpiar el input
        document.getElementById('user-input').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        responseParagraph.textContent = 'Hubo un error al obtener la respuesta.';
        responseParagraph.style.display = 'block';
    })
})


function mostrarRespuesta(respuesta) {
    // Aquí puedes agregar la respuesta a un chat en la interfaz
    const chatBox = document.getElementById('message bot-message');
    chatbox.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;
    if (!chatBox) {
        // Crear un contenedor si no existe
        const container = document.createElement('div');
        container.id = 'message bot-message';
        document.body.appendChild(container);
    }
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';
    msgDiv.innerText = respuesta;
    document.getElementById('message bot-message').appendChild(msgDiv);
}

const settingsBtn = document.querySelector(".settings-btn")
const rightPanel = document.getElementById("rightpanel")
const closeBtn = document.querySelector(".close-panel")

function showPanel() {
    rightPanel.classList.add("show")
}
function hidePanel() {
    rightPanel.classList.remove('show');
}
settingsBtn.addEventListener('click', showPanel);
closeBtn.addEventListener('click', hidePanel)


const body = document.getElementById("body")
const labelToggle = document.getElementById("label_toggle")
function darkness() {

    body.classList.toggle("dark")
    if(body.classList.contains("dark")){
        labelToggle.innerHTML="<i class='fas fa-sun'>";
    }else {
        labelToggle.innerHTML="<i class='fas fa-moon'>";
    }
}
