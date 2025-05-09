const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID do cliente não informado.');
    window.location.href = 'checklist.html';
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/clientes/${id}`);
    const cliente = await response.json();

    if (!response.ok) {
      alert(cliente.message || 'Erro ao buscar cliente');
      return;
    }

    document.getElementById('nomeCliente').textContent = cliente.nome || '-';
    document.getElementById('emailCliente').textContent = cliente.email || '-';
    document.getElementById('telefoneCliente').textContent = cliente.telefone || '-';
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    alert('Erro de conexão com o servidor');
  }
});
