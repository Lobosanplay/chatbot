document.getElementById('chat-form').addEventListener('submit', function (e) {
    const message = document.getElementById('user-input').value.trim();
    if (!message) {
        e.preventDefault(); // Evitar envío si está vacío
        alert('Por favor, escribe un mensaje antes de enviar.');
    }

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            message: message
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            alert(data.error);
        } else {
            // Mostrar la respuesta en la interfaz
            mostrarRespuesta(data.response);
            messageInput.value = ''; // Limpiar el input
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function mostrarRespuesta(respuesta) {
    // Aquí puedes agregar la respuesta a un chat en la interfaz
    const chatBox = document.getElementById('chat-box');
    //<!--chatbox.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;-->
    if (!chatBox) {
        // Crear un contenedor si no existe
        const container = document.createElement('div');
        container.id = 'chat-box';
        document.body.appendChild(container);
    }
    const msgDiv = document.createElement('div');
    msgDiv.className = 'bot-message';
    msgDiv.innerText = respuesta;
    document.getElementById('chat-box').appendChild(msgDiv);
}
