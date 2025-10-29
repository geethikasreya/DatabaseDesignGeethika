
## 1️ CLI PostgreSQL Screenshot

![alt text](<CLI.png>)




## 2 DataGrip Screenshot

![alt text](<Datagrip.png>)

## 3 ER Diagram

![alt text](<.png>)

## 4 Five SQL Queries
![alt text](<QueryScreenshot.png>) 
![alt text](<QueryScreenshot.png>)

-- Query 1
SELECT s.full_name, s.position, d.dept_name, s.hire_date
FROM staff s JOIN departments d ON s.dept_id = d.dept_id;

-- Query 2
SELECT d.dept_name, COUNT(e.event_id) AS events_count
FROM departments d LEFT JOIN events e ON d.dept_id = e.dept_id
GROUP BY d.dept_name;

-- Query 3
SELECT DISTINCT s.full_name, MIN(e.event_date) OVER (PARTITION BY s.student_id) AS first_event_date
FROM attendance a
JOIN students s ON a.student_id = s.student_id
JOIN events e ON a.event_id = e.event_id;

-- Query 4
SELECT e.event_name, ROUND(AVG(a.feedback_score),2) AS avg_feedback
FROM events e JOIN attendance a ON e.event_id = a.event_id
GROUP BY e.event_name HAVING AVG(a.feedback_score) >= 8;

-- Query 5
SELECT d.dept_name, ROUND(AVG(a.feedback_score),2) AS dept_avg_feedback
FROM departments d
JOIN events e ON e.dept_id = d.dept_id
JOIN attendance a ON a.event_id = e.event_id
GROUP BY d.dept_name;


## 5 Simple Reflection (around 200 words)

Setting up PostgreSQL and connecting it through both the terminal and DataGrip helped me understand how databases actually work. First, I used the command sudo -u postgres psql to open PostgreSQL from the terminal and connected to my database using \c library_db. This confirmed that my server was running and responding properly. Then, I connected through DataGrip using the same details — host as localhost, port 5432, database name library_db, user postgres, and my password. I learned that both tools use the same connection setup but display the data differently.

While creating the database structure, I designed tables such as departments, staff, students, events, and attendance. This helped me understand how to link tables using primary and foreign keys. Generating the ER diagram in DataGrip made it easier to see relationships visually and confirm that the schema was consistent.

Writing SQL queries taught me how to use commands like JOIN, GROUP BY, and HAVING to extract useful results from data. Overall, I learned how to set up, design, and test a complete database system from start to finish using both the command line and a professional database tool.