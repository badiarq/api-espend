const express = require('express');
const router = express.Router();
const spendsTable = require('../services/spends');

// GET spends records
router.get('/', async function (req, res, next) {
    try {
        res.json(await spendsTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting spends records `, err.message);
        next(err);
    }
});

module.exports = router;