const MOVIEBOOKMARK = document.querySelector('#movieBookmark')
const BOOKMARKBUTTON = document.querySelector('#bookmarkButton')

let bookmarkData = []; // 북마크 데이터 저장
let bookmarkAddIDArray = JSON.parse(localStorage.getItem('id')) || [];
console.log('bookmarkAddIDArray: ', bookmarkAddIDArray);

// BookMark 버튼 클릭 로직
BOOKMARKBUTTON.addEventListener('click', debounce(() => {
    let newUrl

    if (MOVIEBOOKMARK.style.display === 'none' || MOVIEBOOKMARK.style.display === "") {
        MOVIEMAIN.style.display = 'none'
        MOVIEBOOKMARK.style.display = 'flex'
        MOVIESEARCH.style.display = 'none'
        NORESULT.style.display = 'none'
        newUrl = `${window.location.pathname}?Bookmark` // URL에 Bookmakr 추가
    } else {
        MOVIEMAIN.style.display = 'flex'
        MOVIEBOOKMARK.style.display = 'none'
        MOVIESEARCH.style.display = 'none'
        NORESULT.style.display = 'none'
        newUrl = `${window.location.pathname}`
    }

    // URL에 검색어 추가
    history.replaceState(null, '', newUrl); // URL 업데이트
}, 300))
// localStorage.clear()


// 북마크 추가 버튼 클릭 함수
function ModalBookmarkAdd() {
    const bookmarkAdd = document.querySelector('.bookmarkAdd')
    const modalName = document.querySelector('#modalName')
    const bookmarkAddId = bookmarkAdd.closest('#modalAdd').dataset.id
    

    bookmarkAdd.addEventListener('click', () => {

        if (bookmarkAddIDArray.includes(bookmarkAddId)) {
            alert(`"${modalName.innerText}"은(는) 이미 북마크에 추가되어 있습니다!`)
        } else {
            alert(`"${modalName.innerText}" 이(가) 마음에 드셨나요? 북마크에 저장했어요!`);

            let bookmarkAddMovieFilter = movieData.filter(mi => mi.id === Number(bookmarkAddId))
            bookmarkData.push(...bookmarkAddMovieFilter)

            bookmarkAddIDArray.push(bookmarkAddId)
            localStorage.setItem('id', JSON.stringify(bookmarkAddIDArray));
        }

    })
}

cardAdd(bookmarkData, MOVIEBOOKMARK)