import {
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
} from './validator.js'

import { showSuccessAlert } from './successAlert/successAlert.js'

const FIRST_NAME = document.querySelector("#firstName")
const LAST_NAME = document.querySelector("#lastName")
const USER_STATION = document.querySelector('#form__select-station_item-id')
const USER_IS_CAR = document.querySelector('#form__is-car_item_yes')
const USER_MENU_LUNCHES = document.querySelector('#form_menu_item-lunches-id')
const USER_MENU_BREAKFASTS = document.querySelector('#form_menu_item-breakfasts-id')
const USER_MESSAGE = document.querySelector('#form__textarea-message-id')

const FIRST_NAME_ERROR_TEXT = document.querySelector(".form__helper-text_error-first-name")
const LAST_NAME_ERROR_TEXT = document.querySelector(".form__helper-text_error-last-name")
const STATION_ID_ERROR_TEXT = document.querySelector('.form__helper-text_error-station-id')
const MESSAGE_ERROR_TEXT = document.querySelector('.form__helper-text_error-message')
const MENU_ERROR_TEXT = document.querySelector('.form__helper-text_error-menu')

const FORM = document.querySelector("#form")
const DISABLE_FRONT_VALIDATION = document.querySelector('#form__disable-front-validation-id')


let thereWasFormSubmission = false



FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    thereWasFormSubmission = true;

    const data = {
        firstName: FIRST_NAME.value,
        lastName: LAST_NAME.value,
        station_id: USER_STATION.value,
        is_car: USER_IS_CAR.checked ? "true" : "false",
        lunches: USER_MENU_LUNCHES.checked ? "true" : "false",
        breakfasts: USER_MENU_BREAKFASTS.checked ? "true" : "false",
        message: USER_MESSAGE.value
    };


    //backend validation
    if (DISABLE_FRONT_VALIDATION.checked) {
        fetchData(data)
    }
    //frontend validation
    else {

        validatorFirstName()
        validatorLastName()
        validatorSelectOfStation()
        validatorCheckboxesMenu()
        validatorTextareaMessage()

        //Successful form submit
        if (firstNameIsValid && lastNameIsValid && selectOfStationIsValid && checkboxesMenuIsValid && textareaMessageIsValid) {
            fetchData(data)
        }
    }

})


