const currentTimeElement = document.querySelector('footer p');

document.querySelector('title').textContent = `The Movie Top ${totalPages * 20}`; // 웹 사이트 이름
document.querySelector('#siteName h1').textContent = `TMT${totalPages * 20}`; // 웹 페이지 이름름

// footer에 넣을 현재 시간
function footerTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    currentTimeElement.textContent = `© ${formattedTime} Movie Rank`;
}

footerTime();
