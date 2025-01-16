const MOVIESEARCH = document.querySelector('#movieSearch')
const NORESULT = document.querySelector('#noResultsMessage');
const MAXRESULTS = totalPages * 20;

// 디바운스 함수 정의
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// 영화 검색 함수
async function searchMovies(event) {
    let movies = [];
    let page = 1;
    const searchName = event.target.value.replace(/\s/g, "").toLowerCase(); // 입력된 검색어에서 공백 제거 및 소문자로 변환

    if (!searchName) {
        history.pushState(null, '', window.location.pathname); // 검색어가 없으면 기본 URL로 설정
        MOVIEMAIN.style.display = `flex`;
        MOVIESEARCH.style.display = 'none'
        NORESULT.style.display = 'none';
        MOVIEBOOKMARK.style.display = 'none'
        return;
    } else {
        const newUrl = `${window.location.pathname}?search=${searchName}`; // URL에 검색어 추가
        history.pushState(null, '', newUrl); // URL 업데이트
    }

    try {
        let hasResult = false;  // 검색 결과 여부를 나타내는 변수

        while (movies.length < MAXRESULTS) {
            const searchURL = `https://api.themoviedb.org/3/search/${MEDIATYPE}?query=${encodeURIComponent(searchName)}&include_adult=${INCLUDEADULT}&language=${LANGUAGE}&page=${page}`;
            const resSearch = await fetch(searchURL, options);
            const dataSearch = await resSearch.json();

            if (!dataSearch.results || dataSearch.results.length === 0) break; // 더 이상 결과가 없을 때 루프 종료

            const filteredMovies = dataSearch.results.filter(movie => movie.title.toLowerCase().includes(searchName));

            if (filteredMovies.length > 0) {
                hasResult = true;  // 결과가 있을 때 true로 설정
                MOVIESEARCH.style.display = `flex`;
                MOVIEMAIN.style.display = `none`;
                MOVIEBOOKMARK.style.display = 'none'
            }

            movies = movies.concat(filteredMovies);
            if (movies.length >= MAXRESULTS || page >= totalPages) {
                movies = movies.slice(0, MAXRESULTS);
                break; // 원하는 수의 결과를 얻었거나 더 이상 페이지가 없을 때 루프 종료
            }

            page++;
        }

        cardAdd(movies, MOVIESEARCH)
        movieClick(movies, MOVIESEARCH)
        noResultMessage(hasResult)

    } catch (error) { console.error(`페이지에서 오류 발생:`, error) }
};

// 검색 결과 메시지를 업데이트하는 함수
function noResultMessage(hasResult) {
    const search = new URLSearchParams(window.location.search).get('search'); // URL에서 검색어 가져오기

    // 검색 결과가 없는 경우 메시지 표시
    if (!search || hasResult) {
        NORESULT.style.display = 'none'; // 검색어가 없거나 결과가 있는 경우 메시지 숨기기
        return;
    }

    NORESULT.innerHTML = `<p class="noResultMessage"><strong>"${search}"</strong>에 대한 검색 결과가 없습니다.</p>`;
    NORESULT.style.display = 'block';
    MOVIEMAIN.style.display = `none`;
    MOVIEBOOKMARK.style.display = 'none'
}

// 검색 폼에 인풋 이벤트 리스너 추가, 디바운스를 사용하여 검색 함수 호출
document.querySelector('#searchForm').addEventListener('input', debounce(searchMovies, 300))
