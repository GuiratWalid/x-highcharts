const express = require('express');
const cors = require('cors');
const connection = require('./configurations/configDB');
const authentication = require('./routes/authenticationRoutes');
const user = require('./routes/userRoutes');
const category = require('./routes/categoryRoutes');
const chart = require('./routes/chartRoutes');
const project = require('./routes/projectRoutes');

let app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} `);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('images'));
app.use(authentication);
app.use(user);
app.use(category);
app.use(chart);
app.use(project);

app.get("/", (req, res) => {
    res.send("connected successfully !!")
});