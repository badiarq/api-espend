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

// GET One participant with Reference 
router.get('/:reference', async function (req, res, next) { 
    const reference = req.params.reference 
    try { 
        const result = await participantsTable.getOneParticipant(reference)
 
        if (result) { 
            res.status(200).json(result); // HTTP 200 OK for success 
        } else { 
            res.status(404).json({ message: 'Participant is not found' }); // HTTP 400 Bad Request for failure 
        } 
         
 
    } catch (err) { 
        console.error(`Error while getting participant with reference`, err.message); 
        next(err); 
    } 
}); 

module.exports = router;