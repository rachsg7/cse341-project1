const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
    body('password')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .withMessage('Username or password is incorrect. Please try again.')
    .trim(),
    authController.postLogin);

router.post(
    '/signup',
    check('name')
    .isString()
    .isLength({ min: 3 }),
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email already exists, please pick a different one.');
                }
            })
    })
    .normalizeEmail(),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    })
    .trim(),
    authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;