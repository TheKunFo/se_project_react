import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import { itemsApiGet, createItems } from "../../utils/itemsApi";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [weather, setWeather] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const handleToggleSwitchChange = (e) => {
    const checked = e.target.checked
    setCurrentTemperatureUnit(e.target.checked ? 'C' : 'F');
  };
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
    const fetchApiItems = async () => {
      try {
        const data = await itemsApiGet();
        setItems(data);
      } catch (error) {
        console.error('Error saat fetch items:', error);
        alert('Gagal memuat data, silakan coba lagi.');
      }
    }
    fetchApiItems();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weather: "hot",
  });
  const [errors, setErrors] = useState({ name: "", image: "" });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleCardFormSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      _id: Date.now().toString(),
      name: formData.name,
      link: formData.image,
      weather: formData.weather,
    };

    createItems(newItem)
      .then((res) => {
        setItems((prevItems) => [res, ...prevItems]);
      }).catch((err) => {
        console.error("Error creating item:", err);
      })
      .finally(() => {
        setShowModal(false);
        setFormData({ name: "", image: "", weather: "hot" });
        setErrors({ name: "", image: "" });
        setIsSubmitEnabled(false);
      });;
  };

  const handleCardFormChange = (e) => {
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
  // console.log(weather.temperature)
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, setCurrentTemperatureUnit }} >
        <Header setShowModal={setShowModal} city={weather.city} handleToggleSwitchChange={handleToggleSwitchChange} />

        <Routes>
          <Route path="/" element={
            <Main
              showModal={showModal}
              setShowModal={setShowModal}
              temperature={weather.temperature}
              weatherType={weather.weatherType}
              weatherInfo={weather.weatherInfo}
              items={items}
              setItems={setItems}
              isSubmitEnabled={isSubmitEnabled}
              handleCardFormSubmit={handleCardFormSubmit}
              errors={errors}
              formData={formData}
              handleChange={handleCardFormChange}

            />
          } ></Route>
          <Route path="/profile" element={
            <Profile
              setShowModal={setShowModal}
              items={items}
              setItems={setItems}
              weatherType={weather.weatherType}
              isOpen={showModal}
              onAddItem={handleCardFormSubmit}
              isSubmitEnabled={isSubmitEnabled}
              handleChange={handleCardFormChange}
              formData={formData}
              errors={errors}
            />
          } />
        </Routes>


        <Footer />
        <AddItemModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleCardFormSubmit={handleCardFormSubmit}
          isSubmitEnabled={isSubmitEnabled}
          errors={errors}
          formData={formData}
          handleCardFormChange={handleCardFormChange}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
