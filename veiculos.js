const BACKEND_URL = 'https://g85-backend.onrender.com';
let veiculos = [];

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'index.html';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');
  const lista = document.getElementById('lista-veiculos');
  const voltarLink = document.getElementById('link-voltar');

  if (!clienteId) {
    alert('Cliente não identificado.');
    window.location.href = 'clientes.html';
    return;
  }

  voltarLink.href = `dados-cliente.html?id=${clienteId}`;

  try {
    const response = await fetch(`${BACKEND_URL}/api/veiculos?cliente=${clienteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    veiculos = await response.json();
    lista.innerHTML = '';

    if (Array.isArray(veiculos) && veiculos.length > 0) {
      veiculos.forEach((v) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', v._id);
        li.innerHTML = `
          <h3>${v.modelo}</h3>
          <div class="info">Placa: ${v.placa || '-'}<br/>Cor: ${v.cor || '-'}</div>
          <div class="acoes">
            <button onclick="editarVeiculo('${v._id}', '${clienteId}')">✏️</button>
            <button onclick="excluirVeiculo('${v._id}', '${clienteId}')">🗑️</button>
          </div>
        `;
        li.addEventListener('click', () => selecionarVeiculo(li));
        lista.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Nenhum veículo cadastrado.';
      lista.appendChild(li);
    }
  } catch (err) {
    console.error('Erro ao carregar veículos:', err);
    alert('Erro ao carregar veículos.');
  }
});

function selecionarVeiculo(liSelecionado) {
  const todos = document.querySelectorAll('#lista-veiculos li');
  todos.forEach((li) => li.classList.remove('selecionado'));
  liSelecionado.classList.add('selecionado');
}

function confirmarSelecao() {
  const selecionado = document.querySelector('#lista-veiculos li.selecionado');
  if (!selecionado) {
    alert('Selecione um veículo.');
    return;
  }

  const veiculoId = selecionado.getAttribute('data-id');
  window.location.href = `servico.html?id=${veiculoId}`;
}

function cadastrarVeiculo() {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');
  window.location.href = `cadastrar-veiculo.html?id=${clienteId}`;
}

function editarVeiculo(id, clienteId) {
  window.location.href = `editar-veiculo.html?id=${id}&cliente=${clienteId}`;
}

async function excluirVeiculo(id, clienteId) {
  const token = localStorage.getItem('token');
  if (!confirm('Tem certeza que deseja excluir este veículo?')) return;

  try {
    const response = await fetch(`${BACKEND_URL}/api/veiculos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    const result = await response.json();

    if (response.ok) {
      alert('Veículo excluído com sucesso!');
      location.reload();
    } else {
      alert(result.message || 'Erro ao excluir veículo');
    }
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    alert('Erro de conexão com o servidor');
  }
}
