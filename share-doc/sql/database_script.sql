CREATE SCHEMA sharedoc;

CREATE TABLE sharedoc.doctors (
  doctor_id INT PRIMARY KEY,
  name VARCHAR(50),
  surname VARCHAR(50),
  specialization VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(50)
);

CREATE TABLE sharedoc.patients (
  patient_id INT PRIMARY KEY,
  name VARCHAR(50),
  surname VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(50),
  doctor_id INT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

INSERT INTO sharedoc.doctors (doctor_id, name, surname, specialization, place, username, password)
VALUES (1, 'Duret', 'Remi', 'Generaliste', 'Paris', 'remi.duret', '1234')

INSERT INTO sharedoc.doctors (doctor_id, name, surname, specialization, place, username, password)
VALUES (2, 'Delafosse', 'Augustin', 'Otorhinolaryngologiste', 'Paris', 'augustin.delafosse', '1234')

INSERT INTO sharedoc.patients (patient_id, name, surname, username, password, doctor_id)
VALUES (1, 'Baraza', 'Remi', 'remi.baraza', '123456', 2);

INSERT INTO sharedoc.patients (patient_id, name, surname, username, password, doctor_id)
VALUES (2, 'Mendoza', 'Leo', 'leo.mendoza', '123456', 2);   

INSERT INTO sharedoc.patients (patient_id, name, surname, username, password, doctor_id)
VALUES (3, 'Fouillet', 'Elena', 'elena.fouillet', '123456', 1);

INSERT INTO sharedoc.patients (patient_id, name, surname, username, password, doctor_id)
VALUES (4, 'Castagnede', 'Alice', 'alice.castagnede', '123456', 1);

INSERT INTO sharedoc.patients (patient_id, name, surname, username, password, doctor_id)
VALUES (5, 'Hartmann', 'Louise', 'louise.hartmann', '123456', 2);

INSERT INTO sharedoc.patients (patient_id, name, surname, username, password, doctor_id)
VALUES (6, 'Lubet', 'Pauline', 'pauline.lubet', '123456', 1); 