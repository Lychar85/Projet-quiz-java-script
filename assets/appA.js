
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
        "En quelle année fut lancée la sonde Voyager 1 ?",
        ["1975", "1977", "1979", "1981"],
        "1977",
    ),

    new Question(
        "Que représente une unité astronomique (UA) ?",
        ["La distance entre le Soleil et l’étoile la plus proche de celui-ci", "La distance Soleil-Pluton", "La distance Terre-Soleil", "La distance Terre-Mars"],
        "La distance Terre-Soleil",
    ),

    new Question(
        "Quelle est la galaxie la plus proche de la nôtre ?",
        ["Sagittaire", "Andromède", "Phœnix", "Vierge"],
        "Andromède",
    ),

    new Question(
        "Comment appelle t-on les voyageurs spatiaux européens ?",
        ["Les astronautes", "Les spationautes", "Les cosmonautes", "Les taïkonautes"],
        "Les cosmonautes",
    ),

    new Question(
        "Combien parcoure-t-on de km en 1 seconde à la vitesse de la lumière ?",
        ["3000 km/sec", "30 000 km/sec", "300 000 km/sec", "3 000 000 km/sec"],
        "300 000 km/sec",
    ),

    new Question(
        "Comment se nomme notre Galaxie ?",
        ["Andromède", "Orion", "La Voie Lactée", "Vénus"],
        "La Voie Lactée",
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







