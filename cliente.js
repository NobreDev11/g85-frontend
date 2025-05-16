document.addEventListener('DOMContentLoaded', () => {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const container = document.getElementById('lista-clientes');

  if (clientes.length === 0) {
    container.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
    return;
  }

  clientes.forEach(cliente => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${cliente.nome}</strong><br>
      <button onclick="acessarCliente('${cliente.id}')">Acessar</button>
    `;
    container.appendChild(div);
  });
});

function acessarCliente(id) {
  window.location.href = `dados-cliente.html?id=${id}`;
}