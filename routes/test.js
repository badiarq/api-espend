const express = require('express');
const router = express.Router();
const testTable = require('../services/test');

// GET test records
router.get('/', async function (req, res, next) {
    try {
        res.json(await testTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting test records `, err.message);
        next(err);
    }
});

module.exports = router;