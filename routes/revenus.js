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

// GET One Revenue with Reference 
router.get('/:reference', async function (req, res, next) { 
    const reference = req.params.reference
    try { 
        const result = await revenusTable.getOneRevenue(reference)
 
        if (result) { 
            res.status(200).json(result); // HTTP 200 OK for success 
        } else { 
            res.status(404).json({ message: 'Revenue is not found' }); // HTTP 400 Bad Request for failure 
        } 
         
 
    } catch (err) { 
        console.error(`Error while getting Revenue with reference`, err.message); 
        next(err); 
    } 
});

module.exports = router;