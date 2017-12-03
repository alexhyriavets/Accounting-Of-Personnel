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

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}

// API Routes
// app.get('/get_emp', async(req, res) => {
//     let empls = await user.getAllUsers();
//     res.json(empls);
// });

// app.get('/get_fios', async(req, res) => {
//     let item = await user.getFIOs();
//     res.json(item);
// });

// app.post('/add_emp', (req, res) => {
//     const data = req.body;
//     console.log(data);
//     user.addEmployee(data, (err, info) => {
//         if (err) throw err;
//         user.sendResponse(true, res);
//     });
// })

// app.post('/signup', async function(req, res, next) {
//     let newUser = req.body;
//     console.log(newUser);
//     let users = null;
//     users = await user.findAll();
    
//     console.log(users);

//     let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
//     if (duplicateUser) {
//         res.statusMessage = 'Username "' + newUser.username + '" is already taken';
//         res.status(400).end();
//     }

//     //newUser.id = users.length + 1;
//     console.log(newUser);
//     user.encrypt(newUser, function(err, hash) {
//         newUser.password = hash;
//         user.addUser(newUser, function(err, info) {
//             if (err) throw err;
//             console.log(info);
//             user.sendResponse(true, res);
//         })
//     });
// });


// app.post('/adduser', function(req, res, next) {

//     var data = req.body;
//     console.log(data);
//     user.findByUsername(data.username, function(err, rows, fields) {
//         if (rows.length == 1) {
//             user.sendResponse(false, res);
//         } else {
//             user.encrypt(data, function(err, hash) {
//                 data = {
//                     username: data.username,
//                     hashedpassword: hash
//                 };
//                 user.addUser(data, function(err, info) {
//                     //if(err) throw err;
//                     console.log(info);
//                     user.sendResponse(true, res);
//                 });
//             });
//         };
//     });
// });

// app.delete('/deluser/:id', function(req, res, next) {
//     user.deleteUser(req.params.id, function(err, info) {
//         if (err) throw err;
//         console.log(info);
//         user.sendResponse(true, res);
//     });
// });

// app.get('/get_tasks', async(req, res) => {
//     let tasks = await user.getTasks();
//     tasks = tasks.map(el => JSON.parse(el.tasks));
//     console.log(tasks);
//     tasks = tasks.map(el => {
//         let answers = el.answers;
//         answers = answers[0];
//         answers = answers.slice(1,-1);
//         answers = answers.split('`,`');
//         answers = '{"answers":['.concat(answers, "]}");
//         el.answers = JSON.parse(answers).answers;
//         return el;
//     });
//     console.log(tasks);
//     res.json(tasks);
// });

// app.get('/get_disc', async(req, res) => {
//     let discs = await user.getDisc();
//     res.json(discs);
// });

// app.post('/create_disc', (req, res) => {
//     var data = req.body;
//     user.findByDiscipline(data.name, function(err, rows, fields) {
//         if (rows.length == 1) {
//             user.sendResponse(false, res);
//         } else {
//             user.addDiscipline(data, function(err, info) {
//                 if (err) throw err;
//                 console.log(info);
//                 user.sendResponse(true, res);
//             });
//         };
//     });
// });

// app.delete('/delete_disc', (req, res, next) => {
//     var data = req.body;
//     console.log(data);
//     user.deleteDiscipline(data.id, function(err, info) {
//         if (err) {
//             next(err);
//             return res.send({ 'success': 'false' });
//         }
//         console.log(info);
//         user.sendResponse(true, res);
//     });
// });

// app.put('/edit_disc', (req, res) => {
//     var data = req.body;
//     console.log(data);
//     admin.findByDiscipline(data.name, function(err, rows, fields) {
//         if (rows.length == 1) {
//             admin.sendResponse(false, res);
//         } else {
//             admin.editDiscipline(data, function(err, info) {
//                 if (err) throw err;
//                 console.log(info);
//                 admin.sendResponse(true, res);
//             });
//         };
//     });
// });

// app.get('/get_topics', async(req, res) => {
//     let topics = await admin.getTopics();
//     console.log(topics);
//     res.json(topics);
// });

// app.post('/topics_by_disc', async(req, res) => {
//     let data = req.body;
//     console.log(data);
//     let tasks = await admin.getTopics(data.id_discipline);
//     console.log(tasks);
//     res.json(tasks);
// })

// app.post('/create_topic', (req, res) => {
//     var data = req.body;
//     console.log(data);
//     admin.findByTopic(data.name, function(err, rows, fields) {
//         if (rows.length == 1) {
//             admin.sendResponse(false, res);
//         } else {
//             admin.addTopic(data, function(err, info) {
//                 if (err) throw err;
//                 console.log(info);
//                 admin.sendResponse(true, res);
//             });
//         };
//     });
// });

// app.delete('/delete_topic', (req, res, next) => {
//     var data = req.body;
//     console.log(data.id);
//     admin.deleteTopic(data.id, function(err, info) {
//         if (err) {
//             next(err);
//             return res.send({ 'success': 'false' });
//         }
//         console.log(info);
//         admin.sendResponse(true, res);
//     });
// });

// app.put('/edit_topic', (req, res) => {
//     var data = req.body;
//     console.log(data);
//     admin.findByTopic(data.name, function(err, rows, fields) {
//         if (rows.length == 1) {
//             admin.sendResponse(false, res);
//         } else {
//             admin.editTopic(data, function(err, info) {
//                 if (err) throw err;
//                 console.log(info);
//                 admin.sendResponse(true, res);
//             });
//         };
//     });
// });

// app.delete('/delete_question', (req, res, next) => {
//     var data = req.body;
//     console.log(data.id);
//     admin.deleteQuestion(data.id, function(err, info) {
//         if (err) {
//             next(err);
//             return res.send({ 'success': 'false' });
//         }
//         console.log(info);
//         admin.sendResponse(true, res);
//     });
// });

// app.post('/create_question', (req, res) => {
//     let data = req.body;
//     console.log(data); // {id_discipline, id_topic, question, answers}
//     let question = {}, id_question, answers;
//     question.id_topic = data.id_topic;
//     question.question = data.question; // {id_topic, question}
//     answers = data.answers;
//     admin.findByQuestion(question.question, function(err, rows, fields) {
//         if (rows.length == 1) {
//             admin.sendResponse(false, res);
//         } else {
//             admin.addQuestion(question, function(err, info) {
//                 if (err) throw err;
//                 console.log(info);
//                 id_question = info.insertId;
//                 let insert_aswers = [];
//                 answers.forEach(el => el.id_question = id_question);
//                 answers.forEach(i => insert_aswers.push([i.id_question, i.answer, i.isTrue]))
//                 console.log(insert_aswers);
//                 admin.addAnswers(insert_aswers, function(err, info) {
//                     if (err) throw err;
//                     console.log(info);
//                 });
//                 admin.sendResponse(true, res);
//             });
//         };
//     });
// });

module.exports = app;