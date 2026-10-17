document.addEventListener("DOMContentLoaded", function () {
  renderHome();
});

function renderHome() {
  const container = document.getElementById("postsContainer");
  if (!container) return;

  const posts = getPosts();
  const searchForm = document.getElementById("searchForm");
  const keywordInput = document.getElementById("keyword");
  const categorySelect = document.getElementById("category");
  const resultsText = document.getElementById("resultsText");
  const emptyMessage = document.getElementById("emptyMessage");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let visiblePosts = 4;
  let filteredPosts = posts;

  function display(list) {
    container.innerHTML = "";

    if (list.length === 0) {
      emptyMessage.classList.remove("hidden");
      resultsText.textContent = "0 posts found";
      loadMoreBtn.classList.add("hidden");
      return;
    }

    emptyMessage.classList.add("hidden");
    resultsText.textContent = list.length + " post(s) found";

    const postsToShow = list.slice(0, visiblePosts);

    for (let i = 0; i < postsToShow.length; i++) {
      container.innerHTML += `
        <div class="post-card">
          <h3><a href="post.html?id=${postsToShow[i].id}">${postsToShow[i].title}</a></h3>
          <p class="meta">${postsToShow[i].username} | ${postsToShow[i].category}</p>
          <p>${postsToShow[i].content[0]}</p>
          <a href="post.html?id=${postsToShow[i].id}">Read Full Journal</a>
        </div>
      `;
    }

    if (visiblePosts >= list.length) {
      loadMoreBtn.classList.add("hidden");
    } else {
      loadMoreBtn.classList.remove("hidden");
    }
  }

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const keyword = keywordInput.value.toLowerCase().trim();
    const category = categorySelect.value;

    filteredPosts = posts.filter(function (p) {
      const text = (p.title + " " + p.content.join(" ")).toLowerCase();
      const keywordMatch = keyword === "" || text.includes(keyword);
      const categoryMatch = category === "" || p.category === category;
      return keywordMatch && categoryMatch;
    });

    visiblePosts = 4;
    display(filteredPosts);
  });

  loadMoreBtn.addEventListener("click", function () {
    visiblePosts += 4;
    display(filteredPosts);
  });

  display(filteredPosts);
}