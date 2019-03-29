
const app = [
    music = {
        singer: "madona",
        imageSrc: "",
        audio: "assets/music/madonna.m4a",
        year: ""
    },
    music = {
        singer: "acdc",
        imageSrc: "",
        audio: "assets/music/acdc.m4a",
        year: ""
    },
    music = {
        singer: "nirvana",
        imageSrc: "",
        audio: "assets/music/nirvana.m4a",
        year: ""
    },
    music = {
        singer: "drake",
        imageSrc: "",
        audio: "assets/music/drake.m4a",
        year: ""
    }
]

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
        lives = 12;
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

        const audio = new Audio(random.audio);
        //  Call back function for audio file to render before it will start playing
        function songCallback() {
            return audio.play()
        }
        function playSong(song, callback) {
            setTimeout(() => {
                song = new Audio(song);
                callback()
            }, 1000);
        }
        playSong(random.audio, songCallback)

        document.onkeyup = function (event) {
            // make sure key is a letter by setting key index
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                // put the pressed key into letterGuess
                var letterGuess = String.fromCharCode(event.keyCode).toLowerCase();
                // send the letter to the compare loop
                compare(letterGuess, audio);
            }
        }
    }
    
    function compare(letter, audio) {
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
        count(audio);
    }  
    // this function does count wins and losses
    function count(audio) {
              
        document.getElementById("livesLeft").innerHTML = "Attempts: " + " " + lives;
        document.getElementById("underScores").innerHTML = underScores.join(" ");
        document.getElementById("wrongGuess").innerHTML = "Guessed Wrong: " + " " + wrongGuess.join(" ");

        if (secretWord == underScores.join("")) {
            audio.pause()
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
