import {
    firstNameIsValid,
    lastNameIsValid,
    validatorFirstName,
    validatorLastName
} from './validator.js'

const FIRST_NAME = document.querySelector("#firstName")
const LAST_NAME = document.querySelector("#lastName")

const FIRST_NAME_ERROR_TEXT = document.querySelector(".form__helper-text_error-first-name")
const LAST_NAME_ERROR_TEXT = document.querySelector(".form__helper-text_error-last-name")
const YOUR_NAME_MESSAGE = document.querySelector("#allert__your-name-message")
const LAST_NAME_MESSAGE = document.querySelector("#allert__last-name-message")
const ALLERT = document.querySelector('.allert')
const ALLERT_BTN = document.querySelector('.allert__btn')
const FORM = document.querySelector("#form")

let thereWasFormSubmission = false


ALLERT_BTN.addEventListener("click", () => {
    ALLERT.classList.remove("allert_show")
})


FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    thereWasFormSubmission = true;

    const data = {
        firstName: FIRST_NAME.value,
        lastName: LAST_NAME.value,
    };

    //If the inputs are empty, a validation error is reported
    if (FIRST_NAME.value === '') {
        validatorFirstName()
    }

    if (LAST_NAME.value === '') {
        validatorLastName()
    }


    //Successful form submit
    if (firstNameIsValid && lastNameIsValid) {
        fetchData(data)
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

            // Message "Unable to establish a connection to the database"
            if (response.status === 503) {

                response.text().then(message => {
                    let p = document.createElement("p")
                    p.textContent = `${JSON.parse(message).error}`
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

                YOUR_NAME_MESSAGE.textContent = responsMessage[0].UserData.FirstName
                LAST_NAME_MESSAGE.textContent = responsMessage[0].UserData.LastName

                ALLERT.classList.add("allert_show")

                defaultStyle()
            }

            //Displaying Validation Error Messages
            else {

                const firstNameText = responsMessage[0].firstName
                const lastNameText = responsMessage[0].lastName

                if (firstNameText) {
                    FIRST_NAME_ERROR_TEXT.classList.add('form__error_text')
                    FIRST_NAME_ERROR_TEXT.textContent = firstNameText

                } else {
                    FIRST_NAME_ERROR_TEXT.classList.remove('form__error_text')
                    FIRST_NAME_ERROR_TEXT.textContent = "Enter your name"
                }


                if (lastNameText) {
                    LAST_NAME_ERROR_TEXT.classList.add('form__error_text')
                    LAST_NAME_ERROR_TEXT.textContent = lastNameText
                } else {
                    LAST_NAME_ERROR_TEXT.classList.remove('form__error_text')
                    LAST_NAME_ERROR_TEXT.textContent = "Enter your last name"
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
        errorText === 'all' ? (resetStyleFirstName(), resetStyleLastName()) : null
    }

    function resetStyleFirstName() {
        FIRST_NAME_ERROR_TEXT.classList.remove('form__error_text')
        FIRST_NAME_ERROR_TEXT.textContent = "Enter your name"
        FIRST_NAME.classList.remove('invalidStyle')
    }

    function resetStyleLastName() {
        LAST_NAME_ERROR_TEXT.classList.remove('form__error_text')
        LAST_NAME_ERROR_TEXT.textContent = "Enter your last name"
        LAST_NAME.classList.remove('invalidStyle')
    }

}

export {
    FIRST_NAME_ERROR_TEXT,
    LAST_NAME_ERROR_TEXT,
    thereWasFormSubmission,
    defaultStyle
}