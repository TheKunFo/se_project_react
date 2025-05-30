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
            const temperature = {
                F : Math.round(data.main.temp),
                C : Math.round((data.main.temp - 32) * 5 / 9),
            }
            const city = data.name;
            const weatherType = defineWeatherType(data.main.temp)
            const weatherInfo = data.weather[0]
            return {
                temperature,
                city,
                weatherType,
                weatherInfo,
            };
        }).catch((err) => {
            console.log(err)
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
