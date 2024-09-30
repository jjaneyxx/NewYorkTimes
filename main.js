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
