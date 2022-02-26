const express = require('express');
const cors = require('cors');
const connection = require('./configurations/configDB');
const authentication = require('./routes/authenticationRoutes');
const user = require('./routes/userRoutes');
let app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} `);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('images'));
app.use(authentication);
app.use(user);

app.get("/", (req, res) => {
    res.send("connected successfully !!")
});