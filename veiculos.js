const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');

  const lista = document.getElementById('lista-veiculos');
  const voltarLink = document.getElementById('link-voltar');

  if (!clienteId) {
    alert('Cliente não identificado.');
    window.location.href = 'clientes.html';
    return;
  }

  // Corrige o botão voltar mantendo o ID do cliente
  if (voltarLink) {
    voltarLink.href = `dados-cliente.html?id=${clienteId}`;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/veiculos?cliente=${clienteId}`);
    const veiculos = await response.json();

    lista.innerHTML = '';

    if (Array.isArray(veiculos) && veiculos.length > 0) {
      veiculos.forEach((v, i) => {
        const li = document.createElement('li');
        li.innerHTML = `Veículo 0${i + 1} <i>☰</i>`;
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

function cadastrarVeiculo() {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');
  window.location.href = `cadastrar-veiculo.html?id=${clienteId}`;
}

function confirmar() {
  alert('Confirmação realizada!');
  // Redirecionar para próxima etapa aqui se necessário
}
