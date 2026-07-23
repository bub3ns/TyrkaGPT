const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const toastContainer = document.getElementById('toast-container');

// --- Powiadomienia (Toast) ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-check-circle" style="color: var(--success)"></i>' : '<i class="fa-solid fa-circle-exclamation" style="color: var(--error)"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}



// --- Interfejs czatu ---
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

let initialMessageAdded = false;
function addInitialBotMessage() {
    if (initialMessageAdded) return;
    initialMessageAdded = true;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<p>TyrkaGPT Made by bub3ns & spojrzenie</p>';
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message typing-indicator-message';
    messageDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        contentDiv.appendChild(dot);
    }
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function showBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Zamiana znaków nowej linii na <br>
    contentDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    scrollToBottom();
}

// --- Komunikacja z backendem ---
async function fetchBotResponse(message) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            throw new Error('Błąd serwera');
        }
        
        const data = await response.json();
        return data.response;
    } catch (err) {
        console.error(err);
        showToast('Nie udało się połączyć z serwerem', 'error');
        return 'Wystąpił błąd połączenia z serwerem.';
    }
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = userInput.value.trim();
    if (!text) return;
    
    addUserMessage(text);
    userInput.value = '';
    
    // Animacja pisania
    showTypingIndicator();
    
    const responseText = await fetchBotResponse(text);
    
    removeTypingIndicator();
    showBotMessage(responseText);
});

addInitialBotMessage();

