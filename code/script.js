// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOutButton = document.getElementById('filter')
const playAgainButton = document.getElementById('playAgain')
let countAttemptsDisplay = document.getElementById('countAttemptsDisplay')
let countRoundsDisplay = document.getElementById('countRoundsDisplay')
let countWinsDisplay = document.getElementById('countWinsDisplay')

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Bosse',
    img: 'images/bosse.jpg',
    fur: ['brown', 'orange'],
    skin: 'white',
    claws: 'without',
    special: ['stripes']
  },
  {
    name: 'Doris',
    img: 'images/doris.jpg',
    fur: ['grey', 'beige'],
    skin: 'white',
    claws: 'without',
    special: ['stripes', 'bicoloured']
  },
  {
    name: 'Elsa',
    img: 'images/elsa.jpg',
    fur: ['yellow', 'brown'],
    skin: 'brown',
    claws: 'with',
    special: ['spots', 'bicoloured']
  },
  {
    name: 'Findus',
    img: 'images/findus.jpg',
    fur: ['beige', 'white'],
    skin: 'pink',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Frasse',
    img: 'images/frasse.jpg',
    fur: ['blue'],
    skin: 'pink',
    claws: 'with',
    special: ['fuzzy']
  },
  {
    name: 'Harry',
    img: 'images/harry.jpg',
    fur: ['white', 'brown', 'orange', 'beige'],
    skin: 'brown',
    claws: 'without',
    special: ['multicoloured']
  },
  {
    name: 'Iris',
    img: 'images/iris.jpg',
    fur: ['orange'],
    skin: 'orange',
    claws: 'without',
    special: ['stripes']
  },
  {
    name: 'Leo',
    img: 'images/leo.jpg',
    fur: ['grey'],
    skin: 'pink',
    claws: 'without',
    special: []
  },
  {
    name: 'Luna',
    img: 'images/luna.jpg',
    fur: 'white',
    skin: 'pink',
    claws: 'without',
    special: ['fuzzy']
  },
  {
    name: 'Maja',
    img: 'images/maja.jpg',
    fur: ['brown', 'beige'],
    skin: 'pink',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Mollie',
    img: 'images/mollie.jpg',
    fur: ['brown', 'beige'],
    skin: 'beige',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Morris',
    img: 'images/morris.jpg',
    fur: ['beige', 'white'],
    skin: 'brown',
    claws: 'without',
    special: ['bicoloured', 'fuzzy']
  },
  {
    name: 'Nala',
    img: 'images/nala.jpg',
    fur: ['orange', 'white'],
    skin: 'beige',
    claws: 'with',
    special: ['fuzzy']
  },
  {
    name: 'Nisse',
    img: 'images/nisse.jpg',
    fur: ['black'],
    skin: 'grey',
    claws: 'without',
    special: []
  },
  {
    name: 'Sally',
    img: 'images/sally.jpg',
    fur: ['yellow', 'beige'],
    skin: 'brown',
    claws: 'without',
    special: ['stripes', 'bicoloured']
  },
  {
    name: 'Selma',
    img: 'images/selma.jpg',
    fur: ['orange', 'brown'],
    skin: 'pink',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Sigge',
    img: 'images/sigge.jpg',
    fur: ['white', 'blue'],
    skin: 'brown',
    claws: 'with',
    special: ['fuzzy', 'bicoloured']
  },
  {
    name: 'Simba',
    img: 'images/simba.jpg',
    fur: ['beige', 'brown'],
    skin: 'pink',
    claws: 'without',
    special: ['spots', 'bicoloured']
  },
  {
    name: 'Siri',
    img: 'images/siri.jpg',
    fur: ['black', 'grey'],
    skin: 'black',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Sixten',
    img: 'images/sixten.jpg',
    fur: ['black', 'white'],
    skin: 'white',
    claws: 'without',
    special: ['bicoloured']
  },
  {
    name: 'Smulan',
    img: 'images/smulan.jpg',
    fur: ['black', 'grey'],
    skin: 'pink',
    claws: 'without',
    special: ['bicoloured']
  },
  {
    name: 'Sune',
    img: 'images/sune.jpg',
    fur: ['orange', 'brown'],
    skin: 'black',
    claws: 'with',
    special: ['spots', 'bicoloured']
  },
  {
    name: 'Tusse',
    img: 'images/tusse.jpg',
    fur: ['orange'],
    skin: 'brown',
    claws: 'with',
    special: ['hairy']
  },
  {
    name: 'Zelda',
    img: 'images/zelda.jpg',
    fur: ['orange', 'yellow'],
    skin: 'brown',
    claws: 'without',
    special: []
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay
let countAttempts = 0 // variable for attempts counter
let countRounds = 0 // variable for rounds counter
let countWins = 0 // variable for wins counter
let timerInterval // variable for auto closing alerts

// Function for auto closing alerts
const sweetAlert = (newTitle, newHTML) => {
  Swal.fire({
    position: 'top',
    title: newTitle,
    color: '#356879',
    html: newHTML,
    timer: 4000,
    timerProgressBar: true,
    confirmButtonColor: '#356879',
    willClose: () => clearInterval(timerInterval)
  })
}

// Function for shaking alert if ESC is pressed or outside click
const shakingAlert = () => {
  const popup = Swal.getPopup()
  popup.classList.remove('swal2-show')
  setTimeout(() => popup.classList.add('animate__animated', 'animate__headShake'))
  setTimeout(() => popup.classList.remove('animate__animated', 'animate__headShake'), 500)
  return false
}

// Function generating the board with the characters in play
const generateBoard = () => {
  board.innerHTML = ''
  CHARACTERS.forEach((cat) => {
    if (charactersInPlay.includes(cat)) {
      board.innerHTML += `
        <div class="card">
          <p>${cat.name}</p>
          <img class="characters" src=${cat.img} alt=${cat.name}>
          <div class="guess">
            <span>Guess on...</span>
            <button class="filled-button small" onclick="guess('${cat.name}')">${cat.name}</button>
          </div>
        </div>
        `
    } else { // makes a card with logo take the place of a not matching cat card, but only on desktop
      board.innerHTML += `
      <div class="card desktop">
        <img class="characters" src="./assets/cat-logo-large.svg" alt="not this cat">
      </div>
      `
    }
  })
}

// Function to randomly select a cat from the array and set as the value of the variable called secret
const setSecret = () => secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]

