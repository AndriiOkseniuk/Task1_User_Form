import ERROR_MESSAGE from '../utils/constants.js'
import {
    FIRST_NAME_ERROR_TEXT,
    LAST_NAME_ERROR_TEXT,
    STATION_ID_ERROR_TEXT,
    MENU_ERROR_TEXT,
    MESSAGE_ERROR_TEXT,
    USER_STATION,
    USER_MESSAGE,
    USER_MENU_LUNCHES,
    USER_MENU_BREAKFASTS,
    DISABLE_FRONT_VALIDATION,
    defaultStyle,
    thereWasFormSubmission
} from './main.js'


const FIRST_NAME = document.querySelector("#firstName")
const LAST_NAME = document.querySelector("#lastName")

let firstNameIsValid = false
let lastNameIsValid = false
let selectOfStationIsValid = false
let checkboxesMenuIsValid = false
let textareaMessageIsValid = false

let isBlurLastName = false
let isBlurFirstName = false
let isBlurSelectStation = false
let isBlurMesageTextarea = false


FIRST_NAME.onblur = () => {
    !DISABLE_FRONT_VALIDATION.checked ? validatorFirstName() : null
    isBlurLastName = true
}

LAST_NAME.onblur = () => {
    !DISABLE_FRONT_VALIDATION.checked ? validatorLastName() : null
    isBlurFirstName = true
}

USER_STATION.onblur = () => {
    !DISABLE_FRONT_VALIDATION.checked ? validatorSelectOfStation() : null
    isBlurSelectStation = true
}

USER_MESSAGE.onblur = () => {
    !DISABLE_FRONT_VALIDATION.checked ? validatorTextareaMessage() : null
    isBlurMesageTextarea = true
}


FIRST_NAME.onkeyup = () => (isBlurLastName || thereWasFormSubmission) && !DISABLE_FRONT_VALIDATION.checked ? validatorFirstName() : null

LAST_NAME.onkeyup = () => (isBlurFirstName || thereWasFormSubmission) && !DISABLE_FRONT_VALIDATION.checked ? validatorLastName() : null

USER_MESSAGE.onkeyup = () => (isBlurMesageTextarea || thereWasFormSubmission) && !DISABLE_FRONT_VALIDATION.checked ? validatorTextareaMessage() : null

USER_STATION.onchange = () => (isBlurSelectStation || thereWasFormSubmission) && !DISABLE_FRONT_VALIDATION.checked ? validatorSelectOfStation() : null

USER_MENU_LUNCHES.onchange = () => thereWasFormSubmission && !DISABLE_FRONT_VALIDATION.checked ? validatorCheckboxesMenu() : null

USER_MENU_BREAKFASTS.onchange = () => thereWasFormSubmission && !DISABLE_FRONT_VALIDATION.checked ? validatorCheckboxesMenu() : null

function addErrorStyles(element, elementErrorText, message) {
    elementErrorText.classList.add('form__error_text')
    elementErrorText.textContent = message
    if (element) {
        element.classList.add('invalidStyle') 
    }
}

function validatorFirstName() {
    if (FIRST_NAME) {
        if (FIRST_NAME.value === '') {
            addErrorStyles(FIRST_NAME, FIRST_NAME_ERROR_TEXT, ERROR_MESSAGE.FirstNameEmpty)
            firstNameIsValid = false

        } else if (FIRST_NAME.value.length < 3) {
            addErrorStyles(FIRST_NAME, FIRST_NAME_ERROR_TEXT, ERROR_MESSAGE.FirstNameless3)
            firstNameIsValid = false
        } else if (FIRST_NAME.value.length > 60) {
            addErrorStyles(FIRST_NAME, FIRST_NAME_ERROR_TEXT, ERROR_MESSAGE.FirstNameMore60)
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
            addErrorStyles(LAST_NAME, LAST_NAME_ERROR_TEXT, ERROR_MESSAGE.LastNameEmpty)
            lastNameIsValid = false
        } else if (LAST_NAME.value.length < 3) {
            addErrorStyles(LAST_NAME, LAST_NAME_ERROR_TEXT, ERROR_MESSAGE.LastNameless3)
            lastNameIsValid = false
        } else if (LAST_NAME.value.length > 60) {
            addErrorStyles(LAST_NAME, LAST_NAME_ERROR_TEXT, ERROR_MESSAGE.LastNameMore60)
            lastNameIsValid = false
        }
        else {
            defaultStyle('LastName')
            lastNameIsValid = true
        }
    } else throw console.error("LAST_NAME null or undefined");

}

function validatorSelectOfStation() {
    if (USER_STATION) {
        if (USER_STATION.value === '') {
            addErrorStyles(USER_STATION, STATION_ID_ERROR_TEXT, ERROR_MESSAGE.stationIsEmpty)
            selectOfStationIsValid = false
        }
        else if (USER_STATION.value > 16) {
            addErrorStyles(USER_STATION, STATION_ID_ERROR_TEXT, ERROR_MESSAGE.stationNotExist)
            selectOfStationIsValid = false
        } else {
            defaultStyle('selectOfStation')
            selectOfStationIsValid = true
        }
    } else throw console.error("USER_STATION null or undefined");

}

function validatorCheckboxesMenu() {
    if (USER_MENU_LUNCHES && USER_MENU_BREAKFASTS) {
        if (USER_MENU_LUNCHES.checked === false && USER_MENU_BREAKFASTS.checked === false) {
            // MENU_ERROR_TEXT.classList.add('form__error_text')
            // MENU_ERROR_TEXT.textContent = ERROR_MESSAGE.menuEmpty
            addErrorStyles(null, MENU_ERROR_TEXT, ERROR_MESSAGE.menuEmpty)
            checkboxesMenuIsValid = false
        } else {
            defaultStyle('menuCheckboxes')
            checkboxesMenuIsValid = true
        }
    } else throw console.error("USER_MENU_LUNCHES or USER_MENU_BREAKFASTS null or undefined");

}

function validatorTextareaMessage() {
    if (USER_MESSAGE) {
        if (USER_MESSAGE.value.length > 500) {
            addErrorStyles(USER_MESSAGE, MESSAGE_ERROR_TEXT, ERROR_MESSAGE.messageMore500)
            textareaMessageIsValid = false
        } else {
            defaultStyle('messageTextarea')
            textareaMessageIsValid = true
        }
    } else throw console.error("USER_MESSAGE null or undefined");

}


export {
    firstNameIsValid,
    lastNameIsValid,
    selectOfStationIsValid,
    checkboxesMenuIsValid,
    textareaMessageIsValid,
    validatorFirstName,
    validatorLastName,
    validatorSelectOfStation,
    validatorCheckboxesMenu,
    validatorTextareaMessage
}