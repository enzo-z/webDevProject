CREATE DATABASE technote;

CREATE TABLE titulos(
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(40) NOT NULL, 
    PRIMARY KEY(id)
);

CREATE TABLE notes(
    id int NOT NULL AUTO_INCREMENT,
    tema varchar(15) NULL,
    texto varchar(400) NULL,
    id_titulos int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_titulos) REFERENCES titulos(id)
);