document.addEventListener("DOMContentLoaded", function () {
  setupCreate();
});

function setupCreate() {
  const form = document.getElementById("createPostForm");
  if (!form) return;

  const postUsername = document.getElementById("postUsername");
  const postTitle = document.getElementById("postTitle");
  const postCategory = document.getElementById("postCategory");
  const postContent = document.getElementById("postContent");

  const postUsernameError = document.getElementById("postUsernameError");
  const postTitleError = document.getElementById("postTitleError");
  const postCategoryError = document.getElementById("postCategoryError");
  const postContentError = document.getElementById("postContentError");
  const postSuccess = document.getElementById("postSuccess");

  const currentUser = getCurrentUser();
  if (currentUser) {
    postUsername.value = currentUser.username;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    postUsernameError.textContent = "";
    postTitleError.textContent = "";
    postCategoryError.textContent = "";
    postContentError.textContent = "";
    postSuccess.classList.add("hidden");

    let valid = true;

    if (postUsername.value.trim() === "") {
      postUsernameError.textContent = "Username is required.";
      valid = false;
    }

    if (postTitle.value.trim() === "") {
      postTitleError.textContent = "Title is required.";
      valid = false;
    }

    if (postCategory.value === "") {
      postCategoryError.textContent = "Please choose a category.";
      valid = false;
    }

    if (postContent.value.trim() === "") {
      postContentError.textContent = "Journal entry is required.";
      valid = false;
    } else if (postContent.value.trim().length < 20) {
      postContentError.textContent = "Journal entry must be at least 20 characters.";
      valid = false;
    }

    if (!valid) return;

    const posts = getPosts();

    const newPost = {
      id: posts.length > 0 ? posts[0].id + 1 : 1,
      username: postUsername.value.trim(),
      title: postTitle.value.trim(),
      category: postCategory.value,
      content: [postContent.value.trim()],
      comments: []
    };

    posts.unshift(newPost);
    savePosts(posts);
    form.reset();

    if (currentUser) {
      postUsername.value = currentUser.username;
    }

    postSuccess.classList.remove("hidden");
  });
}