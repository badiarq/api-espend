const express = require('express');
const router = express.Router();
const usersTable = require('../services/users');

// GET users records
router.get('/', async function (req, res, next) {
    try {
        res.json(await usersTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting users records `, err.message);
        next(err);
    }
});

module.exports = router;