console.log('Client Side Javascript File is loaded')

const loginForm = document.querySelector('form')
const username =  document.querySelector('#userName')
const password =  document.querySelector('#password')

loginForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const enteredUsername = username.value
    
})


console.log(username);
console.log(password);
