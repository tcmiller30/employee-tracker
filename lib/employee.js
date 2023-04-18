// const mysql = require('mysql2');
// const inquirer = require('inquirer');
// const mainMenu = require('../server');

// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       user: 'root',
//       password: 'Dungeon30!',
//       database: 'employees_db'
//     },
//     console.log('connected to the employee_db database')
//   );

// const viewEmployee = () => {
//     const employeeArr = [];
//     // const mainMenu = require('../server.js')

//     db.query(
//         `SELECT e.id, CONCAT(e.first_name,' ', e.last_name) AS name, 
//         e.role_id, m.last_name AS manager_name
//         FROM employee e
//         LEFT JOIN employee m ON e.manager_id = m.id;`
//         ,(err, res, fields) => {
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             console.log('\n==============================')
//             console.table(res);
//             mainMenu();
                
//         })
    
// }

// const newEmployee = () => {

// }

// module.exports = newEmployee;
// module.exports = viewEmployee;