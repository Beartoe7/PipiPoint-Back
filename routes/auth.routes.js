const router = require("express").Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const saltRounds = 10;

router.post("/signup", (req, res, next) => {

    const { username, password,  } = req.body;

    //comprobaciones de username y password

    User.find({username})
    .then(response => {
        console.log(response);
        if(response.length != 0) {
            res.json({error: "The user already exists"});
            return;
        }

        let salt = bcrypt.genSaltSync(saltRounds);
        let passwordEnc = bcrypt.hashSync(password, salt);

        return User.create({username, password: passwordEnc})
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => next(err))
});

router.post("/login", (req, res, next) => {

    const {username, password} = req.body;

    User.findOne({username})
    .then(result => {
        if(!result) {
            res.json({error: "Incorrect Credentials - user"});
            return;
        }
        if(!bcrypt.compareSync(password, result.password)) {
            res.json({error: "Incorrect Credentials- pw"});
            return;
        }

        let payload = {username, saludo: "Hello I am the payload"};
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: "24h" })
      
        res.json({authToken});
    })
});

router.get("/verify", isAuthenticated, (req, res, next) => {
    res.json(req.payload);
});

module.exports = router;
