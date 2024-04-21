const express = require('express');
const router = express.Router();
const sub_categoriesTable = require('../services/sub_categories');

// GET sub_categories records
router.get('/', async function (req, res, next) {
    try {
        res.json(await sub_categoriesTable.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting sub_categories records `, err.message);
        next(err);
    }
});

// GET One subcategory with Reference 
router.get('/:reference', async function (req, res, next) { 
    const reference = req.params.reference 
    try { 
        const result = await sub_categoriesTable.getOneSubCategory(reference)
 
        if (result) { 
            res.status(200).json(result); // HTTP 200 OK for success 
        } else { 
            res.status(404).json({ message: 'subcategory is not found' }); // HTTP 400 Bad Request for failure 
        } 
         
 
    } catch (err) { 
        console.error(`Error while getting subcategory with reference`, err.message); 
        next(err); 
    } 
});

module.exports = router;