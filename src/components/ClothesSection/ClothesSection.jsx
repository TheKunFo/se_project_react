
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
    isLoggedIn,
    handleCardLike,
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
                    .map((item) => (
                        <ItemCard
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            imgAlt={item.name}
                            imgSrc={item.imageUrl}
                            weather={item.weather}
                            items={items}
                            owner={item.owner}
                            likes={item.likes}
                            setItems={setItems}
                            isLoggedIn={isLoggedIn}
                            onCardLike={handleCardLike}
                        />
                    ))}
            </div>
        </div>
    )
}