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

echo '<a href="http://user-form/" style="text-decoration: none; color: rgba(0,0,0,90%)">&#9668; Назад</a>';
echo "<br>";
echo "<br>";
echo "<h3>" . "Количесто пользователей: " . $usersCount . "</h3>" . "<br>";


do {
    echo "<br>";
    echo "<b>id:</b> " . $row['id'] . "<br>";
    echo "<b>Имя:</b> " . $row['first_name'] . "<br>";
    echo "<b>Фамилия:</b> " . $row['last_name'] . "<br>";


    $is_car = $row['is_car'] ? "<b>Есть авто</b>" . "<br>" :  "<b>Нет авто</b>" . "<br>";
    echo $is_car;


    $is_lunche = $row['lunche'] ? "<b>Обеды:</b> да" . "<br>" :  "<b>Обеды:</b> нет" . "<br>";
    echo $is_lunche;


    $is_breakfast = $row['breakfast'] ? "<b>Завтраки:</b> да" . "<br>" :  "<b>Завтраки:</b> нет" . "<br>";
    echo $is_breakfast;


    echo "<b>Сообщение:</b> " . $row['message'] . "<br>";
    echo "<b>Станция метро:</b> " . $row['station'] . "<br>";
    echo "<b>Дата регистрации:</b> " . $row['created_at'];
    echo "<hr>";
    echo "<br>";
} while ($row = $sth->fetch());





http_response_code(200);
