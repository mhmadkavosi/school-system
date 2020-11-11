const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const quizRoute = require('./api/routes/quizRoute');
const bookRoute = require('./api/routes/bookRoute');
const classRoute = require('./api/routes/classRoute');
const studentRoute = require('./api/routes/studentRoute');
const teacherRoute = require('./api/routes/teacherRoute');

dotenv.config({ path: "./config.env" });

const app = express();

//  Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Conect to the database
const db = process.env.LOCAL_DATABASE;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("Database was successfuly connected....!"));


// Create server
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});



// ROUTEs
app.use('/api/v1/quiz', quizRoute);
app.use('/api/v1/book', bookRoute);
app.use('/api/v1/class', classRoute);
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/teacher', teacherRoute);


// Unhandled routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't finde ${req.originalUrl} on this server`
    });
});