USE employee_db;

INSERT INTO departments(name)
VALUES
("Sales"),
("Engineering"),
("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES
("Salesperson",35000,1),
("Lead Engineer", 150000,2),
("Accountant", 123000,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Jeff","Smeff", 1, 1),
("Joe", "Broe", 1, 2),
("Jim","Schmimm", 3,3);

