document.addEventListener('DOMContentLoaded', () => {
    main();
})

const characters = [];

/* URLS */
allCharactersUrl = "http://hp-api.herokuapp.com/api/characters";
studentsUrl = "http://hp-api.herokuapp.com/api/characters/students";
staffUrl = "http://hp-api.herokuapp.com/api/characters/staff";
/* Houses URLS*/
griffUrl = "https://hp-api.herokuapp.com/api/characters/house/gryffindor";
slythUrl = "https://hp-api.herokuapp.com/api/characters/house/slytherin";
huffUrl = "https://hp-api.herokuapp.com/api/characters/house/hufflepuff";
ravenUrl = "https://hp-api.herokuapp.com/api/characters/house/ravenclaw";

function main() {
    getCharacters();
}

function getCharacters() {

    let promise = fetch(allCharactersUrl)
        .then(response => response.json())
        .then((charactersResponse) => {
            for (let character of charactersResponse) {
                characters.push(character);
            }
        })
        .catch(error => {
            console.log(error);
        });
    
    promise.then(showCharacters);
}

function showCharacters() {
    const container = document.getElementById('charactersContainer');

    for (let character of characters) {
        console.log(character);
        const characterElement = document.createElement('div');
    }
}