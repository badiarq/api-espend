const express = require('express');
const router = express.Router();
const participantsTable = require('../services/categories');

// GET categories records
router.get('/', async function (req, res, next) {
    try {
        res.json(await categoriesTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting categories records `, err.message);
        next(err);
    }
});

module.exports = router;