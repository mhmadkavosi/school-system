const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(morgan('dev'));


const db = process.env.LOCAL_DATABASE;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("Database was successfuly connected....!"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});


app.use('/', (req, res, next) => {
    res.send("Hello World!");
});