document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = sender;
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to latest message
    }

    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            addMessage(`User: ${userMessage}`, 'user-message');
            messageInput.value = '';

            // Send the message to the server
            fetch('/', {
                method: 'POST',
                body: new URLSearchParams({ message: userMessage }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(response => response.json())
            .then(data => {
                data.forEach(msg => {
                    if (msg.text) {
                        addMessage(`Bot: ${msg.text}`, 'bot-message');
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
                addMessage('Error sending message to server.', 'bot-message');
            });
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
