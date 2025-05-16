document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID do cliente não informado.');
    window.location.href = 'clientes.html';
    return;
  }

  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const cliente = clientes.find(c => c.id === id);

  const container = document.getElementById('dados-cliente');
  if (!cliente) {
    container.innerHTML = '<p>Cliente não encontrado.</p>';
    return;
  }

  container.innerHTML = `
    <p><strong>Nome:</strong> ${cliente.nome}</p>
    <p><strong>Email:</strong> ${cliente.email}</p>
    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
    <button onclick="voltar()">Voltar</button>
  `;
});

function voltar() {
  window.location.href = 'clientes.html';
}