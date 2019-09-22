const db = require('../db/database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

let config;

try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const jwtSecret = process.env.JWT_SECRET || config.secret;

const auth = {
    register: (res, body) => {
        const name = body.name;
        const email = body.email;
        const password = body.password;
        const birthday = body.birthday;

        if (!name || !email || !password || !birthday) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/register',
                    title: 'Email or password missing',
                    detail: 'Email or password missing in request',
                },
            });
        }

        bcrypt
            .hash(password, 10)
            .then(function(hash) {
                // Store hash in your password DB.
                db.run(
                    'INSERT INTO users (name, email, password, birthday) VALUES (?, ?, ?, ?)',
                    name,
                    email,
                    hash,
                    birthday,
                    err => {
                        if (err) {
                            // returnera error
                            return res.status(500).json({
                                errors: {
                                    status: 500,
                                    source: '/register',
                                    title: 'Database error',
                                    detail: err.message,
                                },
                            });
                        }
                        // returnera korrekt svar
                        return res.status(201).json({
                            data: {
                                message: 'User successfully registered.',
                            },
                        });
                    },
                );
            })
            .catch(err => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/register',
                        title: 'bcrypt error',
                        detail: 'bcrypt error',
                    },
                });
            });
    },

    login: (res, body) => {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/login',
                    title: 'Email or password missing',
                    detail: 'Email or password missing in request',
                },
            });
        }

        db.get('SELECT * FROM users WHERE email = ?', email, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/login',
                        title: 'Database error',
                        detail: err.message,
                    },
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: '/login',
                        title: 'User not found',
                        detail: 'User with provided email not found.',
                    },
                });
            }

            const user = rows;

            bcrypt
                .compare(password, user.password)
                .then(function(result) {
                    if (result) {
                        // res == true
                        let payload = {
                            name: user.name,
                            email: user.email,
                            birthday: user.birthday,
                        };
                        let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

                        return res.json({
                            data: {
                                type: 'success',
                                message: 'User logged in',
                                user: payload,
                                token: jwtToken,
                            },
                        });
                    }
                    // res == false
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: '/login',
                            title: 'Wrong password',
                            detail: 'Password is incorrect.',
                        },
                    });
                })
                .catch(function(err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: '/login',
                            title: 'bcrypt error',
                            detail: err.message,
                            // detail: "bcrypt error"
                        },
                    });
                });
        });
    },
};

module.exports = auth;
