<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=test_task2_db', 'root', 'root', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    http_response_code(503);
    echo json_encode(array(
        "message" => "Невозможно установить соединение с базой данных",
        "error" => $e
    ));
    exit;
}

//SQL

// CREATE TABLE users  
// (  
//     id int NOT NULL AUTO_INCREMENT ,
//     firstName VARCHAR(255) NOT NULL, 
//     lastName VARCHAR(255) NOT NULL,
//     create_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
//     PRIMARY KEY (id)
// )
