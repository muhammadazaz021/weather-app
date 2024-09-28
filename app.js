const apiKey = 'd4c647a169ef3bf5f98671eac001109f';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherDisplay = document.getElementById('weatherDisplay');
    const container = document.getElementById('weatherContainer');

    if (city === '') {
        weatherDisplay.innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            weatherDisplay.innerHTML = `<p>City not found. Please try again.</p>`;
        } else {
            const { name, main, weather, wind, rain } = data;

            // Setting background and animation based on weather condition
            let weatherCondition = weather[0].main.toLowerCase();
            let bgClass = '';
            if (weatherCondition.includes('rain')) {
                bgClass = 'rainy';
            } else if (weatherCondition.includes('clear')) {
                bgClass = 'sunny';
            } else if (weatherCondition.includes('clouds')) {
                bgClass = 'cloudy';
            }

            container.className = `container ${bgClass}`;

            const rainChances = rain ? rain['1h'] || 0 : 0;

            const weatherData = `
                <h2>${name}</h2>
                <p class="temperature">${main.temp}°C</p>
                <p class="description">${weather[0].description}</p>

                <div class="details">
                    <div class="details-item ${rainChances > 0 ? 'rainy' : ''}">
                        <p><strong>Rain Chances:</strong></p>
                        <p>${rainChances} mm</p>
                        ${rainChances > 0 ? '<div class="rain-animation"></div>' : ''}
                    </div>
                    <div class="details-item">
                        <p><strong>Humidity:</strong></p>
                        <p>${main.humidity}%</p>
                    </div>
                </div>
                <div class="details">
                    <div class="details-item">
                        <p><strong>Wind Speed:</strong></p>
                        <p>${wind.speed} m/s</p>
                    </div>
                    <div class="details-item">
                        <p><strong>Pressure:</strong></p>
                        <p>${main.pressure} hPa</p>
                    </div>
                </div>
            `;

            weatherDisplay.innerHTML = weatherData;
            weatherDisplay.classList.add('active');
        }
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
}
