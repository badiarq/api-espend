require('dotenv').config();

const db = require('../db');
const methodes = require('../functions/index')
const database = 'users'

// Get users
async function getMultiple() {
    const query = `SELECT * FROM ${database}`
    const result = await db.query(query);

    return result
}

module.exports = {
    getMultiple
}