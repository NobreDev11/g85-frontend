document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('usuarioNome') || 'Usuário';
    document.getElementById('saudacao').textContent = `Bem-vindo, ${nome}.`;
  });
  