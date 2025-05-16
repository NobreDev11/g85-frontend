const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const veiculoId = params.get('id');

  if (!veiculoId) {
    alert('ID do veículo não informado.');
    window.location.href = 'veiculos.html';
    return;
  }

  document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = `servico.html?id=${veiculoId}`;
  });

  document.getElementById('form-inspecao').addEventListener('submit', async (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="itens"]:checked');
    const itensSelecionados = Array.from(checkboxes).map(cb => cb.value);
    const observacao = document.getElementById('observacao').value.trim();

    if (itensSelecionados.length === 0 && !observacao) {
      alert('Selecione pelo menos um item ou escreva uma observação.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/inspecoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          veiculo: veiculoId,
          itens: itensSelecionados,
          observacao
        })
      });

      const result = await res.json();

      if (res.ok) {
        alert('Inspeção salva com sucesso!');
        window.location.href = `veiculos.html?id=${veiculoId}`;
      } else {
        alert(result.message || 'Erro ao salvar inspeção.');
      }
    } catch (error) {
      console.error('Erro ao salvar inspeção:', error);
      alert('Erro de conexão com o servidor');
    }
  });
});
