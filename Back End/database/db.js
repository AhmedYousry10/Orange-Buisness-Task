const sql = require('mssql');

const config = {
    user: 'ahmedhelal',
    password: '12345',
    server: 'DESKTOP-USCB1HM',
    database: 'Library',
    options: {
        trustedConnection: true, // Use Windows Authentication
        encrypt: false, // Adjust if encryption is required
        trustServerCertificate: true, // Use true for development
        enableArithAbort: true, // Required to support BigInt data type
        instancename: 'SQLEXPRESS' // Specify SQL Server instance name
    },
    port: 1433 
};

module.exports = { config };
