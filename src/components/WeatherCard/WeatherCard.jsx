import './WeatherCard.css';
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
export default function WeatherCard({
    temperature,
    weatherInfo,
    weatherType
}) {
    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
    return (
        <section className="weather__card">

            <div aria-label="Temperature display" className="main__temperature-box">
                <span className="main__temperature-text">{temperature}°{currentTemperatureUnit}</span>
                <img
                    alt="weather"
                    className="main__weather-img"
                    draggable="false"
                    src={`https://openweathermap.org/img/wn/${weatherInfo?.icon ?? ''}.png`}
                    width="80"
                    height="56"
                />
            </div>
            <p className="main__description">
                Today is {temperature}° {currentTemperatureUnit} / You may want to wear: {weatherType}
            </p>
        </section>

    )
}