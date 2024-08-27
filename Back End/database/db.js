const sql = require('mssql');

const config = {
    user: 'ahmedhelal',
    password: '12345',
    server: 'DESKTOP-USCB1HM',
    database: 'Library',
    options: {
        trustedConnection: true, 
        encrypt: false, 
        trustServerCertificate: true, 
        enableArithAbort: true, 
        instancename: 'SQLEXPRESS' 
    },
    port: 1433 
};

module.exports = { config };
