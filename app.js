const films = document.querySelectorAll('.card')
const output = document.querySelector('.output')
const btn = document.querySelector('.button')
const outputImage = document.querySelector('.output-image');
const addFilmName = document.getElementById('text1');
const addUrl = document.getElementById('text2');
const addBtn = document.querySelector('.add-button');
const filmContainer = document.querySelector('.film-container');


function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
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

let allMovies = [
    {id:1, title: 'Дракула Брэма Стокера', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6QE9dBnvT2N9CjHp2DZOAWKOLWCZMlppgexdIBbvWQ&s"},
    {id:2, title: 'Город Грехов',  img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6025abef-078b-4385-9cec-8237194ed38e/600x900"},
    {id:3, title: 'Автостопом по галактике',  img: "https://thumbs.dfs.ivi.ru/storage4/contents/3/a/7da3eac3e71e63c85b578305a86143.jpg"},
    {id:4, title: 'Завтрак у Тиффани',  img: "https://thumbs.dfs.ivi.ru/storage8/contents/9/1/e225fa76749bff29a36d96e3401296.jpg"},
]


const toHtml = movie => `
<div class="card">
        <img
          src="${movie.img}"
          alt="${movie.title}"
        />
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">описание</p>
          <a href="#" class="btn btn-primary" data-btn ="description" data-id = ${movie.id}>Описание</a>
          <a href="#" class="btn btn-danger">Просмотрено</a>
        </div>
      </div>
`

function render(){
    const html = allMovies.map(movie => toHtml(movie)).join('')
    document.querySelector('#films').innerHTML = html
}

render()

const descriptionModal = $.descriptionModal ({
        title: 'Описание фильма',
        closable: true,
        // content: `
        // <p>Lorem ipsum dolor sit.</p>
        // `,
        width: '400px',
        footerButtons: [
            {text:'OK', 
            type: 'primary', //Класс бутстрапа, потом заменю на свой
            handler() {
                console.log('primary btn clicked');
                descriptionModal.close()
            }},
            // {text:'Cancel', 
            // type: 'danger', //Класс бутстрапа, потом заменю на свой
            // handler() {
            //     console.log('danger btn clicked');
            //     descriptionModal.close()
            // }},
        ],
        onOpen: function () {
            console.log('Хук onOpen')
        },
        onClose: function() {
            console.log('Хук onClose');
        }
})

document.addEventListener('click',event =>{
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    

    if(btnType === 'description') {
        const movie = allMovies.find( f => f.id === id)
        descriptionModal.setContent(`
            <p> <strong> ${movie.title} </strong> </br> Some description</p>
        `)
        descriptionModal.open()
        
    }
})