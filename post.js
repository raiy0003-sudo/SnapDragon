document.addEventListener("DOMContentLoaded", function () {
  renderPost();
});

function renderPost() {
  const container = document.getElementById("fullPost");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const posts = getPosts();
  const post = posts.find(function (p) {
    return p.id === id;
  });

  const commentsDiv = document.getElementById("commentsContainer");

  if (!post) {
    container.innerHTML = "<h2>Post not found</h2><p>This post does not exist.</p>";
    return;
  }

  function showPost() {
    container.innerHTML = `
      <h2>${post.title}</h2>
      <p class="meta">${post.username} | ${post.category}</p>
      ${post.content.map(function (paragraph) {
        return `<p>${paragraph}</p>`;
      }).join("")}
    `;
  }

  function showComments() {
    commentsDiv.innerHTML = "";
    for (let i = 0; i < post.comments.length; i++) {
      commentsDiv.innerHTML += `
        <div class="comment-card">
          <strong>${post.comments[i].username}</strong>
          <p>${post.comments[i].text}</p>
        </div>
      `;
    }
  }

  showPost();
  showComments();

  const commentForm = document.getElementById("commentForm");
  const commentUsername = document.getElementById("commentUsername");
  const commentText = document.getElementById("commentText");
  const commentUsernameError = document.getElementById("commentUsernameError");
  const commentTextError = document.getElementById("commentTextError");
  const commentSuccess = document.getElementById("commentSuccess");

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    commentUsernameError.textContent = "";
    commentTextError.textContent = "";
    commentSuccess.classList.add("hidden");

    let valid = true;

    if (commentUsername.value.trim() === "") {
      commentUsernameError.textContent = "Username is required.";
      valid = false;
    }

    if (commentText.value.trim() === "") {
      commentTextError.textContent = "Comment is required.";
      valid = false;
    }

    if (!valid) return;

    post.comments.push({
      username: commentUsername.value.trim(),
      text: commentText.value.trim()
    });

    savePosts(posts);
    commentForm.reset();
    commentSuccess.classList.remove("hidden");
    showComments();
  });
}