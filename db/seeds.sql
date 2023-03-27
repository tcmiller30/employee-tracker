INSERT INTO department(name)
VALUES ('Engineering'), ('Sales'), ('Legal'), ('Finance');

INSERT INTO role(title, salary, department_id)
VALUES 
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Sales Lead', 100000, 2),
    ('Salesperson', 80000, 2),
    ('Lead Counsel', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Account Manager', 160000, 4),
    ('Accountant', 125000, 4);
    
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ('Billy', 'Pilgrim', 1, null),
    ('John', 'Soft', 2, 1),
    ('Sally', 'Bowles', 3, null),
    ('Montana', 'Wildhack', 4, 3),
    ('Charles', 'Bingley', 5, null),
    ('Paul', 'Allen', 6, 5),
    ('John', 'Watson', 7, null),
    ('Roland', 'Weary', 8, 7);