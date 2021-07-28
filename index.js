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

const seeDepartments = () => {
    db.query("SELECT * FROM departments"), (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.table(data);
            main();
        }
    }
};

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
                seeDepartments();
                break;
            default:
                console.log('cya');
                db.end()
                break;
        }
    });
};


main();