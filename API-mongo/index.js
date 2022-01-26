const express = require('express');
const app = express();

const mongoose = require('mongoose');
const players = require('./routes/players');
const cors = require("cors");
app.use(cors())
const objects = require('./routes/objects');
const matches = require('./routes/matches');
const port = 5000;
app.use(express.json());
app.use('/players', players);
app.use('/objects', objects);
app.use('/matches', matches);





mongoose.connect('mongodb://localhost:27017/tennis_league').then(() => {
    console.log('Connected to mongoDB');
    app.listen(port, () => {
        console.log(`App is listening at port ${port}`);
    });
}).catch(e => console.log(e))



