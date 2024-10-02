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

searchIcon.addEventListener("click", (event) => {
  console.log("검색창 나오기");
  searchBox.classList.toggle("active"); // active 클래스 토글
});
