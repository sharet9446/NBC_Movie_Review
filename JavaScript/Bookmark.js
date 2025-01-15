const movieBookmark = document.querySelector('#movieBookmark')
const bookmarkButton = document.querySelector('#bookmarkButton')
const bookAdd = document.querySelector('.bookAdd')

bookmarkButton.addEventListener('click', () => {

    if (movieBookmark.style.display === 'none' || movieBookmark.style.display === "") {
        movieMain.style.display = 'none'
        movieBookmark.style.display = 'flex'
        movieSearch.style.display = 'none'
        noResult.style.display = 'none'
    } else {
        movieMain.style.display = 'flex'
        movieBookmark.style.display = 'none'
        movieSearch.style.display = 'none'
        noResult.style.display = 'none'
    }

    const newUrl = `${window.location.pathname}?Bookmark`; // URL에 검색어 추가
    history.pushState(null, '', newUrl); // URL 업데이트
})

function bookadd() {
    const bookAdd = document.querySelector('.bookAdd')
    bookAdd.addEventListener('click', () => {
        console.log(modalAdd)
    })
}