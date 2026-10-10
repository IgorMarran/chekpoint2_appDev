// Converte "1979-08-27" em "27/08/1979".
// Não usar new Date(): string nesse formato é lida como UTC e, no fuso do Brasil,
// o dia volta um pra trás.
function formatarData(iso) {
  const partes = iso.split("-"); // ["1979", "08", "27"]
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Cria um elemento, já com classe e texto. Usar textContent (e não innerHTML)
// garante que o dado vira texto na tela, nunca HTML executável.
function criarElemento(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto !== undefined) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}

// Monta o card de uma pessoa.
function criarCard(pessoa) {
  const card = criarElemento("article", undefined, "card");

  const foto = document.createElement("img");
  foto.src = pessoa.foto;
  foto.alt = "Foto de " + pessoa.nome;
  foto.loading = "lazy";
  // Se a URL da foto quebrar, mostra um placeholder em vez do ícone de imagem quebrada.
  foto.onerror = function () {
    this.onerror = null;
    this.src = "sem-foto.svg";
  };

  const info = criarElemento("div", undefined, "card-info");
  info.appendChild(criarElemento("h2", pessoa.nome));
  info.appendChild(criarElemento("p", pessoa.pais));
  info.appendChild(criarElemento("p", "Nasc.: " + formatarData(pessoa.nascimento)));

  card.appendChild(foto);
  card.appendChild(info);
  return card;
}

// Renderiza a lista recebida no grid e atualiza o contador.
// Recebe o total por parâmetro em vez de ler a variável global `atores`:
// a função só depende do que entra nela.
function renderizar(lista, total) {
  const grid = document.getElementById("grid");
  const contador = document.getElementById("contador");

  grid.innerHTML = ""; // limpa o grid antes de redesenhar

  if (lista.length === 0) {
    grid.appendChild(criarElemento("p", "Nenhum ator ou atriz encontrado.", "vazio"));
    contador.textContent = "0 de " + total + " pessoas";
    return;
  }

  lista.forEach(function (pessoa) {
    grid.appendChild(criarCard(pessoa));
  });

  contador.textContent = lista.length + " de " + total + " pessoas";
}

// Chamada pelo oninput do campo de busca a cada tecla digitada.
// trim() ignora espaços nas pontas; toLowerCase() nos dois lados deixa a busca
// insensível a maiúsculas ("TOM" acha "Tom Holland").
function filtrar(termo) {
  const busca = termo.trim().toLowerCase();
  const filtrados = atores.filter(function (pessoa) {
    return pessoa.nome.toLowerCase().includes(busca);
  });
  renderizar(filtrados, atores.length);
}

// Ao abrir a página, mostra todo mundo.
renderizar(atores, atores.length);
