var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_db"
});

connection.connect(async function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  const {start} = await inquirer.prompt({
    type: "list",
    message: "What do you want to do?",
    name: "start",
    choices: [
      {
        name: "Add Department",
        value: addDepartment,
      },
      {
        name: "Add Role",
        value: addRole,
      },
      {
        name: "Add Employee",
        value: addEmployee,
      },
      {
        name: "View Department",
        value: viewDepartment,
      },
      // {
      //   name: "View Role",
      //   value: viewRole,
      // },
      // {
      //   name: "View Employee",
      //   value: viewEmployee,
      // },
      // {
      //   name: "Update Employee Role",
      //   value: updateEmployee,
      // }
    ]
  });
  start();
});

//add department
async function addDepartment() {
  const {newDepartment} = await inquirer.prompt({
    type: "input",
    message: "Enter department name:",
    name: "newDepartment"
  });
  

  connection.query("INSERT INTO department SET ?", {
    name:newDepartment
  }, function(err,res) {
    if (err) throw err;
    console.log("Department added");
    console.table(res)
    connection.end();
  });
}

//add role
async function addRole() {
  const {newTitle,newSalary,newID} = await inquirer.prompt([
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
    type: "input",
    message: "Enter department ID number:",
    name: "newID"
    }
]);
  

//   connection.query("INSERT INTO role SET ?", {
//     title:newTitle,
//     salary:newSalary,
//     department_id:newID
//   }, function(err) {
//     if (err) throw err;
//     console.log("Role added");
//     connection.end();
//   });
// }

// //add employee
// async function addEmployee() {
//   const {firstname,lastname,roleID,managerID} = await inquirer.prompt([
//     {
//     type: "input",
//     message: "Enter first name:",
//     name: "firstname"
//     },
//     {
//     type: "input",
//     message: "Enter last name:",
//     name: "lastname"
//     },
//     {
//     type: "input",
//     message: "Enter role ID:",
//     name: "roleID"
//     },
//     {
//     type: "input",
//     message: "Enter manager ID:",
//     name: "managerID"
//     }
// ]);

//   connection.query("INSERT INTO role SET ?", {
//     first_name:firstname,
//     last_name:lastname,
//     role_id: roleID,
//     manager_id:managerID
//   }, function(err) {
//     if (err) throw err;
//     console.log("Employee added");
//     connection.end();
//   });
// }

// //view department
// async function viewDepartment(){
//   const {dept} = await connection.query("SELECT name FROM department", function (err, res) {
//     if (err) throw err;
//     inquirer.prompt({
//       type: "list",
//       message: "Which department?",
//       name: "dept",
//       choices: function(){
//         var deptArray = [];
//         for (var i = 0; i < res.length; i++) {
//           deptArray.push(res[i].name);
//         }
//         return deptArray;
//       }
//     });
//     connection.query(`SELECT department,title,first_name,last_name,salary,manager_id
//           FROM departments
//           INNER JOIN employee ON (topAlbums.artist = top5000.artist AND topAlbums.year = top5000.year) 
//           WHERE (topAlbums.artist = "${answers.artist}" AND top5000.artist = "${answers.artist}")
//           ORDER BY year ASC;`, function(err, res) {
//               if (err) throw err;
//               console.table(res);
//               start();
//           });
    
//   })
// };
