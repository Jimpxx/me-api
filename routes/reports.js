var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
//     const data = {
//         data: {
//             msg: "Got a GET request for a user"
//         }
//     };

//     res.json(data);
// });

// router.get('/', function(req, res, next) {
//     const data = {
//         data: {
//             msg: "Got a GET request for a user"
//         }
//     };

//     res.json(data);
// });

// router.get("/", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a GET request for all user"
//         }
//     });

// });

router.get("/:kmom", (req, res) => {
    const data = {
        data: {
            msg: req.params.kmom
        }
    };
    
    res.json(data);
});

router.post("/", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request for a user, sending back 201 Created"
        }
    });
});

router.put("/", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

router.delete("/", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});

module.exports = router;