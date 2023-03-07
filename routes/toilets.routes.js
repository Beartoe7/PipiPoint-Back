const router = require("express").Router();
const Toilet = require("../models/Toilet.model");

//posts/
router.get("/", (req, res, next) => {
    Toilet.find()
    .then(response => {
        res.json(response);
        console.log("hello its me from post.find")
    })
    .catch(err => next(err))
});

// /posts/new
router.post("/new", (req, res, next) => {
    const { title, description } = req.body;
    Toilet.create({ title, description })
    .then(response => {
        res.json({resultado: "ok"});
    })
    .catch(err => next(err))
});



module.exports = router;
