const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');

  const lista = document.getElementById('lista-veiculos');
  const voltarLink = document.getElementById('link-voltar');
  const formVeiculos = document.getElementById('form-veiculos');

  if (!clienteId) {
    alert('Cliente não identificado.');
    window.location.href = 'clientes.html';
    return;
  }

  if (voltarLink) {
    voltarLink.href = `dados-cliente.html?id=${clienteId}`;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/veiculos?cliente=${clienteId}`);
    const veiculos = await response.json();

    lista.innerHTML = '';

    if (Array.isArray(veiculos) && veiculos.length > 0) {
      veiculos.forEach((v) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <label>
            <span style="display: flex; align-items: center;">
              <input type="radio" name="veiculoSelecionado" value="${v._id}" />
              ${v.modelo || 'Veículo'}
            </span>
            <button type="button" onclick="editarVeiculo('${v._id}', '${clienteId}')">✏️</button>
          </label>
        `;
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

  formVeiculos.addEventListener('submit', (e) => {
    e.preventDefault();

    const selecionado = document.querySelector('input[name="veiculoSelecionado"]:checked');

    if (!selecionado) {
      alert('Selecione um veículo para continuar.');
      return;
    }

    const veiculoId = selecionado.value;
    window.location.href = `servico.html?id=${veiculoId}`;
  });
});

function cadastrarVeiculo() {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');
  window.location.href = `cadastrar-veiculo.html?id=${clienteId}`;
}

function editarVeiculo(veiculoId, clienteId) {
  window.location.href = `editar-veiculo.html?id=${veiculoId}&cliente=${clienteId}`;
}
