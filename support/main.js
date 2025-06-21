
const scrollElements = document.querySelectorAll('.scroll-animation, .content-wrapper');

const handleScroll = () => {
  scrollElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll); // 로딩 시 바로 보여줄 요소 체크
window.addEventListener("resize", handleScroll); 

// 다운로드버튼
document.getElementById("download").addEventListener("click", () => {
  window.open("https://stockoverlay.osyna.store/public/StockOverlay.exe", "_blank");
});

// 디스코드 참여 버튼
document.getElementById("discord").addEventListener("click", () => {
  window.open("https://discord.gg/MmUTquecnS", "_blank");
});