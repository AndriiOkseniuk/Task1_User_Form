const YOUR_NAME_MESSAGE = document.querySelector("#allert__your-name-message")
const LAST_NAME_MESSAGE = document.querySelector("#allert__last-name-message")
const ALLERT = document.querySelector('.allert')
const ALLERT_BTN = document.querySelector('.allert__btn')
const USER_LIST = document.querySelector('#allert__users-list-id')
const GET_USERS_BTN = document.querySelector('.get__users-btn')

ALLERT_BTN.addEventListener("click", () => {
    ALLERT.classList.remove("allert_show")

    GET_USERS_BTN.classList.remove('toggle-show-user-btn')
    
    while (USER_LIST.firstChild) {
        USER_LIST.removeChild(USER_LIST.firstChild);
    }
})

function showSuccessAlert(firsNameMessage, lastNameMessage) {

    YOUR_NAME_MESSAGE.textContent = firsNameMessage
    LAST_NAME_MESSAGE.textContent = lastNameMessage

    ALLERT.classList.add("allert_show")
}

export {
    showSuccessAlert
}