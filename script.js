const countryInp = document.getElementById("country-inp")
const searchBtn = document.getElementById("search-btn")
const result = document.getElementById("result")

function errorHandling(resp){
    if(resp.status == 404){
        throw Error()
    }
    return resp
}

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`

    searchBtn.classList.add("loading")
    searchBtn.innerText = "Loading..."

    fetch(finalURL)
    .then(errorHandling)
    .then(response => response.json())
    .then(data => {
        searchBtn.classList.remove("loading")
        searchBtn.innerText = "Search"

        result.innerHTML = `
            <img src="${data[0].flags.svg}"
            class="flag-img">
            <h2>${data[0].name.common}</h2>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${data[0].capital[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Continent:</h4>
                    <span>${data[0].continents[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Languages:</h4>
                    <span>
                        ${Object.values(data[0].languages).toString()
                        .split(",").join(",")}
                    </span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Currency:</h4>
                    <span>
                    ${data[0].currencies[Object.keys(
                        data[0].currencies)].name} - 
                        ${Object.keys(data[0].currencies)[0]} 
                    </span>
                </div>
            </div>
        `
        
    })
    .catch((error) => {

        if(countryName.length == 0){
            result.innerHTML = `
            <h3>The input field cannot be empty!</h3>
            `
        }
        
        else if(error){
            result.innerHTML = `
            <h3>Country not found!</h3>
            `
        }

        searchBtn.classList.remove("loading")
        searchBtn.innerText = "Search"
        
    })
})