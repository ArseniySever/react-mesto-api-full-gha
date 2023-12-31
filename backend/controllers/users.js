const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { User } = require('../models/user');
const { ConflictError } = require('../error/ConflictError');
const { ValidationError } = require('../error/ValidationError');
const { NotFoundError } = require('../error/NotFoundError');
const { UnauthorizedError } = require('../error/UnauthorizedError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return next(new NotFoundError('User not found'));
      }
      return res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Invalid'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => {
          res.status(201).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'CastError' || err.name === 'Validation failed') {
            next(new ValidationError('Incorrect data'));
            return;
          } if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
            return;
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const resumeProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFoundError('Incorrect data');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotFoundError('Incorrect data'));
      } else {
        next(err);
      }
    });
};

const resumeAvatar = (req, res, next) => {
  const avatar = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    avatar,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
      } res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotFoundError('Incorrect data'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new UnauthorizedError('Incorrect data');
      } return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильная почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 604800000,
            httpOnly: true,
            sameSite: true,
          });
          return res.send({ token });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch(next);
};

const resumeNowProfile = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Invalid id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  resumeProfile,
  resumeAvatar,
  login,
  resumeNowProfile,
};
