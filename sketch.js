let pombo;
let convite;
let temConvite = false;
let entregues = 0;
let jogoEncerrado = false;
let estadoJogo = 'inicio'; // 'inicio', 'jogando', 'fim'

function setup() {
  createCanvas(800, 400);
  pombo = createVector(width / 2, height / 2);
  gerarConvite();
}

function draw() {
  background(135, 206, 235); // Céu

  if (estadoJogo === 'inicio') {
    telaInicial();
  } else if (estadoJogo === 'jogando') {
    // Campo
    fill(34, 139, 34);
    rect(0, 0, width / 2, height);
    fill(255);
    textSize(16);
    text("Campo", 50, 30);

    // Cidade
    fill(169, 169, 169);
    rect(width / 2, 0, width / 2, height);
    fill(0);
    text("Cidade", width - 100, 30);

    // Mostrar convite se ainda não foi coletado
    if (!temConvite && convite && !jogoEncerrado) {
      fill(255, 215, 0);
      rect(convite.x, convite.y, 15, 10);
    }

    // Pombo
    fill(200);
    ellipse(pombo.x, pombo.y, 30, 30);
    fill(0);
    triangle(pombo.x + 15, pombo.y, pombo.x + 25, pombo.y - 5, pombo.x + 25, pombo.y + 5); // bico

    if (!jogoEncerrado) {
      moverPombo();

      // Coletar convite
      if (!temConvite && convite && dist(pombo.x, pombo.y, convite.x + 7, convite.y + 5) < 20) {
        temConvite = true;
        convite = null;
      }

      // Entregar convite
      if (temConvite && pombo.x > width / 2 + 20) {
        temConvite = false;
        entregues++;

        if (entregues < 10) {
          gerarConvite();
        } else {
          jogoEncerrado = true;
          estadoJogo = 'fim';
        }
      }
    }

    // Festa (representada por círculos coloridos)
    for (let i = 0; i < entregues; i++) {
      fill(random(255), random(255), random(255));
      ellipse(width - 50 - i * 20, 100, 20);
    }

    // Informações
    fill(0);
    textSize(16);
    text("mercadorias entregues: " + entregues, 20, height - 20);

  } else if (estadoJogo === 'fim') {
    telaFinal();
  }
}

function telaInicial() {
  background(0, 50, 100); // Fundo escuro para a tela de instruções
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("Pombo Correio", width / 2, height / 4);

  textSize(18);
  text("Objetivo: Entregue 10 mercadorias para a festa", width / 2, height / 2.5);
  text("Controles: Use as SETAS do teclado ou W, A, S, D para mover o pombo.", width / 2, height / 2.5 + 30);
  text("Pegue o convite (retângulo amarelo) no Campo (verde)", width / 2, height / 2.5 + 60);
  text("e leve-o para a Cidade (cinza) para entregá-lo.", width / 2, height / 2.5 + 80);

  textSize(24);
  text("Pressione qualquer tecla para começar!", width / 2, height * 0.8);
}

function telaFinal() {
  background(0, 150, 0); // Fundo verde para a tela final
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("A festa começou, vamos aproveitar a mercadoria que o agricultor mandou para nós, obrigado", width / 2, height / 2);
}

function keyPressed() {
  if (estadoJogo === 'inicio') {
    estadoJogo = 'jogando'; // Começa o jogo ao pressionar qualquer tecla
  }
}

function moverPombo() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) pombo.x -= 2;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) pombo.x += 2;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) pombo.y -= 2;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) pombo.y += 2;

  pombo.x = constrain(pombo.x, 0, width);
  pombo.y = constrain(pombo.y, 0, height);
}

function gerarConvite() {
  convite = createVector(random(50, width / 2 - 50), random(50, height - 50));
}