const modalAdd = document.querySelector('#modalAdd')
const modal = document.querySelector('.modal')


function movieClick(mol) {
    document.querySelectorAll('.movieCard').forEach(mod => {
        mod.addEventListener('click', event => {
            if (event.currentTarget.dataset.id == mol.id) {
                modalHTML = `
                    <img src="https://image.tmdb.org/t/p/original${mol.backdrop_path}" alt="${mol.title}"
                        class="modalImage">
                    <ul class="modalUl">
                        <li class="modalName modalLi">
                            <h1>${mol.title}</h1>
                        </li>
                        <li class="modalStory modalLi">
                            <h3>${mol.overview}</h3>
                        </li>
                        <li class="modalDate modalLi">
                            <h4>개봉일 : ${mol.release_date}</h4>
                        </li>
                        <li class="modalRate modalLi">
                            <h4>평점 : ${mol.vote_average}</h4>
                        </li>
                        <button class="bookAdd">북마크 추가</button>
                    </ul>
                    <p id="movieDetails"></p>
                `

                modalAdd.insertAdjacentHTML('beforeend', modalHTML);
                const modalImage = document.querySelector('.modalImage')
                const modalStory = document.querySelector('.modalStory')

                if (modalImage.src === `https://image.tmdb.org/t/p/originalnull`) {
                    modalImage.src = `https://image.tmdb.org/t/p/original${mol.poster_path}`
                }
                
                if (modalStory.innerHTML.replace(/\s+/g, '') === `<h3></h3>`) {
                    modalStory.innerHTML = `<h3>${mol.original_title}</h3>`
                }


                modal.style.display = 'block';
            }
        })
    })
}

document.querySelector('.close').addEventListener('click', (event) => {
    event.target.closest('.modal').style.display = 'none';
    modalAdd.innerHTML = '';
})

window.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target === modal) {
        modal.style.display = 'none';
        modalAdd.innerHTML = '';
    }
});