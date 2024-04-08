const express = require('express');
const router = express.Router();
const attendees = require('../services/attendees');

// GET Attendees
router.get('/', async function (req, res, next) {
    try {
        res.json(await attendees.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting attendees `, err.message);
        next(err);
    }
});

// GET One Attendee with Reference
router.get('/:reference', async function (req, res, next) {
    const reference = req.params.reference
    try {
        const result = await attendees.getOneAttendee(reference)

        if (result) {
            res.status(200).json(result); // HTTP 200 OK for success
        } else {
            res.status(404).json({ message: 'Attendee is not found' }); // HTTP 400 Bad Request for failure
        }
        

    } catch (err) {
        console.error(`Error while getting attendees with reference`, err.message);
        next(err);
    }
});

/* POST Attendee */
router.post('/', async function(req, res, next) {
    try {
        const result = await attendees.create(req.body);

        if (result) {
            res.status(200).json(result); // HTTP 200 OK for success
        } else {
            res.status(400).json(result); // HTTP 400 Bad Request for failure
        }
        
    } catch (err) {
        console.error(`Error while creating attendee`, err.message);
        res.status(500).json({ error: 'Une erreur est survenue' });
        next(err);
    }
});

module.exports = router;