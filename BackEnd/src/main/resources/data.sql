DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS path;
DROP TABLE IF EXISTS drive;
DROP TABLE IF EXISTS passenger_drive;

CREATE TABLE user (
                    id                 INT AUTO_INCREMENT  PRIMARY KEY,
                    first_name         VARCHAR(100) NOT NULL,
                    last_name          VARCHAR(100) NOT NULL,
                    phone_number       VARCHAR(50)  NOT NULL,
                    email              VARCHAR(50)  NOT NULL,
                    login              VARCHAR(250) NOT NULL,
                    password           VARCHAR(250) NOT NULL,
                    pref_communication VARCHAR(50) DEFAULT NULL,
                    passenger_rating   INT,
                    driver_rating      INT
);

CREATE TABLE user_role
(
  user_id INT NOT NULL,
  role    VARCHAR(10) check (role in ('PASSENGER', 'DRIVER', 'ADMIN'))
);

CREATE TABLE path
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  coordinates VARCHAR(250) NOT NULL
);

CREATE TABLE drive
(
  id               INT AUTO_INCREMENT PRIMARY KEY,
  start_time       TIMESTAMP    NOT NULL,
  end_time         TIMESTAMP    NOT NULL,
  free_place_count INT          NOT NULL,
  driver_id        VARCHAR(250) NOT NULL,
  path_id          VARCHAR(250) NOT NULL,
  start_point      VARCHAR(250) NOT NULL,
  fin_point        VARCHAR(250) NOT NULL
);

CREATE TABLE passenger_drive
(
  passenger_id INT          NOT NULL,
  drive_id     INT          NOT NULL,
  start_point  VARCHAR(250) NOT NULL
);

INSERT INTO user_role (user_id, role)
VALUES ('1', 'DRIVER'),
       ('2', 'PASSENGER'),
       ('3', 'PASSENGER'),
       ('4', 'PASSENGER'),
       ('5', 'PASSENGER'),
       ('6', 'PASSENGER'),
       ('6', 'ADMIN'),
       ('7', 'PASSENGER'),
       ('8', 'PASSENGER'),
       ('9', 'PASSENGER');

INSERT INTO user (first_name, last_name, phone_number, email, login,
                  password, passenger_rating, driver_rating)
VALUES ('Aliko', 'Dangote', '+375293456789', 'xdfghjkl', 'aliko', 'aliko', '11', '50'),
       ('Bill', 'Gates', '+375298260934', 'fshg', 'bill', 'bill', '11', '0'),
       ('Alex', 'Forman', '+375295627624', 'alex@gmail.com', 'alexForman', '11111', '1', '0'),
       ('Natalia', 'Ivanova', '+375445647221', 'nat92@mail.com', 'nattIva', '12345', '56', '125'),
       ('Tatiana', 'Sosnovskaya', '+375298784455', 'tatia@mail.com', 'tatiaSosn', 'tatiana', '0', '300'),
       ('Gregory', 'House', '+375296543222', 'house@gmail.com', 'greghouse', '777', '0', '0'),
       ('DJ', 'Gates', '+375298267634', 'dj@mail.com', 'dj', 'dj', '0', '10'),
       ('Alexandra', 'Shimanovich', '+375293678389', 'shimAl@gmail.com', 'sasha', 'sasha', '0', '0'),
       ('Folrunsho', 'Alakija', '+375447261378', 'kadiuskw', 'alak', 'alak', '100', '10');

INSERT INTO path (coordinates)
VALUES ('53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.934891, 27.460824'),
       ('53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.934891, 27.460824'),
       ('53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.934891, 27.460824'),
       ('53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.934891, 27.460824'),
       ('53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.9313228, 27.6925045/53.934891, 27.460824');


INSERT INTO drive (start_time, end_time, free_place_count, driver_id,
                   path_id, start_point, fin_point)
VALUES ('2019-07-23 00:00:01', '2019-07-23 01:00:01', '3', '1', '1', '53.9313228, 27.6925045', '53.934891, 27.460824'),
       ('2019-07-23 13:00:00', '2019-07-23 13:40:00', '1', '1', '2', '53.9313228, 27.6925045', '53.987851, 27.798706'),
       ('2019-07-23 15:00:00', '2019-07-23 01:00:01', '2', '3', '3', '53.987851, 27.798706', '44.070083, 12.567495'),
       ('2019-07-23 15:36:00', '2019-07-23 15:59:00', '4', '5', '4', '53.987851, 27.798706', '53.9313228, 27.6925045]'),
       ('2019-07-23 19:00:00', '2019-07-23 20:03:00', '2', '7', '5', '53.934891, 27.460824', '44.070083, 12.567495');


INSERT INTO passenger_drive (passenger_id, drive_id, start_point)
VALUES ('4', '1', '53.9313228, 27.6925045'),
       ('2', '1', '53.9313228, 27.6925045'),
       ('5', '3', '53.9313228, 27.6925045'),
       ('2', '5', '53.9313228, 27.6925045'),
       ('6', '2', '53.9313228, 27.6925045');
