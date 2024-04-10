const express = require('express');
const router = express.Router();
const participantsTable = require('../services/participants');

// GET participants records
router.get('/', async function (req, res, next) {
    try {
        res.json(await participantsTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting participants records `, err.message);
        next(err);
    }
});

module.exports = router;