const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTA1YTI0YmEwZTk0OTg2NWU1MGZiOTZjNTM5ZGUwZCIsIm5iZiI6MTcxMjY4OTUwNy43NTQsInN1YiI6IjY2MTU5MTYzOTgyZjc0MDE2NTYwOTcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt1-IlxO7azRp6_B0E0fvCgFo7FatiFra1jcA3ZRWGU' // 발급받은 읽기 액세스 토큰
const baseUrl = 'https://api.themoviedb.org/3/'; //  API 주소
const mediaType = 'movie' // TV면 'tv', 영화면 'movie'로 변경
const category = 'popular' // 인기순이면 'popular', 최신순이면 'now_playing'로 변경
const language = 'ko-KR'; // 영어면 'en-US', 한국어면 'ko-KR'로 변경
const totalPages = 6; // 가져올 페이지 수
const movieListView = document.querySelector('#movieListView'); // movieListView 아이디 선택자에 접근

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
        let url = `${baseUrl}${mediaType}/${category}?language=${language}&page=${i}&timestamp=${Date.now()}`; // API 주소
        // API 명세에 따라  options를  fetch()의 ()에 추가함
        try {
            const res = await fetch(url, options)
            const data = await res.json()
            let movieLists = data.results; // 
            // movieLists 배열에 있는 데이터를 forEach() 메소드로 순회하면서 movieListView에 추가
            movieLists.forEach(movieList => {
                const movieCardHTML = `
                <div class="movieCard" data-id="${movieList.id}">
                    <img src="https://image.tmdb.org/t/p/original${movieList.poster_path}" alt="${movieList.title}" class="movieImg">
                
                    <div class="movieCarte">
                        <p class="movieTitle">${ranking}위 ${movieList.title}</p> 
                
                        <span class="movieRate">
                        <small>평점: ${movieList.vote_average}</small>
                        </span>
                    </div>
                </div>
                `;
                ranking++
                movieListView.insertAdjacentHTML('beforeend', movieCardHTML);
                movieClick(movieList)
            })

            // 크롬 브라우저 개발자 도구 console 창에 에러 출력 
        } catch (error) {
            console.error(`페이지 ${i}에서 오류 발생:`, error)
        }

    }
}

fetchMoviesInOrder();