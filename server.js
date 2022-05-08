const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const fetch = require('node-fetch')

const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const Employee = require('./lib/employee');
const Role = require('./lib/role');
const Department = require('./lib/department');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const selectOption = () => {
  inquirer.prompt({   
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: [
      'View all departments', 
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update a role'
    ]
    }).then((answer) => {
        if (answer.options === 'View all departments') {
          viewAllDepartments()
        } else if (answer.options === 'View all roles') {
          viewAllRoles()
        } else if (answer.options === 'View all employees') {
            viewAllEmployees()
        } else if (answer.options === 'Add a department') {
            addDepartment()
        } else if (answer.options === 'Add a role') {
            addRole()
        } else if (answer.options === 'Add an employee') {
            addEmployee()        
        } else if (answer.options === 'Update a role') {
          updateRole()
        } 
      })
};

const viewAllDepartments = () => {
  let queryUrl = '/api/department';
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return alert('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(response => {
    console.table(response);
  });

};



const viewAllRoles = () => {

};

const viewAllEmployees = () => {

};

const addDepartment = () => {
  const createDepartment = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter name of new department (Required)',
        validate: departmentNameInput => {
          if (departmentNameInput) {
            return true;
          } else {
            console.log('Please enter name of new department');
            return false;
          }
        }
      }
      
    ]).then ((answers) => {
        const newDepartment = new Department(answers.department)
        console.log(newDepartment);
        //employeeArray.push(newIntern);
        selectOption();
    });
  };
};

const addRole = () => {
  const createRole = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'new_role',
        message: 'Enter new role name (Required)',
        validate: roleNameInput => {
          if (roleNameInput) {
            return true;
          } else {
            console.log('Please enter new role name');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'new_role_salary',
        message: 'Enter new role salary (Required)',
        validate: roleSalaryInput => {
          if (roleSalaryInput) {
            return true;
          } else {
            console.log('Please enter new role salary');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'new_role_department',
        message: 'Enter new role department id (Required)',
        validate: roleDepartmentInput => {
          if (roleDepartmentInput) {
            return true;
          } else {
            console.log('Please enter new role department id');
            return false;
          };
        }
      }
      
    ]).then ((answers) => {
        const newRole = new Role(answers.new_role, answers.new_role_salary, answers.new_role_department);
        console.log(newRole);
        //employeeArray.push(newIntern);
        selectOption();
    });
  };
};

const addEmployee = () => {
  const createEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'new_employee_first_name',
        message: 'Enter new employee first name (Required)',
        validate: employeeFirstNameInput => {
          if (employeeFirstNameInput) {
            return true;
          } else {
            console.log('Please enter new employee first name');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'new_employee_last_name',
        message: 'Enter new employee last name (Required)',
        validate: employeeLastNameInput => {
          if (employeeLastNameInput) {
            return true;
          } else {
            console.log('Please enter new employee last name');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'new_employee_role',
        message: 'Enter role of new employee (Required)',
        validate: employeeRoleInput => {
          if (employeeRoleInput) {
            return true;
          } else {
            console.log('Please enter role of new employee');
            return false;
          };
        }
      },
      {
        type: 'input',
        name: 'new_employee_manager',
        message: 'Enter new employee manager id (Required)',
        validate: employeeManagerInput => {
          if (employeeManagerInput) {
            return true;
          } else {
            console.log('Please enter new employee manager id');
            return false;
          };
        }
      },
      
    ]).then ((answers) => {
        const newEmployee = new Employee(answers.new_employee_first_name, answers.new_employee_last_name, answers.new_employee_role_id, answers.new_employee_manager_id);
        console.log(newEmployee);
        //employeeArray.push(newIntern);
        selectOption();
    });
  };
};

const updateRole = () => {

};



selectOption();