const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const reports = require('../models/reports');

let config;

try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const jwtSecret = process.env.JWT_SECRET || config.secret;

// router.post('/', (req, res) => {
//     res.status(201).json({
//         data: {
//             msg: 'Got a POST request for a user, sending back 201 Created',
//         },
//     });
// });

router.post(
    '/',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body),
);

router.put(
    '/:kmom',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.editReport(res, req.body),
);

router.delete(
    '/:kmom',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.deleteReport(res, req.body),
);

// router.put('/:kmom', (req, res) => {
//     // PUT requests should return 204 No Content
//     res.status(204).send();
// });

router.delete('/', (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});

router.get('/', (req, res) => {
    return reports.getAllReports(res);
});

router.get('/:kmom', (req, res) => {
    return reports.getOneReport(res, req.params.kmom);
});

router.get('/kmom01', (req, res) => {
    const data = {
        data: {
            // msg: req.params.kmom,
            title: 'Kursmoment 01',
            text: 'I kursmoment 1 har vi lärt oss......',
        },
    };

    res.json(data);
});

router.get('/kmom02', (req, res) => {
    const data = {
        data: {
            // msg: req.params.kmom,
            title: 'Kursmoment 02',
            text: 'I kursmoment 2 har vi lärt oss......',
        },
    };

    res.json(data);
});

router.get('/kmom03', (req, res) => {
    const data = {
        data: {
            // msg: req.params.kmom,
            title: 'Kursmoment 03',
            text: 'I kursmoment 3 har vi lärt oss......',
        },
    };

    res.json(data);
});

// router.get('/:kmom', (req, res) => {
//     const data = {
//         data: {
//             msg: req.params.kmom,
//         },
//     };

//     res.json(data);
// });

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            // send error response
            console.log('Token INVALID');
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: '/reports',
                    title: 'JWT Error',
                    detail: err.message,
                },
            });
        }
        console.log('Token valid!');
        // Valid token send on the request
        next();
    });
}

module.exports = router;
