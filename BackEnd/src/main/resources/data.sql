DROP TABLE IF EXISTS driver;

CREATE TABLE driver (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL,
  car VARCHAR(250) DEFAULT NULL
);

INSERT INTO driver (first_name, last_name, car) VALUES
  ('Aliko', 'Dangote', 'Honda Accord'),
  ('Bill', 'Gates', 'Renault Twingo'),
  ('Folrunsho', 'Alakija', 'Volkswagen Passat');