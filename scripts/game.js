const game = {
  /*

    VARIÁVEIS
  
  */

  lockMode: false,
  firstCard: null,
  secondCard: null,

  techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
  ],

  cards: null,

  /*
  
    CRIA AS CARTAS DO TABULEIRO

  */

  createCardsFromTech: function () {
    // Array que irá armazenar todos os cards.
    this.cards = [];

    // For que irá percorrer cada elemento das techs passadas.
    this.techs.forEach((tech) => {
      this.cards.push(this.createPairWithTech(tech));
    });

    // flatMap() é uma função de array que irá juntar 
    // em um único array uma coleção de vários arrays.
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();

    return this.cards;
  },

  // Função que cria um par com sua técnologia.

  createPairWithTech: function (tech) {
    // Retorna um objeto com cada par de carta e técnologia.

    return [{
      id: this.createId(tech),
      icon: tech,
      flipped: false
    }, {
      id: this.createId(tech),
      icon: tech,
      flipped: false
    }];
  },

  createId: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  // Função suffleCards() irá embaralhar os cards.
  // Enquanto o index atual for diferente de 0
  // arredonde para baixo um número aleatório entre 0 e o tamanho do array de techs.

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Forma de trocar valores de variáveis no javascript
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    };
  },

  /*
    
      LÓGICA DE CHECAR AS CARTAS DO JOGO
    
    */

  setCard: function (id) {
    // Pega apenas a carta que foi clicada.
    // Checando se o card.id é igual ao id passado como parâmetro para função.
    // Essa função irá setar a carta que foi clicada nas variáveis firstCard e secondCard.

    // Essa variável seta a carta.
    let card = this.cards.filter(card => card.id === id)[0];

    console.log(card);

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null
    this.secondCard = null
    this.lockMode = false
  },

  unflipedCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function() {
    // Retorne apenas as cartas que não foram flipadas. 

    return this.cards.filter(card => !card.flipped).length == 0;
  },
};