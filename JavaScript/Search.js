// 검색기능능
document.querySelector('#searchForm').addEventListener('keyup', (event) => {

        const searcheName = event.target.value;
        const movieTitle = document.querySelectorAll('.movieTitle');
        movieTitle.forEach(title => {
            if (title.innerText.includes(searcheName)) {
                title.parentElement.parentElement.style.display = 'block';
            } else {
                title.parentElement.parentElement.style.display = 'none';
            }
        })

})