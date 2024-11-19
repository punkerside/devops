const API_BASE_URL = process.env.API_BASE_URL;

document.getElementById('addUserButton').addEventListener('click', async () => {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username === '') {
        alert('Please enter a username.');
        return;
    }

    try {
        await fetch(API_BASE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username }),
        });

        usernameInput.value = '';
        loadUsers();
    } catch (error) {
        console.error('Error adding user:', error);
        alert('Failed to add user.');
    }
});

async function loadUsers() {
    try {
        const response = await fetch(API_BASE_URL);
        const users = await response.json();

        const userTable = document.getElementById('userTable');
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = user.user;
            row.appendChild(cell);
            userTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Failed to load users.');
    }
}

// Load users on page load
loadUsers();
