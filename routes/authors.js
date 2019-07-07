const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//Get all authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

//New author
router.get("/new", (req, res) => {
  try {
    res.render("authors/new", { author: new Author() });
  } catch (error) {
    res.send({ message: error });
  }
});

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`authours/${newAuthor.id}`);
    res.redirect("authors");
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author!"
    });
  }
});

module.exports = router;
