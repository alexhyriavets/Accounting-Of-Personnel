var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Import User Module Containing Functions Related To User Data
var user = require('../models/user');
var employee = require('../models/employee');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/login', async function(req, res, nex) {
    const params = req.body;
    let users = null;

    users = await user.getAllUsers();

    const filteredUsers = users.filter(u => {
        return u.email === params.email &&
               u.password === params.password;
    })

    if (filteredUsers.length) {
        let user = filteredUsers[0];
        res.json({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            token: 'fake-jwt-token'
        });
    } else {
        res.statusMessage = `This combination of email and password doesn't exist. Please try again.`;
        res.status(202).end();
    }

});

app.get('/get_employees', async (req, res) => {
    let employees = await employee.getEmployees();
    res.json(employees);
});

app.post('/get_employeeDetail', async (req, res) => {
    const tab = req.body.tab;

    let empDetails = await employee.getEmployeeDetail(tab);
    res.json(empDetails);
})

app.get('/get_positionsName', async (req, res) => {
    const positions = await employee.getPositions();
    res.json(positions);
})

app.get('/get_subdivisionsName', async (req, res) => {
    const subdivisions = await employee.getSubdivisions();
    res.json(subdivisions);
})

app.post('/get_departmentsBySubdivision', async (req, res) => {
    const subdivision = req.body.subdivision;
    
    const departments = await employee.getDepartmentsBySubdivision(subdivision);
    res.json(departments);
})

app.post('/get_staffing', async (req, res) => {
    const subdivision = req.body.subdivision;

    const staffing = await employee.getStaffing(subdivision);

    const staff = {
        subdivision: staffing[0].subdivision,
        info: [],
    };

    for (let i = 0; i < staffing.length; i++) {
        staff.info.push({
            position: staffing[i].position,
            count: staffing[i].count,
            code: staffing[i].code
        });
    }

    res.json(staff);
})

app.get('/get_employeesCount', async (req, res) => {
    const count = await employee.getEmployeesCount();
    res.json(count);
})

app.post('/add_person', (req, res) => {
    const data = req.body;

    employee.addPerson(data, (err, info) => {
        if (err) throw err;
        user.sendResponse(true, res);
    });
})

app.post('/add_employee', (req, res) => {
    const data = req.body;

    employee.addEmployee(data, (err, info) => {
        if (err) throw err;
        user.sendResponse(true, res);
    });
})

app.post('/get_personIdByName', async (req, res) => {
    const fullName = req.body.fullName;

    const id = await employee.getPersonIdByName(fullName);
    res.json(id);
})

app.put('/edit_employeeInfo', (req, res) => {
    const data = req.body;

    employee.editEmployeeInfo(data, (err, info) => {
        if (err) throw err;
        employee.sendResponse(true, res);
    })
})

app.put('/dissmis_employee', (req, res) => {
    const data = req.body;

    employee.dismissEmployee(data), (err, info) => {
        if (err) throw err;
        employee.sendResponse(true, res);
    }
})

app.post('/get_posDet', async (req, res) => {
    const info = req.body;

    const data = await employee.getPositionDetail(info);
    res.json(data);
})

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}


module.exports = app;