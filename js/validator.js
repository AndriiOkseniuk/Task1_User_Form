import ERROR_MESSAGE from '../utils/constants.js'
import {
    FIRST_NAME_ERROR_TEXT,
    LAST_NAME_ERROR_TEXT,
    defaultStyle,
    thereWasFormSubmission
} from './main.js'


const FIRST_NAME = document.querySelector("#firstName")
const LAST_NAME = document.querySelector("#lastName")

let firstNameIsValid = false
let lastNameIsValid = false

let isBlurLastName = false;
let isBlurFirstName = false;


FIRST_NAME.onblur = () => {
    validatorFirstName()
    isBlurLastName = true
}

LAST_NAME.onblur = () => {
    validatorLastName()
    isBlurFirstName = true
}


FIRST_NAME.onkeyup = () => isBlurLastName || thereWasFormSubmission ? validatorFirstName() : null

LAST_NAME.onkeyup = () => isBlurFirstName || thereWasFormSubmission ? validatorLastName() : null



function validatorFirstName() {
    if (FIRST_NAME) {
        if (FIRST_NAME.value === '') {
            FIRST_NAME_ERROR_TEXT.classList.add('form__error_text')
            FIRST_NAME_ERROR_TEXT.textContent = ERROR_MESSAGE.FirstNameEmpty
            FIRST_NAME.classList.add('invalidStyle')
            firstNameIsValid = false
        } else if (FIRST_NAME.value.length < 3) {
            FIRST_NAME_ERROR_TEXT.classList.add('form__error_text')
            FIRST_NAME_ERROR_TEXT.textContent = ERROR_MESSAGE.FirstNameless3
            FIRST_NAME.classList.add('invalidStyle')
            firstNameIsValid = false
        } else if (FIRST_NAME.value.length > 60) {
            FIRST_NAME_ERROR_TEXT.classList.add('form__error_text')
            FIRST_NAME_ERROR_TEXT.textContent = ERROR_MESSAGE.FirstNameMore60
            FIRST_NAME.classList.add('invalidStyle')
            firstNameIsValid = false
        }
        else {
            defaultStyle('FirstName')
            firstNameIsValid = true
        }
    } else throw console.error("FIRST_NAME null or undefined");

}

function validatorLastName() {
    if (LAST_NAME) {
        if (LAST_NAME.value === '') {
            LAST_NAME_ERROR_TEXT.classList.add('form__error_text')
            LAST_NAME_ERROR_TEXT.textContent = ERROR_MESSAGE.LastNameEmpty
            LAST_NAME.classList.add('invalidStyle')
            lastNameIsValid = false
        } else if (LAST_NAME.value.length < 3) {
            LAST_NAME_ERROR_TEXT.classList.add('form__error_text')
            LAST_NAME_ERROR_TEXT.textContent = ERROR_MESSAGE.LastNameless3
            LAST_NAME.classList.add('invalidStyle')
            lastNameIsValid = false
        } else if (LAST_NAME.value.length > 60) {
            LAST_NAME_ERROR_TEXT.classList.add('form__error_text')
            LAST_NAME_ERROR_TEXT.textContent = ERROR_MESSAGE.LastNameMore60
            LAST_NAME.classList.add('invalidStyle')
            lastNameIsValid = false
        }
        else {
            defaultStyle('LastName')
            lastNameIsValid = true
        }
    } else throw console.error("LAST_NAME null or undefined");

}


export {
    firstNameIsValid,
    lastNameIsValid,
    validatorFirstName,
    validatorLastName
}