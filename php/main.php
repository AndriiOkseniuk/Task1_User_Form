<?php
require_once('../db/connect_db.php');
require_once('validator.php');

$_POST = json_decode(file_get_contents('php://input'), true);
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$station_id = $_POST["station_id"];
$is_car = $_POST["is_car"];
$lunches = $_POST["lunches"];
$breakfast = $_POST["breakfasts"];
$message = $_POST["message"];

$firstName = trim($firstName);
$firstName = htmlspecialchars($firstName);

$lastName = trim($lastName);
$lastName = htmlspecialchars($lastName);

$message = trim($message);
$message = htmlspecialchars($message);

$userData = array(
    "firstName" => $firstName,
    "lastName" => $lastName,
    "station_id" => $station_id,
    "is_car" => $is_car,
    "lunches" => $lunches,
    "breakfast" => $breakfast,
    "message" => $message
);

$resultValidation = DataValidation($userData);


if (empty($resultValidation[1])) {

    echo json_encode($resultValidation);

} else {
    try {
        $query = "INSERT INTO `users`(`first_name`, `last_name`, `station_id`, `is_car`, `lunche`, `breakfast`, `message`) 
        VALUES ('$firstName','$lastName','$station_id', $is_car, $lunches, $breakfast,'$message')";

        $pdo->query($query);

        http_response_code(201);
        echo json_encode($resultValidation);
    } catch (\Throwable $th) {
        http_response_code(503);
        echo json_encode(array(
            "message" => "Что-то пошло не так, попробуйте позже",
            "error" => $th
    ));
    }
}