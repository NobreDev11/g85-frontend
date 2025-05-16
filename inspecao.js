const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const veiculoId = params.get('id');

  if (!veiculoId) {
    alert('ID do veículo não informado.');
    window.location.href = 'veiculos.html';
    return;
  }

  const STORAGE_KEY = `inspecao_${veiculoId}`;

  // Restaurar dados salvos (se houver)
  const dadosSalvos = sessionStorage.getItem(STORAGE_KEY);
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);

    // Marcar checkboxes
    if (Array.isArray(dados.itens)) {
      dados.itens.forEach(item => {
        const checkbox = document.querySelector(`input[name="itens"][value="${item}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }

    // Preencher observações extras
    if (dados.extras) {
      Object.keys(dados.extras).forEach(chave => {
        const textarea = document.querySelector(`.obs-item[data-item="${chave}"]`);
        if (textarea) {
          textarea.value = dados.extras[chave];
          textarea.style.display = 'block';
        }
      });
    }

    // Observação geral
    if (dados.observacao) {
      const obsGeral = document.getElementById('observacao');
      if (obsGeral) obsGeral.value = dados.observacao;
    }
  }

  // Função para salvar dados
  function salvarSession() {
    const checkboxes = document.querySelectorAll('input[name="itens"]:checked');
    const itensSelecionados = Array.from(checkboxes).map(cb => cb.value);
    const observacaoGeral = document.getElementById('observacao').value.trim();

    const extras = {};
    document.querySelectorAll('.obs-item').forEach(textarea => {
      const key = textarea.dataset.item;
      const value = textarea.value.trim();
      if (value) extras[key] = value;
    });

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      veiculo: veiculoId,
      itens: itensSelecionados,
      observacao: observacaoGeral,
      extras
    }));
  }

  // Salvar ao interagir
  document.querySelectorAll('input[name="itens"]').forEach(input => {
    input.addEventListener('change', salvarSession);
  });

  document.querySelectorAll('.obs-item').forEach(textarea => {
    textarea.addEventListener('input', salvarSession);
  });

  const obsGeral = document.getElementById('observacao');
  if (obsGeral) obsGeral.addEventListener('input', salvarSession);

  // Ativar ícones de observação
  document.querySelectorAll('.icone-observacao').forEach(icone => {
    const item = icone.dataset.item;
    const textarea = document.querySelector(`.obs-item[data-item="${item}"]`);
    if (textarea) {
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
    }
  });

  // Voltar
  document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = `servico.html?id=${veiculoId}`;
  });

  // Envio do formulário
  document.getElementById('form-inspecao').addEventListener('submit', async (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="itens"]:checked');
    const itensSelecionados = Array.from(checkboxes).map(cb => cb.value);
    const observacaoGeral = document.getElementById('observacao').value.trim();

    const extras = {};
    document.querySelectorAll('.obs-item').forEach(textarea => {
      const key = textarea.dataset.item;
      const valor = textarea.value.trim();
      if (valor) extras[key] = valor;
    });

    if (itensSelecionados.length === 0 && !observacaoGeral && Object.keys(extras).length === 0) {
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
          extras
        })
      });

      const result = await res.json();

      if (res.ok) {
        sessionStorage.removeItem(STORAGE_KEY);
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
