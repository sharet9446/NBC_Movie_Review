//  검색 기능 구현 및 자동완성 기능 구현
document.querySelector('#searchForm').addEventListener('keyup', (event) => {
    const movieTitle = document.querySelectorAll('.movieTitle');
    let searchName = event.target.value.replace(/\s/g, "").toLowerCase(); // 공백 제거 및 소문자로 변경
    let hasResult = false; // 검색 결과가 있는지 확인

    // 검색 결과가 있을 때 URL 변경
    const newUrl = `${window.location.pathname}?search=${searchName}`;
    history.pushState(null, '', newUrl);

    // 검색 기능 구현
    movieTitle.forEach(title => {
        let trimTitle = title.innerText.replace(/[\s=:/()]/g, "").toLowerCase(); // 추가적으로 특수문자 제거
        let movieCard = title.closest('.movieCard');

        // 검색어가 포함된 영화 카드만 보여줌
        if (trimTitle.includes(searchName)) {
            movieCard.style.display = 'block';
            hasResult = true;  // 검색 결과가 있음
        } else {
            movieCard.style.display = 'none';
        }
    })

    // 검색 결과가 없을 때 메시지 출력
    const noResult = document.querySelector('#noResultsMessage');
    if (!hasResult) {
        noResult.style.display = 'block';
    } else {
        noResult.style.display = 'none';
    }

})