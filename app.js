const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 1337;

// Importing route files
const index = require('./routes/index');
const reports = require('./routes/reports');

// MIDDLEWEAR

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add a route
app.use('/', index);
app.use('/reports', reports);

// app.get("/", (req, res) => {
//     const data = {
//         data: {
//             msg: "Hello World"
//         }
//     };

//     res.json(data);
// });

// Testing routes with method
// app.get("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a GET request"
//         }
//     });
// });

// app.post("/user", (req, res) => {
//     res.status(201).json({
//         data: {
//             msg: "Got a POST request, sending back 201 Created"
//         }
//     });
// });

// app.put("/user", (req, res) => {
//     // PUT requests should return 204 No Content
//     res.status(204).send();
// });

// app.delete("/user", (req, res) => {
//     // DELETE requests should return 204 No Content
//     res.status(204).send();
// });

app.get('/hello/:msg', (req, res) => {
    const data = {
        data: {
            msg: req.params.msg,
        },
    };

    res.json(data);
});

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        errors: [
            {
                status: err.status,
                title: err.message,
                detail: err.message,
            },
        ],
    });
});

// Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
