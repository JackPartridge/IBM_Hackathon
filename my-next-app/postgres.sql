-- PostgreSQL Compatible SQL File

-- PostgreSQL doesn't use SQL modes this way

-- Database: "Hackathon"

-- Create the ENUM type for 'user_access'
CREATE TYPE user_access AS ENUM ('STUDENT', 'TUTOR', 'ADMIN');

-- --------------------------------------------------------

-- Table structure for table "objectives"
CREATE TABLE objectives (
  objective_id SERIAL PRIMARY KEY,
  user_id INTEGER DEFAULT NULL,
  objective_type_id INTEGER DEFAULT NULL,
  description TEXT DEFAULT NULL,
  description_date TIMESTAMP DEFAULT NULL,
  mid_comment TEXT DEFAULT NULL,
  mid_comment_date TIMESTAMP DEFAULT NULL,
  end_comment TEXT DEFAULT NULL,
  end_comment_date TIMESTAMP DEFAULT NULL,
  mid_tutor_comment TEXT DEFAULT NULL,
  mid_tutor_comment_date TIMESTAMP DEFAULT NULL,
  end_tutor_comment TEXT DEFAULT NULL,
  end_tutor_comment_date TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Dumping data for table "objectives"
INSERT INTO objectives (objective_id, user_id, objective_type_id, description, description_date, mid_comment, mid_comment_date, end_comment, end_comment_date, mid_tutor_comment, mid_tutor_comment_date, end_tutor_comment, end_tutor_comment_date, created_at, updated_at) VALUES
(37, 1, 1, 'This is a new objective', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

-- Table structure for table "objective_types"
CREATE TABLE objective_types (
  objective_type_id SERIAL PRIMARY KEY,
  type TEXT DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Dumping data for table "objective_types"
INSERT INTO objective_types (objective_type_id, type, created_at, updated_at) VALUES
(1, 'Study', '2024-02-11 14:04:25', '2024-02-11 14:04:36'),
(2, 'Mental', '2024-02-11 14:04:40', '2024-02-11 14:04:44');

-- --------------------------------------------------------

-- Table structure for table "students"
CREATE TABLE students (
  user_id SERIAL PRIMARY KEY,
  uol_student_num VARCHAR(10) DEFAULT NULL,
  tutor_id INTEGER DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Dumping data for table "students"
INSERT INTO students (user_id, uol_student_num, tutor_id, created_at, updated_at) VALUES
(1, '6342872', 2, '2024-02-11 14:31:57', '2024-02-11 14:31:57');

-- --------------------------------------------------------

-- Table structure for table "users"
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_access user_access NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(10) NOT NULL,
  email VARCHAR(256) NOT NULL,
  password VARCHAR(128) NOT NULL,
  init_user BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Dumping data for table "users"
INSERT INTO users (user_id, user_access, first_name, last_name, username, email, password, init_user, created_at, updated_at) VALUES
(1, 'STUDENT', 'j', 'p', 'jp589', 'jp589@gfecibgswek.com', '0ufew98hfweio', TRUE, '2024-02-11 14:29:08', '2024-02-11 14:29:08'),
(2, 'TUTOR', 'j', 'p', 'jp58934', 'jp589@gfecibgswek.comcd', '0ufew98hfweio', TRUE, '2024-02-11 14:29:08', '2024-02-11 14:29:08');

ALTER TABLE "objectives"
  ADD PRIMARY KEY ("objective_id"),
  ADD KEY "user_id_index" ("user_id"),
  ADD KEY "objective_type_id_index" ("objective_type_id");

--
-- Indexes for table "objective_types"
--
ALTER TABLE "objective_types"
  ADD PRIMARY KEY ("objective_type_id");

--
-- Indexes for table "students"
--
ALTER TABLE "students"
  ADD PRIMARY KEY ("user_id"),
  ADD UNIQUE KEY "uol_student_num" ("uol_student_num"),
  ADD KEY "tutor_id_index" ("tutor_id");

--
-- Indexes for table "users"
--
ALTER TABLE "users"
  ADD PRIMARY KEY ("user_id"),
  ADD UNIQUE KEY "username" ("username"),
  ADD UNIQUE KEY "email" ("email");

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table "objectives"
--
ALTER TABLE "objectives"
  MODIFY "objective_id" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table "objective_types"
--
ALTER TABLE "objective_types"
  MODIFY "objective_type_id" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table "users"
--
ALTER TABLE "users"
  MODIFY "user_id" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table "objectives"
--
ALTER TABLE "objectives"
  ADD CONSTRAINT "fk_objectives_objective_types" FOREIGN KEY ("objective_type_id") REFERENCES "objective_types" ("objective_type_id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "fk_objectives_users" FOREIGN KEY ("user_id") REFERENCES "students" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table "students"
--
ALTER TABLE "students"
  ADD CONSTRAINT "fk_students_tutors" FOREIGN KEY ("tutor_id") REFERENCES "users" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "fk_students_users" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;