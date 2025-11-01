

-- 1. CLEANUP 
----------------------------------------------------------------

-- Drop linking tables first
DROP TABLE IF EXISTS Rentals;

DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Members;


-- 2. CREATE TABLE STATEMENTS (20 Points)

-- Table 1: Members (Customers)
CREATE TABLE Members (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, -- Optional Field 1: Ensures unique contact
    join_date DATE NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Standard' NOT NULL -- Optional Field 2: Tracks customer loyalty tiers
);

-- Table 2: Movies (Your Unique Data - Telugu Films)
CREATE TABLE Movies (
    movie_id SERIAL PRIMARY KEY, -- Corrected for PostgreSQL
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL, -- 3+ genres required
    release_year INT,
    director VARCHAR(100), -- Optional Field 1: Enhances data uniqueness
    imdb_rating DECIMAL(2, 1) -- Optional Field 2: Allows for analytical queries
);

-- Table 3: Rentals (The linking table)
CREATE TABLE Rentals (
    rental_id SERIAL PRIMARY KEY, -- Corrected for PostgreSQL
    movie_id INT NOT NULL,
    member_id INT NOT NULL,
    rental_date DATE NOT NULL,
    return_date DATE, -- NULL indicates the movie is currently rented
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);


-- 3. INSERT STATEMENTS (30 Points - Data Uniqueness)
----------------------------------------------------------------

-- Insert 5 unique member records
INSERT INTO Members (first_name, last_name, email, join_date, membership_level) VALUES
('Ramesh', 'Chandra', 'rchandra@mail.com', '2023-01-15', 'Premium'),
('Priya', 'Reddy', 'preddy@mail.com', '2023-04-22', 'Standard'),
('Suresh', 'Kumar', 'skumar@mail.com', '2022-11-01', 'Premium'),
('Divya', 'Srinivas', 'dsrinivas@mail.com', '2024-03-10', 'Standard'),
('Karthik', 'Goud', 'kgoud@mail.com', '2024-06-01', 'Standard');

-- Insert 6 unique movie records (Telugu movie data ensures uniqueness)
-- Genres: Epic Fantasy, Drama/Romance, Biography, Action/Drama, Romantic Comedy, Sports Drama (6 total)
INSERT INTO Movies (title, genre, release_year, director, imdb_rating) VALUES
('Baahubali: The Beginning', 'Epic Fantasy', 2015, 'S. S. Rajamouli', 8.0),
('Arjun Reddy', 'Drama/Romance', 2017, 'Sandeep Vanga', 8.1),
('Mahanati', 'Biography', 2018, 'Nag Ashwin', 8.5),
('Rangasthalam', 'Action/Drama', 2018, 'Sukumar', 8.3),
('Pellichoopulu', 'Romantic Comedy', 2016, 'Tharun Bhascker', 7.9),
('Jersey', 'Sports Drama', 2019, 'Gowtam Tinnanuri', 8.6);

-- Insert rental records
INSERT INTO Rentals (movie_id, member_id, rental_date, return_date) VALUES
(1, 1, '2024-10-25', '2024-10-28'), -- Ramesh rented Baahubali
(2, 3, '2024-10-26', '2024-10-29'), -- Suresh rented Arjun Reddy
(3, 1, '2024-10-27', '2024-10-29'), -- Ramesh rented Mahanati
(4, 2, '2024-10-28', NULL),         -- Priya rented Rangasthalam (still rented - IS NULL example)
(6, 4, '2024-10-29', '2024-10-30'), -- Divya rented Jersey
(6, 1, '2024-10-30', NULL);         -- Ramesh rented Jersey (still rented - IS NULL example)


-- 4. REQUIRED QUERIES
----------------------------------------------------------------
SELECT * FROM movies;



-- A. The Completed JOIN Query (20 Points)
SELECT
    M.first_name || ' ' || M.last_name AS Member_Name,
    O.title AS Movie_Title,
    R.rental_date
FROM
    Rentals R
INNER JOIN
    Members M ON R.member_id = M.member_id
INNER JOIN
    Movies O ON R.movie_id = O.movie_id
ORDER BY
    R.rental_date DESC;

-- B. Additional Queries (At least 3 - 15 Points)
-- Query 1: Using WHERE and ORDER BY
SELECT
    title, release_year, imdb_rating
FROM
    Movies
WHERE
    imdb_rating > 8.2
ORDER BY
    imdb_rating DESC;

-- Query 2: Using COUNT and GROUP BY (Aggregation)
SELECT
    M.first_name || ' ' || M.last_name AS Member_Name,
    COUNT(R.rental_id) AS Total_Rentals
FROM
    Members M
LEFT JOIN
    Rentals R ON M.member_id = R.member_id
GROUP BY
    Member_Name
ORDER BY
    Total_Rentals DESC;

-- Query 3: Using IS NULL (Filtering for current status)
SELECT
    O.title AS Currently_Rented_Movie,
    M.first_name || ' ' || M.last_name AS Rented_By
FROM
    Rentals R
INNER JOIN
    Members M ON R.member_id = M.member_id
INNER JOIN
    Movies O ON R.movie_id = O.movie_id
WHERE
    R.return_date IS NULL;


-- 5. DATA UNIQUENESS PROOF QUERY
----------------------------------------------------------------
SELECT
  (SELECT COUNT(*) FROM Movies) AS movie_count,
  (SELECT COUNT(DISTINCT genre) FROM Movies) AS genre_count,
  (SELECT STRING_AGG(title, ', ') FROM Movies) AS titles;






