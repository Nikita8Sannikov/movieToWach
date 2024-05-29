function getWatchedMovies() {
  const movies = localStorage.getItem("watchedMovies")
  return movies ? JSON.parse(movies) : []
}
let watchedMovies = getWatchedMovies()

// function removeWatchedMovie(movieId) {
//   let watchedMovies = getWatchedMovies();
//   watchedMovies = watchedMovies.filter(movie => movie.id !== movieId);
//   localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
// }

const toHtml = (movie) => `
<div class="card">
    <img
        src="${movie.img}"
        alt="${movie.title}"
    />
    <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">описание</p>
        <button href="#" class="btn btn-primary" data-btn ="description" data-id = ${movie.id}>Описание</button>
    </div>
</div>
`

function renderWatchedMovies(movies) {
  const html = movies.map((movie) => toHtml(movie)).join("")
  document.querySelector("#watched-films").innerHTML = html
}

document.addEventListener("DOMContentLoaded", () => {
  renderWatchedMovies(watchedMovies)
})

const descriptionModal = $.descriptionModal({
  title: "Описание фильма",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "OK",
      type: "primary", //Класс бутстрапа, потом заменю на свой
      handler() {
        console.log("primary btn clicked")
        descriptionModal.close()
      },
    },
  ],
})

document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    return
  }
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const movie = watchedMovies.find((f) => f.id === id)

  if (btnType === "description") {
    descriptionModal.setContent(`
        <p> <strong> ${movie.title} </strong> </br> Some description</p>
    `)
    descriptionModal.open()
  }
})
