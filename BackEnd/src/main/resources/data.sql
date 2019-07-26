DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS path;
DROP TABLE IF EXISTS drive;
DROP TABLE IF EXISTS passenger_drive;
DROP TABLE IF EXISTS messages;


CREATE TABLE user
(
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  first_name         VARCHAR(250) NOT NULL,
  last_name          VARCHAR(250) NOT NULL,
  phone_number       VARCHAR(250) NOT NULL,
  email              VARCHAR(250) NOT NULL,
  login              VARCHAR(250) NOT NULL,
  password           VARCHAR(250) NOT NULL,
  pref_communication VARCHAR(250) DEFAULT NULL,
  passenger_rating   INT,
  driver_rating      INT,
  active             BOOLEAN
);

ALTER TABLE user
  ADD CONSTRAINT uniqueFirstName UNIQUE (login);

CREATE TABLE user_role
(
  user_id INT NOT NULL,
  roles   VARCHAR(10) check (roles in ('PASSENGER', 'DRIVER', 'ADMIN'))
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
  passenger_id             INT          NOT NULL,
  drive_id                 INT          NOT NULL,
  start_point              VARCHAR(250) NOT NULL,
  passenger_to_driver_mark INT DEFAULT NULL,
  driver_to_passenger_mark INT DEFAULT NULL
);

CREATE TABLE messages
(
  id       INT          NOT NULL,
  drive_id INT          NOT NULL,
  message  VARCHAR(250) NOT NULL,
  time     TIMESTAMP,
  user_id  INT
);

INSERT INTO user_role (user_id, roles)
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
                  password, passenger_rating, driver_rating, active)
VALUES ('Aliko', 'Dangote', '+375293456789', 'xdfghjkl', 'aliko',
        '$2a$10$Jij7xU.xa0ZeMrJxTprzjejVD5yTVahMwaZ8mdjtJ6K2cBRVlhS.y', '11', '50', 'TRUE'),
       ('Bill', 'Gates', '+375298260934', 'fshg', 'bill',
        '$2a$10$4BEiFy3gkPmSrbdfPB6eTOtuxMUYLPMbtFPtBWIXej64wjdOMDSkC', '11', '0', 'TRUE'),
       ('Alex', 'Forman', '+375295627624', 'alex@gmail.com', 'alexForman',
        '$2a$10$WyIDLksLKNDobiMStA/egOiPVaItQWOcpyMHsQQtZ15MFTLdhpSRi', '1', '0', 'TRUE'),
       ('Natalia', 'Ivanova', '+375445647221', 'nat92@mail.com', 'nattIva',
        '$2a$10$4fqzUIU1Se0cfXu7JFb5reUPvEJnmdWZnNuBVnfy46uX1UnKW.SVC', '56', '125', 'TRUE'),
       ('Tatiana', 'Sosnovskaya', '+375298784455', 'tatia@mail.com', 'tatiaSosn',
        '$2a$10$WcT5gUO6rI3DQqD5gqcB9Oa6uB6UBDrNZoe/DwJUXdsZOXOKVIcTi', '0', '300', 'TRUE'),
       ('Gregory', 'House', '+375296543222', 'house@gmail.com', 'greghouse',
        '$2a$10$CuNUOXvdi.q3AelSRnH9gO.C3foJDqc0s0XeSEOLvcvmTVvP57Ica', '0', '0', 'TRUE'),
       ('DJ', 'Gates', '+375298267634', 'dj@mail.com', 'dj',
        '$2a$10$qIS4HbTbQoGMVAGKeNjKnOdm67pK2UGavdxc7PZyzzntRB06GRHcC', '0', '10', 'TRUE'),
       ('Folrunsho', 'Alakija', '+375447261378', 'kadiuskw', 'alak',
        '$2a$10$ozMEroUIr5MKL8LU1iJ7QeJE/ueCijGtNM/CMpl51gwKcwBB.JC.K', '100', '10', 'TRUE');


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
       ('1', '4', '53.9313228, 27.6925045'),
       ('5', '3', '53.9313228, 27.6925045'),
       ('2', '5', '53.9313228, 27.6925045'),
       ('6', '2', '53.9313228, 27.6925045');

INSERT INTO messages (drive_id, message, time, user_id)
VALUES ('1', 'hello', '2009-06-04 18:13:56', '1'),
       ('1', 'hi', '2009-06-04 18:15:00', '4');
