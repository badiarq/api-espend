const express = require('express');
const router = express.Router();
const contentTable = require('../services/content');

// GET content records
router.get('/', async function (req, res, next) {
    try {
        res.json(await contentTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting content records `, err.message);
        next(err);
    }
});

module.exports = router;