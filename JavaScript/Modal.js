const modalAdd = document.querySelector('#modalAdd'); // 모달 내용이 추가될 요소 선택
const modal = document.querySelector('.modal'); // 모달 요소 선택


// 영화 카드 클릭 이벤트를 설정하는 함수
function movieClick(movieList, movieChoice) {
    movieChoice.addEventListener('click', event => {
        const card = event.target.closest('.movieCard');
        if (!card) return;

        const clickedID = Number(card.dataset.id);
        const selectedMovie = movieList[clickedID];

        if (!selectedMovie) {
            console.error(`영화를 찾을 수 없습니다. ID: ${clickedID}`);
            return;
        }

        openModal(selectedMovie);
    });
}

// 모달을 열고 내용을 설정하는 함수
function openModal(movie) {
    if (!movie) {
        console.error("영화 데이터가 없습니다:", movie);
        return;  // movie가 undefined이면 함수 중단
    }
    modalAdd.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}" alt="${movie.title}" class="modalImage">
        <ul class="modalUl">
            <li class="modalName modalLi">
                <h1>${movie.title}</h1>
            </li>
            <li class="modalStory modalLi">
                <h3>${movie.overview || '영화 소개가 없습니다.'}</h3>
            </li>
            <li class="modalDate modalLi">
                <h4>개봉일 : ${movie.release_date || '정보 없음'}</h4>
            </li>
            <li class="modalRate modalLi">
                <h4>평점 : ${movie.vote_average || '정보 없음'}</h4>
            </li>
            <button class="bookAdd">북마크 추가</button>
        </ul>
    `;

    modal.style.display = 'block'; // 모달 열기
    bookadd()
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