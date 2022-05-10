const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

db.connect((err) => {
  if (err) throw err;
});

const selectOption = () => {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update a role",
      ],
    })
    .then((answer) => {
      if (answer.options === "View all departments") {
        viewAllDepartments();
      } else if (answer.options === "View all roles") {
        viewAllRoles();
      } else if (answer.options === "View all employees") {
        viewAllEmployees();
      } else if (answer.options === "Add a department") {
        addDepartment();
      } else if (answer.options === "Add a role") {
        addRole();
      } else if (answer.options === "Add an employee") {
        addEmployee();
      } else if (answer.options === "Update a role") {
        updateRole();
      }
    });
};

const viewAllDepartments = () => {
  
  const sql = `SELECT * FROM department`; 

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    selectOption();
  });
};

const viewAllRoles = () => {
  const sql = `SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    selectOption();
  });
};

const viewAllEmployees = () => {
  const sql = `SELECT employee.*, role.title, role.salary, department.name AS department_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    selectOption();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Enter name of new department (Required)",
        validate: (departmentNameInput) => {
          if (departmentNameInput) {
            return true;
          } else {
            console.log("Please enter name of new department");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO department (name) VALUE (?)`;
      const params = [answers.department_name];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(result);
        console.log("new department has been addded");
        selectOption();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_role",
        message: "Enter new role name (Required)",
        validate: (roleNameInput) => {
          if (roleNameInput) {
            return true;
          } else {
            console.log("Please enter new role name");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "new_role_salary",
        message: "Enter new role salary (Required)",
        validate: (roleSalaryInput) => {
          if (roleSalaryInput) {
            return true;
          } else {
            console.log("Please enter new role salary");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "new_role_department",
        message: "Enter new role department id (Required)",
        validate: (roleDepartmentInput) => {
          if (roleDepartmentInput) {
            return true;
          } else {
            console.log("Please enter new role department id");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUE (?,?,?)`;
      const params = [
        answers.new_role,
        answers.new_role_salary,
        answers.new_role_department,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(result);
        console.log("new role has been addded");
        selectOption();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_employee_first_name",
        message: "Enter new employee first name (Required)",
        validate: (employeeFirstNameInput) => {
          if (employeeFirstNameInput) {
            return true;
          } else {
            console.log("Please enter new employee first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "new_employee_last_name",
        message: "Enter new employee last name (Required)",
        validate: (employeeLastNameInput) => {
          if (employeeLastNameInput) {
            return true;
          } else {
            console.log("Please enter new employee last name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "new_employee_role",
        message: "Enter role id of new employee (Required)",
        validate: (employeeRoleInput) => {
          if (isNaN(employeeRoleInput)) {
            console.log("Please enter a number for the new employee role id");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "new_employee_manager",
        message: "Enter new employee manager id (Required)",
        validate: (employeeManagerInput) => {
          if (isNaN(employeeManagerInput)) {
            console.log(
              "Please enter a number for the new employee manager id"
            );
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)`;
      const params = [
        answers.new_employee_first_name,
        answers.new_employee_last_name,
        answers.new_employee_role,
        answers.new_employee_manager,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(result);
        console.log("new employee has been added");
        selectOption();
      });
    });
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "select_employee_to_update",
        message: "Enter id of employee you want to update (Required)",
        validate: (employeeUpdateInput) => {
          if (isNaN(employeeUpdateInput)) {
            console.log("Please enter a number for the employee id");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "update_employee_role",
        message: "Enter new role id (Required)",
        validate: (newRoleInput) => {
          if (isNaN(newRoleInput)) {
            console.log("Please enter a number for the new role id");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [
        answers.update_employee_role,
        answers.select_employee_to_update,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(result);
        selectOption();
      });
    });
};

selectOption();
