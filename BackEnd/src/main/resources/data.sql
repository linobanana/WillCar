DROP TABLE IF EXISTS user ;

CREATE TABLE user (
                      id                 INT AUTO_INCREMENT  PRIMARY KEY,
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

DROP TABLE IF EXISTS user_role;

CREATE TABLE user_role
(
    roles   CHAR(250) not null,
    user_id int
);

INSERT INTO user_role (roles, user_id)
VALUES ('ADMIN', 1),
       ('DRIVER', 1),
       ('PASSENGER', 1),
       ('ADMIN', 2),
       ('PASSENGER', 2),
       ('ADMIN', 3),
       ('DRIVER', 4),
       ('PASSENGER', 5);
