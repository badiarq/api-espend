require('dotenv').config();

const db = require('../db');
const methodes = require('../functions/index')
const database = 'sub_categories'

// Get sub_categories
async function getMultiple() {
    const query = `SELECT * FROM ${database}`
    const result = await db.query(query);

    return result
}

// Get subCategory by Reference 
async function getOneSubCategory(reference) { 
    // Get subCategory 
    const query = `SELECT * FROM ${database} WHERE reference = ?` 
    const params = [reference]; 
    let result = await db.query(query, params); 
    const data = result[0] 
 
    // Add the Category of the SubCategory
    const queryCategory = `SELECT * FROM categories WHERE id = ?` 
    const categoryParams = [data.categories_id]
    let resultCategory = await db.query(queryCategory, categoryParams); 
 
    const mergedData = { 
        ...data, 
        category_label: resultCategory && resultCategory.length > 0 ? resultCategory[0].category_label : null, 
    } 
 
    if(data) { 
        return mergedData 
    } else { 
        return null 
    } 
} 

module.exports = {
    getMultiple,
    getOneSubCategory
}