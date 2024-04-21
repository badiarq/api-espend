const express = require('express');
const router = express.Router();
const categoriesTable = require('../services/categories');

// GET categories records
router.get('/', async function (req, res, next) {
    try {
        res.json(await categoriesTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting categories records `, err.message);
        next(err);
    }
});

// GET One catgory with Reference 
router.get('/:reference', async function (req, res, next) { 
    const reference = req.params.reference 
    try { 
        const result = await categoriesTable.getOneCategory(reference)
 
        if (result) { 
            res.status(200).json(result); // HTTP 200 OK for success 
        } else { 
            res.status(404).json({ message: 'Category is not found' }); // HTTP 400 Bad Request for failure 
        } 
         
 
    } catch (err) { 
        console.error(`Error while getting Category with reference`, err.message); 
        next(err); 
    } 
});

module.exports = router;