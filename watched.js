function getWatchedMovies() {
  const movies = localStorage.getItem("watchedMovies")
  return movies ? JSON.parse(movies) : []
}
let watchedMovies = getWatchedMovies()

function saveWatchedMovies(movie){
  let watchedMovies = getWatchedMovies()
  // watchedMovies.push(movie)
  // getNextId(watchedMovies)
  // watchedMovies.push( {id:getNextId(watchedMovies), title: movie.title, img: movie.img})
  localStorage.setItem('watchedMovies', JSON.stringify(movie));
}

// function removeWatchedMovie(movieId) {
//   let watchedMovies = getWatchedMovies();
//   watchedMovies = watchedMovies.filter(movie => movie.id !== movieId);
//   localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
// }

const toWatchedHtml = (movie) => `
<div class="card">
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

function renderWatchedMovies(movies) {
  const html = movies.map((movie) => toWatchedHtml(movie)).reverse().join("")
  document.querySelector("#watched-films").innerHTML = html
}

document.addEventListener("DOMContentLoaded", () => {
  renderWatchedMovies(watchedMovies)
})

// const descriptionWatchedModal = $.descriptionModal({
//   title: "Описание фильма",
//   closable: true,
//   width: "400px",
//   footerButtons: [
//     {
//       text: "OK",
//       type: "primary", //Класс бутстрапа, потом заменю на свой
//       handler() {
//         console.log("primary btn clicked")
//         descriptionWatchedModal.close()
//       }
//     },
//   ],
// })

// document.addEventListener("click", (event) => {
//   const currentPage = document.querySelector('.page.show').getAttribute('data-page');
//   console.log('Current page:', currentPage);
//   if (event.target.tagName === "A") {
//     return
//   }

//   event.preventDefault()
//   const btnType = event.target.dataset.btn
//   const id = +event.target.dataset.id
//   const movie = watchedMovies.find((f) => f.id === id)

//   if (btnType === "description") {
//     console.log(movie.title);
//     descriptionWatchedModal.setContent(`
//         <p> <strong> ${movie.title} </strong> </br> ${movie.description || ''}</p>
//     `)
//     descriptionWatchedModal.open()
//   }else if(btnType === 'viewed'){
//     $.viewed({
//         title: 'Удалить из просмотренного?',
//         content: `<p> Вы удаляете: <strong> ${movie.title} </strong> из просмотренных </p>`
//     }).then( ()=> {
//       console.log('Удалено из текущего списка');
//       watchedMovies = watchedMovies.filter( f => f.id !== id)
//       renderWatchedMovies(watchedMovies)
//       saveWatchedMovies(watchedMovies )
//       }).catch( () => {
//     console.log('Cancel');
//     })
// }
// })
