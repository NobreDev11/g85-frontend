const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID do cliente não informado.');
    window.location.href = 'clientes.html';
    return;
  }

  // Preencher os campos
  try {
    const response = await fetch(`${BACKEND_URL}/api/clientes/${id}`);
    const cliente = await response.json();

    if (!response.ok) {
      alert(cliente.message || 'Erro ao buscar cliente');
      return;
    }

    document.getElementById('nome').value = cliente.nome || '';
    document.getElementById('email').value = cliente.email || '';
    document.getElementById('telefone').value = cliente.telefone || '';
  } catch (error) {
    console.error('Erro ao carregar cliente:', error);
    alert('Erro de conexão com o servidor');
  }

  // Enviar edição
  document.getElementById('form-editar-cliente').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    try {
      const response = await fetch(`${BACKEND_URL}/api/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Cliente atualizado com sucesso!');
        window.location.href = `dados-cliente.html?id=${id}`;
      } else {
        alert(result.message || 'Erro ao atualizar cliente');
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro de conexão com o servidor');
    }
  });
});
