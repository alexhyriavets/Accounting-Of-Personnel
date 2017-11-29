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

module.exports.getEmployeeDetail = (tab) => {
    const query = `
        select employee.tab_number tab, person.adress, person.fullName name, person.patronymic patronymic,
            person.birthDate, employee.arrivalDate, employee.dismissalDate, person.sex,
            subdivision.name subdivision, department.name department, position.salary,
            employee.employment, employee.rate, position.name position
        from employee
        join person on (person_id = person.id)
        join subdivision on (subdivision_id = subdivision.id)
        join department on (department_id = department.id)
        join position on (position_code = position.code)
        where tab_number = ${tab};
    `;

    return new Promise ((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) return reject(err);
            else resolve(rows);
        });
    });
}

module.exports.getPositions = () => {
    const query = `
        select position.name position
        from position;
    `;
    
    return new Promise ((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) return reject(err);
            else resolve(rows);
        });
    });
}

module.exports.getSubdivisions = () => {
    const query = `
        select subdivision.name subdivision
        from subdivision;
    `;
    
    return new Promise ((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) return reject(err);
            else resolve(rows);
        });
    });
}

module.exports.getDepartmentsBySubdivision = (subdivision) => {
    const query = `
        select name from department where id in 
        (select department_id from sub_dep where subdivision_id in
        (select id from subdivision where name = '${subdivision}'));
    `;

    return new Promise ((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) return reject(err);
            else resolve(rows);
        });
    });
}