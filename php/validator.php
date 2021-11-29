<?php


function DataValidation($firstName, $lastName, $validationText = array(
    'FirstNameEmpty' => 'First Name field is requrire',
    'LastNameEmpty' => 'Last Name field is requrire',
    'FirstNameless3' =>  'First Name must be more than 3 characters',
    'LastNameless3' =>  'Last Name must be more than 3 characters',
    'FirstNameMore60' =>  'First Name must be less than 60 characters',
    'LastNameMore60' =>  'Last Name must be less than 60 characters'
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
        $response['firstName'] = $validationText['FirstNameless3'];

    } elseif (mb_strlen($firstName)>60) {

        http_response_code(422);
        $response['firstName'] = $validationText['FirstNameMore60'];

    } 


    //LastName field validation
    if (empty($lastName)) {

        http_response_code(422);
        $response['lastName'] = $validationText['LastNameEmpty'];
    } elseif(mb_strlen($lastName)<3) {

        http_response_code(422);
        $response['lastName'] = $validationText['LastNameless3'];

    } elseif (mb_strlen($lastName)>60) {

        http_response_code(422);
        $response['lastName'] = $validationText['LastNameMore60'];
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
