document.addEventListener('DOMContentLoaded', () => {
  const campos = ['frente', 'direito', 'esquerdo', 'traseira', 'topo'];

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

  document.getElementById('form-avarias').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Avarias registradas com sucesso!');
    // Aqui você pode enviar os dados para o backend
  });
});
