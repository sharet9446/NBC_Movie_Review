const ACCESSTOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTA1YTI0YmEwZTk0OTg2NWU1MGZiOTZjNTM5ZGUwZCIsIm5iZiI6MTcxMjY4OTUwNy43NTQsInN1YiI6IjY2MTU5MTYzOTgyZjc0MDE2NTYwOTcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt1-IlxO7azRp6_B0E0fvCgFo7FatiFra1jcA3ZRWGU' // 발급받은 읽기 액세스 토큰
const BASEURL = 'https://api.themoviedb.org/3/'; //  API 주소
const MEDIATYPE = 'movie' // TV면 'tv', 영화면 'movie'로 변경
const CATEGORY = 'popular' // 인기순이면 'popular', 최신순이면 'now_playing'로 변경
const LANGUAGE = 'ko-KR'; // 영어면 'en-US', 한국어면 'ko-KR'로 변경
const INCLUDEADULT= false; // 
let totalPages = 5; // 가져올 페이지 수 (5 = 100개, 10 = 200개)
const MOVIEMAIN = document.querySelector('#movieMain'); // movieMain 아이디 선택자에 접근
let movieData = []; // 영화 데이터 저장

document.querySelector('#movieList h1').textContent = `실시간 영화 TOP ${totalPages * 20}`

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${ACCESSTOKEN}`,
        Accept: 'application/json',
    }
};

// 영화 데이터를 순서대로 가져오는 비동기 함수
async function fetchMoviesInOrder() {
    for (let i = 1; i <= totalPages; i++) {
        let url = `${BASEURL}${MEDIATYPE}/${CATEGORY}?language=${LANGUAGE}&page=${i}`; // API 주소
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            let movieLists = data.results;

            // movieLists 배열에 있는 데이터를 movieData 배열에 추가
            movieLists.forEach((movieList) => {
                movieData.push(movieList)
            })

        } catch (error) { console.error(`페이지 ${i}에서 오류 발생:`, error) }

    }

    cardAdd(movieData, MOVIEMAIN)
    movieClick(movieData, MOVIEMAIN)
}

// 영화 카드를 생성하는 함수
function cardAdd(cardData, domAdd) {

    const cardDatas = cardData.map((movie, i) => `
        <div class="movieCard" data-index="${i}" data-id="${movie.id}">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" class="movieImg">
            <div class="movieCarte">
                <p class="movieTitle">${movie.title}</p> 
                <span class="movieRate">
                    <small>평점: ${movie.vote_average}</small>
                </span>
            </div>
        </div>
        `).join('');

    domAdd.innerHTML = cardDatas;

    // movieData에 number : i 키 추가
    cardData.forEach((movie, i) => {
        movie.number = i;
    });
}

fetchMoviesInOrder() // 영화 데이터를 가져오는 함수 호출
