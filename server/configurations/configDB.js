const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/x-highcharts',
    {
        useNewUrlParser: true,
    }, (err, db) => {
        if (err)
            console.log(err);
        else {
            console.log('Database connected !!!');

        }
    }
);