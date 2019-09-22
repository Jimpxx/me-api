const db = require('../db/database.js');

const reports = {
    getAllReports: res => {
        let sql = `SELECT * FROM reports`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/reports',
                        title: 'Database error',
                        detail: err.message,
                    },
                });
            }

            const reports = rows;

            return res.json({
                data: {
                    type: 'success',
                    reports: reports,
                },
            });
        });
    },
    getOneReport: (res, kmom) => {
        let sql = `SELECT * FROM reports WHERE week = ?;`;

        db.get(sql, [kmom], (err, row) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/reports',
                        title: 'Database error',
                        detail: err.message,
                    },
                });
            }

            const report = row;

            return res.json({
                data: {
                    type: 'success',
                    report: report,
                },
            });
        });
    },

    addReport: (res, body) => {
        const week = body.week;
        const title = body.title;
        const text = body.text;

        if (!week || !title || !text) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/reports',
                    title: 'Week, title or text missing',
                    detail: 'Week, title or text missing',
                },
            });
        }

        db.run(
            'INSERT INTO reports (week, title, text) VALUES (?, ?, ?)',
            week,
            title,
            text,
            err => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: '/reports',
                            title: 'Database error',
                            detail: err.message,
                        },
                    });
                }
                return res.status(201).json({
                    data: {
                        message: 'Report successfully Created.',
                    },
                });
            },
        );
    },

    editReport: (res, body) => {
        const week = body.week;
        const title = body.title;
        const text = body.text;

        if (!week || !title || !text) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/reports',
                    title: 'Week, title or text missing',
                    detail: 'Week, title or text missing',
                },
            });
        }

        db.run('UPDATE reports SET title = ?, text = ? WHERE week = ?', title, text, week, err => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/reports',
                        title: 'Database error',
                        detail: err.message,
                    },
                });
            }
            // return res.status(201).json({
            //     data: {
            //         message: 'Report successfully Created.',
            //     },
            // });
            return res.status(204).send();
        });
    },

    deleteReport: (res, body) => {
        const week = body.week;
        const title = body.title;
        const text = body.text;

        if (!week || !title || !text) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/reports',
                    title: 'Week, title or text missing',
                    detail: 'Week, title or text missing',
                },
            });
        }

        db.run('DELETE FROM reports WHERE week = ?', week, err => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/reports',
                        title: 'Database error',
                        detail: err.message,
                    },
                });
            }
            // return res.status(201).json({
            //     data: {
            //         message: 'Report successfully Created.',
            //     },
            // });
            return res.status(204).send();
        });
    },
};

module.exports = reports;
