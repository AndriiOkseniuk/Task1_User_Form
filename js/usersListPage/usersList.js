const GET_USERS_BTN = document.querySelector('.get__users-btn')

GET_USERS_BTN.addEventListener("click", (e) => {

    fetch('./php/get_usersList/usersList.php', {
        method: 'GET',
    }).then(response => {
        response.text().then(message => {
            console.log(JSON.parse(message));
        })
    })

        .catch(error => console.error(error))

        document.location.href="http://user-form/php/get_usersList/usersList.php";
})

