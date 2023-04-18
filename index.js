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
        return weather.json()
    }).then(response => {
        displayWeather(response)
    })
    console.log(data);
}

function displayWeather(weatherInfo) {
    console.log(weatherInfo)
    let city = document.querySelector('.location .city');
    city.innerText = `${weatherInfo.name} ${weatherInfo.sys.country}`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherInfo.main.temp)} <span>&#8451;</span>`;
    let weather = document.querySelector('.current .weather');
    weather.innerHTML = `${weatherInfo.weather[0].main}`;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${Math.round(weatherInfo.main.temp_min)} <span>&#8451;</span> ${Math.round(weatherInfo.main.temp_max)} <span>&#8451;</span>`;

    let dateQuery = document.querySelector('.location .date');
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'
    });
    console.log(formattedDate);
    dateQuery.innerText = formattedDate;
}