// 페이지 제목을 설정
document.querySelector('title').textContent = `The Movie Top ${totalPages * 20}`;

// 사이트 이름을 설정
document.querySelector('#siteName h1').textContent = `TMT${totalPages * 20}`;

// 현재 시간을 표시할 요소 선택
const currentTimeElement = document.querySelector('footer p');

// footer에 넣을 현재 시간을 포맷팅하여 설정하는 함수
function footerTime() {
    const now = new Date(); // 현재 시간 가져오기
    const year = now.getFullYear(); // 연도 가져오기
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 가져오기 (2자리로 포맷팅)
    const day = String(now.getDate()).padStart(2, '0'); // 일 가져오기 (2자리로 포맷팅)
    const hours = String(now.getHours()).padStart(2, '0'); // 시간 가져오기 (2자리로 포맷팅)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 분 가져오기 (2자리로 포맷팅)
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 초 가져오기 (2자리로 포맷팅)

    // 포맷팅된 시간을 footer에 설정
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    currentTimeElement.textContent = `© ${formattedTime} Movie Rank`;
}

// footerTime 함수 호출하여 현재 시간 설정
footerTime();