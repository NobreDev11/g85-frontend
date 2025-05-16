const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const veiculoId = params.get('id');

  if (!veiculoId) {
    alert('ID do veículo não informado.');
    window.location.href = 'clientes.html';
    return;
  }

  const modeloInput = document.getElementById('modelo');
  const corInput = document.getElementById('cor');
  const placaInput = document.getElementById('placa');
  const kmInput = document.getElementById('km');
  const imagemInput = document.getElementById('imagem');
  const previewImg = document.getElementById('preview');
  const voltarLink = document.getElementById('btn-voltar');

  voltarLink.href = `veiculos.html?id=${veiculoId}`;

  try {
    const res = await fetch(`${BACKEND_URL}/api/veiculos/${veiculoId}`);
    const veiculo = await res.json();

    if (res.ok) {
      modeloInput.value = veiculo.modelo || '';
      corInput.value = veiculo.cor || '';
      placaInput.value = veiculo.placa || '';
    } else {
      alert('Erro ao carregar dados do veículo');
    }
  } catch (err) {
    alert('Erro de conexão com o servidor');
    console.error(err);
  }

  imagemInput.addEventListener('change', () => {
    const file = imagemInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        previewImg.src = reader.result;
        previewImg.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('form-servico').addEventListener('submit', async (e) => {
    e.preventDefault();

    const km = kmInput.value.trim();
    const imagemBase64 = previewImg.src;

    if (!km || !imagemBase64) {
      alert('Preencha o KM e tire uma foto do painel.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/servicos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          veiculo: veiculoId,
          km,
          imagem: imagemBase64
        })
      });

      const result = await res.json();

      if (res.ok) {
        alert('Serviço registrado com sucesso!');
        // ✅ Redirecionamento correto para a página de inspeção
        window.location.href = `inspecao.html?id=${veiculoId}`;
      } else {
        alert(result.message || 'Erro ao salvar serviço.');
      }
    } catch (err) {
      console.error('Erro ao salvar serviço:', err);
      alert('Erro de conexão com o servidor');
    }
  });
});
