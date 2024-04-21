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

// GET One content record with Code
router.get('/:code', async function (req, res, next) { 
    const code = req.params.code 
    try { 
        const result = await contentTable.gContent(code)
 
        if (result) { 
            res.status(200).json(result); // HTTP 200 OK for success 
        } else { 
            res.status(404).json({ message: 'Content text is not found' }); // HTTP 400 Bad Request for failure 
        } 
         
 
    } catch (err) { 
        console.error(`Error while getting content text with reference`, err.message); 
        next(err); 
    } 
});

module.exports = router;