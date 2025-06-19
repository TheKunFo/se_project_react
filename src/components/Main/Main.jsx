import { useContext } from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Pass props main
export default function Main({
  showModal,
  setShowModal,
  temperature,
  weatherType,
  weatherInfo,
  items,
  setItems,
  isSubmitEnabled,
  handleCardFormSubmit,
  errors,
  formData,
  handleChange,
  onCardLike,
  isLoggedIn,

}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (

    <main className="main">
      <WeatherCard
        temperature={temperature?.[currentTemperatureUnit]}
        weatherType={weatherType}
        weatherInfo={weatherInfo}
        
      />

      <section className="item-list">
        {items
          .filter((item) => item.weather === weatherType)
          .map((item) => (
            <ItemCard
              key={item._id}
              id={item._id}
              name={item.name}
              imgAlt={item.name}
              imgSrc={item.imageUrl}
              weather={item.weather}
              items={items}
              likes={item.likes}
              owner={item.owner}
              setItems={setItems}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </section>
    </main>

  );
}
