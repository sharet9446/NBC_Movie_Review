// 검색기능
document.querySelector('#searchForm').addEventListener('keyup', (event) => {

    const searchName = event.target.value.replace(/\s/g, "").toLowerCase();
    const movieTitle = document.querySelectorAll('.movieTitle');

    movieTitle.forEach(title => {
        
        let trimTitle = title.innerText.replace(/[\s=:/()]/g, "").toLowerCase();
        let movieCard = title.closest('.movieCard');

        if (trimTitle.includes(searchName)) {
            movieCard.style.display = 'block';
        } else {
            movieCard.style.display = 'none';
        }
    })

})