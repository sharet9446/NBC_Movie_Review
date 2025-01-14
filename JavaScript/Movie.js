const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTA1YTI0YmEwZTk0OTg2NWU1MGZiOTZjNTM5ZGUwZCIsIm5iZiI6MTcxMjY4OTUwNy43NTQsInN1YiI6IjY2MTU5MTYzOTgyZjc0MDE2NTYwOTcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt1-IlxO7azRp6_B0E0fvCgFo7FatiFra1jcA3ZRWGU' // 발급받은 읽기 액세스 토큰
const baseUrl = 'https://api.themoviedb.org/3/'; //  API 주소
const mediaType = 'movie' // TV면 'tv', 영화면 'movie'로 변경
const category = 'popular' // 인기순이면 'popular', 최신순이면 'now_playing'로 변경
const language = 'ko-KR'; // 영어면 'en-US', 한국어면 'ko-KR'로 변경
const totalPages = 5; // 가져올 페이지 수 (5 = 100개, 10 = 200개)
const movieListView = document.querySelector('#movieListView'); // movieListView 아이디 선택자에 접근
let movieData = []; // 영화 데이터 저장
let ranking = 1; // 랭킹 순위

document.querySelector('#movieList h1').textContent = `실시간 영화 TOP ${totalPages * 20}`

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
    }
};

// 영화 데이터를 순서대로 가져오는 비동기 함수
async function fetchMoviesInOrder() {
    for (let i = 1; i <= totalPages; i++) {
        let url = `${baseUrl}${mediaType}/${category}?language=${language}&page=${i}`; // API 주소
        try {
            const res = await fetch(url, options); // API 호출
            const data = await res.json(); // JSON 응답 파싱
            let movieLists = data.results; // 영화 리스트 데이터 추출
            // movieLists 배열에 있는 데이터를 movieData 배열에 추가
            movieLists.forEach((movieList) => {
                movieData.push(movieList)
            })
        } catch (error) { console.error(`페이지 ${i}에서 오류 발생:`, error) }
    }
    // movieData 배열을 순회하며 HTML 문자열 생성
    const movieHTML = movieData.map((movie, i) => `
                <div class="movieCard" data-id="${i}">
            <div class="rankBadge">${ranking++}</div>
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" class="movieImg">
            <div class="movieCarte">
                <p class="movieTitle">${movie.title}</p> 
                <span class="movieRate">
                <small>평점: ${movie.vote_average}</small>
                </span>
            </div>
        </div>
        `).join('');
    movieListView.innerHTML = movieHTML;  // 생성된 HTML을 movieListView에 추가

    // movieData에 number : i 키값 추가
    movieData.map((movieDataAddIndex, i) => {
        movieDataAddIndex.number = i
    })
    movieClick(movieData)
}

fetchMoviesInOrder() // 영화 데이터를 가져오는 함수 호출

