import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const result = await getWeather();
        setWeather(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, []);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(defaultClothingItems);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weather: "hot",
  });
  const [errors, setErrors] = useState({ name: "", image: "" });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      _id: Date.now().toString(),
      name: formData.name,
      link: formData.image,
      weather: formData.weather,
    };

    // Tambahkan ke state items
    setItems((prevItems) => [...prevItems, newItem]);

    // Reset form
    setShowModal(false);
    setFormData({ name: "", image: "", weather: "hot" });
    setErrors({ name: "", image: "" });
    setIsSubmitEnabled(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...formData, [name]: value };
    setFormData(newForm);

    let error = "";
    if (name === "name" && value.trim() === "") {
      error = "this is required";
    } else if (name === "image" && !/^https?:\/\/.+/.test(value)) {
      error = "Must be a valid URL (http/https)";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));

    const allValid = Object.values({ ...errors, [name]: error }).every(
      (e) => e === ""
    );
    const allFilled = Object.values(newForm).every((val) => val.trim() !== "");
    setIsSubmitEnabled(allValid && allFilled);
  };

  return (
    <div className="app">
      <Header setShowModal={setShowModal} city={weather.city} />
      <Main
        showModal={showModal}
        setShowModal={setShowModal}
        temperature={weather.temperature}
        weatherType={weather.weatherType}
        weatherInfo={weather.weatherInfo}
        items={items}
        isSubmitEnabled={isSubmitEnabled}
        handleSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleChange={handleChange}
      />
      <Footer />
      <ModalWithForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="New Garment"
        name="add-garment"
        buttonText="Add Garment"
        onSubmit={handleSubmit}
        isSubmitEnabled={isSubmitEnabled}
      >
        <label
          htmlFor="name"
          className={`modal__label ${errors.name ? "label-error" : ""}`}
        >
          Name {errors.name && `(${errors.name})`}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "input-error" : ""}
          placeholder="Name"
        />
        <label
          htmlFor="image"
          className={`modal__image ${errors.image ? "label-error" : ""}`}
        >
          Image {errors.image && `(${errors.image})`}
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          className={errors.image ? "input-error" : ""}
          placeholder="Image URL"
        />
        <fieldset class="modal__fieldset">
          <legend class="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-group">
            <input
              type="radio"
              id="hot"
              name="weather"
              value="hot"
              checked={formData.weather === "hot"}
              onChange={handleChange}
            />
            <label htmlFor="hot">Hot</label>
          </div>
          <div className="modal__radio-group">
            <input
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              checked={formData.weather === "warm"}
              onChange={handleChange}
            />
            <label htmlFor="warm">Warm</label>
          </div>
          <div className="modal__radio-group">
            <input
              type="radio"
              id="cold"
              name="weather"
              value="cold"
              checked={formData.weather === "cold"}
              onChange={handleChange}
            />
            <label htmlFor="cold">Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
