USE employee_db; 

INSERT INTO department (name) 
VALUES 
("Sales"),
("Engineering"),
("Legal");

INSERT INTO role (title, salary, department_id) 
VALUES 
("Sales Associate", 50000.00, 1),
("Engineer", 85000.00, 2),
("Lawyer", 90000.00, 3),
("Manager", 100000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Josh","Glugatch",4,null),
("Ivan","Torres",2,1),
("Jerri","Fong",2,1);

