# Homework 2 — Course Registration Database


# Database Creation

![alt text](<DatabaseCreation.png>)

# SQL script Code:



DROP TABLE IF EXISTS Enrollments CASCADE;
DROP TABLE IF EXISTS CourseOfferings CASCADE;
DROP TABLE IF EXISTS Students CASCADE;
DROP TABLE IF EXISTS Courses CASCADE;
DROP TABLE IF EXISTS Professors CASCADE;


CREATE TABLE Students (
    student_id      BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    major           VARCHAR(80)  NOT NULL,
    year            INT NOT NULL,
    CONSTRAINT chk_students_year CHECK (year BETWEEN 1 AND 5)
);


CREATE TABLE Courses (
    course_id       BIGSERIAL PRIMARY KEY,
    course_code     VARCHAR(20)  NOT NULL UNIQUE,  -- e.g., CS 5313
    title           VARCHAR(150) NOT NULL,
    credits         INT NOT NULL,
    department      VARCHAR(80)  NOT NULL,
    CONSTRAINT chk_course_credits CHECK (credits BETWEEN 1 AND 6)
);


CREATE TABLE Professors (
    professor_id    BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    department      VARCHAR(80)  NOT NULL,
    office          VARCHAR(40)  NOT NULL
);



CREATE TABLE CourseOfferings (
    offering_id     BIGSERIAL PRIMARY KEY,
    course_id       BIGINT NOT NULL REFERENCES Courses(course_id) ON DELETE RESTRICT,
    professor_id    BIGINT NOT NULL REFERENCES Professors(professor_id) ON DELETE RESTRICT,
    semester        VARCHAR(10) NOT NULL,  -- e.g., 'Fall', 'Spring', 'Summer'
    year            INT NOT NULL,
    CONSTRAINT uq_offering UNIQUE (course_id, professor_id, semester, year)
);


CREATE TABLE Enrollments (
    enrollment_id   BIGSERIAL PRIMARY KEY,
    student_id      BIGINT NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    course_id       BIGINT NOT NULL REFERENCES Courses(course_id) ON DELETE RESTRICT,
    semester        VARCHAR(10) NOT NULL,
    grade           CHAR(2),  -- e.g., 'A', 'A-', 'B+'; can be NULL if in-progress
    CONSTRAINT uq_enrollment UNIQUE (student_id, course_id, semester),
    CONSTRAINT chk_grade CHECK (
        grade IS NULL OR grade IN ('A','A-','B+','B','B-','C+','C','D','F')
    )
);




INSERT INTO Students (name, email, major, year) VALUES
('Geethika Sreya Bhunavagiri', 'geethika.sreya@uni.edu', 'Computer Science', 2),
('Siva Kumar',                 'siva.kumar@uni.edu',     'Information Science', 3),
('Sukhajeevan',                'sukhajeevan@uni.edu',    'Data Science', 1),
('Saritha',                    'saritha@uni.edu',        'Computer Science', 4),
('Subhash',                    'subhash@uni.edu',        'Software Engineering', 2);


INSERT INTO Courses (course_code, title, credits, department) VALUES
('CS 2401',  'Data Structures',                 3, 'Computer Science'),
('CS 3710',  'Database Systems',                3, 'Computer Science'),
('CS 4215',  'Operating Systems',               4, 'Computer Science'),
('IS 3312',  'Human-Computer Interaction',      3, 'Information Science');


INSERT INTO Professors (name, email, department, office) VALUES
('Boddy Reed',   'boddy.reed@uni.edu',   'Computer Science', 'ENG-310'),
('Shine',        'shine@uni.edu',        'Computer Science', 'ENG-220'),
('Jeff Maxwell', 'jeff.maxwell@uni.edu', 'Information Science', 'LIB-105');


INSERT INTO CourseOfferings (course_id, professor_id, semester, year) VALUES
( (SELECT course_id FROM Courses WHERE course_code='CS 2401'),
  (SELECT professor_id FROM Professors WHERE name='Boddy Reed'),
  'Fall', 2025 ),
