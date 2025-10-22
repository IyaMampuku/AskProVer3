-- ============================================
-- ASKPRO DATABASE SCHEMA
-- SQL CREATE TABLE statements
-- ============================================

-- This file contains the database schema (table structure) for AskPro.
-- In the current MVP, we're using JavaScript arrays and localStorage,
-- but when you want to add a real database, use these SQL statements.

-- HOW TO USE THIS FILE:
-- 1. Install a database system (PostgreSQL, MySQL, SQLite, etc.)
-- 2. Connect to your database
-- 3. Run these CREATE TABLE statements
-- 4. The tables will be created and ready to store data

-- ------------------------------------
-- USERS TABLE (UPDATED WITH AUTHENTICATION)
-- ------------------------------------
-- Stores information about registered users with authentication support

CREATE TABLE users (
    -- Unique identifier for each user (auto-generated)
    id SERIAL PRIMARY KEY,
    
    -- User's username (must be unique, cannot be null)
    -- Used for login and display throughout the site
    username VARCHAR(50) NOT NULL UNIQUE,
    
    -- User's email address (must be unique, cannot be null)
    -- Can be used for login and password recovery
    email VARCHAR(255) NOT NULL UNIQUE,
    
    -- ==========================================
    -- AUTHENTICATION FIELDS (SECURITY CRITICAL)
    -- ==========================================
    
    -- HASHED PASSWORD (NEVER store plain text passwords!)
    -- This stores the result of a one-way hashing function
    -- Example using bcrypt: password_hash = bcrypt.hash(plainPassword, saltRounds)
    password_hash VARCHAR(255) NOT NULL,
    
    -- SALT (Random data added before hashing)
    -- This makes each password hash unique even if two users have the same password
    -- Modern algorithms like bcrypt include the salt in the hash, but this field
    -- can be used if you want to store it separately or use a different algorithm
    -- Example: salt = bcrypt.genSalt(10)
    salt VARCHAR(100),
    
    -- HOW PASSWORD HASHING WORKS (FOR STUDENTS):
    -- 1. User enters password: "myPassword123"
    -- 2. Server generates random salt: "a3b5c7d9..."
    -- 3. Server combines password + salt: "myPassword123a3b5c7d9..."
    -- 4. Server runs through hashing function: bcrypt.hash(combined, 10)
    -- 5. Server stores the resulting hash (NOT the original password)
    -- 
    -- VERIFICATION PROCESS:
    -- 1. User enters password to login: "myPassword123"
    -- 2. Server retrieves stored hash and salt from database
    -- 3. Server combines entered password + stored salt
    -- 4. Server hashes the combination
    -- 5. Server compares new hash with stored hash
    -- 6. If they match -> password is correct! If not -> wrong password
    
    -- ==========================================
    -- PROFILE INFORMATION
    -- ==========================================
    
    -- User's full name (optional)
    full_name VARCHAR(100),
    
    -- User's bio/description (displayed on profile page)
    bio TEXT,
    
    -- Profile image URL or filename
    -- In a real app, this would link to an uploaded image file
    profile_image VARCHAR(255) DEFAULT 'default-avatar.png',
    
    -- User's reputation/points (calculated from questions/answers)
    reputation_points INTEGER DEFAULT 0,
    
    -- ==========================================
    -- TRACKING & METADATA
    -- ==========================================
    
    -- When the user account was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- When the user last logged in
    last_login TIMESTAMP,
    
    -- Is the account active or deactivated?
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Has the user verified their email?
    email_verified BOOLEAN DEFAULT FALSE
);

-- Create an index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- ------------------------------------
-- QUESTIONS TABLE
-- ------------------------------------
-- Stores all questions posted by users

CREATE TABLE questions (
    -- Unique identifier for each question (auto-generated)
    id SERIAL PRIMARY KEY,
    
    -- Title of the question (required)
    title VARCHAR(200) NOT NULL,
    
    -- Detailed description of the question (required)
    description TEXT NOT NULL,
    
    -- Category of the question (required)
    -- Examples: 'Math', 'Science', 'Tech', 'Programming', 'General'
    category VARCHAR(50) NOT NULL,
    
    -- ID of the user who asked the question
    -- FOREIGN KEY links to users table
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Number of views this question has received
    view_count INTEGER DEFAULT 0,
    
    -- When the question was posted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- When the question was last updated
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);

-- ------------------------------------
-- ANSWERS TABLE
-- ------------------------------------
-- Stores all answers to questions

