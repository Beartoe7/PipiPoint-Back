const router = require("express").Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const saltRounds = 10;

// POST| AUTH/SIGNUP
router.post("/signup", (req, res, next) => {

    const { username, password } = req.body;

    //comprobaciones de username y password

    User.find({username})
    .then(response => {
        console.log(response);
        if(response.length != 0) {
            res.json({error: "el usuario ya existe"});
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


// POST| AUTH/LOGIN
router.post("/login", (req, res, next) => {

    const {username, password} = req.body;

    User.findOne({username})
    .then(result => {
        if(!result) {
            res.json({error: "credenciales incorrectas - user"});
            return;
        }
        if(!bcrypt.compareSync(password, result.password)) {
            res.json({error: "credenciales incorrectas - pw"});
            return;
        }

        let payload = {username, saludo: "Hola soy el payload de login"};
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: "24h" })
        res.json({authToken});
    })
});


// GET| AUTH/VERIFY
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.json(req.payload);
});

module.exports = router;
