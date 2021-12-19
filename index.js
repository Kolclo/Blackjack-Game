let player = {
    name: "",
    chips: 200
}

let cards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let nameEl = document.getElementById("name")
let rulesEl = document.getElementById("rules")
let gameEl = document.getElementById("game")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function displayName() {
    playerEl.textContent = player.name + ": £" + player.chips
}

function setName() {
    var inputEl = player.name = document.getElementById("input").value
    displayName()

    nameEl.classList.add("hidden")
    rulesEl.classList.add("hidden")
    gameEl.classList.remove("hidden")
}

function startGame() {
    if (player.chips > 9) {
        isAlive = true
        hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        let dealerFirstCard = getRandomCard()
        let dealerSecondCard = getRandomCard()
        dealerCards = [dealerFirstCard, dealerSecondCard]
        dealerSum = dealerFirstCard + dealerSecondCard
        player.chips -= 10
        displayName()
        renderGame()
    } else if (player.chips < 10) {
        message = "You don't have enough money!"
        messageEl.textContent = message
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 30
        displayName()
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        let dealerCard = getRandomCard()
        sum += card
        dealerSum += dealerCard
        console.log(dealerSum)
        cards.push(card)
        renderGame()
    }
}

function checkDealer() {
    if (isAlive === true && hasBlackJack === false) {
        if (sum > dealerSum) {
            message = `You've got Blackjack! Dealer had: ${dealerSum}`
            hasBlackJack = true
            player.chips += 30
            displayName()
        } else if (sum === dealerSum) {
            message = `It's a draw. Dealer had: ${dealerSum}`
            hasBlackJack = false
            isAlive = false
        } else if (sum < dealerSum && dealerSum < 22) {
            message = `You're out the game! Dealer had: ${dealerSum}`
            isAlive = false
        } else if (sum < dealerSum && dealerSum > 21) {
            message = `You've got Blackjack! Dealer had: ${dealerSum}`
            hasBlackJack = true
            player.chips += 30
            displayName()
        }
        messageEl.textContent = message
    }
}