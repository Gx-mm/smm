CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','teacher','student') NOT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role_status (role, status)
);

CREATE TABLE classes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(40) NOT NULL,
  section VARCHAR(10) NOT NULL,
  class_teacher_id BIGINT NULL,
  room_no VARCHAR(20),
  UNIQUE KEY uk_class_section (class_name, section)
);

CREATE TABLE students (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  admission_no VARCHAR(30) UNIQUE,
  class_id BIGINT,
  roll_no VARCHAR(20),
  full_name VARCHAR(120) NOT NULL,
  gender ENUM('male','female','other'),
  dob DATE,
  parent_name VARCHAR(120),
  phone VARCHAR(20),
  address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
  INDEX idx_students_class (class_id)
);

CREATE TABLE teachers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  employee_code VARCHAR(30) UNIQUE,
  full_name VARCHAR(120) NOT NULL,
  qualification VARCHAR(120),
  subject_specialization VARCHAR(120),
  phone VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE classes ADD CONSTRAINT fk_class_teacher FOREIGN KEY (class_teacher_id) REFERENCES teachers(user_id) ON DELETE SET NULL;

CREATE TABLE attendance (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  class_id BIGINT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present','absent','late') NOT NULL,
  marked_by BIGINT,
  UNIQUE KEY uk_attendance_student_date (student_id, date),
  FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_attendance_class_date (class_id, date)
);

CREATE TABLE results (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  class_id BIGINT NOT NULL,
  subject VARCHAR(80) NOT NULL,
  exam_type VARCHAR(50) NOT NULL,
  exam_date DATE,
  marks_obtained DECIMAL(5,2) NOT NULL,
  max_marks DECIMAL(5,2) NOT NULL,
  remarks VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  INDEX idx_results_student (student_id, exam_date)
);

CREATE TABLE fees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  term VARCHAR(30) NOT NULL,
  amount_due DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('pending','paid','partial') DEFAULT 'pending',
  FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE,
  INDEX idx_fees_student_status (student_id, status)
);

CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  fee_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method ENUM('stripe','razorpay','upi','cash') NOT NULL,
  transaction_id VARCHAR(120),
  receipt_no VARCHAR(40) UNIQUE,
  receipt_path VARCHAR(255),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fee_id) REFERENCES fees(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(user_id) ON DELETE CASCADE,
  INDEX idx_payments_student_date (student_id, payment_date)
);

CREATE TABLE notices (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(180) NOT NULL,
  content TEXT NOT NULL,
  audience ENUM('all','students','teachers','admins') DEFAULT 'all',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  class_id BIGINT NOT NULL,
  teacher_id BIGINT NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  due_date DATE,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(user_id) ON DELETE CASCADE,
  INDEX idx_assignments_class_due (class_id, due_date)
);

CREATE TABLE admissions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_name VARCHAR(120) NOT NULL,
  parent_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(20),
  class_applied VARCHAR(30) NOT NULL,
  document_path VARCHAR(255),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  reviewed_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_admission_status (status, created_at)
);

CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(160) NOT NULL,
  event_date DATE NOT NULL,
  description TEXT,
  cover_image VARCHAR(255)
);

CREATE TABLE gallery (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  media_type ENUM('photo','video') NOT NULL,
  media_url VARCHAR(255) NOT NULL,
  caption VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_resets (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_reset_token (token),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