CREATE TABLE answers (
    -- Unique identifier for each answer (auto-generated)
    id SERIAL PRIMARY KEY,
    
    -- ID of the question this answer belongs to
    -- FOREIGN KEY links to questions table
    question_id INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    
    -- The answer text (required)
    answer_text TEXT NOT NULL,
    
    -- ID of the user who posted the answer
    -- FOREIGN KEY links to users table
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Number of likes/upvotes this answer has received
    likes INTEGER DEFAULT 0,
    
    -- Whether this answer is marked as "accepted" by question author
    is_accepted BOOLEAN DEFAULT FALSE,
    
    -- When the answer was posted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- When the answer was last edited
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_answers_created_at ON answers(created_at DESC);

-- ------------------------------------
-- OPTIONAL: TAGS TABLE
-- ------------------------------------
-- For a more advanced version, you could add tags to questions

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(30) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table to link questions and tags (many-to-many relationship)
CREATE TABLE question_tags (
    question_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, tag_id)
);

-- ------------------------------------
-- SAMPLE DATA INSERTION (Optional)
-- ------------------------------------
-- Here's how you would insert sample data into the tables

-- Insert sample users with authentication data
-- Note: These are example hashed passwords using bcrypt
-- In a real app, you would NEVER store the plain text password!
/*
-- Example 1: User with hashed password
-- Plain password was: "password123" (DON'T ACTUALLY USE THIS IN PRODUCTION!)
-- Salt is included in the bcrypt hash
INSERT INTO users (username, email, password_hash, salt, full_name, bio, profile_image)
VALUES (
    'john_doe', 
    'john@example.com', 
    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',  -- This is bcrypt hash of "password123"
    '$2b$10$N9qo8uLOickgx2ZMRZoMye',  -- This is the salt (bcrypt embeds it in the hash)
    'John Doe',
    'Web developer and tech enthusiast. Love helping others learn!',
    'john-avatar.jpg'
);

-- Example 2: Another user
INSERT INTO users (username, email, password_hash, full_name, bio)
VALUES (
    'jane_smith', 
    'jane@example.com', 
    '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOP',  -- Example hash
    'Jane Smith',
    'Math teacher with a passion for making learning fun!'
);

-- Example 3: Anonymous user (system user for unsigned posts)
INSERT INTO users (username, email, password_hash, full_name, bio, is_active)
VALUES (
    'anonymous', 
    'anonymous@askpro.com', 
    '$2b$10$disabled',  -- Disabled password (can't login)
    'Anonymous User',
    'System user for anonymous contributions',
    FALSE  -- Not an active login account
);
*/

-- Insert a sample question
/*
INSERT INTO questions (title, description, category, user_id)
VALUES (
    'How do I center a div in CSS?',
    'I have tried multiple methods but cannot get my div centered both horizontally and vertically.',
    'Programming',
    1  -- Assuming user with id=1 exists
);
*/

-- Insert a sample answer
/*
INSERT INTO answers (question_id, answer_text, user_id)
VALUES (
    1,  -- Assuming question with id=1 exists
    'Use Flexbox! Set display: flex; justify-content: center; align-items: center; on the parent container.',
    1  -- Assuming user with id=1 exists
);
*/

-- ------------------------------------
-- NOTES FOR STUDENTS
-- ------------------------------------

-- FOREIGN KEYS: These create relationships between tables
-- - user_id in questions links to the users table
-- - question_id in answers links to the questions table
-- - ON DELETE CASCADE means if a user is deleted, their questions and answers are also deleted

-- INDEXES: Speed up queries when searching/sorting by specific columns
-- - idx_questions_category speeds up filtering by category
-- - idx_questions_created_at speeds up sorting by date

-- SERIAL PRIMARY KEY: Auto-increments the ID for each new record
-- - You don't need to specify the ID when inserting data

-- TIMESTAMPS: Automatically record when records are created
-- - created_at records when the row was first inserted
-- - updated_at should be updated whenever the row changes

-- NEXT STEPS FOR STUDENTS:
-- 1. Set up a PostgreSQL, MySQL, or SQLite database
-- 2. Run these CREATE TABLE statements
-- 3. Modify script.js to connect to the database instead of using localStorage
-- 4. Use SQL queries to INSERT, SELECT, UPDATE, and DELETE data
-- 5. Add user authentication using the users table
-- 6. Implement proper password hashing (never store plain text passwords!)
