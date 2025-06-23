import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  itemsApiGet,
  createItems,
  removeCardLike,
  addCardLike,
} from "../../utils/itemsApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weather, setWeather] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = (e) => {
    const checked = e.target.checked;
    setCurrentTemperatureUnit(e.target.checked ? "C" : "F");
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
        console.error("Error saat fetch items:", error);
        alert("Gagal memuat data, silakan coba lagi.");
      }
    };
    fetchApiItems();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData.data);
        })
        .catch((err) => {
          console.error("Token invalid or expired:", err);
          setIsLoggedIn(false);
          setCurrentUser({});
          localStorage.removeItem("jwt");
        });
    }
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
      name: formData.name,
      imageUrl: formData.image,
      weather: formData.weather,
    };

    setIsLoading(true);
    createItems(newItem)
      .then((res) => {
        setItems((prevItems) => [res.data, ...prevItems]);
        setShowModal(false);
        setFormData({ name: "", image: "", weather: "hot" });
        setErrors({ name: "", image: "" });
        setIsSubmitEnabled(false);
      })
      .catch((err) => {
        console.error("Error creating item:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const likeAction = isLiked ? removeCardLike(id) : addCardLike(id);

    likeAction
      .then((updatedCard) => {
        setItems((prevCards) =>
          prevCards.map((item) =>
            item._id === id ? { ...item, likes: updatedCard.data.likes } : item
          )
        );
      })
      .catch((err) => console.error("Like error:", err));
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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
        >
          <Header
            setShowModal={setShowModal}
            city={weather.city}
            handleToggleSwitchChange={handleToggleSwitchChange}
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}
            showSignIn={showSignIn}
            setShowSignIn={setShowSignIn}
            isSubmitEnabled={isSubmitEnabled}
            setIsSubmitEnabled={setIsSubmitEnabled}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />

          <Routes>
            <Route
              path="/"
              element={
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
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    setShowModal={setShowModal}
                    items={items}
                    setItems={setItems}
                    weatherType={weather.weatherType}
                    isOpen={showModal}
                    onAddItem={handleCardFormSubmit}
                    isSubmitEnabled={isSubmitEnabled}
                    setIsSubmitEnabled={setIsSubmitEnabled}
                    handleChange={handleCardFormChange}
                    formData={formData}
                    errors={errors}
                    isLoggedIn={isLoggedIn}
                    showUpdateProfile={showUpdateProfile}
                    setShowUpdateProfile={setShowUpdateProfile}
                    setCurrentUser={setCurrentUser}
                    setIsLoggedIn={setIsLoggedIn}
                    handleCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
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
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
