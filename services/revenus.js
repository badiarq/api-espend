require('dotenv').config();

const db = require('../db');
const methodes = require('../functions/index')
const database = 'revenus'

// Get all Revenues
async function getMultiple() {
    const query = `SELECT * FROM ${database}`
    const result = await db.query(query);

    return result
}

// Get One Revenue by Reference 
async function getOneRevenue(reference) { 
    // Get Revenue 
    const query = `SELECT * FROM ${database} WHERE reference = ?` 
    const params = [reference]; 
    let result = await db.query(query, params); 
    const data = result[0] 
 
    // Add the Category of the Revenue
    const queryCategory = `SELECT * FROM categories WHERE id = ?` 
    const categoryParams = [data.categories_id]
    let resultCategory = await db.query(queryCategory, categoryParams);
    let mergedData = { 
        ...data, 
        category_label: resultCategory && resultCategory.length > 0 ? resultCategory[0].category_label : null, 
    }

    // Add the SubCategory of the Revenue
    const querySubCategory = `SELECT * FROM sub_categories WHERE id = ?` 
    const subCategoryParams = [data.sub_categories_id]
    let resultSubCategory = await db.query(querySubCategory, subCategoryParams);
    mergedData = { 
        ...mergedData, 
        subcategory_label: resultSubCategory && resultSubCategory.length > 0 ? resultSubCategory[0].subcategory_label : null, 
    }

    // Add the Participant of the Revenue
    const queryParticipant = `SELECT * FROM participants WHERE id = ?` 
    const participantParams = [data.participants_id]
    let resultParticipant = await db.query(queryParticipant, participantParams);
    mergedData = { 
        ...mergedData, 
        participant_name: resultParticipant && resultParticipant.length > 0 ? resultParticipant[0].name : null, 
    }
 
    if(data) { 
        return mergedData
    } else { 
        return null 
    } 
} 

module.exports = {
    getMultiple,
    getOneRevenue
}