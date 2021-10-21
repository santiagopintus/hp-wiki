document.addEventListener('DOMContentLoaded', () => {
    main();
});
//URL
const allCharactersUrl = "http://hp-api.herokuapp.com/api/characters"
const pictures = [];

function main() {
    getPictures();
}

function getPictures() {

    //To ensure that pictures array is empty
    while (pictures[0]) {
        pictures.pop();
    }

    let promise = fetch(allCharactersUrl)
        .then(response => response.json())
        .then((charactersResponse) => {
            for (let character of charactersResponse) {
                pictures.push(character.image);
            }
        })
        .catch(error => {
            console.log(error);
        });
    
    promise.then(showPictures);
};

function showPictures() {
    const container = document.getElementById('picturesContainer');
    
    container.innerHTML = ''

    for (let pictureSrc of pictures) {
        if (pictureSrc !== '') {
            const pictureContainer = document.createElement('div');
            const pic = document.createElement('img');
            pic.setAttribute('src', pictureSrc);
            pictureContainer.appendChild(pic);
            container.appendChild(pictureContainer);
        }
    };
}
