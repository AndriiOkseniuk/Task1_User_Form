import {
    FirstNameIsValid,
    LastNameIsValid,
    ValidatorFirstName,
    ValidatorLastName
} from './validator.js'

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const FirstNameErrorText = document.getElementsByClassName("FirstName_errortext")[0]
const LastNameErrorText = document.getElementsByClassName("LastName_errortext")[0]
const YourNameMessage = document.getElementById("YourNameMessage")
const LastNameMessage = document.getElementById("LastNameMessage")
const form_message_container = document.querySelector('.form_message_container')
const form_message__btn = document.querySelector('.form_message__btn')
const form = document.getElementById("form")

let ThereWasFormSubmission = false


form_message__btn.addEventListener("click", () => {
    form_message_container.style.display = "none";
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    ThereWasFormSubmission = true;

    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
    };

    //If the inputs are empty, a validation error is reported
    if (firstName.value === '') {
        ValidatorFirstName()
    }

    if (lastName.value === '') {
        ValidatorLastName()
    }


    //Successful form submit
    if (FirstNameIsValid && LastNameIsValid) {
        Fetch(data)
    }

})


function Fetch(data) {
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
                    p.innerHTML = `${JSON.parse(message).error}`
                    p.style.color = "#b00020";
                    p.style.position = "absolute";
                    p.style.top = "10px";

                    setTimeout(() => {
                        p.remove();
                    }, 3000);

                    form.append(p);
                });
            }

            return response.text()

        })
        .then(data => {
            const responsMessage = JSON.parse(data)

            //Successful saving of data
            if (responsMessage[1]) {
                firstName.value = ''
                lastName.value = ''

                YourNameMessage.innerHTML = responsMessage[0].UserData.FirstName
                LastNameMessage.innerHTML = responsMessage[0].UserData.LastName
                form_message_container.style.display = "flex";

                defaultStyle()
            }

            //Displaying Validation Error Messages
            else {

                const firstNameText = responsMessage[0].firstName
                const lastNameText = responsMessage[0].lastName

                if (firstNameText) {
                    FirstNameErrorText.classList.add('error_text')
                    FirstNameErrorText.innerHTML = firstNameText

                } else {
                    FirstNameErrorText.classList.remove('error_text')
                    FirstNameErrorText.innerHTML = "Enter your name"
                }


                if (lastNameText) {
                    LastNameErrorText.classList.add('error_text')
                    LastNameErrorText.innerHTML = lastNameText
                } else {
                    LastNameErrorText.classList.remove('error_text')
                    LastNameErrorText.innerHTML = "Enter your last name"
                }
            }
        })
        .catch(error => console.error(error))
}



function defaultStyle(errorText = 'all') {

    if (errorText === 'FirstName') {
        resetStyleFirstName()
    }

    if (errorText === 'LastName') {
        resetStyleLastName()
    }

    if (errorText === 'all') {
        resetStyleFirstName()
        resetStyleLastName()
    }

    function resetStyleFirstName() {
        FirstNameErrorText.classList.remove('error_text')
        FirstNameErrorText.innerHTML = "Enter your name"
        firstName.classList.remove('invalidStyle')
    }

    function resetStyleLastName() {
        LastNameErrorText.classList.remove('error_text')
        LastNameErrorText.innerHTML = "Enter your last name"
        lastName.classList.remove('invalidStyle')
    }

}

export {
    firstName,
    lastName,
    FirstNameErrorText,
    LastNameErrorText,
    ThereWasFormSubmission,
    defaultStyle
}