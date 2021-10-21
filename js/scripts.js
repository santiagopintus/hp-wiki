document.addEventListener('DOMContentLoaded', () => {
    main();
});

const characters = [];

/* URL */
allCharactersUrl = "http://hp-api.herokuapp.com/api/characters";

function main() {
    getCharacters();

    listenOrderChange();

    playMusic();
}

function getCharacters() {

    while (characters[0]) {
        characters.pop();
    }

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
    
    container.innerHTML = ''

    for (let character of characters) {

        const characterContainer = document.createElement('div');
        characterContainer.classList.add('character');

        //If there is no info I show "unknown"
        const charName = (character.name) ? character.name : 'Unknown';
        const charImgSrc = (character.image) ? character.image : 'images/unknown.svg';
        const charHouse = (character.house) ? character.house : 'Unknown';
        //Determines the html lass assigned to the character according to the house
        const charClass = (character.house) ? character.house.toLowerCase() : 'no-house';
        characterContainer.classList.add(charClass);

        characterContainer.innerHTML = `<h4>${charName}</h4>
                                        <div class="img-container">
                                            <img src="${charImgSrc}" alt="Image of ${charName}">
                                        </div>
                                        <div class="char-info">
                                            <p><span class="label">House</span>: ${charHouse}</p>
                                            <p><span class="label">Wizard</span>: ${(character.wizard) ? 'Yes' : 'No'}</p>
                                            <p><span class="label">Status</span>: ${(character.alive) ? 'Alive' : 'Deceased'}</p>
                                        </div>`;
        
        container.appendChild(characterContainer);
    }
}

function sortCharacters(i) {

    characters.sort((a, b) => {
        return a[i].localeCompare(b[i]);
    });

    showCharacters();
}

function listenOrderChange() {
    const select1 = document.getElementById('order1');
    const sortButton = document.getElementById('sortButton');
    const resetButton = document.getElementById('resetButton');

    
    sortButton.addEventListener('click', (e) => {
        e.preventDefault();
        sortCharacters(select1.value);
    });

    resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        getCharacters();
    });
}
