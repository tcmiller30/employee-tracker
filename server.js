const inquirer =  require('inquirer');
const mysql = require('mysql2');
require('console.table');

// const prompts = require('./lib/prompts')
// const newEmployee = require('./lib/employee');
// const viewEmployee = require('./lib/employee');



const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'fV2_4*KKoeVfmemj@qcVZJtEb2AeCWpV',
      database: 'employees_db'
    }, (err) => {
        if(err){
            console.log(err);
        }
    console.log('connected to the employee_db database')
    }
    
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
                viewDept();              
                break;

            case 'View All Roles':
                viewRole();
                break;

            case 'View All Employees':
                viewEmployee();                
                break;

            case 'Add a Department':
                addDept();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update an Employee Role':
                updateRole();
                break;

        }
    })
};


const viewDept = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if(err) throw err;
        console.log('\n==================')
        console.table(res);
        mainMenu();
    });
}

const viewRole = () => {
    db.query(`SELECT r.title, r.salary, 
                d.name AS department
                FROM role r
                JOIN department d ON r.department_id = d.id`
                ,(err, res) => {
                    if(err){
                        console.log(err);
                        return
                    };
                    console.log('\n==================')
                    console.table(res);
                    mainMenu();
                });
}

const viewEmployee = () => {
    db.query(
        `SELECT e.id, CONCAT(e.first_name,' ', e.last_name) AS name, 
        m.last_name AS manager_name,
        r.title AS role, r.salary
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id
        LEFT JOIN role r ON e.role_id = r.id`
        ,(err, res) => {
            if(err){
                console.log(err);
                return;
            }
            console.log('\n==================')
            console.table(res);
            mainMenu();
                
        })
}

const addDept = () => {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the new department called?',
            name: 'newDepartment'
        }
        ).then((ans) => {
            db.query(`INSERT INTO department(name) VALUES (?)`,
            ans.newDepartment, (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(`${ans.newDepartment} Department added successfully!`)
                }
            });
            
            mainMenu();
        })
}

const addRole = async () => {
    db.query(`SELECT * FROM department`)
        .then(([rows]) => {
            let departments = rows
            const departmentChoices = departments.map(({id, name}) => ({
                id: id,
                name: name
            }));
            db.query(``)
        })
    await inquirer.prompt([ 
        {
            type: 'input',
            message: 'Which department is this role being added to??',
            name: 'roleDepartment'
        },
        {
            type: 'input',
            message: 'What is the new role called?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'newSalary'
        },
        {

        }
        ]).then((ans) => {
            db.query(`INSERT INTO role(title) VALUES (?)`,
            ans.newRole, (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(`${ans.newRole} Department added successfully!`)
                }
            });
            
            mainMenu();
        });
        
}

const addEmployee = async () => {
    try {
      const newEmployee = await inquirer.prompt([
        {
          type: 'input',
          message: "What is the new employee's first name?",
          name: 'newFirst',
        },
        {
          type: 'input',
          message: "What is the new employee's last name?",
          name: 'newLast',
        },
      ]);
  
      const [rows] = await db.promise().query('SELECT * FROM role');
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        id: id,
        title: title,
      }));
  
      const newRole = await inquirer.prompt([
        {
          type: 'list',
          message: "What is the new employee's role?",
          name: 'newRole',
          choices: roleChoices,
        },
      ]);
  
      const [employeeRows] = await db.promise().query('SELECT * FROM employee');
      let employees = employeeRows;
      const employeeChoices = employees.map(({employees}) => ({
        first_name: employees.first_name,
        last_name: employees.last_name,
      }));
  
      const newManager = await inquirer.prompt([
        {
          type: 'list',
          message: "Who is the new employee's manager?",
          name: 'newManager',
          choices: employeeChoices,
        },
      ]);
  
      await db.promise().query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
        [newEmployee.newFirst, newEmployee.newLast, newRole.newRole, newManager.newManager]
      );
      console.log(`${newEmployee.newFirst} ${newEmployee.newLast} added successfully!`);
    } catch (error) {
      console.log(error);
    }
    mainMenu();
  };
  

const updateRole = () => {

}

const init = () => {
   mainMenu(); 
}

init()

module.exports = mainMenu;

