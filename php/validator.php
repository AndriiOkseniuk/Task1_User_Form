<?php

function DataValidation($userData, $validationText = array(
    'FirstNameEmpty' => 'Поле Имя обязательно для заполнения (back)',
    'LastNameEmpty' => 'Поле Фамилия обязательно (back)',
    'FirstNameless3' =>  'Имя не может быть меньше 3 символов (back)',
    'LastNameless3' =>  'Фамилия не может быть меньше 3 символов (back)',
    'FirstNameMore60' =>  'Имя должно быть меньше 60 символов (back)',
    'LastNameMore60' =>  'Фамилия должна быть меньше 60 символов (back)',
    'stationIdEmpty' => 'Нужно выбрать станцию метро (back)',
    'stationNotExist' => 'Выбранная вами станция не существует (back)',
    'messageMore500' => 'Сообщение не может быть больше 500 символов (back)',
    'menuEmpty' => 'Выберите обеды или завтраки (back)'
    ))
{
    $response = array();
    $status = false;

    //FirstName field validation
     if (empty($userData['firstName'])) {
        http_response_code(422);
        $response['firstName'] = $validationText['FirstNameEmpty'];

    } elseif (mb_strlen($userData['firstName'])<3) {
        http_response_code(422);
        $response['firstName'] = $validationText['FirstNameless3'];

    } elseif (mb_strlen($userData['firstName'])>60) {
        http_response_code(422);
        $response['firstName'] = $validationText['FirstNameMore60'];
    } 


    //LastName field validation
    if (empty($userData['lastName'])) {
        http_response_code(422);
        $response['lastName'] = $validationText['LastNameEmpty'];

    } elseif(mb_strlen($userData['lastName'])<3) {
        http_response_code(422);
        $response['lastName'] = $validationText['LastNameless3'];

    } elseif (mb_strlen($userData['lastName'])>60) {
        http_response_code(422);
        $response['lastName'] = $validationText['LastNameMore60'];
    }

    //Metro stations validation
    if ($userData['station_id'] === '') {
        http_response_code(422);
        $response['station_id'] = $validationText['stationIdEmpty'];
    } elseif ((int)$userData['station_id'] > 16) {
        http_response_code(422);
        $response['station_id'] = $validationText['stationNotExist'];
    }

    //Message validation
    if (mb_strlen($userData['message']) > 500) {
        http_response_code(422);
        $response['message'] = $validationText['messageMore500'];
    }


    //Menu checkboxes validation
    if ($userData['lunches'] === "false" && $userData['breakfast'] === "false") {
        http_response_code(422);
        $response['menu'] = $validationText['menuEmpty'];
    }

    

//Validation result
    if ($response) {
      $status = false;
    } else {
        $response['message'] = 'success';
        $response['UserData'] = array(
            'FirstName' => $userData['firstName'],
            'LastName'=> $userData['lastName']
        );
        $status = true;
    } 

    return array($response, $status);
}
