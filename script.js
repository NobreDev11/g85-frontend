const BACKEND_URL = 'https://g85-backend.onrender.com';

document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('usuarioNome', result.nome);
      alert('Login realizado com sucesso!');
      window.location.href = 'home.html';
    } else {
      alert(result.message || 'Erro no login');
    }
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    alert('Erro de conexão com o servidor');
  }
});
