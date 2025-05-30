import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

// Pass props main
export default function Main({
  showModal,
  setShowModal,
  temperature,
  weatherType,
  weatherInfo,
  items,
  isSubmitEnabled,
  handleSubmit,
  errors,
  formData,
  handleChange,
}) {
  console.log(weatherInfo);

  return (
    <>
      <main className="main">
        <WeatherCard
          temperature={temperature}
          weatherType={weatherType}
          weatherInfo={weatherInfo}
        />

        <section className="item-list">
          {items
            .filter((item) => item.weather === weatherType)
            .map((item) => (
              <ItemCard
                key={item._id}
                name={item.name}
                imgAlt={item.name}
                imgSrc={item.link}
                weather={item.weather}
              />
            ))}
        </section>
      </main>
    </>
  );
}
