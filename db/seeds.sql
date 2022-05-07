INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES
(1, 'Concettina', 'Bartoli', 2, 1),
(2, 'Rosabelle', 'Ingamells', 2, 2),
(3, 'Rollin', 'Ramage', 4, 1),
(4, 'Bibi', 'Stranger', 5, 2),
(5, 'Thorndike', 'Willas', 2, 2),
(6, 'Manolo', 'Keynes', 3, 1),
(7, 'Dimitri', 'Sadlier', 3, 1),
(8, 'Debra', 'Tombleson', 6, 3),
(9, 'Nicoline', 'Rabat', 5, 1),
(10, 'Shae', 'Medling', 5, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'intern', 0, 1)
(2, 'engineer', 50000, 1), 
(3, 'jedi', 80000, 2), 
(4, 'ninja', 70000, 2), 
(5, 'dishwasher', 30000, 3), 
(6, 'cook', 40000, 3);

INSERT INTO department 
VALUES
(1, 'engineering'), 
(2, 'ninjas and jedis'), 
(3, 'kitchen');