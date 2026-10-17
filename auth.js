document.addEventListener("DOMContentLoaded", function () {
  setupRegister();
  setupLogin();
});

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

function setupRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  const username = document.getElementById("registerUsername");
  const email = document.getElementById("registerEmail");
  const password = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  const usernameError = document.getElementById("registerUsernameError");
  const emailError = document.getElementById("registerEmailError");
  const passwordError = document.getElementById("registerPasswordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const globalError = document.getElementById("registerGlobalError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    globalError.textContent = "";

    let valid = true;

    if (username.value.trim() === "") {
      usernameError.textContent = "Username is required.";
      valid = false;
    }

    if (email.value.trim() === "") {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      emailError.textContent = "Enter a valid email.";
      valid = false;
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "Password is required.";
      valid = false;
    } else if (password.value.trim().length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    if (confirmPassword.value.trim() === "") {
      confirmPasswordError.textContent = "Please confirm your password.";
      valid = false;
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = "Passwords do not match.";
      valid = false;
    }

    if (!valid) return;

    const users = getUsers();
    const existingUser = users.find(function (user) {
      return user.email === email.value.trim();
    });

    if (existingUser) {
      globalError.textContent = "An account with this email already exists.";
      return;
    }

    const newUser = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim()
    };

    users.push(newUser);
    saveUsers(users);
    saveCurrentUser(newUser);
    window.location.href = "profile.html";
  });
}

function setupLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const emailError = document.getElementById("loginEmailError");
  const passwordError = document.getElementById("loginPasswordError");
  const globalError = document.getElementById("loginGlobalError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    globalError.textContent = "";

    let valid = true;

    if (email.value.trim() === "") {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      emailError.textContent = "Enter a valid email.";
      valid = false;
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "Password is required.";
      valid = false;
    }

    if (!valid) return;

    const users = getUsers();
    const user = users.find(function (u) {
      return u.email === email.value.trim() && u.password === password.value.trim();
    });

    if (!user) {
      globalError.textContent = "Incorrect email or password.";
      return;
    }

    saveCurrentUser(user);
    window.location.href = "profile.html";
  });
}