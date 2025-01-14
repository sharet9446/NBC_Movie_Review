const modalAdd = document.querySelector('#modalAdd'); // 모달 내용이 추가될 요소 선택
const modal = document.querySelector('.modal'); // 모달 요소 선택

// 영화 카드 클릭 이벤트를 설정하는 함수
function movieClick(movieList) {
    const movieListView = document.querySelector('#movieListView')
    movieListView.addEventListener('click', event => {
        const card = event.target.closest('.movieCard')
        if (!card) return;

        const clickedID = Number(card.dataset.id);
        openModal(movieList[clickedID])
    })
}

// 모달을 열고 내용을 설정하는 함수
function openModal(movie) {
    modalAdd.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title}" class="modalImage">
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

    const modalImage = document.querySelector('.modalImage'); // 모달 이미지 요소 선택
    const modalStory = document.querySelector('.modalStory'); // 모달 스토리 요소 선택

    // 이미지가 없는 경우 대체 이미지 설정
    if (modalImage.src === `https://image.tmdb.org/t/p/originalnull`) {
        modalImage.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    }
    // 스토리가 없는 경우 원래 제목으로 대체
    if (modalStory.innerHTML.replace(/\s+/g, '') === `<h3></h3>`) {
        modalStory.innerHTML = `<h3>${movie.original_title}</h3>`;
    }

    modal.style.display = 'block'; // 모달 열기
}

// 모달 닫기 버튼 클릭 이벤트 설정
document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none'; // 모달 닫기
    modalAdd.innerHTML = ''; // 모달 내용 초기화
});

// 모달 외부 클릭 시 모달 닫기 이벤트 설정
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // 모달 닫기
        modalAdd.innerHTML = ''; // 모달 내용 초기화
    }
});