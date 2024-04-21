require('dotenv').config();

const db = require('../db');
const methodes = require('../functions/index')
const database = 'content'

// Get content
async function getMultiple() {
    const query = `SELECT * FROM ${database}`
    const result = await db.query(query);

    return result
}

// Get Content by code
async function gContent(code) { 
    const query = `SELECT * FROM ${database} WHERE code = ?` 
    const params = [code]; 
    let result = await db.query(query, params); 
    const data = result[0] 

    return data
} 

module.exports = {
    getMultiple,
    gContent
}