var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_db"
});

connection.connect((err) => {
    if (err)
      throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });

function start(){ 
  inquirer.prompt({
    type: "list",
    message: "What do you want to do?",
    name: "start",
    choices: ["Add Department","Add Role","Add Employee","View Departments","View Roles","View Employees","Update Employee Role"]
  })
  .then((res) => {
      switch (res.start) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Departments":
          viewDepartment();
          break;
        case "View Roles":
          viewRole();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Employee":
          updateEmployee();
          break;
      }
    })
};



//add department
function addDepartment(){
  inquirer.prompt({
    type: "input",
    message: "Enter department name:",
    name: "newDepartment"
  })
  .then((res) => {
      connection.query("INSERT INTO department SET ?", {
        name: res.newDepartment
      });
      console.log("Department added");

      start();
    });
}


//add role
function addRole() {
  connection.query("SELECT * FROM department", function(err, response) {
    if (err) throw err;
    inquirer
      .prompt([
      {
      type: "input",
      message: "Enter job title:",
      name: "newTitle"
      },
      {
      type: "input",
      message: "Enter annual salary:",
      name: "newSalary"
      },
      {
      type: "list",
      message: "Enter department:",
      name: "dept",
      choices: function() {
        var deptArray = [];
        for (var i = 0; i < response.length; i++) {
          deptArray.push(response[i].name);
        }
        return deptArray;
      }}
  ])
  .then((res) => {
     var chosenDept;
     for (var i = 0; i < response.length; i++) {
      if (response[i].name === res.dept) {
        chosenDept = response[i].id;
      }
    }
      connection.query("INSERT INTO role SET ?", {
        title: res.newTitle,
        salary: res.newSalary,
        department_id: chosenDept
      });
      console.log("Role added");
      start();
    });
  });
}


//add employee
function addEmployee() {
  connection.query("SELECT role.*,employee.*, FROM role,employee;", function(err, response) {
    if (err) throw err;

    inquirer
      .prompt([
    {
    type: "input",
    message: "Enter first name:",
    name: "firstname"
    },
    {
    type: "input",
    message: "Enter last name:",
    name: "lastname"
    },
    {
    type: "list",
    message: "Enter role:",
    name: "roleID",
    choices: function() {
      var roleArray = [];
      for (var i = 0; i < response.role.length; i++) {
        roleArray.push(response[i].title);
      }
      return roleArray;
    }},
    {
    type: "list",
    message: "Choose manager:",
    name: "managerID",
    choices: function(){
    var managers = [];
    for (var i=0; i < response.employee.length; i++){
      if(res.employee[i].manager_id === null){
        manager.push(response.employee[i].first_name)
    }};
    return managers;
    }}
  ])

  .then((res) => {
    var chosenRole;
     for (var i = 0; i < response.role.length; i++) {
      if (response.role[i].title === res.roleID) {
        chosenRole = response.role[i].id;
      }
    }
    var chosenMngr;
     for (var i = 0; i < response.employee.length; i++) {
      if (response.employee[i].first_name === res.managerID) {
        chosenMngr = response.employee[i].id;
      }
    }
      connection.query("INSERT INTO employee SET ?", {
        first_name: res.firstname,
        last_name: res.lastname,
        role_id: chosenRole,
        manager_id: chosenMngr
      });
      console.log("Employee added");
      start();
    });
  })
}


//view department
function viewDepartment(){
  connection.query(`SELECT * FROM  department`,(err,res) => {
    if (err) throw err;
      console.table(res);
      start();
    });
  
};


//view employee
function viewEmployees(){
    connection.query(`SELECT * FROM  department 
    INNER JOIN role ON department.id = role.department_id 
    INNER JOIN employee ON role.id = employee.role_id`, (err,res) => {
      if(err) throw err;
        console.table(res);
        start();
      });
    
};
