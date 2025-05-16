const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID do cliente não informado.');
    window.location.href = 'clientes.html';
    return;
  }

  const nomeInput = document.getElementById('nomeCliente');
  const emailInput = document.getElementById('emailCliente');
  const telefoneInput = document.getElementById('telefoneCliente');
  const btnEditar = document.getElementById('btn-editar');
  const btnSalvar = document.getElementById('btn-salvar');
  const btnConfirmar = document.getElementById('btn-confirmar');

  // Carrega dados do cliente
  try {
    const response = await fetch(`${BACKEND_URL}/api/clientes/${id}`);
    const cliente = await response.json();

    if (!response.ok) {
      alert(cliente.message || 'Erro ao buscar cliente');
      return;
    }

    nomeInput.value = cliente.nome || '';
    emailInput.value = cliente.email || '';
    telefoneInput.value = cliente.telefone || '';
  } catch (error) {
    console.error('Erro ao carregar cliente:', error);
    alert('Erro de conexão com o servidor');
  }

  // Editar
  btnEditar.addEventListener('click', () => {
    nomeInput.removeAttribute('readonly');
    emailInput.removeAttribute('readonly');
    telefoneInput.removeAttribute('readonly');
    btnEditar.style.display = 'none';
    btnConfirmar.style.display = 'none';
    btnSalvar.style.display = 'block';
  });

  // Confirmar
  btnConfirmar.addEventListener('click', () => {
    window.location.href = `veiculos.html?id=${id}`;
  });

  // Salvar alterações
  document.getElementById('form-edicao').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const telefone = telefoneInput.value.trim();

    try {
      const response = await fetch(`${BACKEND_URL}/api/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Dados atualizados com sucesso!');
        nomeInput.setAttribute('readonly', true);
        emailInput.setAttribute('readonly', true);
        telefoneInput.setAttribute('readonly', true);
        btnSalvar.style.display = 'none';
        btnEditar.style.display = 'block';
        btnConfirmar.style.display = 'block';
      } else {
        alert(result.message || 'Erro ao atualizar cliente');
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro de conexão com o servidor');
    }
  });

  // Botão voltar
  document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = 'clientes.html';
  });
});
