import { useEffect } from 'react'
import './Main.css'
import { useState } from 'react'
import { defaultClothingItems } from '../../utils/defaultClothingItems';
import ItemCard from '../ItemCard/ItemCard';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import WeatherCard from '../WeatherCard/WeatherCard';

export default function Main({ showModal, setShowModal, temperature, weatherType, weatherInfo}) {
    console.log(weatherInfo)
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(defaultClothingItems)
    }, [])

    const [formData, setFormData] = useState({ name: "", image: "", weather: "hot" });
    const [errors, setErrors] = useState({ name: "", image: "" });
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            _id: Date.now().toString(),
            name: formData.name,
            link: formData.image,
            weather: formData.weather
        };

        // Tambahkan ke state items
        setItems(prevItems => [...prevItems, newItem]);

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

        const allValid = Object.values({ ...errors, [name]: error }).every((e) => e === "");
        const allFilled = Object.values(newForm).every((val) => val.trim() !== "");
        setIsSubmitEnabled(allValid && allFilled);
    };


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
                        .filter(item => item.weather === weatherType)
                        .map(item => (
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

            <ModalWithForm
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="New Garment"
                name="add-garment"
                buttonText="Add Garment"
                onSubmit={handleSubmit}
                isSubmitEnabled={isSubmitEnabled}
            >
                <label htmlFor="name" className={errors.name ? "label-error" : ""}>
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

                <label htmlFor="image" className={errors.image ? "label-error" : ""}>
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

                <fieldset>
                    <legend>Select the weather type:</legend>
                    <div className="radio-group">
                        <input type="radio" id="hot" name="weather" value="hot" checked={formData.weather === "hot"} onChange={handleChange} />
                        <label htmlFor="hot">Hot</label>
                    </div>
                    <div className="radio-group">
                        <input type="radio" id="warm" name="weather" value="warm" checked={formData.weather === "warm"} onChange={handleChange} />
                        <label htmlFor="warm">Warm</label>
                    </div>
                    <div className="radio-group">
                        <input type="radio" id="cold" name="weather" value="cold" checked={formData.weather === "cold"} onChange={handleChange} />
                        <label htmlFor="cold">Cold</label>
                    </div>
                </fieldset>
            </ModalWithForm>
        </>
    )
}