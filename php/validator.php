<?php


function DataValidation($firstName, $lastName, $validationText = array(
    'FirstNameEmpty' => 'FirstName field is requrire',
    'LastNameEmpty' => 'LastName field is requrire',
    'FirstName<3' =>  'FirstName must be more than 3 characters',
    'LastName<3' =>  'LastName must be more than 3 characters',
    'FirstName>60' =>  'FirstName must be less than 60 characters',
    'LastName>60' =>  'LastName must be less than 60 characters'
    ))
{
    $response = array();
    $status = false;

    //FirstName field validation
     if (empty($firstName)) {

        http_response_code(422);
        $response['firstName'] = $validationText['FirstNameEmpty'];

    } elseif (mb_strlen($firstName)<3) {

        http_response_code(422);
        $response['firstName'] = $validationText['FirstName<3'];

    } elseif (mb_strlen($firstName)>60) {

        http_response_code(422);
        $response['firstName'] = $validationText['FirstName>60'];

    } 


    //LastName field validation
    if (empty($lastName)) {

        http_response_code(422);
        $response['lastName'] = $validationText['LastNameEmpty'];
    } elseif(mb_strlen($lastName)<3) {

        http_response_code(422);
        $response['lastName'] = $validationText['LastName<3'];

    } elseif (mb_strlen($lastName)>60) {

        http_response_code(422);
        $response['lastName'] = $validationText['LastName>60'];
    }


//Validation result
    if ($response) {
      $status = false;
    } else {
        $response['message'] = 'success';
        $response['UserData'] = array(
            'FirstName' => $firstName,
            'LastName'=> $lastName
        );
        $status = true;
    } 

    return array($response, $status);
}
