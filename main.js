// Selecionando os elementos do HTML
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioPausa = new Audio("./sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true; // Faz com que a música toque em loop até o tempo acabar

// Evento para alternar a música de foco
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Evento de clique para o botão de "Foco"
focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco"); // Altera o contexto para foco
  focoBt.classList.add("active"); // Adiciona a classe "active" ao botão de foco
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300; // Tempo de 5 minutos
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900; // Tempo de 15 minutos
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

// Função para alterar o contexto da aplicação
function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (botao) {
    botao.classList.remove("active"); // Remove a classe "active" de todos os botões
  });
  html.setAttribute("data-contexto", contexto); // Altera o contexto do HTML
  banner.setAttribute("src", `./imagens/${contexto}.png`); // Altera a imagem do banner conforme o contexto

  // Muda o texto conforme o contexto
  switch (contexto) {
    case "foco":
      titulo.innerHTML = ` 
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case "descanso-curto":
      titulo.innerHTML = ` 
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      break;
    case "descanso-longo":
      titulo.innerHTML = ` 
        Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
      `;
      break;
    default:
      break;
  }
}

// Função para a contagem regressiva
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1; // Decrementa o tempo a cada segundo
  mostrarTempo();
};

// Evento de clique para iniciar ou pausar o temporizador
startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000); // Inicia a contagem regressiva a cada segundo
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", `./imagens/pause.png`);
}

// Função para zerar o temporizador
function zerar() {
  clearInterval(intervaloId); // Limpa o intervalo da contagem regressiva
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarBtIcone.setAttribute("src", `./imagens/play_arrow.png`);
  intervaloId = null;
}

// Função para mostrar o tempo na tela
function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000); // Converte o tempo para date
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`; // Atualiza o tempo na tela
}

mostrarTempo();
