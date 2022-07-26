DROP DATABASE IF EXISTS paper_administration;
CREATE DATABASE paper_administration;

USE paper_administration;

-- Users table
CREATE TABLE users(
    id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL, 
    password VARCHAR(100) NOT NULL
);

-- Paper types table
CREATE TABLE types(
    id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type VARCHAR(20) NOT NULL
);

-- Default paper types
INSERT INTO types SET type = "Ahuesado";
INSERT INTO types SET type = "Brillo";
INSERT INTO types SET type = "Mate";
INSERT INTO types SET type = "Folding";
INSERT INTO types SET type = "Offset";
INSERT INTO types SET type = "Escudo gris";
INSERT INTO types SET type = "Reciclado";

-- Delivery modes table
CREATE TABLE modes(
    id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mode VARCHAR(20) NOT NULL
);

-- Default delivery modes
INSERT INTO modes SET mode = "Paquete";
INSERT INTO modes SET mode = "Palet";
INSERT INTO modes SET mode = "Palet abierto";

-- Items table
CREATE TABLE items(
    id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type INT(11) NOT NULL,
    sideA INT(11) NOT NULL,
    sideB INT(11) NOT NULL,
    grammage INT(11) NOT NULL,
    sheets INT(11) NOT NULL,
    mode INT(11) NOT NULL,
    origin VARCHAR(20) NOT NULL,
    weight INT(11) NOT NULL,
    kgPurchasePrice FLOAT(11) NOT NULL,
    kgSellPrice FLOAT(11) NOT NULL,
    purchasePrice FLOAT(11) NOT NULL,
    sellPrice FLOAT(11) NOT NULL,
    observation VARCHAR(200) NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_type FOREIGN KEY (type) REFERENCES types(id),
    CONSTRAINT fk_mode FOREIGN KEY (mode) REFERENCES modes(id)
);

CREATE TABLE outlets(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    itemId INT(11) NOT NULL,
    amount INT(11) NOT NULL,
    observation VARCHAR(1000) NOT NULL,
    CONSTRAINT fk_itemId FOREIGN KEY (itemId) REFERENCES items(id)
);