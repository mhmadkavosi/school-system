const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const ErrorHandler = require('./api/controllers/errorController');
const ErrorResponse = require('./api/utils/errorResponse');
const quizRoute = require('./api/routes/quizRoute');
const bookRoute = require('./api/routes/bookRoute');
const classRoute = require('./api/routes/classRoute');
const userRoute = require('./api/routes/userRoute');
const authRoute = require('./api/routes/authRoute');

dotenv.config({ path: './config.env' });

const app = express();

//  Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// TODO : image Upload : After FrontEnd
// TODO : handle static file : After FrontEnd
// TODO : quiz functionality : After FrontEnd
// Conect to the database
const db = process.env.LOCAL_DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    config: { autoIndex: false },
  })
  .then(() => console.log('Database was successfuly connected....!'));

// Create server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

// ROUTEs
app.use('/api/v1/quiz', quizRoute);
app.use('/api/v1/book', bookRoute);
app.use('/api/v1/class', classRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);

// Unhandled routes
app.all('*', (req, res, next) => {
  next(
    new ErrorResponse(`Cant't find ${req.originalUrl} on this server!`, 404)
  );
});

// use global handler Middleware for handel errors
app.use(ErrorHandler);
