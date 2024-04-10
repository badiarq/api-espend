const express = require('express');
const router = express.Router();
const participantsTable = require('../services/sub_categories');

// GET sub_categories records
router.get('/', async function (req, res, next) {
    try {
        res.json(await sub_categoriesTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting sub_categories records `, err.message);
        next(err);
    }
});

module.exports = router;