const output = document.querySelector('.output')
const btn = document.querySelector('.button')
const addFilmName = document.getElementById('text1');
const addUrl = document.getElementById('text2');
const addBtn = document.querySelector('.add-button');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
  }

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
    return movies ? JSON.parse(movies) : [];
  }

  function saveWatchedMovies(movie){
    let watchedMovies = getWatchedMovies()
    watchedMovies.push(movie)
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
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

  function getNextId() {
    const maxId = allMovies.reduce((max, movie) => Math.max(max, movie.id), 0);
    return maxId + 1;
  }

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
          <h5 class="card-title">${randomMovie.title}</h5>
          <p class="card-text">описание</p>
          <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${randomMovie.id}>Описание</button>
      </div>
        `
        output.innerText = 'Сегодня смотрим этот шедевр:' 
}, 1000)

})

addBtn.addEventListener('click', () => {
    event.preventDefault();
    const name = addFilmName.value
    const url = addUrl.value
    allMovies.push( {id:getNextId(), title: name, img: url})
    addFilmName.value = ''
    addUrl.value = ''
    render()
    saveMoviesToLocalStorage(allMovies);
})



// let allMovies = [
//     {id:1, title: 'Дракула Брэма Стокера', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6QE9dBnvT2N9CjHp2DZOAWKOLWCZMlppgexdIBbvWQ&s"},
//     {id:2, title: 'Город Грехов',  img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6025abef-078b-4385-9cec-8237194ed38e/600x900"},
//     {id:3, title: 'Автостопом по галактике',  img: "https://thumbs.dfs.ivi.ru/storage4/contents/3/a/7da3eac3e71e63c85b578305a86143.jpg"},
//     {id:4, title: 'Завтрак у Тиффани',  img: "https://thumbs.dfs.ivi.ru/storage8/contents/9/1/e225fa76749bff29a36d96e3401296.jpg"},
// ]


const toHtml = movie => `
<div class="card">
        <img
          src="${movie.img}"
          alt="${movie.title}"
        />
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">описание</p>
        <div class="btns">  
          <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${movie.id}>Описание</button>
          <button href="#" class="btn btn-danger" data-btn ="viewed" data-id = ${movie.id}>Просмотрено</button>
          </div>
          </div>
      </div>
`

function render(){
    const html = allMovies.map(movie => toHtml(movie)).reverse().join('')
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
        // onOpen: function () {
        //     console.log('Хук onOpen')
        // },
        // onClose: function() {
        //     console.log('Хук onClose');
        // }
})


document.addEventListener('click',event =>{
    if (event.target.tagName === 'A') {
    return;
  }
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const movie = allMovies.find( f => f.id === id)

    if(btnType === 'description') {
        descriptionModal.setContent(`
            <p> <strong> ${movie.title} </strong> </br> Some description</p>
        `)
        descriptionModal.open()
    }else if(btnType === 'viewed'){
        $.viewed({
            title: 'Добавить в просмотренное?',
            content: `<p> Вы добавляете: <strong> ${movie.title} </strong> в просмотренные </p>`
        }).then( ()=> {
            console.log('Добавлено в просмотренные');
            saveWatchedMovies(movie)
            
           return $.viewed({
              title: 'Удалить?',
              content: `<p> Вы удаляете: <strong> ${movie.title} </strong> из текущего списка</p>`
            })
          }).then( ()=> {
              console.log('Удалено из текущего списка');
              allMovies = allMovies.filter( f => f.id !== id)
              render()
              saveMoviesToLocalStorage(allMovies); 
        }).catch( () => {
            console.log('Cancel');
        })
    }
})