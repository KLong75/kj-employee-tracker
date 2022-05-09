INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES
(1, 'Concettina', 'Bartoli', 2, 10),
(2, 'Rosabelle', 'Ingamells', 2, 10),
(3, 'Rollin', 'Ramage', 4, 10),
(4, 'Bibi', 'Stranger', 5, 10),
(5, 'Thorndike', 'Willas', 2, 10),
(6, 'Manolo', 'Keynes', 3, 10),
(7, 'Dimitri', 'Sadlier', 3, 10),
(8, 'Debra', 'Tombleson', 4, 10),
(9, 'Nicoline', 'Rabat', 5, 10),
(10, 'Shae', 'Medling', 1, 10);

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'manager', 100000, 5),
(2, 'salesperson', 50000, 2), 
(3, 'engineer', 60000, 1), 
(4, 'researcher', 70000, 3), 
(5, 'coordinator', 80000, 4);

INSERT INTO department 
VALUES
(1, 'engineering'), 
(2, 'sales'),
(3, 'research'), 
(4, 'operations'),
(5, 'management');