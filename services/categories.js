require('dotenv').config();

const db = require('../db');
const methodes = require('../functions/index')
const database = 'categories'

// Get categories
async function getMultiple() {
    const query = `SELECT * FROM ${database}`
    const result = await db.query(query);

    return result
}

// Get Category by Reference 
async function getOneCategory(reference) { 
    const query = `SELECT * FROM ${database} WHERE reference = ?` 
    const params = [reference]; 
    let result = await db.query(query, params); 
    const data = result[0] 

    return data;
} 

module.exports = {
    getMultiple,
    getOneCategory
}