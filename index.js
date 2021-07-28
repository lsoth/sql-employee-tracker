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
    db.query("SELECT * FROM departments", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.log('im working')
            console.table(data);
            main();
        }
    }
    )};
// departments.name AS department, JOIN departments ON roles.department_id=departments.id
const viewEmployees = () => {
    db.query("SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, roles.department_id, departments.name FROM employees JOIN roles on employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.table(data);
            main();
        }
    }
    )};
const viewRoles = () => {
    db.query("SELECT roles.title AS title, salary, departments.name AS department FROM roles JOIN departments ON roles.department_id=departments.id", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.table(data);
            main();
        }
    }
    )};

const insertDepartment = () => {
    inquirer
    .prompt([
        {
            type:"input",
            message:"Departments name?",
            name:"name"
        }
    ]).then(answers => {
        db.query(`INSERT INTO departments (name) VALUES(?)`,[answers.name],(err,data) => {
            if(err){
                console.log(err);
                db.end();
            } else {
                console.log("department added!");
                viewDepartments();
            }
        })

    })
};

const insertRole = () => {
    db.query("SELECT * FROM departments", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else {
        const inqDept = data.map( department => {
            return {
            name: department.name,
            value:department.id
            }
        })
    inquirer
    .prompt([
        {
            type:"list",
            message:"What is the department of the new role?",
            choices:inqDept,
            name:"department_id"
        },
        {
            type:"input",
            message:"What is the title of the new role?",
            name:"title"
        },
        {
            type:"input",
            message:"What is the salary of the new role?",
            name:"salary"
        }
    ]).then(answers => {
        db.query(`INSERT INTO roles (title,salary,department_id) VALUES(?,?,?)`,
        [answers.title,answers.salary,answers.department_id],(err,data) => {
            if(err){
                console.log(err);
                db.destroy();
            } else {
                console.log("role added!");
                viewRoles();
            }
        }
        )
    });
}
})
};

const insertEmployee = () => {
    db.query("SELECT * FROM roles", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else {
        const inqRoles = data.map( role => {
            return {
            name: role.title,
            value:role.id
            }
        });
    inquirer
    .prompt([
        {
            type:"list",
            message:"What is the title of the new employee?",
            choices:inqRoles,
            name:"role_id"
        },
        {
            type:"input",
            message:"What is the first name of the new employee?",
            name:"first_name"
        },
        {
            type:"input",
            message:"What is the last name of the new employee?",
            name:"last_name"
        },
        {
            type:"input",
            message:"What is the last name of the new employee?",
            name:"last_name"
        },
        {
            type:"input",
            message:"What is the employee_id for the manager of the new employee? (enter 0 if none)",
            name:"manager_id"
        }

    ]).then(answers => {
        db.query(`INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES(?,?,?,?)`,
        [answers.first_name,answers.last_name,answers.role_id,answers.manager_id],(err,data) => {
            if(err){
                console.log(err);
                db.destroy();
            } else {
                console.log("employee added!");
                viewEmployees();
            }
        }
        )
    });
}
})
};



const main = () => {
    inquirer
    .prompt({
        type:"list",
        choices: ["view departments", "view roles", "view employees", "add new department", "add new role", "add new employees", "quit"],
        message: "what do you want to do?",
        name: "choice"
    })
    .then(({choice}) => {
        switch (choice) {
            case "view departments":
                viewDepartments();
                break;
            case "add new department":
                insertDepartment();
                break;
            case "view roles":
                viewRoles();
                break;
            case "add new role":
                insertRole();
                break;
            case "view employees":
                viewEmployees();
                break;
            case "add new employees":
                insertEmployee();
                break;
            default:
                console.log('cya');
                db.end()
                break;
        }
    });
};


main();