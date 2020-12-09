
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;

    }
}

//Question


let questions = [
    new Question(
        "Qu’est-ce qu’une molécule ?",
        ["Un assemblage d’atomes", "Un assemblage de cellules", "Le plus petit des éléments", "Le noyau de l’atome"],
        "Un assemblage d’atomes",
    ),

    new Question(
        "Le volt est l’unité de",
        ["courant électrique", "tension électrique", "résistance électrique", "capacité d'une batterie"],
        "tension électrique",
    ),

    new Question(
        "A la température de 15 °C, à quelle vitesse atteint-on le mur du son ?",
        ["924 Km/h", "1024 Km/h", "1124 Km/h", "1224 Km/h"],
        "1224 Km/h",
    ),

    new Question(
        "Quel est le nom de l’unité de résistance électrique ?",
        ["Ohm", "Ampère", "Watt", "Volt"],
        "Ohm",
    ),

    new Question(
        "Combien font 122 x 12 ?",
        ["1212", "1464", "1636", "2444"],
        "1464",
    ),

    new Question(
        "Combien de satellites naturels gravitent autour de la Terre ?",
        ["1", "2", "3", "4"],
        "1",
    ),

    new Question(
        "Quelles sont les deux plus grosses planètes du système solaire ?",
        ["Jupiter et Vénus", "Pluton et Uranus", "Mars et Mercure", "Jupiter et Saturne"],
        "Jupiter et Saturne",
    ),
];

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

//regroupe toute les fonctions pour l'affichage

const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },

    endQuiz: function () {
        let endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3>Votre score est de ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("question", endQuizHTML);
        let niveauQuizHTML = `
        Niveau suivant`;
        this.elementShown("niveau",niveauQuizHTML);
        let choix = ` `;
        this.elementShown("choix",choix)
    },
    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function () {
        let choices = quiz.getCurrentQuestion().choices;

        guesshandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quiz.guess(guess);
                quizapp()
            }
        }
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guesshandler("guess" + i, choices[i])
        }
    },
    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown('progress', "question " + currentQuestionNumber + " sur " + quiz.questions.length);
    }
}


//logique du jeu
quizapp = function () {
    if (quiz.hasEnded()) {
        display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }
}


//créer un quiz

let quiz = new Quiz(questions)
quizapp()