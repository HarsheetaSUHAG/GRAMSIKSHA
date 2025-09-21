document.addEventListener('DOMContentLoaded', () => {
    const wordDisplay = document.getElementById('word-display');
    const messageDisplay = document.getElementById('message');
    const hintImage = document.getElementById('hint-image');
    const keyboard = document.getElementById('keyboard');
    const newGameButton = document.getElementById('new-game-button');
    const hintButton = document.getElementById('hint-button');

    const wordList = [
        { word: "CAT", image: "images/hangman/cat.png" },
        { word: "DOG", image: "images/hangman/dog.png" },
        { word: "SUN", image: "images/hangman/SUN.png" },
        { word: "MOON", image: "images/hangman/MOON.png" },
        { word: "APPLE", image: "images/hangman/APPLE.png" },
        { word: "FARMER", image: "images/hangmanFARMER.png" },
        { word: "COMPUTER", image: "images/hangman/COMPUTER.png" }
    ];

    let selectedWord = '';
    let guessedLetters = new Set();
    let remainingLives = 6;
    let hangmanImages = ["images/hangman/hangman_0.png", "images/hangman/hangman_1.png", "images/hangman/hangman_2.png", "images/hangman/hangman_3.png", "images/hangman/hangman_4.png", "images/hangman/hangman_5.png", "images/hangman/hangman_6.png"];

    // Function to start a new game with the new rules
    function newGame() {
        const selectedObject = wordList[Math.floor(Math.random() * wordList.length)];
        selectedWord = selectedObject.word.toUpperCase();
        hintImage.src = selectedObject.image;
        
        guessedLetters.clear();
        remainingLives = 6;
        
        newGameButton.classList.add('hidden');
        hintButton.disabled = false;
        
        messageDisplay.textContent = 'Guess the word!';
        
        renderWordDisplay();
        renderKeyboard();
    }

    // Function to update the word display
    function renderWordDisplay() {
        const display = selectedWord.split('').map(letter => {
            return guessedLetters.has(letter) ? letter : '_';
        }).join(' ');
        wordDisplay.textContent = display;
    }

    // Function to create and render the on-screen keyboard
    function renderKeyboard() {
        keyboard.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        alphabet.split('').forEach(letter => {
            const keyButton = document.createElement('button');
            keyButton.textContent = letter;
            keyButton.className = 'key';
            keyButton.addEventListener('click', () => handleGuess(letter));
            if (guessedLetters.has(letter)) {
                keyButton.disabled = true;
            }
            keyboard.appendChild(keyButton);
        });
    }

    // Function to disable a key after it's guessed
    function disableKey(letter) {
        const keys = keyboard.querySelectorAll('.key');
        keys.forEach(key => {
            if (key.textContent === letter) {
                key.disabled = true;
            }
        });
    }

    // Main game logic for a guess
    function handleGuess(letter) {
        if (guessedLetters.has(letter)) {
            messageDisplay.textContent = 'You already guessed that letter!';
            return;
        }

        guessedLetters.add(letter);
        disableKey(letter);

        if (selectedWord.includes(letter)) {
            messageDisplay.textContent = 'Correct!';
        } else {
            remainingLives--;
            // The hangman image is no longer used for lives, so we show a message
            messageDisplay.textContent = `Wrong! You have ${remainingLives} lives left.`;
        }

        renderWordDisplay();
        checkGameStatus();
    }

    // Function to check if the game is won or lost
    function checkGameStatus() {
        const currentWord = wordDisplay.textContent.replace(/ /g, '');
        if (currentWord === selectedWord) {
            messageDisplay.textContent = 'You won! 🎉';
            endGame();
        } else if (remainingLives === 0) {
            messageDisplay.textContent = `You lost! The word was "${selectedWord}".`;
            endGame();
        }
    }

    // Function to end the game
    function endGame() {
        keyboard.querySelectorAll('.key').forEach(key => key.disabled = true);
        hintButton.disabled = true;
        newGameButton.classList.remove('hidden');
    }

    // New hint function
    function getHint() {
        if (remainingLives <= 1) {
            messageDisplay.textContent = "You don't have enough lives for a hint!";
            return;
        }

        const unguessedLetters = Array.from(selectedWord).filter(letter => !guessedLetters.has(letter));
        
        if (unguessedLetters.length > 0) {
            const randomHintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
            
            remainingLives--;
            messageDisplay.textContent = `Hint taken! You used 1 life.`;
            
            handleGuess(randomHintLetter);
        } else {
            messageDisplay.textContent = "No more hints available.";
        }
    }

    // Event listeners
    newGameButton.addEventListener('click', newGame);
    hintButton.addEventListener('click', getHint);

    // Initial game start
    newGame();
});