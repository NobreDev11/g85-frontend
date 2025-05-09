const BACKEND_URL = 'https://g85-backend.onrender.com';

async function carregarClientes() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/clientes`);
    const clientes = await response.json();

    if (!response.ok) {
      alert('Erro ao buscar clientes');
      return;
    }

    // Ordenar alfabeticamente
    clientes.sort((a, b) => a.nome.localeCompare(b.nome));

    const lista = document.getElementById('lista-clientes');
    lista.innerHTML = '';

    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${cliente.nome}</span>
        <a href="editar-cliente.html?id=${cliente._id}">✏️</a>
      `;
      lista.appendChild(li);
    });

    document.getElementById('pesquisa').addEventListener('input', (e) => {
      const termo = e.target.value.toLowerCase();
      const itens = lista.querySelectorAll('li');
      itens.forEach(item => {
        const nome = item.querySelector('span').textContent.toLowerCase();
        item.style.display = nome.includes(termo) ? 'flex' : 'none';
      });
    });

  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
    alert('Erro de conexão com o servidor');
  }
}

document.addEventListener('DOMContentLoaded', carregarClientes);
