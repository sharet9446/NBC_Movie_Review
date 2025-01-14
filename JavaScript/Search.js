// 디바운스 함수 정의
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// 검색 기능을 수행하는 함수
function searchMovies(event) {
    const movieTitle = document.querySelectorAll('.movieTitle'); // 모든 영화 제목 요소 선택
    const searchName = event.target.value.replace(/\s/g, "").toLowerCase(); // 입력된 검색어에서 공백 제거 및 소문자로 변환
    
    let hasResult = false;  // 검색 결과 여부를 나타내는 변수

    if (!searchName) {
        history.pushState(null, '', window.location.pathname); // 검색어가 없으면 기본 URL로 설정
    } else {
        let newUrl = `${window.location.pathname}?search=${searchName}`; // URL에 검색어 추가
        history.pushState(null, '', newUrl); // URL 업데이트
    }

    // 검색 기능 메세지 1000개찍힘 개선 필요
    for (let i = 0; i < movieTitle.length; i++) {
        const title = movieTitle[i];
        const trimTitle = title.innerText.replace(/[\s=:;/(){}'"|*!@.#$%&]/g, "").toLowerCase();
        const movieCard = title.closest('.movieCard'); // 영화 카드 요소 선택

        if (trimTitle.includes(searchName)) {
            movieCard.style.display = 'block'; // 검색어가 포함된 경우 영화 카드 표시
            hasResult = true; // 검색 결과 있음
        } else {
            movieCard.style.display = 'none'; // 검색어가 포함  되지 않은 경우 영화 카드 숨기기
        }
    };

    noResultMessage(hasResult); // 검색 결과 메시지 업데이트
};

// 검색 결과 메시지를 업데이트하는 함수
function noResultMessage(hasResult) {
    const search = new URLSearchParams(window.location.search).get('search'); // URL에서 검색어 가져오기
    const noResult = document.querySelector('#noResultsMessage'); // 검색 결과 메시지 요소 선택

    // 검색 결과가 없는 경우 메시지 표시
    if (!search || hasResult) {
        noResult.style.display = 'none'; // 검색어가 없거나 결과가 있는 경우 메시지 숨기기
        return;
    }

    noResult.innerHTML = `<p class="noResultMessage"><strong>"${search}"</strong>에 대한 검색 결과가 없습니다.</p>`;
    noResult.style.display = 'block';
}

// 검색 폼에 키업 이벤트 리스너 추가, 디바운스를 사용하여 검색 함수 호출
document.querySelector('#searchForm').addEventListener('keyup', debounce(searchMovies, 200))