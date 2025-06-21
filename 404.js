window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll); // 로딩 시 바로 보여줄 요소 체크
window.addEventListener("resize", handleScroll); 

// 404-메인페이지 버튼
document.getElementById("home").addEventListener("click", () => {

    const referrer = document.referrer;

    if (referrer && referrer !== location.href) {
    history.back();
    } else {
    window.location.href = "/";
    }
});
