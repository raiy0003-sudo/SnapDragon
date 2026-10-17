document.addEventListener("DOMContentLoaded", function () {
  renderNav();
});

function renderNav() {
  const nav = document.getElementById("navAuth");
  if (!nav) return;

  const user = getCurrentUser();

  if (user) {
    nav.innerHTML = `
      <li><a href="profile.html">Profile</a></li>
      <li><a href="#" id="logout">Logout</a></li>
    `;

    document.getElementById("logout").addEventListener("click", function (e) {
      e.preventDefault();
      logoutUser();
      window.location.href = "index.html";
    });
  } else {
    nav.innerHTML = `
      <li><a href="login.html">Login</a></li>
      <li><a href="register.html">Register</a></li>
    `;
  }
}