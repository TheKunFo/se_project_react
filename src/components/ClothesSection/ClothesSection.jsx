import AddItemModel from '../AddItemModel/AddItemModel'
import ItemCard from '../ItemCard/ItemCard'
import './ClothesSection.css'

export default function ClothesSection({
    setShowModal,
    items,
    setItems,
    weatherType,
    isOpen,
    onAddItem,
    isSubmitEnabled,
    handleChange,
    formData,
    errors,
}) {
    return (
        <div className='clothes'>
            <div className="clother__header">
                <span className='clothes__title' >Your Items</span>
                <button className="clother__add-btn" onClick={() => setShowModal(true)}>
                    + Add items
                </button>
            </div>
            <div className="clother__items">
                {items
                    .filter((item) => item.weather === weatherType)
                    .map((item) => (
                        <ItemCard
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            imgAlt={item.name}
                            imgSrc={item.link}
                            weather={item.weather}
                            items={items}
                            setItems={setItems}
                        />
                    ))}
            </div>
            <AddItemModel
                isOpen={isOpen}
                onAddItem={onAddItem}
                onCloseModal={() => setShowModal(false)}
                isSubmitEnabled={isSubmitEnabled}
                handleChange={handleChange}
                formData={formData}
                errors={errors}
            />
        </div>
    )
}