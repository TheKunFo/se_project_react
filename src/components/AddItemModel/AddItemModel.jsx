import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./AddItemModel.css";

export default function AddItemModel({
    isOpen,
    onAddItem,
    onCloseModal,
    isSubmitEnabled,
    handleChange,
    formData,
    errors,
}) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [weather, setWeather] = useState("");

    useEffect(() => {
        if (isOpen) {
            setName("");
            setImageUrl("");
            setWeather("");
        }
    }, [isOpen]);



    return (
        <>
            <ModalWithForm
                isOpen={isOpen}
                onClose={onCloseModal}
                title="New Garment"
                name="add-garment"
                buttonText="Add Garment"
                onSubmit={onAddItem}
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
        </>
    )
}