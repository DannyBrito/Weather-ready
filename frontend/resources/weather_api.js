//          **  const api key **
const apiKey = "f253a724ea3c62a98067acce76f51efb";
// const weatherContainer = document.getElementById('weather-container')
// *** condition to be implemented after search form




function fetchWeather(city, countryCode = null) {
    let weatherUrl;
    let cityFormatted = city.trim().split(' ')
    if (cityFormatted.length > 1) {
        cityFormatted = `${cityFormatted[0]}+${cityFormatted[1]}`
    } else {
        cityFormatted = cityFormatted[0];
    }
    if (countryCode) {
        weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityFormatted},${countryCode}&units=imperial&APPID=${apiKey}`;
    } else {
        weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityFormatted}&units=imperial&APPID=${apiKey}`;
    }
    fetch(weatherUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(object){

        const {list} = object
        const indexReturned = list.findIndex(function(obj, index, array) {
            
            let d;
            d = new Date()
            return d.getDate() !== parseInt(obj.dt_txt.split('-')[2].split(' ')[0]); 
        })
        weatherContainer.innerHTML = '';
        addWeather(list[indexReturned + 4], cityFormatted, countryCode);
    })
    .catch(function(error) {
        weatherContainer.innerHTML = `<h6>Sorry we could not process your request. Maybe something was spelled incorrectly or we don't handle weather for that area?</h6>`
    })
}





