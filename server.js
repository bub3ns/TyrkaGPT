const express = require('express');
const cors = require('cors');
const path = require('path');
const { punches, offtops } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

let usedResponses = new Set();
let usedOfftops = new Set();

function clearWord(word) {
    return word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
}

function getUserWords(text) {
    return text.split(/\s+/).map(clearWord);
}

function findPunch(userMessage) {
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

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'chuju cos nie tak jest' });
    }
    const reply = getBotResponse(message);
    res.json({ response: reply });
});

app.listen(PORT, () => {
    console.log(`Serwer TyrkaGPT działa pod adresem http://localhost:${PORT}`);
});
