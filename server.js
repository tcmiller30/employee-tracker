const inquirer =  require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const prompts = require('./helpers/prompts')

const currentEmployees = [];
const currentRoles = [];
const currentDepartments = [];

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Dungeon30!',
      database: 'employees_db'
    },
    console.log('connected to the employee_db database')
  );

const mainMenu = () => {
   inquirer.prompt(
     {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: [
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',
            'View All Roles',
            'Add a Role',
            'View All Departments',
            'Add a Department'
            ],
        }
    ).then((ans) =>{
        switch (ans.menu){
            case 'View All Departments':
                db.promise().query('SELECT * FROM department', (err, res) => {
                    if(err) throw err;
                    console.table(res);
                    mainMenu();
                });              
                break;
            case 'View All Roles':
                db.promise().query('SELECT * FROM role', (err, res) => {
                    if(err) throw err;
                    console.log(res);
                    mainMenu();
                });
                break;
            case 'View All Employees':
                db.promise().query('SELECT * FROM employee', (err, res) => {
                    if(err) throw err;
                    console.log(res);
                    mainMenu();
                });
                break;
            case 'Add a Department':
                inquirer.prompt(
                    {
                        type: 'input',
                        message: 'What is the new department called?',
                        name: 'newDepartment'
                    }).then((ans) => {
                        console.log(ans);
                        mainMenu();
                    })
                break;
            case 'Add a Role':
                inquirer.prompt(
                    {
                        type: 'input',
                        message: 'What is the new role called?',
                        name: 'newRole'
                    }).then((ans) => {
                        console.log(ans);
                        mainMenu();
                    })
                break;
            case 'Add an Employee':
                inquirer.prompt(
                    {
                        type: 'input',
                        message: "What is the new employee's first name?",
                        name: 'newFirst'
                    },
                    {
                        type: 'input',
                        message: "What is the new employee's first name?",
                        name: 'newLast'
                    },
                    {
                        type: 'list',
                        message: 'What is their role?',
                        name: 'newRole',
                        choices: []
                    },
                    {
                        type: 'list',
                        message: 'Who is their manager?',
                        name: 'newManager',
                        choices: []
                    }

                    ).then((ans) => {
                        console.log(ans);
                        mainMenu();
                    })
                break;
            case 'Update an Employee Role':
                break;

        }
        mainMenu();
    })
};

mainMenu();

