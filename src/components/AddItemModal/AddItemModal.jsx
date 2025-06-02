
import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function AddItemModal({
    showModal,
    setShowModal,
    handleCardFormSubmit,
    isSubmitEnabled,
    errors,
    formData,
    handleCardFormChange,

}) {
    return (
        <section className='add__item-modal'>
            <ModalWithForm
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="New Garment"
                name="add-garment"
                buttonText="Add Garment"
                onSubmit={handleCardFormSubmit}
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
                    onChange={handleCardFormChange}
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
                    onChange={handleCardFormChange}
                    className={errors.image ? "input-error" : ""}
                    placeholder="Image URL"
                />
                <fieldset className="modal__fieldset">
                    <legend className="modal__legend">Select the weather type:</legend>
                    <div className="modal__radio-group">
                        <input
                            type="radio"
                            id="hot"
                            name="weather"
                            value="hot"
                            checked={formData.weather === "hot"}
                            onChange={handleCardFormChange}
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
                            onChange={handleCardFormChange}
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
                            onChange={handleCardFormChange}
                        />
                        <label htmlFor="cold">Cold</label>
                    </div>
                </fieldset>
            </ModalWithForm>
        </section>
    )
}