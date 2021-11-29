import {
    firstName as FirstNameInput,
    lastName as LastNameInput,
    FirstNameErrorText,
    LastNameErrorText,
    defaultStyle,
} from './main.js'


export let StatusDataValodatorJs = false

export const errorMessage = {
    "FirstNameEmpty": "First Name field is requrire",
    "LastNameEmpty": "Last Name field is requrire",
    "FirstNameless3": "First Name must be more than 3 characters",
    "LastNameless3": "Last Name must be more than 3 characters",
    "FirstNameMore60": "First Name must be less than 60 characters",
    "LastNameMore60": "Last Name must be less than 60 characters"
}


let isBlurLastName = false;
let isBlurFirstName = false;

firstName.onblur = () => {
    ValidatorFirstName()
    isBlurLastName = true
}

lastName.onblur = () => {
    ValidatorLastName()
    isBlurFirstName = true
}


firstName.onkeyup = () => isBlurLastName ? ValidatorFirstName() : null

lastName.onkeyup = () => isBlurFirstName ? ValidatorLastName() : null



function ValidatorFirstName() {
    if (firstName.value === '') {
        FirstNameErrorText.classList.add('error_text')
        FirstNameErrorText.innerHTML = errorMessage.FirstNameEmpty
        StatusDataValodatorJs = false
    } else if (firstName.value.length < 3) {
        FirstNameErrorText.classList.add('error_text')
        FirstNameErrorText.innerHTML = errorMessage.FirstNameless3
        StatusDataValodatorJs = false
    } else if (firstName.value.length > 60) {
        FirstNameErrorText.classList.add('error_text')
        FirstNameErrorText.innerHTML = errorMessage.FirstNameMore60
        StatusDataValodatorJs = false
    }
    else {
        defaultStyle('FirstName')
        StatusDataValodatorJs = true
    }
}

function ValidatorLastName() {
    if (lastName.value === '') {
        LastNameErrorText.classList.add('error_text')
        LastNameErrorText.innerHTML = errorMessage.LastNameEmpty
        StatusDataValodatorJs = false
    } else if (lastName.value.length < 3) {
        LastNameErrorText.classList.add('error_text')
        LastNameErrorText.innerHTML = errorMessage.LastNameless3
        StatusDataValodatorJs = false
    } else if (lastName.value.length > 60) {
        LastNameErrorText.classList.add('error_text')
        LastNameErrorText.innerHTML = errorMessage.LastNameMore60
        StatusDataValodatorJs = false
    }
    else {
        defaultStyle('LastName')
        StatusDataValodatorJs = true
    }
}