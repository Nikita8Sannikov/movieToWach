const output = document.querySelector('.output')
const btn = document.querySelector('.button')
const addFilmName = document.getElementById('text1');
const addUrl = document.getElementById('text2');
const addKINOPOISKUrl = document.getElementById('text3');
const addBtn = document.querySelector('.add-button');
const addKinopoiskBtn = document.querySelector('.add-kinopoisk-button');

//Сама суть рандомайза
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
  }

//Блок Local Storage'а
//--------------------------------------------------------------
  function getMoviesFromLocalStorage() {
    const movies = localStorage.getItem('allMovies');
    return movies ? JSON.parse(movies) : [];
  }

  function saveMoviesToLocalStorage(movies) {
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  let allMovies = getMoviesFromLocalStorage();

  function getWatchedMovies() {
    const movies = localStorage.getItem('watchedMovies');
    console.log('Извлеченные фильмы:', movies);
    return movies ? JSON.parse(movies) : [];
  }

  function saveWatchedMovies(movie){
    let watchedMovies = getWatchedMovies()
    // watchedMovies.push(movie)
    // getNextId(watchedMovies)
    watchedMovies.push( {id:getNextId(watchedMovies), title: movie.title, img: movie.img, shortDescription: movie.shortDescription, description: movie.description, year: movie.year, genres: movie.genres, rating: movie.rating})
    console.log('До добавления:', watchedMovies);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    console.log('После добавления:', watchedMovies);
  }

  // const watchedMovies = getWatchedMovies();
  // window.addEventListener('storage', event => {
  //   console.log(event);
  //   })


  if (allMovies.length === 0) {
    allMovies = [
      { id: 1, title: 'Дракула Брэма Стокера', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6QE9dBnvT2N9CjHp2DZOAWKOLWCZMlppgexdIBbvWQ&s" },
      { id: 2, title: 'Город Грехов', img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6025abef-078b-4385-9cec-8237194ed38e/600x900" },
      { id: 3, title: 'Автостопом по галактике', img: "https://thumbs.dfs.ivi.ru/storage4/contents/3/a/7da3eac3e71e63c85b578305a86143.jpg" },
      { id: 4, title: 'Завтрак у Тиффани', img: "https://thumbs.dfs.ivi.ru/storage8/contents/9/1/e225fa76749bff29a36d96e3401296.jpg" }
    ];
    saveMoviesToLocalStorage(allMovies); 
  }
//----------------------------------------------------

//Формируем уникальный айдишник для новых фильмов
  function getNextId(films) {
    const maxId = films.reduce((max, movie) => Math.max(max, movie.id), 0);
    return maxId + 1;
  }

//Кнопка рандомайза
btn.addEventListener('click', () => {
    output.innerText = 'Выбираю ваш фильм...'
    setTimeout(() =>{
        if(allMovies == undefined || allMovies.length === 0 ){
           alert('Добавьте хотя бы 1 фильм..')
        }
        const randomMovie =  allMovies[randomInteger(0, allMovies.length-1)]
        document.querySelector('#result').innerHTML = `
    <div class="card">
        <img
          src="${randomMovie.img}"
          alt="${randomMovie.title}"
        />
        <div class="card-body">
          <h5 class="card-title">${randomMovie.title} ${(randomMovie.year || '') && `(${randomMovie.year})`}</h5>
          <p class="card-text">${randomMovie.shortDescription ||'Описание'} </br>  <i>${randomMovie.genres||''}</i> </br> <strong>${randomMovie.rating || ''} </strong ></p>
          <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${randomMovie.id}>Описание</button>
      </div>
        `
        output.innerText = 'Сегодня смотрим этот шедевр:' 
}, 1000)
})

//Кнопка добавления фильма по инпутам картинк и названия
addBtn.addEventListener('click', () => {
    event.preventDefault();
    const name = addFilmName.value
    const url = addUrl.value
    allMovies.push( {id:getNextId(allMovies), title: name, img: url})
    // addFilmName.value = ''
    // addUrl.value = ''
    render()
    saveMoviesToLocalStorage(allMovies);
})



// let allMovies = [
//     {id:1, title: 'Дракула Брэма Стокера', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6QE9dBnvT2N9CjHp2DZOAWKOLWCZMlppgexdIBbvWQ&s"},
//     {id:2, title: 'Город Грехов',  img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6025abef-078b-4385-9cec-8237194ed38e/600x900"},
//     {id:3, title: 'Автостопом по галактике',  img: "https://thumbs.dfs.ivi.ru/storage4/contents/3/a/7da3eac3e71e63c85b578305a86143.jpg"},
//     {id:4, title: 'Завтрак у Тиффани',  img: "https://thumbs.dfs.ivi.ru/storage8/contents/9/1/e225fa76749bff29a36d96e3401296.jpg"},
// ]


//Делаем из объекта карточку
const toHtml = movie => `
<div class="card">
        <img
          src="${movie.img}"
          alt="${movie.title}"
        />
        <div class="card-body">
          <h5 class="card-title">${movie.title} ${(movie.year || '') && `(${movie.year})`}
</h5>
          <p class="card-text">${movie.shortDescription ||'Описание по кнопке ниже &#8595'} </br>  <i>${movie.genres||''}</i> </br> <strong>${movie.rating || ''} </strong ></p>
         
          <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${movie.id}>Описание</button>
          <button href="#" class="btn btn-danger" data-btn ="viewed" data-id = ${movie.id}>Просмотрено</button>
          
          </div>
      </div>
`

//Для рендера списка
function render(){
    const html = allMovies.map(movie => toHtml(movie)).reverse().join('')
    document.querySelector('#films').innerHTML = html
    arrangeCards('.card',100)
}

render()


function arrangeCards(className, y=0) {
  const cards = document.querySelectorAll(className);
  const cardsPerRow = 5;
  const cardWidth = 350; // ширина карточки + расстояние между карточками
  const cardHeight = 600; // высота карточки

  console.log('Total cards:', cards.length);

  cards.forEach((card, index) => {
    const rowIndex = Math.floor(index / cardsPerRow);
    const positionInRow = index % cardsPerRow;
    let offsetX, offsetY;

    // Расчет позиции X
    if (positionInRow === 0) {
      offsetX = 0;
    } else if (positionInRow % 2 === 1) {
      offsetX = -Math.ceil(positionInRow / 2) * cardWidth;
    } else {
      offsetX = Math.ceil(positionInRow / 2) * cardWidth;
    }

    // Увеличим коэффициент для более глубокой дуги
    offsetY = rowIndex * (cardHeight + 20) - Math.abs(offsetX) * 0.3;

    console.log(`Card ${index}: rowIndex=${rowIndex}, positionInRow=${positionInRow}, offsetX=${offsetX}, offsetY=${offsetY}`);

    card.style.transform = `translate(${offsetX+800}px, ${offsetY+y}px)`;
  });
}


//Модалка описания фильма
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
        // onOpen: function () {
        //     console.log('Хук onOpen')
        // },
        // onClose: function() {
        //     console.log('Хук onClose');
        // }
})

//Порядок появления и закрытия модалок
document.addEventListener('click',event =>{
  const currentPage = document.querySelector('.page.show').getAttribute('data-page');
            console.log('Current page:', currentPage);


    if (event.target.tagName === 'A') {
    return
  }else if(currentPage === 'titles'){
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const movie = allMovies.find( f => f.id === id)

    if(btnType === 'description') {
        descriptionModal.setContent(`
            <p> <strong> ${movie.title} </strong> </br> ${movie.description || ''}</p>
        `)
        descriptionModal.open()
    }else if(btnType === 'viewed'){
        $.viewed({
            title: 'Добавить в просмотренное?',
            content: `<p> Вы добавляете: <strong> ${movie.title} </strong> в просмотренные </p>`
        }).then( ()=> {
            console.log('Добавлено в просмотренные');
            saveWatchedMovies(movie)
            renderWatchedPageMovies(watchedPageMovies)
            
           return $.viewed({
              title: 'Удалить?',
              content: `<p> Вы удаляете: <strong> ${movie.title} </strong> из текущего списка</p>`
            })
          .then( ()=> {
              console.log('Удалено из текущего списка');
              allMovies = allMovies.filter( f => f.id !== id)
              render()
              saveMoviesToLocalStorage(allMovies); 
        }).catch( () => {
          console.log('Cancel');
        })
        }).catch( () => {
          return $.viewed({
            title: 'Удалить?',
            content: `<p> Вы удаляете: <strong> ${movie.title} </strong> из текущего списка</p>`
          }).then( ()=> {
            console.log('Удалено из текущего списка');
            allMovies = allMovies.filter( f => f.id !== id)
            render()
            saveMoviesToLocalStorage(allMovies); 
            renderFilmList(filter( search.value,getMoviesFromLocalStorage()),result)
      }).catch(() => {
        console.log('Cancel');
      })
        })
    }
  }  else if (currentPage === 'watchedTitles'){
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const movie = watchedPageMovies.find((f) => f.id === id)
  
    if (btnType === "description") {
      console.log(movie.title);
      descriptionModal.setContent(`
          <p> <strong> ${movie.title} </strong> </br> ${movie.description || ''}</p>
      `)
      descriptionModal.open()
    }else if(btnType === 'viewed'){
      $.viewed({
          title: 'Удалить из просмотренного?',
          content: `<p> Вы удаляете: <strong> ${movie.title} </strong> из просмотренных </p>`
      }).then( ()=> {
        console.log('Удалено из текущего списка');
        watchedPageMovies = watchedPageMovies.filter( f => f.id !== id)
        renderWatchedPageMovies(watchedPageMovies)
        saveWatchedPageMovies(watchedPageMovies )
        }).catch( () => {
      console.log('Cancel');
      })
  }
  }

  
})

//Поиск по фильмам
const search = document.querySelector('.search')
const searchBtn = document.querySelector('.submit')
const result = document.getElementById('filter-results')

function filter(val,filmList){
  if (!val) return [];
  return filmList.filter(el => el.title.toLowerCase().substring(0, val.length) === val.toLowerCase())
}

function renderFilmList(list=[], $el){
	$el.innerHTML='';
  list.forEach(movie=>{
    let new_$el = document.createElement('div')
    new_$el.classList.add('card');
    new_$el.innerHTML=`
        <img
          src="${movie.img}"
          alt="${movie.title}"
        />
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.shortDescription || 'Описание'} ${movie.year || ''} ${movie.genres} ${movie.rating} </p>
          <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${movie.id}>Описание</button>
          <button href="#" class="btn btn-danger" data-btn ="viewed" data-id = ${movie.id}>Просмотрено</button>
        `
    $el.appendChild(new_$el)
  })
 
}
search.addEventListener('input',event=>renderFilmList(filter(event.target.value,getMoviesFromLocalStorage()),result))

//Блок добавления фильма по ссылке с кинопоиска
addKinopoiskBtn.addEventListener('click', () => {
  event.preventDefault()

  // URL API для поиска фильма 
const apiUrl = 'https://api.kinopoisk.dev/v1.4/movie';

// API ключ
const apiKey = '1QSQYSZ-PNCMBA2-JX6Q2NJ-24SE8J7';

const options = {
  method: 'GET', 
  headers: {
   'X-API-KEY': '1QSQYSZ-PNCMBA2-JX6Q2NJ-24SE8J7',
  }
};


// const movieId = '666'; 
const KINOPOISK_id = addKINOPOISKUrl.value.split('/').splice(-2, 1)
const urlWithParams = `${apiUrl}/${KINOPOISK_id}`;

if(addKINOPOISKUrl.value){
fetch(urlWithParams, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
    console.log(data); 
    // console.log(data.name); 
    // console.log(data.shortDescription); 
    // console.log(data.description); 
    // console.log(data.year); 
    // console.log(data.poster.previewUrl); 
    // console.log(data.genres.map(genre => genre.name).join(', ')); 
    // console.log(data.rating.kp); 

    allMovies.push( {id:getNextId(allMovies), title: data.name, img: data.poster.previewUrl, shortDescription: data.shortDescription, description: data.description, year: data.year, genres: data.genres.map(genre => genre.name).join(', '), rating: data.rating.kp.toFixed(2)})
    render()
    saveMoviesToLocalStorage(allMovies);
  })
  .catch(error => {
    console.error('Ошибка запроса:', error); 
  });

  addKINOPOISKUrl.value = ''
}
})

