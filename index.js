const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log("Connected to Employee Tracker")
);


const viewDepartments = () => {
    db.query("SELECT * FROM departments"), (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.log('im working')
            console.table(data);
            main();
        }
    }
};

// const seeEmployees = () => {
//     db.query("SELECT * FROM employees"), (err,data)=>{
//         if(err){
//             console.log(err)
//             db.end();
//         }else{
//             console.log(data);
//             main();
//         }
//     }
// };
// const seeRoles = () => {
//     db.query("SELECT * FROM roles"), (err,data)=>{
//         if(err){
//             console.log(err)
//             db.end();
//         }else{
//             console.log(data);
//             main();
//         }
//     }
// };

// const insertDepartment = () => {
//     inquirer
//     .prompt([
//         {
//             type:"input",
//             message:"Departments name?",
//             name:"name"
//         }
//     ]).then(answers => {
//         db.query(`INSERT INTO departments (name) VALUES(?)`,[answers.name]),(err,data) => {
//             if(err){
//                 console.log(err);
//                 db.destroy();
//             } else {
//                 console.log("department added!");
//                 seeDepartments();
//             }
//         }

//     })
// };

// const insertRole = () => {
//     inquirer
//     .prompt([
//         {
//             type:"input",
//             message:"What is the name of the new role?",
//             name:"name"
//         }
//     ]).then(answers => {
//         db.query(`INSERT INTO departments (name) VALUES(?)`,[answers.name]),(err,data) => {
//             if(err){
//                 console.log(err);
//                 db.destroy();
//             } else {
//                 console.log("department added!");
//                 seeDepartments();
//             }
//         }

//     })
// };

// const insertEmployee = () => {
//     inquirer
//     .prompt([
//         {
//             type:"input",
//             message:"What is the employee's first name?",
//             name:"first_name"
//         }
//     ]).then(answers => {
//         db.query(`INSERT INTO departments (name) VALUES(?)`,[answers.name]),(err,data) => {
//             if(err){
//                 console.log(err);
//                 db.destroy();
//             } else {
//                 console.log("department added!");
//                 seeDepartments();
//             }
//         }

//     })
// };

const main = () => {
    inquirer
    .prompt({
        type:"list",
        choices: ["view departments", "quit"],
        message: "what do you want to do?",
        name: "choice"
    })
    .then(({choice}) => {
        switch (choice) {
            case "view departments":
                // console.log('see departments');
                viewDepartments();
                break;
            default:
                console.log('cya');
                db.end()
                break;
        }
    });
};


main();