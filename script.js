const API_URL = 'https://apimysql-production-6a17.up.railway.app/api/users';

document.addEventListener('DOMContentLoaded', () => {
  // Evento para agregar usuario (POST)
  document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addUser();
    document.getElementById('userForm').reset();
  });

  // Evento para obtener usuarios (GET)
  document.getElementById('getUsersBtn').addEventListener('click', fetchUsers);
});

// Función para obtener y mostrar usuarios
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json(); // 👈🏻 AQUÍ cambió
    const users = data.users;            // 👈🏻 EXTRAER el array users

    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.comments}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

// Función para agregar usuario
async function addUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const comments = document.getElementById('comments').value;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age, comments })
    });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
}
