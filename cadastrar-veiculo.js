const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');

  if (!clienteId) {
    alert('ID do cliente não informado.');
    window.location.href = 'clientes.html';
    return;
  }

  // Botão voltar com ID do cliente
  const voltarLink = document.getElementById('voltar-link');
  voltarLink.href = `veiculos.html?id=${clienteId}`;

  // Formulário de envio
  document.getElementById('form-veiculo').addEventListener('submit', async (e) => {
    e.preventDefault();

    const modelo = document.getElementById('modelo').value.trim();
    const placa = document.getElementById('placa').value.trim();
    const cor = document.getElementById('cor').value.trim();

    try {
      const response = await fetch(`${BACKEND_URL}/api/veiculos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente: clienteId, modelo, placa, cor })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Veículo cadastrado com sucesso!');
        window.location.href = `veiculos.html?id=${clienteId}`;
      } else {
        alert(result.message || 'Erro ao cadastrar veículo');
      }
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      alert('Erro de conexão com o servidor');
    }
  });
});
