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
    rightPanel.classList.toggle("show")
}
settingsBtn.addEventListener('click', showPanel);

function darkness() {
    const body = document.getElementById("body")
    const labelToggle = document.getElementById("label_toggle")

    body.classList.toggle("dark")
    if(body.classList.contains("dark")){
        labelToggle.innerHTML="<i class='fas fa-sun'>";
    }else {
        labelToggle.innerHTML="<i class='fas fa-moon'>";
    }
}
// Cargar conversaciones al abrir la aplicación
let currentPage = 1;

function loadConversations(page = 1) {
    fetch(`/conversations?page=${page}`)
        .then(response => {
            if (response.status === 401) {
                // Redirigir a login si no autenticado
                window.location.href = '/login';
                throw new Error('No autenticado');
            }
            return response.json();
        })
        .then(data => {
            renderConversations(data.conversations);
            updatePagination(data);
        })
        .catch(error => console.error('Error:', error));
}

function renderConversations(conversations) {
    const historyContainer = document.querySelector('.chat-history');
    historyContainer.innerHTML = ''; // Limpiar contenedor
    
    conversations.forEach(conv => {
        const conversationElement = document.createElement('div');
        conversationElement.className = 'history-item';
        conversationElement.innerHTML = `
            <div class="item-icon tech-bg">
                <i class="fas fa-comment"></i>
            </div>
            <div class="item-details">
                <span class="item-title">${conv.message.substring(0, 30)}...</span>
                <span class="item-preview">${conv.bot_reply.substring(0, 40)}...</span>
            </div>
            <span class="item-time">${new Date(conv.timestamp).toLocaleTimeString()}</span>
        `;
        historyContainer.appendChild(conversationElement);
    });
}

function updatePagination(data) {
    // Implementar controles de paginación aquí
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    
    if (data.has_prev) {
        paginationContainer.innerHTML += `<button onclick="loadConversations(${data.page - 1})">Anterior</button>`;
    }
    
    paginationContainer.innerHTML += `<span>Página ${data.page} de ${data.total_pages}</span>`;
    
    if (data.has_next) {
        paginationContainer.innerHTML += `<button onclick="loadConversations(${data.page + 1})">Siguiente</button>`;
    }
    
    // Agregar al DOM donde corresponda
    document.querySelector('.chat-history').after(paginationContainer);
}

// Llamar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadConversations(1);
});