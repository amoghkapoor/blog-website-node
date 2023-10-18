const express = require("express")
const Blog = require("../models/blog")

const router = express.Router()

router.get("/", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All Blogs", blogs: result })
        })
        .catch((error) => { console.log(error) })
})

router.post("/", (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        })
        .catch((error) => { console.log(error) })
})

router.get("/create", (req, res) => {
    res.render("create", { title: "Create a new Blog" })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result })
        })
        .catch((error) => { console.log(error) })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router