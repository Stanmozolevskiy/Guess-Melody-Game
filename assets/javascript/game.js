const app = [
    music = {
        singer: "madona",
        imageSrc: "",
        audio: "assets/music/madonna.m4a",
        image: "assets/images/madona.jpg",
        year: ""
    },
    music = {
        singer: "acdc",
        imageSrc: "",
        audio: "assets/music/acdc.m4a",
        image: "assets/images/acdc.jpg",
        year: ""
    },
    music = {
        singer: "nirvana",
        imageSrc: "",
        audio: "assets/music/nirvana.m4a",
        image: "assets/images/nirvana.jpg",
        year: ""
    },
    music = {
        singer: "drake",
        imageSrc: "",
        audio: "assets/music/drake.m4a",
        image: "assets/images/drake.jpg",
        year: ""
    },
    music = {
        singer: "beatles",
        imageSrc: "",
        audio: "assets/music/beatles.m4a",
        image: "assets/images/Beatles.jpg",
        year: ""
    },
    music = {
        singer: "emenem",
        imageSrc: "",
        audio: "assets/music/emenem.m4a",
        image: "assets/images/emenem.jpg",
        year: ""
    },
    music = {
        singer: "snoopdog",
        imageSrc: "",
        audio: "assets/music/snoop.m4a",
        image: "assets/images/snoop.jif",
        year: ""
    }
]

console.log(app)
// make variables for our wins losses = set to 0.
var wins = 0;
var losses = 0;
let lives;

// var vor wrong guessed letters to display it, underscores
let wrongGuess;
let underScores;

// fired when the entire page loads
window.onload = function () {

    function newGame() {

        // Set new game's stats
        random = app[Math.floor(Math.random() * app.length)];
        lives = 5;
        wrongGuess = [];
        underScores = [];
        // Generating the secretWord from array.
        secretWord = random.singer

        //pushing underscores.
        for (i = 0; i < secretWord.length; i++) {
            //   handling the spaces in the word
            if (secretWord[i] === ' ') {
                underScores.push(' ')
            }
            else {
                underScores.push("_");
            }
        }
        // updating UI and Make the music play
        document.getElementById("underScores").innerHTML = underScores.join(" ");
        document.getElementById("livesLeft").innerHTML = "Attempts: " + lives;
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        document.getElementById("losses").innerHTML = "Losses: " + losses;

        // Play the song.
        let audioUi = document.getElementById("audio-ui");
        audioUi.src = random.audio
        // Show the image
        document.getElementById("singer-image").src = random.image

        document.onkeyup = function (event) {
            // make sure key is a letter by setting key index
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                // put the pressed key into letterGuess
                var letterGuess = String.fromCharCode(event.keyCode).toLowerCase();
                // send the letter to the compare loop
                compare(letterGuess);
            }
        }
    }

    function compare(letter) {
        if (wrongGuess.indexOf(letter) > -1) {
            return;
        }
        // check for matching letter 
        var guessedLetter = false;

        for (var i = 0; i < secretWord.length; i++) {
            if (secretWord[i] == letter) {
                guessedLetter = true;
                underScores[i] = letter;
            }
        }
        // location of the letter
        if (!guessedLetter) {
            wrongGuess.push(letter);
            lives--;
        }
        count();
    }
    // this function does count wins and losses
    function count() {

        document.getElementById("livesLeft").innerHTML = "Attempts: " + " " + lives;
        document.getElementById("underScores").innerHTML = underScores.join(" ");
        document.getElementById("wrongGuess").innerHTML = "Guessed Wrong: " + " " + wrongGuess.join(" ");
        

        if (secretWord == underScores.join("")) {
            
            wins++;
            // alert("Good job it is" + " " + secretWord);
            document.getElementById("wins").innerHTML = "wins: " + " " + wins;

            newGame();
        } else if (lives < 1) {
            losses++;
            // alert("You need to try again");
            document.getElementById("losses").innerHTML = "losses: " + " " + losses;

            newGame();
        }

    }
    newGame();

}
