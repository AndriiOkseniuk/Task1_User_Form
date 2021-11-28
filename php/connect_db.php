<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=test_task1_db', 'root', '');
} catch (PDOException $e) {
    http_response_code(503);
    echo json_encode(array('error' => "Unable to establish a connection to the database"));
    exit;
}
