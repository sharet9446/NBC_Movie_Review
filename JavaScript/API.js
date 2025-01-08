const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg4NzNiMWNiNDgxZjBjNjE0NTQ3MTIzM2NhNjAzNSIsInN1YiI6IjY1OGU1NDJkMTU5NTlmMzQ1YzAwMjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWABdCaRlYP2t3JYO8qd7Wq9SLXqjBJHgytGI6lnLIU'
    }
};
const apiKey = 'de05a24ba0e949865e50fb96c539de0d';
// movieIds 는  일단 존재하는 이미지 로 해서 붙여줌 
const movieIds = [2,50341,5462,3034,50622,2345, 94117, 612, 98089];
movieIds.forEach(movieId => {
    const url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}`;
    // API 명세에 따라  options를  fetch()의 ()에 추가함
    fetch(url, options)
        .then(response => response.json())  // 응답받을 것을 json형식으로 변환
        .then(response => {
            //  console.log(response);
            // ( 순서대로 )

            /***
                영화 이미지 : poster_path
                
                영화 제목 : original_title
              
                영화 평점 : vote_average
              
                (1)  document.getElementById('movieListView')
                     해당 HTML 문서 ,index.html 의  movieListView  아이디선택자에 접근
             
                (2)  .innerHTML 
                     요소내에  HTML을 가져오는 메소드인데 , 여기에서는 가져와서 붙여준다. 
             
                   */
            document.getElementById('movieListView').innerHTML +=
                `
    <div class="movieCard">
    <img src="https://image.tmdb.org/t/p/original${response.poster_path} " alt="movie poster" class="mvImg" id="mv__img">
    
<div class="movieCarte">
    <p class="mvTitle"  id="mv__title">${response.name}</p> 
    

   <span class="mvRate"><small id="mv__Rate">${response.vote_average}</small></span>
</div>`;
console.log('response: ', response);
        })
        // 크롬 브라우저 개발자 도구 console 창에 에러 출력 
        .catch(
            err => console.error(err)
        );
});