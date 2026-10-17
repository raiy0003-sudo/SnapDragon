document.addEventListener("DOMContentLoaded", function () {
  renderProfile();
});

function renderProfile() {
  const profileInfo = document.getElementById("profileInfo");
  if (!profileInfo) return;

  const user = getCurrentUser();

  if (!user) {
    profileInfo.innerHTML = `
      <p>You must be logged in to view this page.</p>
      <p><a href="login.html">Go to Login</a></p>
    `;
    return;
  }

  profileInfo.innerHTML = `
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Status:</strong> Logged in user</p>
  `;
}