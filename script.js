const icons = ["❤️", "⭐", "☀️", "🌙", "☁️", "🌸"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCards() {
    cards = [...icons, ...icons]
        .map((icon) => ({ icon, id: Math.random() }))
        .sort(() => Math.random() - 0.5);
}

function displayCards() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.index = index;
        cardElement.onclick = handleCardClick;
        board.appendChild(cardElement);
    });
}

function handleCardClick(event) {
    if (lockBoard) return;
    const cardElement = event.target;
    const index = cardElement.dataset.index;
    const card = cards[index];

    if (cardElement.classList.contains("matched") || cardElement.innerText !== "") return;

    cardElement.innerText = card.icon;

    if (!firstCard) {
        firstCard = { card, cardElement };
    } else {
        secondCard = { card, cardElement };
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;
    if (firstCard.card.icon === secondCard.card.icon) {
        firstCard.cardElement.classList.add("matched");
        secondCard.cardElement.classList.add("matched");
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.cardElement.innerText = "";
            secondCard.cardElement.innerText = "";
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Initialize game
createCards();
displayCards();
