const inquirer = require('inquirer');

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
      'Update a role']
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

selectOption();