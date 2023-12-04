/* 
États de notre Tamastudi possibles :
- 🥚 : partie non lancée
- 🐣 : naissance pendant tant qu'il n'a pas fait son 1er caca
Ensuite il devient un "grand" avec une humeur variable
- 😢 : triste 0/5
- 🙁 : pas content 1/5
- 🙂 : normal 2/5
- 😄 : content 3/5
- 🤗 : heureux 4/5
- 🥰 : très heureux 5/5
- 👻 : mort 0/5 pendant plus d'une minute 
Ses envies :
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé
*/

const myTama = {
    name : "",
    alive : false,
    fed : 0,
    playfull : 0,
    cleaned : 0,
    lifeDuration : 0,
};

/* PHASE 0 : lancer le jeu 
1) clicker sur le bouton du milieu
2) quand on arrive à 5 click alors on fait naitre notre tama
*/
const Start = () => {
    // 1) clicker sur le bouton du milieu
    const buttonCenter = document.querySelector('.js-button[data-direction="center"]');
    // 2) quand on arrive à 5 click alors on fait naitre notre tama
    let count = 0;
    buttonCenter.addEventListener("click", () => {
        count++;
        if (count === 5) {
            birth();
        }
    });
};

/* PHASE 1 : naissance du tama
    1) demander le nom du personnage
    2) fait éclore l'oeuf pour passer au poussin 
    3) afficher les vitals
    4) afficher le nom du personnage dans les vitals
    5) mettre les scores des vitals à 5
 */
const birth = () => {
    // 1) : demander le prénom
    myTama.name = prompt("Quel est le prénom de votre Tamastudi ?");
    // 2) : éclore l'oeuf
    showInScreen("🐣");
    // 3) : afficher les vitals
    const vitals = document.querySelector(".js-vitals");
    vitals.classList.remove("hidden");
    // 4) : afficher le nom du personnage dans les vitals
    const nameDisplay = document.querySelector(".js-name");
    nameDisplay.textContent = myTama.name;
    // 5) mettre les scores des vitals à 5
    const defaultScore = 5;
    const scoresDisplay = document.querySelectorAll(".js-score");
    scoresDisplay.forEach((score) => {
        score.textContent = defaultScore;
    });
    myTama.fed = defaultScore;
    myTama.playfull = defaultScore;
    myTama.cleaned = defaultScore;
    // 6) : faire apparaitre les actions
    const actions = document.querySelector(".js-actions");
    actions.classList.remove("hidden");
    // 7) appel de la fonction pour le faire grandir
    evolve();
    // 9 ) Calcule de la durée de vie
    lifeDuration();
};


/* PHASE 2 : faire grandir le tama 
1) attendre que notre tamastudi ait une première envie
2) il devient un "grand"
*/
const evolve = () => {
    // 1) attendre que notre tamastudi ait une première envie
    const functionToExecute = () => {
    // 2 ) calcule de son humeur
    mood();
    };
    wantsTo(functionToExecute);
};

/*SES ENVIES :
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé 
1) créer une fonction qu'on va pouvoir apeler plus tard dans notre code
2) stocker les envies de mon tama dans une variable
3) avec une settimeout on va faire apparaitre une envie aléatoire
4) la durée du settimeout est dynamique et est comprise entre une valeur max et min
5) on va faire apparaitre l'envie sur l'écran
6) l'envie de faire caca ne peut etre affichée que si le tama a mangé
*/
const wantsTo = (callback) => {
    const needs = ["😋", "🥱", "💩"];
    const minDuration = 1000;
    const maxDuration = 3000;
    const duration = getRandomInt({
        min : minDuration, 
        max : maxDuration});
    setTimeout(() => {
        const randomIndexNeeds = getRandomInt({
            max : needs.length});
        const desire = needs[randomIndexNeeds];
        showInScreen(desire);
        if (callback) {
            callback();
        }
    }, duration);
};

/* HUMEUR GENERAL
Une fonction qui calcule la moyenne des 3 indicateurs (faim, ennui, propreté)
Elle affiche cette moyenne dans les vitals
*/
const mood = () => {
    // Affichage numérique de l'humeur
    const average = Math.round((myTama.fed + myTama.playfull + myTama.cleaned) / 3);
    const scoreDisplay = document.querySelector(".js-mood");
    scoreDisplay.textContent = average;
    // Affichage visuel de l'humeur
    const listOfEmoji = ["😢", "🙁", "🙂", "😄", "🤗", "🥰"];
    showInScreen(listOfEmoji[average]);
};

/* DUREE DE VIE 
Une fonction qui toutes les minutes met à jour la durée de vie du tama
*/
const lifeDuration = () => {
    const displayLifeDuration = document.querySelector(".js-life-duration");
    const duration = 60_000; // 60 secondes
    setInterval(() => {
        myTama.lifeDuration++;;
        displayLifeDuration.textContent = myTama.lifeDuration;
    }, duration);
};


// Fonction qui génère un nombre aléatoire compris entre un min et max
const getRandomInt = (props) => {
    const max = props.max;
    // Ternaire : condition ? si vrai : si faux
    const min = props.min ? props.min : 0;
    return Math.floor(Math.random() * (max - min) + min);
}

// Fonction qui gere l'affichage des emoticone dans l'écran du tama
const character = document.querySelector(".js-character");
const showInScreen = (display) => {
    character.textContent = display;
};

// Lance la fonction de début de mon tama
Start();
