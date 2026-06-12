// Inicializa ou recupera os pontos salvos no navegador
// Verifica se já existe algum ponto salvo no navegador
let pontosSalvos = localStorage.getItem("pontosAmor");

// Se for nulo (primeira vez no site), começa com 120. Se não, carrega os pontos salvos.
let pontosIntercambio = pontosSalvos !== null ? parseInt(pontosSalvos) : 120;

function atualizarDisplayPontos() {
  const display = document.getElementById("contador-pontos");
  if (display) {
    display.innerText = pontosIntercambio;
  }
  // Salva o valor atualizado no navegador
  localStorage.setItem("pontosAmor", pontosIntercambio);
}

// Executa assim que a página carregar para exibir os pontos
document.addEventListener("DOMContentLoaded", () => {
  atualizarDisplayPontos();
});
// Live counter desde 08/03/2025
const start = new Date("2026-03-08T00:00:00");
function updateCounter() {
  const now = new Date();
  const diff = now - start;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById("t-days").textContent = String(days).padStart(2, "0");
  document.getElementById("t-hours").textContent = String(hours).padStart(
    2,
    "0",
  );
  document.getElementById("t-min").textContent = String(mins).padStart(2, "0");
  document.getElementById("t-sec").textContent = String(secs).padStart(2, "0");
}
updateCounter();
setInterval(updateCounter, 1000);

// Floating hearts
const emojis = ["❤️", "💕", "💖", "💗", "🌸", "✨", "💝", "🌹"];
const container = document.getElementById("particles");
function createHeart() {
  const el = document.createElement("div");
  el.className = "heart-particle";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 6 + Math.random() * 8 + "s";
  el.style.animationDelay = Math.random() * 3 + "s";
  el.style.fontSize = 10 + Math.random() * 16 + "px";
  container.appendChild(el);
  setTimeout(() => el.remove(), 14000);
}
setInterval(createHeart, 600);
for (let i = 0; i < 12; i++) setTimeout(createHeart, i * 200);
function abrirFoto(src) {
  const modal = document.getElementById("modal-foto");
  const imgAmpliada = document.getElementById("foto-ampliada");
  modal.style.display = "block";
  imgAmpliada.src = src;
}

function fecharFoto() {
  document.getElementById("modal-foto").style.display = "none";
}
function resgatarCupom(idCupom, textoOriginal) {
  const elemento = document.getElementById(idCupom);

  // Se já estiver resgatado, não faz nada
  if (elemento.classList.contains("resgatado")) return;

  const custo = parseInt(elemento.getAttribute("data-custo"));

  // Validação de pontos para os dois primeiros cupons
  if (custo > 0 && pontosIntercambio < custo) {
    alert(
      `Você precisa de pelo menos ${custo} pontos para resgatar este cupom! Jogue o jogo da memória para conseguir.`,
    );
    return;
  }

  // Confirmação de resgate
  if (confirm(`Deseja mesmo resgatar "${textoOriginal}"?`)) {
    // Deduz os pontos se houver custo
    if (custo > 0) {
      pontosIntercambio -= custo;
      atualizarDisplayPontos();
    }

    // Pega a data atual formatada (DD/MM/AAAA)
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");

    // Aplica o resgate visualmente
    aplicarStatusResgatado(elemento, textoOriginal, dataFormatada);

    // Salva o status permanentemente no localStorage do navegador
    localStorage.setItem(`status_${idCupom}`, dataFormatada);
  }
}

function aplicarStatusResgatado(elemento, texto, data) {
  elemento.classList.add("resgatado");
  elemento.innerHTML = `${texto} <br> <span class="data-resgate">🔓 Resgatado em: ${data}</span>`;
}

// Função para verificar cupons já resgatados anteriormente ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const cupons = [
    { id: "cupom-1", texto: "🎟️ Vale uma massagem" },
    { id: "cupom-2", texto: "🍿 Vale escolha do filme hoje" },
    { id: "cupom-3", texto: "🍕 Vale um jantar pago por mim" },
  ];

  cupons.forEach((c) => {
    const salvo = localStorage.getItem(`status_${c.id}`);
    if (salvo) {
      const elemento = document.getElementById(c.id);
      if (elemento) aplicarStatusResgatado(elemento, c.texto, salvo);
    }
  });
});
const perguntas = [
  {
    p: "Onde foi nosso primeiro beijo?",
    opcoes: ["No beco nada suspeito", "Na praça", "No topo da torre eifel"],
    correta: 0,
  }, // Índice 0 = "No beco nada suspeito"
  {
    p: "Qual a data do nosso aniversário de namoro?",
    opcoes: ["8 de março", "15 de abril", "8 de fevereiro"],
    correta: 0,
  },
];

let perguntaAtual = 0;
let acertos = 0;

function carregarPergunta() {
  if (perguntaAtual >= perguntas.length) {
    document.getElementById("pergunta-container").innerHTML =
      `<h3>Fim do Quiz!</h3>`;
    document.getElementById("resultado-quiz").innerText =
      `Você acertou ${acertos} de ${perguntas.length} perguntas!`;
    return;
  }
  const q = perguntas[perguntaAtual];
  document.getElementById("pergunta").innerText = q.p;
  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  q.opcoes.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.className = "opcao-btn";
    btn.innerText = opcao;
    btn.onclick = () => verificarResposta(index);
    opcoesDiv.appendChild(btn);
  });
}

