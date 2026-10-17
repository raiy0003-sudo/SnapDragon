const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));


// View Engine (Pug)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/snapdragonDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Models

// User Model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// Post Model
const commentSchema = new mongoose.Schema({
  username: String,
  text: String
});

const postSchema = new mongoose.Schema({
  username: String,
  title: String,
  category: String,
  content: [String],
  comments: [commentSchema]
});

const Post = mongoose.model("Post", postSchema);


// Page Routes (Pug)

// Homepage
app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
});

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Register page
app.get("/register", (req, res) => {
  res.render("register");
});

// Create post page
app.get("/createpost", (req, res) => {
  res.render("createpost");
});

// Profile page
app.get("/profile", (req, res) => {
  res.render("profile");
});

// Single post page
app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
});


// AUTH ROUTES

// Register user
app.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password
  });

  await newUser.save();

  res.redirect("/login");
});

// Login user
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.send("Invalid login");
  }

  res.redirect("/profile");
});


// POST ROUTES

// Create post
app.post("/posts/create", async (req, res) => {
  const { username, title, category, content } = req.body;

  const newPost = new Post({
    username,
    title,
    category,
    content: [content],
    comments: []
  });

  await newPost.save();

  res.redirect("/");
});

// Add comment
app.post("/posts/:id/comment", async (req, res) => {
  const { username, text } = req.body;

  const post = await Post.findById(req.params.id);

  post.comments.push({ username, text });

  await post.save();

  res.redirect("/post/" + req.params.id);
});


// Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});