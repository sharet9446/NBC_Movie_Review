const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTA1YTI0YmEwZTk0OTg2NWU1MGZiOTZjNTM5ZGUwZCIsIm5iZiI6MTcxMjY4OTUwNy43NTQsInN1YiI6IjY2MTU5MTYzOTgyZjc0MDE2NTYwOTcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt1-IlxO7azRp6_B0E0fvCgFo7FatiFra1jcA3ZRWGU' // 발급받은 읽기 액세스 토큰
const baseUrl = `https://api.themoviedb.org/3/`; //  API 주소
const mediaType = 'movie' // TV면 'tv', 영화면 'movie'로 변경
const category = 'popular' // 인기순이면 'popular', 최신순이면 'now_playing'로 변경
const language = 'ko-KR'; // 영어면 'en-US', 한국어면 'ko-KR'로 변경
const totalPages = 5; // 가져올 페이지 수
const movieListView = document.getElementById('movieListView'); // movieListView 아이디 선택자에 접근

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
    }
};

for (let i = 1; i < totalPages; i++) {
    let url = `${baseUrl}${mediaType}/${category}?language=${language}&page=${i}timestamp=${Date.now()}`;
    // API 명세에 따라  options를  fetch()의 ()에 추가함
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            // ( 순서대로 )
            /***
                영화 이미지 : poster_path
                영화 제목 : original_title(영어 제목) title(한글 제목)
                영화 평점 : vote_average

                (1)  document.getElementById('movieListView')
                    해당 HTML 문서 ,index.html 의  movieListView  아이디선택자에 접근

                (2)  .innerHTML 
                    요소내에  HTML을 가져오는 메소드인데 , 여기에서는 가져와서 붙여준다. 
                    
            */
            let movieLists = data.results; // API에서 받아온 데이터 중 results를 movieList에 저장

            // movieLists에 있는 데이터를 하나씩 꺼내서 movieListView에 붙여줌
            movieLists.forEach(movieList => {
                movieListView.innerHTML +=
                    `
                <div class="movieCard">
                <img src="https://image.tmdb.org/t/p/original${movieList.poster_path} " alt="${movieList.title}" class="movieImg">
                
                <div class="movieCarte">
                <p class="movieTitle">${movieList.title}</p> 
                
                <span class="movieRate"><small>평점: ${movieList.vote_average}</small></span>
                </div>
                `;
            })
        })
        // 크롬 브라우저 개발자 도구 console 창에 에러 출력 
        .catch(error => console.error(error));
}