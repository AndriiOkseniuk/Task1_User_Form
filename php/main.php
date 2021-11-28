<?php
require_once('connect_db.php');
require_once('validator.php');

$_POST = json_decode(file_get_contents('php://input'), true);
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];


$resultValidation = DataValidation($firstName, $lastName);


if (empty($resultValidation[1])) {

    echo json_encode($resultValidation);
    
} else {
    echo json_encode($resultValidation);

    $query = "INSERT INTO `users`(`LastName`, `FirstName`) VALUES ('$firstName','$lastName')";

     echo $pdo->query($query);

    // echo json_encode($resultValidation);
}

