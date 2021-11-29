const cardFront = 'card_front';
const cardBack = 'card_back';
const classCard = 'card';
const classIcon = 'icon';

startGame();

function startGame() {
  initializeCards(game.createCardsFromTech());
};

// Função initializeCards() irá criar e colocar todas as cartas 
// dentro do board_game no HTML.

function initializeCards(cards) {
  const gameBoard = document.getElementById('game_board');

  gameBoard.innerHTML = '';
  
  game.cards.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(classCard);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
};

function createCardContent(card, cardElement) {

  createCardFace(cardFront, card, cardElement);
  createCardFace(cardBack, card, cardElement);

};

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if (face === cardFront) {
    let iconElement = document.createElement('img');

    iconElement.classList.add(classIcon);
    iconElement.src = `./assets/images/${card.icon}.png`;
    cardElementFace.appendChild(iconElement);

  } else {
    cardElementFace.innerHTML = '&lt/&gt';

  }

  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip');

    if(game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if(game.checkGameOver()) {
          const gameOverDisplay = document.getElementById('container');
          gameOverDisplay.style.display = 'block';
        };
      }
      else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
  
          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipedCards();
        }, 1000);
      };
    }
  }
};

function restart() {
  game.clearCards();
  startGame();
  const gameOverDisplay = document.getElementById('container');
  gameOverDisplay.style.display = 'none';
}