const API_URL = 'http://localhost:8081/api/users';

document.addEventListener('DOMContentLoaded', () => {
  // Solo configurar eventos

  // Evento para el POST (agregar usuario)
  document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addUser(); // Solo guarda
    document.getElementById('userForm').reset(); // Limpia el formulario
    // NO hacemos fetchUsers aquí
  });

  // Evento para el GET (mostrar usuarios)
  document.getElementById('getUsersBtn').addEventListener('click', fetchUsers);
});

// Función para obtener y mostrar usuarios
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

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
