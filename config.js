require('dotenv').config();

const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT, 10),
        connectionLimit: 200,
    },
    listPerPage: parseInt(process.env.LIST_PER_PAGE, 10),
}

module.exports = config;