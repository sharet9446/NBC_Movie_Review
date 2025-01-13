const modalAdd = document.querySelector('#modalAdd')
const modal = document.querySelector('.modal')

function movieClick(movieList) {
    
    const movieCards = document.querySelectorAll('.movieCard');
    movieCards.forEach(card => {
        card.addEventListener('click', event => {

            const clickedId = Number(event.currentTarget.dataset.id);
            movieList.forEach(movieNumber => {
                if (clickedId == movieNumber.number) {
                    openModal(movieNumber)
                }
            })
        })
    })
}

function openModal(movie) {
    modalAdd.innerHTML =
        `
            <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movieList.title}"
                class="modalImage">
            <ul class="modalUl">
                <li class="modalName modalLi">
                    <h1>${movie.title}</h1>
                </li>
                <li class="modalStory modalLi">
                    <h3>${movie.overview}</h3>
                </li>
                <li class="modalDate modalLi">
                    <h4>개봉일 : ${movie.release_date}</h4>
                </li>
                <li class="modalRate modalLi">
                    <h4>평점 : ${movie.vote_average}</h4>
                </li>
                <button class="bookAdd">북마크 추가</button>
            </ul>
        `;

    const modalImage = document.querySelector('.modalImage')
    const modalStory = document.querySelector('.modalStory')

    if (modalImage.src === `https://image.tmdb.org/t/p/originalnull`) {
        modalImage.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    }
    if (modalStory.innerHTML.replace(/\s+/g, '') === `<h3></h3>`) {
        modalStory.innerHTML = `<h3>${movie.original_title}</h3>`
    }

    modal.style.display = 'block';
}

document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
    modalAdd.innerHTML = '';
})

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        modalAdd.innerHTML = '';
    }
});