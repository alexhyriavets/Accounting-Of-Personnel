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


module.exports.getEmployees = () => {
    const query = `
        select employee.tab_number tab, person.fullName name, position.name position, department.name department, subdivision.name subdivision, employee.arrivalDate arrival
        from employee
        join person on (person_id = person.id)
        join position on (position_code = position.code)
        join department on (department_id = department.id)
        join subdivision on (subdivision_id = subdivision.id);    
    `;

    return new Promise((resolve, c) => {
        connection.query(query, (err, rows, fields) => {
            if (err) return reject(err);
            else resolve(rows);
        });
    });
}