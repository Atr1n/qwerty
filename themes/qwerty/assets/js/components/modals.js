const btns = document.querySelectorAll(".open-btn"),
    modalOverlay = document.querySelector(".modal-overlay "),
    modals = document.querySelectorAll(".modal"),
    signIn = document.querySelector("#signIn"),
    signUp = document.querySelector("#signUp"),
    modalOne = document.querySelector(".modal-1"),
    modalTwo = document.querySelector(".modal-2");

btns.forEach((e => {
    e.addEventListener("click", (e => {
        let a = e.currentTarget.getAttribute("data-path"); 
        modals.forEach((e => {
            e.classList.remove("modal--visible")
            document.querySelector(`[data-target="modal"]`).classList.add("modal--visible"), modalOverlay.classList.add("modal-overlay--visible")
        }))
    }))
})) 

modalOverlay.addEventListener("click", (e => {
    console.log(e.target), e.target == modalOverlay && (modalOverlay.classList.remove("modal-overlay--visible"), modals.forEach((e => {
        e.classList.remove("modal--visible")
    })))
}))

signIn.addEventListener('click', () => {
    signIn.classList.add('modal-active-1')
    signUp.classList.remove('modal-active-2')

    modalOne.style.display = 'block'
    modalTwo.style.display = 'none'
})

signUp.addEventListener('click', () => {
    signUp.classList.add('modal-active-2')
    signIn.classList.remove('modal-active-1')

    modalOne.style.display = 'none'
    modalTwo.style.display = 'block'
})