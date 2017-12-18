var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'accounting-of-personnel_db'
});

connection.connect(function() {
    console.log("Database connected successfully!");
});

module.exports.getAllUsers = () => {
    return new Promise((resolve, c) => {
        connection.query('select * from user', (err, rows, fields) => {
            if (err) return reject(err);
            else resolve(rows);
        });
    });
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}

