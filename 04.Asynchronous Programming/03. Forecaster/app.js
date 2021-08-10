function attachEvents() {

    let btnGetWeather = document.getElementById('submit')
    let locationName = document.getElementById('location')
    const baseURL = 'https://judgetests.firebaseio.com/forecast/'
    const locationURL = 'https://judgetests.firebaseio.com/locations.json'
    let forecast = document.getElementById('forecast')
    let currentDiv = document.getElementById('current')
    let upcomingDiv = document.getElementById('upcoming')
    let forecastDiv = createElement('div', 'forecast', '')
    let forecastInfo = createElement('div', 'forecast-info', '')

    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'degrees': '&#176'
    }

    btnGetWeather.addEventListener('click', () => {
        fetch(locationURL)
            .then(res => res.json())
            .then(data => {

                let {code} = data.find(city => city.name === locationName.value)

                //fetch today
                let current = fetch(baseURL + `today/${code}.json`)
                    .then(res => res.json())

                //fetch upcoming
                let upcoming = fetch(baseURL + `upcoming/${code}.json`)
                    .then(res => res.json())


                Promise.all([current, upcoming])
                    .then(showForecast)
                    .catch((e) => {
                            forecast.style.display = 'block'
                            forecast.classList.add('label')
                            forecast.textContent = 'ERROR'
                        }
                    )

            })

    })

    locationName.addEventListener('focus', () => {
        forecastDiv.innerHTML = ''
        forecastInfo.innerHTML = ''
    })

    function showForecast([currentData, upcomingData]) {
        forecast.style.display = 'block'
        showCurrent(currentData)
        showUpcoming(upcomingData)

    }

    function createElement(el, classes, content) {
        let element = document.createElement(el)
        element.className = classes
        element.innerHTML = content
        return element
    }


    function showCurrent(currentData) {
        let currentSymbol = symbols[currentData.forecast.condition]
        let conditionSymbolSpan = createElement('span', 'condition symbol', currentSymbol)
        let conditionInfoSpan = createElement('span', 'condition', currentData.forecast.condition)
        let forecastCitySpan = createElement('span', 'forecast-data', currentData.name)
        let highLow = `${currentData.forecast.low}${symbols.degrees}/${currentData.forecast.high}${symbols.degrees}`
        let forecastInfoSpan = createElement('span', 'forecast-data', highLow)
        let forecastConditionSpan = createElement('span', 'forecast-data', currentData.forecast.condition)

        forecastDiv.appendChild(conditionSymbolSpan)
        currentDiv.appendChild(forecastDiv)
        conditionInfoSpan.appendChild(forecastCitySpan)
        conditionInfoSpan.appendChild(forecastInfoSpan)
        conditionInfoSpan.appendChild(forecastConditionSpan)
        forecastDiv.appendChild(conditionInfoSpan)
    }

    function showUpcoming(upcomingData) {
        upcomingData.forecast.forEach(obj => {
            let upcomingSpan = createElement('span', 'upcoming', '')
            let conditionSymbolSpan = createElement('span', 'symbol', symbols[obj.condition])
            let highLow = `${obj.low}${symbols.degrees}/${obj.high}${symbols.degrees}`
            let forecastInfoSpan = createElement('span', 'forecast-data', highLow)
            let forecastConditionSpan = createElement('span', 'forecast-data', obj.condition)

            upcomingSpan.appendChild(conditionSymbolSpan)
            upcomingSpan.appendChild(forecastInfoSpan)
            upcomingSpan.appendChild(forecastConditionSpan)
            forecastInfo.appendChild(upcomingSpan)

        })

        upcomingDiv.appendChild(forecastInfo)
        document.getElementById('location').value = ''

    }

}

attachEvents();