// Function to start and restart the game
const start = () => {
  charactersInPlay = CHARACTERS
  generateBoard()
  setSecret()
  countAttempts = 0 // resets the attempts count to 0
  countAttemptsDisplay.innerText = 0
  countRoundsDisplay.innerText = countRounds
  countWinsDisplay.innerText = countWins
  document.getElementById('questions').selectedIndex = 0 // resets the question displayed in dropdown
  selectQuestion()
}

// Function setting the currentQuestion object when you select a question in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label // variable for the category (option group) of the question
  const value = questions.value // variable for the actual value of the question selected
  currentQuestion = {
    category: category,
    value: value
  }
}

// Function to be invoked when clicking on 'Find Out' button
const checkQuestion = () => {
  const { category, value } = currentQuestion
  // Conditionals to compare the currentQuestion details with the secret cat details
  if (category === 'skin' || category === 'claws') {
    if (value === secret.skin || value === secret.claws) {
      filterCharacters(true)
    } else {
      filterCharacters(false)
    }
  } else if (category === 'fur' || category === 'special') {
    if (secret.fur.includes(value) || secret.special.includes(value)) {
      filterCharacters(true)
    } else {
      filterCharacters(false)
    }
  }
}

// Function for filtering the characters array and redraw the board
const filterCharacters = (keep) => {
  countAttempts++ // increments the attempts count
  // Conditional to show an alert if more than 4 attempts
  if (countAttempts > 4) {
    sweetAlert(`Hey, you made enough attempts!`, `It's now time to guess.`)
  } else {
    countAttemptsDisplay.innerText = countAttempts
    const { category, value } = currentQuestion
    // Conditionals to show the right alert for different categories
    if (category === 'fur') {
      if (keep) {
        sweetAlert(`Yes, the secret cat has a ${value} fur!`, `All cats without ${value} fur are now gone.`)
      } else {
        sweetAlert(`No, the secret cat doesn't have a ${value} fur!`, `All cats with ${value} fur are now gone.`)
      }
    } else if (category === 'special') {
      if (keep) {
        sweetAlert(`Yes, the secret cat has a special feature: ${value}!`, `All cats without the feature "${value}" are now gone.`)
      } else {
        sweetAlert(`No, the secret cat doesn't have the special feature: ${value}!`, `All cats with the feature "${value}" are now gone.`)
      }
    } else if (category === 'skin') {
      if (keep) {
        sweetAlert(`Yes, the secret cat has a ${value} skin!`, `All cats without ${value} skin are now gone.`)
      } else {
        sweetAlert(`No, the secret cat doesn't have a ${value} skin!`, `All cats with ${value} skin are now gone.`)
      }
    } else if (category === 'claws') {
      if (keep) {
        sweetAlert(`Yes, the secret cat is ${value} claws!`, `All cats that aren't ${value} claws are now gone.`)
      } else {
        sweetAlert(`No, the secret cat isn't ${value} claws!`, `All cats ${value} claws are now gone.`)
      }
    }

    // Conditionals for filtering by category to keep or remove based on the keep variable
    if (category === 'skin' || category === 'claws') {
      if (value === secret.skin || value === secret.claws) {
        charactersInPlay = charactersInPlay.filter((cat) => cat[category] === value)
      } else {
        charactersInPlay = charactersInPlay.filter((cat) => cat[category] !== value)
      }
    } else if (category === 'fur' || category === 'special') {
      if (secret.fur.includes(value) || secret.special.includes(value)) {
        charactersInPlay = charactersInPlay.filter((cat) => cat[category].includes(value))
      } else {
        charactersInPlay = charactersInPlay.filter((cat) => !cat[category].includes(value))
      }
    }
    generateBoard()
  }
}

