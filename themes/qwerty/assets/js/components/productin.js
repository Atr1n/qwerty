const stateOneShow = document.getElementById('stateOneShow')
const stateTwoShow = document.getElementById('stateTwoShow')

const stateOne = document.getElementById('stateOne')
const stateTwo = document.getElementById('stateTwo')

stateOneShow.addEventListener('click', () => {
    stateOne.style.display = "block"
    stateTwo.style.display = "none"
})

stateTwoShow.addEventListener('click', () => {
    stateOne.style.display = "none"
    stateTwo.style.display = "block"
})