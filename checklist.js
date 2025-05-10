const BACKEND_URL = 'https://g85-backend.onrender.com';

async function acessarCliente() {
  const nome = document.getElementById('nomeBusca').value.trim();

  if (!nome) {
    alert('Digite o nome do cliente.');
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/clientes`);
    const clientes = await response.json();

    if (!response.ok) {
      alert('Erro ao buscar clientes.');
      return;
    }

    // Busca nome exato (case insensitive)
    const clienteEncontrado = clientes.find(c =>
      c.nome.toLowerCase() === nome.toLowerCase()
    );

    if (clienteEncontrado) {
      window.location.href = `dados-cliente.html?id=${clienteEncontrado._id}`;
    } else {
      alert('Cliente ainda não cadastrado.');
    }

  } catch (error) {
    console.error('Erro ao acessar cliente:', error);
    alert('Erro de conexão com o servidor.');
  }
}
