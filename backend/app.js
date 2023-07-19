const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const cors = require('cors');
const cardsRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const { auth } = require('./middlewares/auth');
const error = require('./middlewares/error');
const { NotFoundError } = require('./error/NotFoundError');
const { imgConst } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/users');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4000', credentials: true }));
app.use(helmet());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(imgConst),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

app.use('/*', () => {
  throw new NotFoundError('Inncorect link');
});
app.use(errorLogger);
app.use(errors());

app.use(error);

app.listen(PORT);
