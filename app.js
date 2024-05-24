const films = document.querySelectorAll('.card')
const output = document.querySelector('.output')
const btn = document.querySelector('.button')
const outputImage = document.querySelector('.output-image');
const addFilmName = document.getElementById('text1');
const addUrl = document.getElementById('text2');
const addBtn = document.querySelector('.add-button');
const filmContainer = document.querySelector('.film-container');




// films.forEach((film, index) => {
//     console.log('фильм:', film.innerText, index);
// });

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    // index = Math.floor(rand);
    // res = films[index].innerText
    // return output.innerText = res
    return Math.floor(rand)
  }

btn.addEventListener('click', () => {
    output.innerText = 'Выбираю ваш фильм...'
    setTimeout(() =>{
        const films = document.querySelectorAll('.card'); 
        const randomNumber =  randomInteger(0, films.length-1)
        console.log(films.length);
        const selectedFilmHTML = films[randomNumber];
        const filmName = selectedFilmHTML.querySelector('.card-title').innerText;
        const filmImageSrc = selectedFilmHTML .querySelector('img').src;
        output.innerText = filmName;
        outputImage.innerHTML = `<img src="${filmImageSrc}" alt="${filmName}" />`;  
}, 500)
})

addBtn.addEventListener('click', () => {
    event.preventDefault();
    const name = addFilmName.value
    const url = addUrl.value
    createSlide(name, url)
    console.log(name, url);
})

function createSlide(filmName, url){
    const newFilm = document.createElement('div')
    newFilm.classList.add('film')
    // filmContainer.appendChild(newFilm)

    const img = document.createElement('img')
    img.src = url
    img.alt = filmName
    newFilm.appendChild(img)

    const name = document.createElement('div')
    name.classList.add('card-title')
    name.innerText = filmName
    newFilm.appendChild(name)

    if ( filmContainer.firstChild) {
        filmContainer.insertBefore(newFilm, filmContainer.firstChild)
    }else {
        filmContainer.appendChild(newFilm)
    }

}

