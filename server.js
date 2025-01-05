const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Mock-Daten
let eventData = {
    title: "Veranstaltung 2025",
    description: "Dies ist eine Beschreibung der Veranstaltung.",
    schedule: "Tag 1: Eröffnungsrede und Networking\nTag 2: Workshops und Sessions\nTag 3: Panel-Diskussionen"
};

// Routen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.send({ success: true });
    } else {
        res.send({ success: false, message: 'Benutzername oder Passwort falsch!' });
    }
});

app.get('/get-event-info', (req, res) => {
    res.json(eventData);
});

app.post('/update-info', (req, res) => {
    const { title, description, schedule } = req.body;
    eventData.title = title;
    eventData.description = description;
    eventData.schedule = schedule;
    res.send({ success: true, message: 'Daten erfolgreich aktualisiert!' });
});

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
