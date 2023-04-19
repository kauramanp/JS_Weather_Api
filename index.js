const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchBox.value);
    }
}

function getResult(data) {
    fetch(`${api.base}weather?q=${data}&units=metric&appid=${api.key}`).then(weather => {
        if (weather.ok)
            return weather.json()
        throw new Error('Something went wrong');

    }).then(response => {
        console.log(response)
        displayWeather(response)
    }).catch((error) => {
        hideComponent();
        console.log(error)
    });
}

function hideComponent() {
    var element = document.getElementById("main-div");
    element.style.display = "none"

    var apiError = document.getElementById("api-error");
    apiError.style.display = "block"

}

document.getElementById("button").onclick = function () {
    showMainView();
}
function showMainView() {
    var element = document.getElementById("main-div");
    element.style.display = "block"

    var apiError = document.getElementById("api-error");
    apiError.style.display = "none"

    document.getElementById("searchBox").value = "";
}
function displayWeather(weatherInfo) {
    showMainView()

    console.log(weatherInfo)
    let city = document.querySelector('.location .city');
    city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherInfo.main.temp)} <span>&#8451;</span>`;
    let weather = document.querySelector('.current .weather');
    weather.innerHTML = `${weatherInfo.weather[0].main}`;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${Math.round(weatherInfo.main.temp_min)} <span>&#8451;</span> / ${Math.round(weatherInfo.main.temp_max)} <span>&#8451;</span>`;

    let dateQuery = document.querySelector('.location .date');
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'
    });
    console.log(formattedDate);
    dateQuery.innerText = formattedDate;
}