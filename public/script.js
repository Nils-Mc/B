document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();

    if (result.success) {
        alert('Login erfolgreich!');
        document.getElementById('eventInfo').style.display = 'block';
        const eventResponse = await fetch('/get-event-info');
        const eventData = await eventResponse.json();
        document.getElementById('title').textContent = `Titel: ${eventData.title}`;
        document.getElementById('description').textContent = `Beschreibung: ${eventData.description}`;
        document.getElementById('schedule').textContent = `Zeitplan: ${eventData.schedule}`;
    } else {
        alert(result.message);
    }
});