function verificarResposta(index) {
  if (index === perguntas[perguntaAtual].correta) acertos++;
  perguntaAtual++;
  carregarPergunta();
}

// Inicia o quiz
carregarPergunta();

function mostrarPlaylist() {
  document.getElementById("player-spotify").style.display = "block";
  document.getElementById("btn-tocar").style.display = "none";
}
function adicionarReview() {
  const input = document.getElementById("novo-review");
  const texto = input.value.trim();

  if (texto !== "") {
    const lista = document.getElementById("lista-reviews");
    const novoCard = document.createElement("div");
    novoCard.className = "review-card";
    novoCard.innerHTML = `⭐⭐⭐⭐⭐<br><b>Avaliação Nova!</b><br>${texto}`;
    lista.appendChild(novoCard);
    input.value = "";
  }
}
// Aguarda o HTML carregar para iniciar o mapa
document.addEventListener("DOMContentLoaded", function () {
  // Coordenadas (Latitude, Longitude). Exemplo: Campo Belo, MG. Troque pelas suas!
  const lat = -18.5472;
  const lng = -42.7677;

  // Inicia o mapa e ajusta o zoom (15)
  const map = L.map("mapa").setView([lat, lng], 15);

  // Carrega as imagens do mapa do OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Adiciona o pino e um balãozinho de texto
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      "<b>O nosso primeiro encontro!</b><br>Por mais de tudo, foi incrivel. ❤️",
    )
    .openPopup();
});

// A "bolha" começa aqui: (function() {
(function () {
  // 📸 COLOQUE O NOME DAS SUAS FOTOS AQUI (8 pares = 16 cartas)
  // Certifique-se de que o nome do arquivo e a extensão (.jpg, .png) estão corretos
  const imagens = [
    "/fotos/memoriafoto1.jpg",
    "/fotos/memoriafoto1.jpg",
    "/fotos/memoriafoto2.jpg",
    "/fotos/memoriafoto2.jpg",
    "/fotos/memoriafoto3.jpg",
    "/fotos/memoriafoto3.jpg",
    "/fotos/memoriafoto4.jpg",
    "/fotos/memoriafoto4.jpg",
    "/fotos/memoriafoto5.jpg",
    "/fotos/memoriafoto5.jpg",
    "/fotos/memoriafoto6.jpg",
    "/fotos/memoriafoto6.jpg",
    "/fotos/memoriafoto7.jpg",
    "/fotos/memoriafoto7.jpg",
    "/fotos/memoriafoto8.jpg",
    "/fotos/memoriafoto8.jpg",
  ];

  let cartasViradas = [];
  let bloqueio = false;
  let paresEncontrados = 0;

  function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  window.iniciarJogo = function () {
    const grade = document.getElementById("grade-jogo");
    if (!grade) return;

    grade.innerHTML = "";
    cartasViradas = [];
    bloqueio = false;
    paresEncontrados = 0;

    const imagensEmbaralhadas = embaralhar([...imagens]);

    imagensEmbaralhadas.forEach((img) => {
      const carta = document.createElement("div");
      carta.className = "carta";
      carta.dataset.imagem = img; // Guarda o caminho da foto na carta
      carta.onclick = () => virarCarta(carta);
      grade.appendChild(carta);
    });
  };

  function virarCarta(carta) {
    // Impede o clique se estiver bloqueado ou se a carta já estiver virada
    if (bloqueio || carta.classList.contains("revelada")) return;

    // Mostra a imagem como plano de fundo da carta
    carta.style.backgroundImage = `url('${carta.dataset.imagem}')`;
    carta.classList.add("revelada");
    cartasViradas.push(carta);

    if (cartasViradas.length === 2) {
      bloqueio = true;
      // ⏱️ AQUI ESTÁ O COOLDOWN: Reduzido para 500 milissegundos (meio segundo)
      setTimeout(verificarPar, 500);
    }
  }

  function verificarPar() {
    const [c1, c2] = cartasViradas;

    if (c1.dataset.imagem === c2.dataset.imagem) {
      // Acertou o par
      paresEncontrados++;

      if (paresEncontrados === imagens.length / 2) {
        setTimeout(() => {
          if (typeof pontosIntercambio !== "undefined") {
            pontosIntercambio += 1;
            if (typeof atualizarDisplayPontos === "function") {
              atualizarDisplayPontos();
            }
          }
          alert(
            "Parabéns! Você completou o jogo da memória e ganhou +1 ponto! 🎉",
          );
        }, 300);
      }
    } else {
      // Errou o par: esconde as fotos novamente
      c1.classList.remove("revelada");
      c2.classList.remove("revelada");
      c1.style.backgroundImage = "none";
      c2.style.backgroundImage = "none";
    }

    cartasViradas = [];
    bloqueio = false;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("grade-jogo")) {
      window.iniciarJogo();
    }
  });
})();
