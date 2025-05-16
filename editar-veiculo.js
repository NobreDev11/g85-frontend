const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const veiculoId = params.get('id');
  const clienteId = params.get('cliente');

  if (!veiculoId || !clienteId) {
    alert('Dados inválidos.');
    window.location.href = 'clientes.html';
    return;
  }

  const modeloInput = document.getElementById('modelo');
  const placaInput = document.getElementById('placa');
  const corInput = document.getElementById('cor');
  const voltarLink = document.getElementById('voltar-link');

  voltarLink.href = `veiculos.html?id=${clienteId}`;

  try {
    const response = await fetch(`${BACKEND_URL}/api/veiculos/${veiculoId}`);
    const veiculo = await response.json();

    if (response.ok) {
      modeloInput.value = veiculo.modelo || '';
      placaInput.value = veiculo.placa || '';
      corInput.value = veiculo.cor || '';
    } else {
      alert(veiculo.message || 'Erro ao carregar veículo');
    }
  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    alert('Erro de conexão com o servidor');
  }

  document.getElementById('form-veiculo').addEventListener('submit', async (e) => {
    e.preventDefault();

    const modelo = modeloInput.value.trim();
    const placa = placaInput.value.trim();
    const cor = corInput.value.trim();

    try {
      const response = await fetch(`${BACKEND_URL}/api/veiculos/${veiculoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelo, placa, cor })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Veículo atualizado com sucesso!');
        window.location.href = `veiculos.html?id=${clienteId}`;
      } else {
        alert(result.message || 'Erro ao atualizar veículo');
      }
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      alert('Erro de conexão com o servidor');
    }
  });
});
