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

// GET One Spend with Reference 
router.get('/:reference', async function (req, res, next) { 
    const reference = req.params.reference
    try { 
        const result = await spendsTable.getOneSpend(reference)
 
        if (result) { 
            res.status(200).json(result); // HTTP 200 OK for success 
        } else { 
            res.status(404).json({ message: 'Spend is not found' }); // HTTP 400 Bad Request for failure 
        } 
         
 
    } catch (err) { 
        console.error(`Error while getting Spend with reference`, err.message); 
        next(err); 
    } 
});

module.exports = router;