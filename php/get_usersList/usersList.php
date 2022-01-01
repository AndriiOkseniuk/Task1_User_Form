<?php
require_once('../../db/connect_db.php');


$sqlQueryCountUsers = "SELECT COUNT(*) FROM `users`";
$countOfUsers = $pdo->query($sqlQueryCountUsers);
$usersCount = $countOfUsers->fetch()['COUNT(*)'];


$sqlQuery = "SELECT users.id, 
users.first_name, 
users.last_name, 
users.is_car, 
users.lunche, 
users.breakfast, 
users.message, 
users.created_at, 
users.station_id, 
stations.station 
from users join stations on stations.id = users.station_id 
ORDER BY users.created_at DESC";

$sth = $pdo->query($sqlQuery);
$row = $sth->fetch();

$arrResult = [];

$arrResult['total'] = $usersCount;
do {
    $resObj = array(
        "id" => $row['id'],
        "first_name" => $row['first_name'],
        "last_name" => $row['last_name'],
        "station" => $row['station'],
        "is_car" => $row['is_car'],
        "lunche" => $row['lunche'],
        "breakfast" => $row['breakfast'],
        "message" => $row['message'],
        "created_at" => $row['created_at']
    );

    $arrResult['users'][] = $resObj;
} while ($row = $sth->fetch());



echo json_encode($arrResult);

http_response_code(200);
