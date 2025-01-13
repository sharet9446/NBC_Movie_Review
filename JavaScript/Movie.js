const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTA1YTI0YmEwZTk0OTg2NWU1MGZiOTZjNTM5ZGUwZCIsIm5iZiI6MTcxMjY4OTUwNy43NTQsInN1YiI6IjY2MTU5MTYzOTgyZjc0MDE2NTYwOTcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt1-IlxO7azRp6_B0E0fvCgFo7FatiFra1jcA3ZRWGU' // 발급받은 읽기 액세스 토큰
const baseUrl = 'https://api.themoviedb.org/3/'; //  API 주소
const mediaType = 'movie' // TV면 'tv', 영화면 'movie'로 변경
const category = 'popular' // 인기순이면 'popular', 최신순이면 'now_playing'로 변경
const language = 'ko-KR'; // 영어면 'en-US', 한국어면 'ko-KR'로 변경
const totalPages = 50; // 가져올 페이지 수 (5 = 100개, 10 = 200개)
const movieListView = document.querySelector('#movieListView'); // movieListView 아이디 선택자에 접근
let movieData = [];
let ranking = 1; // 랭킹 순위

document.querySelector('#movieList h1').textContent = `실시간 영화 TOP ${totalPages * 20}`

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
    }
};

async function fetchMoviesInOrder() {
    for (let i = 1; i <= totalPages; i++) {
        let url = `${baseUrl}${mediaType}/${category}?language=${language}&page=${i}`; // API 주소 &timestamp=${Date.now()}
        // API 명세에 따라  options를  fetch()의 ()에 추가함
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            let movieLists = data.results;
            // movieLists 배열에 있는 데이터를 forEach() 메소드로 순회하면서 movieListView에 추가
            movieLists.forEach((movieList) => {
                movieData.push(movieList)
            })
        } catch (error) { console.error(`페이지 ${i}에서 오류 발생:`, error) }
    }
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
        
    movieListView.innerHTML = movieHTML;
    movieData.map((movieDataAddIndex, i) => {
        movieDataAddIndex.number = i
    })
    movieClick(movieData)
}

fetchMoviesInOrder()

