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

    Fetch(data)

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

            //Message "Unable to establish a connection to the database"
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

        })
        .then(data => {

            const responsMessage = JSON.parse(data)

            //Successful saving of data
            if (responsMessage[1]) {
                firstName.value = ''
                lastName.value = ''

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
                    FirstNameErrorText.innerHTML = "Helper text firstName"
                }


                if (lastNameText) {
                    LastNameErrorText.classList.add('error_text')
                    LastNameErrorText.innerHTML = lastNameText
                } else {
                    LastNameErrorText.classList.remove('error_text')
                    LastNameErrorText.innerHTML = "Helper text lastName"
                }


            }

        })
        .catch(error => console.error(error))
}



function defaultStyle() {

    FirstNameErrorText.classList.remove('error_text')
    FirstNameErrorText.innerHTML = "Helper text firstName"

    LastNameErrorText.classList.remove('error_text')
    LastNameErrorText.innerHTML = "Helper text lastName"

}