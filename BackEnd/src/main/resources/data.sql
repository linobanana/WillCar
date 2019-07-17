DROP TABLE IF EXISTS user ;

CREATE TABLE user (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL,
  phone_number VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  login VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  pref_communication VARCHAR(250) DEFAULT NULL,
  role INT DEFAULT NULL,
  passenger_rating INT,
  driver_rating INT
);

INSERT INTO user (first_name, last_name, phone_number, email, login,
 password, role, passenger_rating, driver_rating) VALUES
  ('Aliko', 'Dangote', '+375293456789', 'xdfghjkl', 'aliko', 'aliko', '0', '11', '50'),
  ('Bill', 'Gates', '+375298260934', 'fshg', 'bill', 'bill', '0', '11', '0'),
  ('Alex', 'Forman', '+375295627624', 'alex@gmail.com', 'alexForman', '11111', '0', '1', '0'),
  ('Natalia', 'Ivanova', '+375445647221', 'nat92@mail.com', 'nattIva', '12345', '1', '56', '125'),
  ('Tatiana', 'Sosnovskaya', '+375298784455', 'tatia@mail.com', 'tatiaSosn', 'tatiana', '0', '0', '300'),
  ('Gregory', 'House', '+375296543222', 'house@gmail.com', 'greghouse', '777', '0', '0', '0'),
  ('DJ', 'Gates', '+375298267634', 'dj@mail.com', 'dj', 'dj', '0', '0', '10'),
  ('Folrunsho', 'Alakija', '+375447261378', 'kadiuskw', 'alak', 'alak', '1', '100', '10');
