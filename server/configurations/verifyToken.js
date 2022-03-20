const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const config = process.env;

// Google Authentication
const CLIENT_ID = "-.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const verifyToken = (req, res, next) => {
    //const token = req.body.token || req.query.token || req.headers["x-access-token"];
    let token = req.headers.authorization;
    const { type } = req.body;
    if (!token) {
        return res.status(403).send({ message: "A token is required for authentication" });
    }
    token = token.substring(7);
    console.log(token);
    try {
        if (type === "googleOAuth")
            client.verifyIdToken({ idToken: token, audience: CLIENT_ID });
        else {
            const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
            req.user = decoded;
        }
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" });
    }
    return next();

};

module.exports = verifyToken;