addMoreBtn = document.querySelector('.add-more')
addFilmOptions = document.querySelector('.addFilmOptions')

addMoreBtn.addEventListener('click', () =>{
  addFilmOptions.classList.toggle('show');
})


//nav toggle
function showPage(pageId){
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('show'));


  const selectedPage = document.getElementById(pageId);
  selectedPage.classList.add('show');
  window.scrollTo({ top: 0, behavior: 'instant' });
}




//watched Section
function getWatchedPageMovies() {
  const movies = localStorage.getItem("watchedMovies")
  return movies ? JSON.parse(movies) : []
}
let watchedPageMovies = getWatchedPageMovies()

function saveWatchedPageMovies(movie){
  let watchedPageMovies = getWatchedPageMovies()
  // watchedMovies.push(movie)
  // getNextId(watchedMovies)
  // watchedMovies.push( {id:getNextId(watchedMovies), title: movie.title, img: movie.img})
  localStorage.setItem('watchedMovies', JSON.stringify(movie));
}

function removeWatchedPageMovie(movieId) {
  let watchedPageMovies = getWatchedPageMovies();
  watchedPageMovies = watchedPageMovies.filter(movie => movie.id !== movieId);
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}

const toWatchedHtml = (movie) => `
<div class="watchedCard">
    <img
        src="${movie.img}"
        alt="${movie.title}"
    />
    <div class="card-body">
        <h5 class="card-title">${movie.title} ${(movie.year || '') && `(${movie.year})`}</h5>
        <p class="card-text">${movie.shortDescription ||'Описание'} </br>  <i>${movie.genres||''}</i> </br> <strong>${movie.rating || ''} </strong ></p>
        <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${movie.id}>Описание</button>
        <button href="#" class="btn btn-danger" data-btn ="viewed" data-id = ${movie.id}>Удалить</button>
    </div>
</div>
`

function renderWatchedPageMovies(movies) {
  const html = movies.map((movie) => toWatchedHtml(movie)).reverse().join("")
  document.querySelector("#watched-films").innerHTML = html
  arrangeCards('.watchedCard', 200)
}

document.addEventListener("DOMContentLoaded", () => {
  renderWatchedPageMovies(watchedPageMovies)
})