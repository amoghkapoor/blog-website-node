require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const blogRoutes = require("./routes/blogRoutes")

const app = express()
const PORT = process.env.PORT || 3000

const dbURI = process.env.DATABASE_URL

app.set("view engine", "ejs")
app.set("views", "views")
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { })
    .catch((error) => { console.log(error) })

app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000)

console.log(`Server running on port 3000`)

app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
})

app.use("/blogs", blogRoutes)

app.use((req, res) => {
    res.status(404).render("404")
})