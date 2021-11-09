const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var msg1 = document.querySelector('#message1')
var msg2 = document.querySelector("#message2")
var msg3 = document.querySelector('#message3')
var msg4 = document.querySelector("#message4")

msg1.textContent = 'Waiting on Input'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('location = ' + location)
    msg1.textContent = 'Loading'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''

    fetch('/weather?city=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msg1.textContent = data.error
        } else {
            msg1.textContent = data.loc
            msg2.textContent = data.temp.temp
            msg3.textContent = data.temp.feelslike
            msg4.textContent = data.temp.speed
        }
    })
})

})