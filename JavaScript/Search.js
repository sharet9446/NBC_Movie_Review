

document.querySelector('#searchForm').addEventListener('keyup', (event) => {
    const movieTitle = document.querySelectorAll('.movieTitle');
    const searchName = event.target.value.replace(/\s/g, "").toLowerCase();
    let hasResult = false;

    // URL 업데이트
    if (!searchName) {
        history.pushState(null, '', window.location.pathname);
    } else {
        let newUrl = `${window.location.pathname}?search=${searchName}`; // URL에 검색어 추가
        history.pushState(null, '', newUrl);
    }

    // 검색 기능
    movieTitle.forEach(title => {
        const trimTitle = title.innerText.replace(/[\s=:;/(){}'"|*!@.#$%&]/g, "").toLowerCase();
        const movieCard = title.closest('.movieCard');

        if (trimTitle.includes(searchName)) {
            movieCard.style.display = 'block';
            hasResult = true;
        } else {
            movieCard.style.display = 'none';
        }
    });

    noResultMessage(hasResult);
});

// 검색 결과 메시지
function noResultMessage(hasResult) {
    const search = new URLSearchParams(window.location.search).get('search');
    const noResult = document.querySelector('#noResultsMessage');

    if (!search || hasResult) {
        noResult.style.display = 'none';
        return;
    }

    noResult.innerHTML = `
        <p class="noResultMessage"><strong>"${search}"</strong>에 대한 검색 결과가 없습니다.</p>
    `;

    noResult.style.display = 'block';
}
