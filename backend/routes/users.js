const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  resumeProfile,
  resumeAvatar,
  resumeNowProfile,
} = require('../controllers/users');
const { imgConst } = require('../utils/constants');

router.get('/', getUsers);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(imgConst),
  }),
}), resumeAvatar);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), resumeProfile);

router.get('/me', resumeNowProfile);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);

module.exports = router;
