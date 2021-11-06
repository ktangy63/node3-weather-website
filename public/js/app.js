const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var msg1 = document.querySelector('#message1')
var msg2 = document.querySelector("#message2")

msg1.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('location = ' + location)
    msg1.textContent = 'Loading'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?city=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msg1.textContent = data.error
        } else {
            msg1.textContent = data.loc
            msg2.textContent = data.temp.temp
        }
    })
})

})