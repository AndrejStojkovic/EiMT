-- Countries

INSERT INTO countries(name, continent)
VALUES  ('United States of America', 'North America'),
        ('Macedonia', 'Europe'),
        ('Canada', 'North America'),
        ('Germany', 'Europe'),
        ('Japan', 'Asia'),
        ('Australia', 'Australia'),
        ('United Kingdom', 'Europe'),
        ('Argentina', 'South America');

-- Hosts

INSERT INTO hosts(created_at, updated_at, name, surname, country_id)
VALUES  (now(), now(), 'Finki', 'Finkovski', (SELECT id FROM countries WHERE name = 'Macedonia')),
        (now(), now(), 'Petko', 'Petkovski', (SELECT id FROM countries WHERE name = 'United States of America')),
        (now(), now(), 'John', 'Finki', (SELECT id FROM countries WHERE name = 'United Kingdom')),
        (now(), now(), 'Programerko', 'Programerkovski', (SELECT id FROM countries WHERE name = 'Australia')),
        (now(), now(), 'Jay', 'Quellin', (SELECT id FROM countries WHERE name = 'Argentina')),
        (now(), now(), 'Dee', 'Nice', (SELECT id FROM countries WHERE name = 'Japan')),
        (now(), now(), 'A. A.', 'Ron', (SELECT id FROM countries WHERE name = 'Germany')),
        (now(), now(), 'Tim O.', 'Thee', (SELECT id FROM countries WHERE name = 'Canada'));

-- Accommodations

INSERT INTO accommodations(created_at, updated_at, name, category, host_id, condition, num_rooms, rented)
VALUES  (now(), now(), 'Aurora Stay', 'HOUSE', (SELECT id FROM hosts WHERE name = 'Finki'), 'GOOD', 4, false),
        (now(), now(), 'Horizon Haven', 'MOTEL', (SELECT id FROM hosts WHERE name = 'Petko'), 'BAD', 10, true),
        (now(), now(), 'Maple Nest', 'HOTEL', (SELECT id FROM hosts WHERE name = 'John'), 'GOOD', 30, false),
        (now(), now(), 'Silver Peak Lodge', 'ROOM', (SELECT id FROM hosts WHERE name = 'Programerko'), 'GOOD', 2, false),
        (now(), now(), 'Sunset Retreat', 'FLAT', (SELECT id FROM hosts WHERE name = 'Jay'), 'BAD', 2, false),
        (now(), now(), 'Golden Leaf Residence', 'ROOM', (SELECT id FROM hosts WHERE name = 'Dee'), 'GOOD', 2, true),
        (now(), now(), 'Oakwood Street', 'HOUSE', (SELECT id FROM hosts WHERE name = 'A. A.'), 'BAD', 3, false),
        (now(), now(), 'Crystal View Blvd', 'APARTMENT', (SELECT id FROM hosts WHERE name = 'Tim O.'), 'GOOD', 3, true);