const MOVIEBOOKMARK = document.querySelector('#movieBookmark')
const BOOKMARKBUTTON = document.querySelector('#bookmarkButton')

// 북마크 데이터를 저장할 배열
let bookmarkData = [];

// 로컬 스토리지에서 'id' 항목을 가져와 배열로 변환, 없으면 빈 배열로 초기화
let bookmarkAddIDArray = JSON.parse(localStorage.getItem('id')) || [];

// localStorage.clear()

// 북마크 영화 불러오기
async function bookmarkFetch() {
    for (let i = 0; i < bookmarkAddIDArray.length; i++) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/${MEDIATYPE}/${bookmarkAddIDArray[i]}?language=${LANGUAGE}`, options);
            const data = await res.json();
            bookmarkData.push(data)

        } catch (error) {
            console.error(`${bookmarkAddIDArray[i].title}에서 오류 발생:`, error);
        }

    }
    cardAdd(bookmarkData, MOVIEBOOKMARK)
    movieClick(bookmarkData, MOVIEBOOKMARK)
}

// 북마크 추가 버튼 클릭 이벤트 리스너 설정
function ModalBookmarkAdd() {
    const bookmarkAdd = document.querySelector('.bookmarkAdd')
    const bookmarkAddId = bookmarkAdd.closest('#modalAdd').dataset.id
    const modalName = document.querySelector('#modalName')

    // 북마크 추가 버튼 클릭 이벤트 리스너 설정
    bookmarkAdd.addEventListener('click', () => {
        if (bookmarkAddIDArray.includes(bookmarkAddId)) {
            alert(`"${modalName.innerText}"은(는) 이미 북마크에 추가되어 있습니다!`)
        } else {
            // 북마크에 추가되지 않은 경우 북마크에 추가하고 알림 메시지 표시
            alert(`"${modalName.innerText}" 이(가) 마음에 드셨나요? 북마크에 저장했어요!`);
            bookmarkMoviecardAdd()
        }
    })
}

// 북마크 창에 영화 추가
async function bookmarkMoviecardAdd() {
    const modalAddDataId = MODALADD.dataset.id
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${MEDIATYPE}/${modalAddDataId}?language=${LANGUAGE}`, options);
        const data = await res.json();
        // const bookmarkAddData = [];
        bookmarkData.push(data)

        // 북마크 ID 배열에 추가하고 로컬 스토리지에 저장
        bookmarkAddIDArray.push(modalAddDataId)
        localStorage.setItem('id', JSON.stringify(bookmarkAddIDArray));

        // // 북마크 데이터를 사용하여 영화 카드를 생성하고 DOM에 추가
        cardAdd(bookmarkData, MOVIEBOOKMARK)

    } catch (error) {
        console.error(`${modalName.innerText}에서 오류 발생:`, error);
    }
}

// BookMark 버튼 클릭 로직
BOOKMARKBUTTON.addEventListener('click', debounce(() => {
    let newUrl

    // 북마크 화면 표시 여부에 따라 화면 전환 및 URL 업데이트
    if (MOVIEBOOKMARK.style.display === 'none' || MOVIEBOOKMARK.style.display === "") {
        MOVIEMAIN.style.display = 'none'; // 메인 화면 숨기기
        MOVIEBOOKMARK.style.display = 'flex'; // 북마크 화면 표시
        MOVIESEARCH.style.display = 'none'; // 검색 화면 숨기기
        NORESULT.style.display = 'none'; // 검색 결과 없음 메시지 숨기기
        newUrl = `${window.location.pathname}?Bookmark`; // URL에 Bookmark 추가
    } else {
        MOVIEMAIN.style.display = 'flex'; // 메인 화면 표시
        MOVIEBOOKMARK.style.display = 'none'; // 북마크 화면 숨기기
        MOVIESEARCH.style.display = 'none'; // 검색 화면 숨기기
        NORESULT.style.display = 'none'; // 검색 결과 없음 메시지 숨기기
        newUrl = `${window.location.pathname}`; // 기본 URL로 설정
    }

    // URL에 검색어 추가
    history.replaceState(null, '', newUrl); // URL 업데이트
}, 300))

bookmarkFetch()