( (SELECT course_id FROM Courses WHERE course_code='CS 3710'),
  (SELECT professor_id FROM Professors WHERE name='Shine'),
  'Fall', 2025 ),
( (SELECT course_id FROM Courses WHERE course_code='CS 4215'),
  (SELECT professor_id FROM Professors WHERE name='Shine'),
  'Spring', 2026 ),
( (SELECT course_id FROM Courses WHERE course_code='IS 3312'),
  (SELECT professor_id FROM Professors WHERE name='Jeff Maxwell'),
  'Fall', 2025 );


INSERT INTO Enrollments (student_id, course_id, semester, grade) VALUES
( (SELECT student_id FROM Students WHERE name='Geethika Sreya Bhunavagiri'),
  (SELECT course_id  FROM Courses  WHERE course_code='CS 2401'),
  'Fall', 'A' ),

( (SELECT student_id FROM Students WHERE name='Siva Kumar'),
  (SELECT course_id  FROM Courses  WHERE course_code='CS 3710'),
  'Fall', 'B+' ),

( (SELECT student_id FROM Students WHERE name='Sukhajeevan'),
  (SELECT course_id  FROM Courses  WHERE course_code='CS 3710'),
  'Fall', 'A-' ),

( (SELECT student_id FROM Students WHERE name='Saritha'),
  (SELECT course_id  FROM Courses  WHERE course_code='IS 3312'),
  'Fall', 'B' ),

( (SELECT student_id FROM Students WHERE name='Subhash'),
  (SELECT course_id  FROM Courses  WHERE course_code='CS 2401'),
  'Fall', 'A' ),

( (SELECT student_id FROM Students WHERE name='Subhash'),
  (SELECT course_id  FROM Courses  WHERE course_code='CS 3710'),
  'Fall', 'B+' );



SELECT name, major, year
FROM Students;


SELECT s.name AS student,
       c.course_code,
       c.title,
       e.semester,
       e.grade
FROM Enrollments e
JOIN Students   s ON s.student_id = e.student_id
JOIN Courses    c ON c.course_id  = e.course_id
ORDER BY s.name, c.course_code;


SELECT c.course_code,
       c.title,
       co.semester,
       co.year,
       p.name AS professor
FROM CourseOfferings co
JOIN Courses   c ON c.course_id  = co.course_id
JOIN Professors p ON p.professor_id = co.professor_id
ORDER BY co.year, co.semester, c.course_code;




SELECT c.course_code,
       c.title,
       COUNT(e.student_id) AS student_count
FROM Courses c
LEFT JOIN Enrollments e ON e.course_id = c.course_id
GROUP BY c.course_id, c.course_code, c.title
ORDER BY student_count DESC, c.course_code;




SELECT major,
       COUNT(*) AS student_count
FROM Students
GROUP BY major
ORDER BY student_count DESC, major;




SELECT * FROM Students;

SELECT * FROM Courses;

SELECT * FROM Professors;

SELECT * FROM CourseOfferings;

SELECT * FROM Enrollments;



# Screenshot of CREATE TABLE STATEMENT 
![CREATE TABLES STATEMENT](<Screenshot 2025-11-03 164508.png>)

# Sample data(SELECT * from each table)

![alt text](<Screenshot 2025-11-03 164548.png>)
![alt text](<Screenshot 2025-11-03 164607.png>)
![alt text](<Screenshot 2025-11-03 164625.png>)
![alt text](<Screenshot 2025-11-03 164700.png>)
![alt text](<Screenshot 2025-11-03 164727.png>)


# All query results

![alt text](<Screenshot 2025-11-03 164105.png>)

![alt text](<Screenshot 2025-11-03 164132.png>)

![alt text](<Screenshot 2025-11-03 164220.png>)

![alt text](<Screenshot 2025-11-03 164317.png>)

# insert Values

![alt text](<Screenshot 2025-11-03 164548-1.png>) 
![alt text](<Screenshot 2025-11-03 164607-1.png>) 
![alt text](<Screenshot 2025-11-03 164625-1.png>) 
![alt text](<Screenshot 2025-11-03 164700-1.png>) 
![alt text](<Screenshot 2025-11-03 164727-1.png>)