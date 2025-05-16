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

  // Observação por item
  const icones = document.querySelectorAll('.icone-observacao');
  icones.forEach(icone => {
    const item = icone.dataset.item;
    const textarea = document.querySelector(`.obs-item[data-item="${item}"]`);

    icone.addEventListener('click', () => {
      if (textarea.style.display === 'none') {
        textarea.style.display = 'block';
        textarea.focus();
      } else if (!textarea.value.trim()) {
        textarea.style.display = 'none';
      }
    });

    if (textarea.value.trim()) {
      textarea.style.display = 'block';
    }
  });

  document.getElementById('form-inspecao').addEventListener('submit', async (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="itens"]:checked');
    const itensSelecionados = Array.from(checkboxes).map(cb => cb.value);
    const observacaoGeral = document.getElementById('observacao').value.trim();

    const observacoesExtras = {};
    document.querySelectorAll('.obs-item').forEach(textarea => {
      const key = textarea.dataset.item;
      const valor = textarea.value.trim();
      if (valor) observacoesExtras[key] = valor;
    });

    if (itensSelecionados.length === 0 && !observacaoGeral && Object.keys(observacoesExtras).length === 0) {
      alert('Preencha pelo menos um item ou observação.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/inspecoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          veiculo: veiculoId,
          itens: itensSelecionados,
          observacao: observacaoGeral,
          extras: observacoesExtras
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
