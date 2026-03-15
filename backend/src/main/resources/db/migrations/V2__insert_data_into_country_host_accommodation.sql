-- Countries

INSERT INTO countries(id, name, continent)
VALUES  (1, 'United States of America', 'North America'),
        (2, 'Macedonia', 'Europe'),
        (3, 'Canada', 'North America'),
        (4, 'Germany', 'Europe'),
        (5, 'Japan', 'Asia'),
        (6, 'Australia', 'Australia'),
        (7, 'United Kingdom', 'Europe'),
        (8, 'Argentina', 'South America');

-- Hosts

INSERT INTO hosts(id, created_at, updated_at, name, surname, country_id)
VALUES  (1, now(), now(), 'Finki', 'Finkovski', 2),
        (2, now(), now(), 'Petko', 'Petkovski', 5),
        (3, now(), now(), 'John', 'Finki', 7),
        (4, now(), now(), 'Programerko', 'Programerkovski', 6),
        (5, now(), now(), 'Jay', 'Quellin', 1),
        (6, now(), now(), 'Dee', 'Nice', 5),
        (7, now(), now(), 'A. A.', 'Ron', 4),
        (8, now(), now(), 'Tim O.', 'Thee', 3);

-- Accommodations

INSERT INTO accommodations(id, created_at, updated_at, name, category, host_id, condition, num_rooms, rented)
VALUES  (1, now(), now(), 'Aurora Stay', 'HOUSE', 1, 'GOOD', 4, false),
        (2, now(), now(), 'Horizon Haven', 'MOTEL', 2, 'BAD', 10, true),
        (3, now(), now(), 'Maple Nest', 'HOTEL', 3, 'GOOD', 30, false),
        (4, now(), now(), 'Silver Peak Lodge', 'ROOM', 4, 'GOOD', 2, false),
        (5, now(), now(), 'Sunset Retreat', 'FLAT', 5, 'BAD', 2, false),
        (6, now(), now(), 'Golden Leaf Residence', 'ROOM', 6, 'GOOD', 2, true),
        (7, now(), now(), 'Oakwood Street', 'HOUSE', 7, 'BAD', 3, false),
        (8, now(), now(), 'Crystal View Blvd', 'APARTMENT', 8, 'GOOD', 3, true);