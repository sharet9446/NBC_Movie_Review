const options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTA1YTI0YmEwZTk0OTg2NWU1MGZiOTZjNTM5ZGUwZCIsIm5iZiI6MTcxMjY4OTUwNy43NTQsInN1YiI6IjY2MTU5MTYzOTgyZjc0MDE2NTYwOTcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt1-IlxO7azRp6_B0E0fvCgFo7FatiFra1jcA3ZRWGU',
        Accept: 'application/json',
    },
};
const apiKey = 'de05a24ba0e949865e50fb96c539de0d';
const baseUrl = 'https://api.themoviedb.org/3/movie/popular'; //  API 주소, TV면 tv, 영화면 movie로 변경, 인기순이면 popular, 최신순이면 now_playing
const language = 'ko-KR';
for (let i = 0; i < 5; i++) {
    const url = `${baseUrl}?api_key=${apiKey}&language=${language}&page=${i + 1}`;
    // API 명세에 따라  options를  fetch()의 ()에 추가함
    fetch(url, options)
        .then(response => { return response.json(); })
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
            const movieList = data.results;

            for (let j = 0; j < movieList.length; j++) {
                document.getElementById('movieListView').innerHTML +=
                    `
                <div class="movieCard">
                <img src="https://image.tmdb.org/t/p/original${movieList[j].poster_path} " alt="${movieList[j].title}" class="movieImg">
                
                <div class="movieCarte">
                <p class="movieTitle">${movieList[j].title}</p> 
                
                <span class="movieRate"><small>평점: ${movieList[j].vote_average}</small></span>
                </div>
                `;
            }
        })
        // 크롬 브라우저 개발자 도구 console 창에 에러 출력 
        .catch(error => console.error(error));
}