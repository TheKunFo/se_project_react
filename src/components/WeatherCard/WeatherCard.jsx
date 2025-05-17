import './WeatherCard.css';

export default function WeatherCard({
    temperature,
    weatherInfo,
    weatherType
}) {
    return (

        <>
            <div aria-label="Temperature display" className="main__temperature-box">
                <span className="main__temperature-text">{temperature}°F</span>
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
                Today is {temperature}° F / You may want to wear: {weatherType}
            </p>
        </>
    )
}