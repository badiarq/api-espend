const express = require('express');
const router = express.Router();
const sessions = require('../services/sessions');

// GET Sessions
router.get('/', async function (req, res, next) {
    try {
        res.json(await sessions.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting sessions `, err.message);
        next(err);
    }
});
module.exports = router;