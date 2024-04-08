require('dotenv').config();

const db = require('../db');
const methodes = require('../functions/index')
const database = 'attendees'

// Get Attendees
async function getMultiple() {
    const query = `SELECT * FROM ${database}`
    const result = await db.query(query);

    return result
}

// Get Attendees by Reference
async function getOneAttendee(reference) {
    // Get Attendee
    const query = `SELECT * FROM ${database} WHERE reference = ?`
    const params = [reference];
    let result = await db.query(query, params);
    const data = result[0]

    // Get Attendee's Sessions
    const querySession = `SELECT * FROM sessions WHERE id = ?`
    const sessionParams = [data.session_id]
    let resultSession = await db.query(querySession, sessionParams);

    const mergedData = {
        ...data,
        session: resultSession && resultSession.length > 0 ? resultSession[0] : null,
    }

    if(data) {
        return mergedData
    } else {
        return null
    }
}

// Post Attendee
async function create(attendee) {
    const reference = methodes.makeid(10)

    const parameters = [
        reference,
        attendee.first_name,
        attendee.last_name,
        attendee.city,
        attendee.mobile,
        attendee.status,
    ];

    // Check required Fields
    for (let i = 0; i < parameters.length; i++) {
        if (parameters[i] === undefined) {
            parameters[i] = null;
        }
    }

    // Post into Database
    const result = await db.query(
        `INSERT INTO ${database} 
        (reference, first_name, last_name, city, mobile, status) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`,
        parameters
    );

    let message = null;

    if (result.affectedRows) {
        return {
            message: 'Attendee created successfully',
            reference: reference
        }
    } else {
        return message = 'Error in creating attendee';
    }

    return { message };
}

module.exports = {
    getMultiple,
    getOneAttendee,
    create
}