function fetchData(data) {
    fetch('./php/main.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {

            // Error message with code 503
            if (response.status === 503) {
                response.text().then(message => {
                    console.error(JSON.parse(message).error);

                    let p = document.createElement("p")
                    p.textContent = `${JSON.parse(message).message}`
                    p.style.color = "#b00020";
                    p.style.position = "absolute";
                    p.style.top = "10px";

                    setTimeout(() => {
                        p.remove();
                    }, 3000);

                    FORM.append(p);
                });
            }

            return response.text()

        })
        .then(data => {

            const responsMessage = JSON.parse(data)


            //Successful saving of data
            if (responsMessage[1]) {

                FIRST_NAME.value = ''
                LAST_NAME.value = ''
                USER_STATION.value = ''
                USER_IS_CAR.checked = false
                USER_MENU_LUNCHES.checked = false
                USER_MENU_BREAKFASTS.checked = false
                USER_MESSAGE.value = ''

                showSuccessAlert(responsMessage[0].UserData.FirstName, responsMessage[0].UserData.LastName)

                defaultStyle()
            }

            //Displaying Validation Error Messages back
            else {

                const firstNameText = responsMessage[0].firstName
                const lastNameText = responsMessage[0].lastName
                const stationIdText = responsMessage[0].station_id
                const messageText = responsMessage[0].message
                const menuText = responsMessage[0].menu

                //displaying a validation error message for first name field
                if (firstNameText) {
                    FIRST_NAME_ERROR_TEXT.classList.add('form__error_text')
                    FIRST_NAME_ERROR_TEXT.textContent = firstNameText

                } else {
                    FIRST_NAME_ERROR_TEXT.classList.remove('form__error_text')
                    FIRST_NAME_ERROR_TEXT.textContent = "Введите ваше имя"
                }

                //displaying a validation error message for lasr name field
                if (lastNameText) {
                    LAST_NAME_ERROR_TEXT.classList.add('form__error_text')
                    LAST_NAME_ERROR_TEXT.textContent = lastNameText
                } else {
                    LAST_NAME_ERROR_TEXT.classList.remove('form__error_text')
                    LAST_NAME_ERROR_TEXT.textContent = "Введите вашу фамилию"
                }

                //displaying a validation error message for station select
                if (stationIdText) {
                    STATION_ID_ERROR_TEXT.classList.add('form__error_text')
                    STATION_ID_ERROR_TEXT.textContent = stationIdText
                } else {
                    STATION_ID_ERROR_TEXT.classList.remove('form__error_text')
                    STATION_ID_ERROR_TEXT.textContent = "Ваша станция метро"
                }

                //displaying a validation error message for meesage textarea
                if (messageText) {
                    MESSAGE_ERROR_TEXT.classList.add('form__error_text')
                    MESSAGE_ERROR_TEXT.textContent = messageText
                } else {
                    MESSAGE_ERROR_TEXT.classList.remove('form__error_text')
                    MESSAGE_ERROR_TEXT.textContent = "Сообщение не больше 500 символов"
                }

                //displaying a validation error message for menu checkboxes
                if (menuText) {
                    MENU_ERROR_TEXT.classList.add('form__error_text')
                    MENU_ERROR_TEXT.textContent = menuText
                } else {
                    MENU_ERROR_TEXT.classList.remove('form__error_text')
                    MENU_ERROR_TEXT.textContent = ""
                }
            }
        })
        .catch(error => console.error(error))
}



function defaultStyle(errorText = 'all') {

    resetDataForm(errorText)

    function resetDataForm(errorText) {
        errorText === 'FirstName' ? resetStyleFirstName() : null
        errorText === 'LastName' ? resetStyleLastName() : null
        errorText === 'selectOfStation' ? resetStyleSelectOfStation() : null
        errorText === 'menuCheckboxes' ? resetStyleMenuCheckbox() : null
        errorText === 'messageTextarea' ? resetStyleTextareaMessage() : null

        errorText === 'all' ? (
            resetStyleFirstName(), resetStyleLastName(),
            resetStyleSelectOfStation(), resetStyleMenuCheckbox(), resetStyleTextareaMessage()
        ) : null
    }

    function resetStyleFirstName() {
        FIRST_NAME_ERROR_TEXT.classList.remove('form__error_text')
        FIRST_NAME_ERROR_TEXT.textContent = "Введите ваше имя"
        FIRST_NAME.classList.remove('invalidStyle')
    }

    function resetStyleLastName() {
        LAST_NAME_ERROR_TEXT.classList.remove('form__error_text')
        LAST_NAME_ERROR_TEXT.textContent = "Введите вашу фамилию"
        LAST_NAME.classList.remove('invalidStyle')
    }

    function resetStyleSelectOfStation() {
        STATION_ID_ERROR_TEXT.classList.remove('form__error_text')
        STATION_ID_ERROR_TEXT.textContent = "Ваша станция метро"
        USER_STATION.classList.remove('invalidStyle')
    }

    function resetStyleMenuCheckbox() {
        MENU_ERROR_TEXT.classList.remove('form__error_text')
        MENU_ERROR_TEXT.textContent = ""
    }

    function resetStyleTextareaMessage() {
        MESSAGE_ERROR_TEXT.classList.remove('form__error_text')
        MESSAGE_ERROR_TEXT.textContent = "Сообщение не больше 500 символов"
        USER_MESSAGE.classList.remove('invalidStyle')
    }

}

export {
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
    thereWasFormSubmission,
    defaultStyle
}