// Function for the player to confirm after clicking guess
const guess = (catToConfirm) => {
  // Customised alerts
  if (Swal.fire({
    title: `Do you really want to make a guess on ${catToConfirm}?`,
    text: 'It will end this round.',
    icon: 'warning',
    iconColor: '#356879',
    showCancelButton: true,
    confirmButtonColor: '#356879',
    cancelButtonColor: '#6B96A6',
    confirmButtonText: 'Confirm',
    backdrop: true,
    allowEscapeKey: () => shakingAlert(),
    allowOutsideClick: () => shakingAlert()
  }).then((result) => {
    if (result.isConfirmed) {
      checkMyGuess(catToConfirm)
      countRounds++ // increments the rounds count
      countRoundsDisplay.innerText = countRounds
      countWinsDisplay.innerText = countWins
    }
  }));
}

// Function checking if names are matching, displaying win-lose section with the right message and hide the board
const checkMyGuess = (catToCheck) => {
  if (catToCheck === secret.name) {
    document.getElementById('winOrLoseText').innerHTML = `You won!<br/>As you guessed, ${catToCheck} was the secret cat!`
    document.getElementById('winOrLose').style.display = 'flex'
    board.style.display = 'none'
    document.getElementById('resultAudio').innerHTML = `
    <audio src="./assets/cat-purr.wav" type="audio/wav" autoplay></audio>
    `
    countWins++ // increments the wins count
  } else {
    document.getElementById('winOrLoseText').innerHTML = `You lost!<br/>${catToCheck} wasn't the secret cat, it was ${secret.name}...`
    document.getElementById('winOrLose').style.display = 'flex'
    board.style.display = 'none'
    document.getElementById('resultAudio').innerHTML = `
    <audio src="./assets/cat-meow.wav" type="audio/wav" autoplay></audio>
    `
  }
}

//  Function resetting board and attempts count when user click play again button
const playAgain = () => {
  start()
  document.getElementById('winOrLose').style.display = 'none'
  document.getElementById('resultAudio').innerHTML = ''
  board.style.display = 'flex'
  countAttempts = 0 // resets the attempts count to 0
  countAttemptsDisplay.innerText = countAttempts
}

// Start function invoked when website is loaded
start()

// Alert asking for the name appearing when the page load
Swal.fire({
  position: 'top',
  imageUrl: './assets/cat-logo-small.svg',
  color: '#356879',
  title: `What's your name?`,
  html: `<input type="text" id="playerName" class="swal2-input">`,
  confirmButtonText: 'OK',
  confirmButtonColor: '#356879',
  focusConfirm: false,
  preConfirm: () => {
    const playerName = Swal.getPopup().querySelector('#playerName').value
    if (!playerName) {
      Swal.showValidationMessage(`Please type your name if you want to play.`)
    }
    return { playerName: playerName }
  },
  backdrop: true,
  allowEscapeKey: () => shakingAlert(),
  allowOutsideClick: () => shakingAlert()
}).then((result) => {
  Swal.fire({
    position: 'top',
    icon: "success",
    iconColor: '#356879',
    title: `Welcome ${result.value.playerName}!<br/>Have fun playing Guess Paw!`.trim(),
    color: '#356879',
    confirmButtonText: 'Play',
    confirmButtonColor: '#356879',
  })
  document.getElementById('playerNameInput').innerText = `${result.value.playerName}`
})

// Event listeners
restartButton.addEventListener('click', start)
questions.addEventListener('change', selectQuestion)
findOutButton.addEventListener('click', checkQuestion)
playAgainButton.addEventListener('click', playAgain)
// Should find a way to use .stopPropagation when closing a swal alert since it selects the item behind at the same time