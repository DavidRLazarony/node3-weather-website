// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const message1 = document.querySelector("#message1")
const message2 = document.querySelector("#message2")
const icon1 = document.querySelector("#icon1")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const location = search.value

    message1.textContent = "Loading..."
    message2.textContent = ""
    icon1.setAttribute("src", "")
                
    const url = "/weather?address=" + location
//    console.log("url: ", url)
    fetch(url).then((response) => {
        response.json().then((data) => {
//          console.log(data)
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ""
                icon1.setAttribute("src", "")
                return
            }

            message1.textContent = data.location
            message2.textContent = data.forecast.description

            icon1.setAttribute("src", data.forecast.icon)
        })
    })


//    console.log(location)
})