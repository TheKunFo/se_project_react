import Header from './Header/Header';
import './App.css';
import Main from './Main/main';
import Footer from './Footer/Footer';
import { useEffect, useState } from 'react';
import { getWeather } from '../../utils/weatherApi';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [weather, setWeather] = useState([])
    useEffect(() => {
        const fetchWeather = async () => {
            const result = await getWeather();
            setWeather(result);
        };

        fetchWeather();
    }, [])
    return (
        <>
            
            <div className="app">
                <Header setShowModal={setShowModal} city={weather.city} />
                <main className="body">
                    <Main showModal={showModal} setShowModal={setShowModal} temperature={weather.temperature} weatherType={weather.weatherType} weatherInfo={weather.weatherInfo} />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default App
