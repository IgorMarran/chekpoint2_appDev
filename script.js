// Converte "1979-08-27" em "27/08/1979".
// Não usar new Date(): string nesse formato é lida como UTC e, no fuso do Brasil,
// o dia volta um pra trás.
function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Monta um card por pessoa da lista e joga tudo no grid.
function renderizar(lista) {
  const grid = document.getElementById("grid");
  const contador = document.getElementById("contador");

  if (lista.length === 0) {
    grid.innerHTML = `<p class="vazio">Nenhum ator ou atriz encontrado.</p>`;
    contador.textContent = "0 resultados";
    return;
  }

  grid.innerHTML = lista.map(pessoa => `
    <article class="card">
      <img src="${pessoa.foto}" alt="Foto de ${pessoa.nome}" loading="lazy">
      <div class="card-info">
        <h2>${pessoa.nome}</h2>
        <p>${pessoa.pais}</p>
        <p>Nasc.: ${formatarData(pessoa.nascimento)}</p>
      </div>
    </article>
  `).join("");

  contador.textContent = `${lista.length} de ${atores.length} pessoas`;
}

// Chamada pelo oninput do campo de busca a cada tecla digitada.
function filtrar(termo) {
  const busca = termo.trim().toLowerCase();
  const filtrados = atores.filter(pessoa =>
    pessoa.nome.toLowerCase().includes(busca)
  );
  renderizar(filtrados);
}

// Ao abrir a página, mostra todo mundo.
renderizar(atores);
