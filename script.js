const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const toastContainer = document.getElementById('toast-container');

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


function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

let initialMessageAdded = false;
function addInitialBotMessage() {
    if (initialMessageAdded) return;
    initialMessageAdded = true;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message initial-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<p>© 2026 TyrkaGPT Inc. All Rights Reserved. Unauthorized reproduction, distribution, or use of this material is strictly prohibited.</p>';

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

    contentDiv.innerHTML = text.replace(/\n/g, '<br>');

    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);

    scrollToBottom();
}

let usedResponses = new Set();
let usedOfftops = new Set();

function clearWord(word) {
    return word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
}

function getUserWords(text) {
    return text.split(/\s+/).map(clearWord);
}

function findPunch(userMessage) {
    if (typeof punches === 'undefined') return null;
    const userWords = getUserWords(userMessage);
    let matchingResponses = [];

    for (const punch of punches) {
        let activated = false;
        for (const title of punch.titles) {
            const cleanTitle = clearWord(title);
            if (userWords.some(word => word.includes(cleanTitle))) {
                activated = true;
                break;
            }
        }

        if (activated) {
            const availableResponses = punch.responses.filter(r => !usedResponses.has(r));
            matchingResponses.push(...availableResponses);
        }
    }

    if (matchingResponses.length > 0) {
        const response = matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
        usedResponses.add(response);
        return response;
    }
    return null;
}

function getOfftop() {
    if (typeof offtops === 'undefined') return "wypierdalaj";
    const available = offtops.filter(r => !usedOfftops.has(r));
    if (available.length === 0) {
        return "limit offtop";
    }
    const response = available[Math.floor(Math.random() * available.length)];
    usedOfftops.add(response);
    return response;
}

function getBotResponse(message) {
    let response = findPunch(message);
    if (!response) {
        response = getOfftop();
    }
    return response;
}

async function fetchBotResponse(message) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (res.ok) {
            const data = await res.json();
            if (data && data.response) return data.response;
        }
    } catch (e) {
        console.error('Error fetching bot response:', e);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    return getBotResponse(message);
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    usedResponses.add(text);

    addUserMessage(text);
    userInput.value = '';

    showTypingIndicator();

    const responseText = await fetchBotResponse(text);

    removeTypingIndicator();
    showBotMessage(responseText);
});

function getRandomPunch() {
    if (typeof punches === 'undefined') return null;
    let allPunches = [];
    for (const p of punches) {
        if (p.responses && Array.isArray(p.responses)) {
            allPunches.push(...p.responses);
        }
    }
    const available = allPunches.filter(r => !usedResponses.has(r));
    if (available.length === 0) return null;

    const chosen = available[Math.floor(Math.random() * available.length)];
    return chosen;
}

const diceBtn = document.getElementById('dice-btn');
if (diceBtn) {
    diceBtn.addEventListener('click', () => {
        const punch = getRandomPunch();
        if (punch) {
            userInput.value = punch;
            userInput.focus();
            showToast('Wylosowano tyrke!', 'success');
        } else {
            showToast('Brak dostępnych tyrek!', 'error');
        }
    });
}

addInitialBotMessage();

