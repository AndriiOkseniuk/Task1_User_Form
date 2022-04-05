const GET_USERS_BTN = document.querySelector('.get__users-btn')
const USER_LIST = document.querySelector('.allert__users-list')

GET_USERS_BTN.addEventListener("click", (e) => {

    GET_USERS_BTN.classList.toggle('toggle-show-user-btn')

    if (GET_USERS_BTN.classList.contains('toggle-show-user-btn')) {
        getUsers()
    } else {
        while (USER_LIST.firstChild) {
            USER_LIST.removeChild(USER_LIST.firstChild);
        }
    }
})



function getUsers() {
    fetch('./php/get_usersList/usersList.php', {
        method: 'GET',
    }).then(response => {
        response.text().then(message => {
            const data = JSON.parse(message)

            const totalUsersCount = document.createElement('b');
            totalUsersCount.textContent = `Количество пользователей: ${data.total}`
            USER_LIST.appendChild(totalUsersCount)

            data.users.forEach(user => {

                const userCard = document.createElement('div');
                userCard.classList.add('users-card')

                const id = document.createElement('p');
                id.textContent = `id: ${user.id}`

                const firstName = document.createElement('p');
                firstName.textContent = `Имя: ${user.first_name}`

                const lastName = document.createElement('p');
                lastName.textContent = `Фамилия: ${user.last_name}`

                const station = document.createElement('p');
                station.textContent = `Станция метро: ${user.station}`

                const isСar = document.createElement('p');
                isСar.textContent = `${user.is_car == 1 ? 'Машина: есть' : 'Машины: нет'}`

                const lunche = document.createElement('p');
                lunche.textContent = `Обеды: ${user.lunche == 1 ? 'да' : 'нет'}`

                const breakfast = document.createElement('p');
                breakfast.textContent = `Завтраки: ${user.breakfast == 1 ? 'да' : 'нет'}`

                const message = document.createElement('p');
                message.textContent = `Сообщение: ${user.message}`

                const createdAt = document.createElement('p');
                createdAt.textContent = `Дата: ${user.created_at}`

                userCard.appendChild(id)
                userCard.appendChild(firstName)
                userCard.appendChild(lastName)
                userCard.appendChild(station)
                userCard.appendChild(isСar)
                userCard.appendChild(lunche)
                userCard.appendChild(breakfast)
                userCard.appendChild(message)
                userCard.appendChild(createdAt)

                USER_LIST.appendChild(userCard)
            });

        })
    })

        .catch(error => console.error(error))
}