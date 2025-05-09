const BACKEND_URL = 'https://g85-backend.onrender.com';

document.getElementById('form-cliente').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  try {
    const response = await fetch(`${BACKEND_URL}/api/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone })
    });

    const result = await response.json();
    if (response.ok) {
      alert('Cliente cadastrado com sucesso!');
      window.location.href = 'checklist.html';
    } else {
      alert(result.message || 'Erro no cadastro');
    }
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    alert('Erro de conexão com o servidor');
  }
});
