// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';

// Get an array from letters
const letterArray = Array.from(letters)

// select letter container
const lettersContainer = document.querySelector('.letters')

// Generate letters
letterArray.forEach(letter => {
    // create span 
    let span = document.createElement('span');
    // create the text
    let theLetter = document.createTextNode(letter);
    // appended Letter to span
    span.appendChild(theLetter);
    // Add class on span
    span.className = 'letter-box'
    // appened the span to the container
    lettersContainer.appendChild(span);
})

// Get random Property

const words = {
    Programming: ['HTML', 'CSS', 'JavaScript', 'Python', 'go'],   // Programming is a property name
    sports: ['Football', 'Basketball', 'swimming', 'tenise'],
    movies: ['Inception', 'Scar face', 'the god father'],
    conturies: ['EGY', 'QR', 'KSA', 'US', 'UK']
};

let allKeys = Object.keys(words);   //Object.keys() is a method that returns an array of all the keys (property names) of an object. 

let randomPropNum = Math.floor(Math.random() * allKeys.length);  //The Math.floor() method is then called to round down the result to the nearest integer.
let randomPropName = allKeys[randomPropNum];
let randomPropValue = words[randomPropName];

let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNum]

// set the cantogery
document.querySelector('.game-info .category span').innerHTML = randomPropName;

/*This code uses the document.querySelector() method to select an HTML element with the class name game-info and a child element with the class name category and the tag name span.
 This element is then modified by setting its innerHTML property to the value of the randomPropName variable.
 innerHTML is a property of an HTML element that allows you to set or get the HTML content inside the element, including any HTML tags.*/

// Select the guess container
let guess = document.querySelector('.letters-guess');
// Convert to an array
let randomValueArray = Array.from(randomValue);

// create the forEach loop to loop in each letter
randomValueArray.forEach(letter => {
    // identify the span that we will create
    let guessSpan = document.createElement('span');
    // create a condition to add calss for spaces
    if (letter === ' ') {
        guessSpan.className = 'with-space'
    }
    // append the guess span to the container
    guess.appendChild(guessSpan)
});
// set the status

// set the wrong attemps
let wrongAttempts = 0;
// selcet the draw
let theDraw = document.querySelector('.hangman-draw');

// add the guess span
let guessSpans = document.querySelectorAll('.letters-guess span')
// add event for letters
document.addEventListener('click', (e) => {
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        // add class to clicked letter
        e.target.classList.add('clicked')
        // Get clicked letter
        const theClikcedLetter = e.target.innerHTML.toLowerCase();  // innerHTML is a property of the element that returns the HTML content inside the element as a string.
        // the chosen word
        let theChosenWord = Array.from(randomValue.toLowerCase());
        //loop in the chosen word
        theChosenWord.forEach((wordLetter, wordIndex) => {

            if (theClikcedLetter === wordLetter) {

                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (spanIndex === wordIndex) {
                        span.innerHTML = wordLetter;
                    }
                })

            }
        });
        // Check if all letters have been guessed correctly
        let allLettersGuessed = true;
        guessSpans.forEach((span) => {
            if (span.innerHTML === '') {
                allLettersGuessed = false;
            }
        });

        if (allLettersGuessed) {
            hasWon();
            lettersContainer.classList.add('Finished');
        } else {
            if (theStatus !== true) {
                wrongAttempts++;
                theDraw.classList.add(`wrong-${wrongAttempts}`);
                document.getElementById('fail').play();
                if (wrongAttempts === 8) {
                    endGame();
                    lettersContainer.classList.add('Finished');
                }
            } else {
                document.getElementById('success').play();
            }
        }
    }
});



function endGame() {

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValue}`);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append To The Body
    document.body.appendChild(div);

}

function hasWon() {
    let div = document.createElement('div')

    let winnerText = document.createTextNode(`Congrats you won the game and you did ${wrongAttempts} wrong attempts.`)

    div.appendChild(winnerText);
    div.className = 'popup';
    document.body.appendChild(div);
}