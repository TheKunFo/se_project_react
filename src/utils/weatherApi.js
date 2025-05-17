import { APIkey, latitude, longitude } from './constants';

export const getWeather = () => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch weather');
            }
            return res.json();
        })
        .then((data) => {
            const temperature = data.main.temp;
            const city = data.name;
            const weatherType = defineWeatherType(temperature);
            const weatherInfo = data.weather[0]
            
            return {
                temperature,
                city,
                weatherType,
                weatherInfo,
            };
        });
};

export const defineWeatherType = (temperature) => {
    if (temperature >= 86) {
        return 'hot';
    } else if (temperature >= 66) {
        return 'warm';
    } else {
        return 'cold';
    }
};
