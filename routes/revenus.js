const express = require('express');
const router = express.Router();
const revenusTable = require('../services/revenus');

// GET revenus records
router.get('/', async function (req, res, next) {
    try {
        res.json(await revenusTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting revenus records `, err.message);
        next(err);
    }
});

module.exports = router;