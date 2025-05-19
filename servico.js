const BACKEND_URL = 'https://g85-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'index.html';
    return;
  }

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

  const dadosSalvos = sessionStorage.getItem('dadosServico');
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    if (dados.veiculo === veiculoId) {
      kmInput.value = dados.km || '';
      if (dados.imagem) {
        previewImg.src = dados.imagem;
        previewImg.style.display = 'block';
      }
    }
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/veiculos/${veiculoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          veiculo: veiculoId,
          km,
          imagem: imagemBase64
        })
      });

      const result = await res.json();

      if (res.ok) {
        sessionStorage.setItem('dadosServico', JSON.stringify({ veiculo: veiculoId, km, imagem: imagemBase64 }));
        alert('Serviço registrado com sucesso!');
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
