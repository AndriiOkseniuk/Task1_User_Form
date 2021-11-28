<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=test_task1_db', 'root', 'root');
} catch (PDOException $e) {
    http_response_code(503);
    echo json_encode(array('error' => "Unable to establish a connection to the database"));
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
