const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const veiculoId = params.get('id');
  const token = localStorage.getItem('token');

  if (!veiculoId || !token) {
    alert('Acesso inválido. Faça login novamente.');
    window.location.href = 'index.html';
    return;
  }

  const campos = ['frente', 'direito', 'esquerdo', 'traseira', 'topo'];
  const imagensBase64 = {};
  const observacoes = {};

  campos.forEach(campo => {
    const img = document.getElementById(`img-${campo}`);
    const input = document.getElementById(`input-${campo}`);
    const icon = document.querySelector(`.icone-observacao[data-item="${campo}"]`);
    const obs = document.querySelector(`.obs-item[data-item="${campo}"]`);

    img.addEventListener('click', () => input.click());

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
          imagensBase64[campo] = reader.result;
        };
        reader.readAsDataURL(file);
      }
    });

    icon.addEventListener('click', () => {
      if (obs.style.display === 'none') {
        obs.style.display = 'block';
        obs.focus();
      } else if (!obs.value.trim()) {
        obs.style.display = 'none';
      }
    });

    if (obs.value.trim()) {
      obs.style.display = 'block';
    }
  });

  document.getElementById('btn-voltar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('form-avarias').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar observações
    campos.forEach(campo => {
      const obs = document.querySelector(`.obs-item[data-item="${campo}"]`);
      if (obs.value.trim()) {
        observacoes[campo] = obs.value.trim();
      }
    });

    try {
      const res = await fetch(`${BACKEND_URL}/api/avarias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          veiculo: veiculoId,
          imagens: imagensBase64,
          observacoes
        })
      });

      const result = await res.json();

      if (res.ok) {
        alert('Avarias registradas com sucesso!');
        window.location.href = 'clientes.html';
      } else {
        alert(result.message || 'Erro ao registrar avarias.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor.');
    }
  });
});
