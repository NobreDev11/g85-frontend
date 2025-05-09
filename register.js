const BACKEND_URL = 'https://g85-backend.onrender.com';

document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(`${BACKEND_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, password })
    });

    const result = await response.json();
    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      window.location.href = 'index.html';
    } else {
      alert(result.message || 'Erro no cadastro');
    }
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    alert('Erro de conexão com o servidor');
  }
});
