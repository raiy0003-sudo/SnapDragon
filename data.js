const defaultPosts = [
  {
    id: 1,
    username: "latecoffee22",
    title: "Tired all the time",
    category: "Burnout",
    content: [
      "I have been feeling tired for a while, but lately it feels different.",
      "Everything feels heavier than it should."
    ],
    comments: [
      { username: "mia_studies", text: "This sounds like burnout." },
      { username: "jamie_47", text: "You are not alone." }
    ]
  },
  {
    id: 2,
    username: "mia_studies",
    title: "I feel off lately",
    category: "Loneliness",
    content: [
      "Nothing is wrong but I do not feel like myself.",
      "I feel disconnected from everything."
    ],
    comments: [
      { username: "riley_notes", text: "I understand this feeling." }
    ]
  }
];

function getPosts() {
  let posts = localStorage.getItem("snapdragonPosts");
  if (!posts) {
    localStorage.setItem("snapdragonPosts", JSON.stringify(defaultPosts));
    posts = JSON.stringify(defaultPosts);
  }
  return JSON.parse(posts);
}

function savePosts(posts) {
  localStorage.setItem("snapdragonPosts", JSON.stringify(posts));
}

function getUsers() {
  let users = localStorage.getItem("snapdragonUsers");
  if (!users) {
    localStorage.setItem("snapdragonUsers", JSON.stringify([]));
    users = JSON.stringify([]);
  }
  return JSON.parse(users);
}

function saveUsers(users) {
  localStorage.setItem("snapdragonUsers", JSON.stringify(users));
}

function getCurrentUser() {
  const user = sessionStorage.getItem("snapdragonCurrentUser");
  return user ? JSON.parse(user) : null;
}

function saveCurrentUser(user) {
  sessionStorage.setItem("snapdragonCurrentUser", JSON.stringify(user));
}

function logoutUser() {
  sessionStorage.removeItem("snapdragonCurrentUser");
}