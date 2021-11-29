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

const form = document.getElementById("form")


form.addEventListener('submit', (e) => {
    e.preventDefault()

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
                    p.style.color = "red";
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

                let p = document.createElement("p")
                p.innerHTML = `Success!
                <br>
                Your name: ${responsMessage[0].UserData.FirstName};
                <br> 
                Your Lastname: ${responsMessage[0].UserData.LastName}`
                p.style.color = "green";
                p.style.position = "absolute";
                p.style.right = "10px";
                p.style.top = "10px";

                setTimeout(() => {
                    p.remove();
                }, 3000);

                form.append(p);

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

    if (errorText === 'all' || errorText === 'FirstName') {
        FirstNameErrorText.classList.remove('error_text')
        FirstNameErrorText.innerHTML = "Enter your name"
    } else if (errorText === 'all' || errorText === 'LastName') {

        LastNameErrorText.classList.remove('error_text')
        LastNameErrorText.innerHTML = "Enter your last name"
    }

}

export {
    firstName,
    lastName,
    FirstNameErrorText,
    LastNameErrorText,
    defaultStyle
}