//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require("lodash");

const homeStartingContent = "Aenean semper lorem vitae ante ullamcorper, eget tincidunt nulla pretium. Quisque sed mauris turpis. Proin sed erat non dui efficitur fringilla. Mauris semper pulvinar mi, vel posuere sapien volutpat et. Etiam nibh urna, mollis a neque non, interdum viverra turpis. Vivamus accumsan malesuada elit, vitae tristique odio dapibus vitae. Proin ex nisi, congue vitae posuere lobortis, aliquet a diam. Sed iaculis venenatis risus, in efficitur mauris tincidunt non. Quisque posuere dolor justo, ac viverra lectus dictum ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed blandit congue dignissim.";
const aboutContent = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pharetra, purus at luctus commodo, lorem neque lobortis dolor, vel fringilla libero leo vitae justo. Nullam porta auctor magna non consectetur. Ut vel elit id massa tincidunt mollis vel non leo. Vivamus urna magna, cursus aliquam tempus at, sollicitudin eget enim. Vivamus arcu nibh, ultrices eu felis quis, gravida sagittis sem. Duis maximus pharetra vehicula. Vestibulum vestibulum consectetur purus eget suscipit. Donec porta tortor eget vehicula congue. Donec tincidunt mi quis diam eleifend scelerisque.";
const contactContent = " Address: kailash Nagar, Indore,Madhya Pradesh Phone No:5678912345 Email ID: Mighu24@gmail.com Copyright @ 2023 Anvesh Mishra | All rights reserved. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function (req, res) {

  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});



app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/l", function (req, res) {
  res.render("l");
});

app.get("/x", function (req, res) {
  res.render("x");
});
app.get("/y", function (req, res) {
  res.render("y");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
