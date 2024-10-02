const API_KEY = `d0ecea3618044871bcbb7c6832d38e2b`;
let news = []; // 자주 사용하므로 전역변수로 둠
const getLatestNews = async () => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  console.log("url:", url);
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("news", news);
};

getLatestNews();

// 검색 아이콘을 클릭할 때 마다 검색창 토글
const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("searchBox");
const mediaQuery = window.matchMedia("(max-width : 768px)"); // 모바일 화면 크기를 체크하는 미디어쿼리

searchIcon.addEventListener("click", (event) => {
  event.preventDefault(); // <a>태그로 인한 링크 이동 방지

  // 현재가 모바일 화면이 아닐 때만 검색창 토글
  if (!mediaQuery.matches) {
    searchBox.classList.toggle("active"); // active 클래스 토글
  } else {
    console.log("모바일에서는 검색창이 뜨지 않음");
    // 모바일 화면 : 사이드 내비게이션 바 열기
    openNav();
  }
});

const openNav = () => {
  console.log("사이드 내비게이션바 오픈");
  document.getElementById("sideNav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("sideNav").style.width = "0";
};
