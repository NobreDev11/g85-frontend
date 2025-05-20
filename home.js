const BACKEND_URL = 'https://g85-backend.onrender.com';
const token = localStorage.getItem('token');

async function verificarToken() {
  if (!token) {
    alert('Você precisa estar logado.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('Token inválido');

    const dados = await res.json();
    const nome = dados.nome || dados.usuario?.nome || 'Usuário';
    document.getElementById('saudacao').textContent = `Bem-vindo, ${nome}.`;
  } catch (err) {
    alert('Sessão expirada. Faça login novamente.');
    localStorage.clear();
    window.location.href = 'index.html';
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', verificarToken);
