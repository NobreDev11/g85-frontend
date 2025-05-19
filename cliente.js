const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado. Faça login novamente.');
    window.location.href = 'index.html';
    return;
  }

  const lista = document.getElementById('lista-clientes');
  const busca = document.getElementById('buscaCliente');

  async function carregarClientes() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/clientes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const clientes = await res.json();

      if (!res.ok) {
        lista.innerHTML = '<p>Erro ao carregar clientes.</p>';
        return;
      }

      exibirClientes(clientes);
    } catch (error) {
      console.error(error);
      lista.innerHTML = '<p>Erro de conexão com o servidor.</p>';
    }
  }

  function exibirClientes(clientes) {
    lista.innerHTML = '';

    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${cliente.nome}</span>
        <div class="actions">
          <button onclick="selecionarCliente('${cliente._id}')">✔️</button>
          <a href="dados-cliente.html?id=${cliente._id}">✏️</a>
          <button onclick="excluirCliente('${cliente._id}')">🗑️</button>
        </div>
      `;
      lista.appendChild(li);
    });
  }

  busca.addEventListener('input', async () => {
    const termo = busca.value.toLowerCase();

    const res = await fetch(`${BACKEND_URL}/api/clientes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const clientes = await res.json();
    const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(termo));
    exibirClientes(filtrados);
  });

  window.selecionarCliente = (id) => {
    window.location.href = `dados-cliente.html?id=${id}`;
  };

  window.excluirCliente = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('Cliente excluído com sucesso!');
        carregarClientes();
      } else {
        alert('Erro ao excluir cliente.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  carregarClientes();
});
