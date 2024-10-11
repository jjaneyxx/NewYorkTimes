// day.js 의 relativeTime 플러그인 등록
dayjs.extend(dayjs_plugin_relativeTime);
const API_KEY = `d0ecea3618044871bcbb7c6832d38e2b`;
let newsList = []; // 자주 사용하므로 전역변수로 둠
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); // URL 을 전역변수로 선언
let totalResult = 0;
let page = 1; // 현재 페이지 번호
const pageSize = 10; // 화면에 표시되는 기사 개수
const groupSize = 5; // 한 번에 보여줄 페이지 개수

const navMenus = document.querySelectorAll("nav button");
navMenus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getNewsResponse = async () => {
  try {
    // url 호출 이전 붙이기
    url.searchParams.set("page", page); // &page = page
    url.searchParams.set("pageSize", pageSize); // &page = page
    // url 호출
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    // 응답코드가 200(정상) 일 때 실행, 정상이 아니면 에러
    if (response.status === 200) {
      newsList = data.articles;
      totalResult = data.totalResults;
      if (newsList.length === 0) {
        throw new Error("No result for this search");
      }
      render();
      pagiNationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
    errorRender(error.message);
  }
};

// 에러 메시지 렌더링
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage} </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagiNationRender = () => {
  let lastPage = 1;
  let firstPage = 1;
  const totalPages = Math.ceil(totalResult / pageSize);
  // pageGroup : 현재 페이지가 속해있는 그룹
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage 는 pageGroup 과 groupSize 에 의해 결정됨
  lastPage = pageGroup * groupSize;
  firstPage = lastPage - (groupSize - 1);

  // 마지막 페이지가 그룹 사이즈보다 작은 경우
  if (lastPage > totalPages) {
    lastPage = totalPages;
    firstPage = 1;
  }

  let paginationHTML = ``;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i === page ? "active" : ""}"><a class="page-link" onclick = "moveToPage(${i})">${i}</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

// 페이지네이션 페이지 이동
const moveToPage = (pageNumber) => {
  page = pageNumber; // 현재 page 는 동적으로 변함
  getNewsResponse();
};

// 메인 뉴스 렌더링
const getLatestNews = async () => {
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  getNewsResponse();
};

getLatestNews();

// 카테고리별 뉴스 렌더링
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("클릭된 카테고리:", category);
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  getNewsResponse();
};

// 키워드별 뉴스 렌더링
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
  getNewsResponse();
};

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

// 뉴스 그리기
const render = () => {
  const newsHTML = newsList
    .map((news) => {
      // 조건 처리
      const imageUrl = news.urlToImage ? news.urlToImage : "image/no-image.png";
      const description = news.description ? (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description) : "내용없음";
      const source = news.source.name ? news.source.name : "No Source";

      // 날짜를 상대적 시간으로 변환
      const publishedTime = dayjs(news.publishedAt).fromNow();

      // HTML 생성
      return `<div class="row one-news">
      <figure class="col-lg-4"><img class="article-img" src=${imageUrl} /></figure>
      <article class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${description}</p>
        <p>${source} * ${publishedTime}</p>
      </article>
    </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

// 검색창에서 키워드 찾기
const searchKeyWord = () => {};
