
import './ItemModal.css';

export default function ItemModal({ id, imgSrc, imgAlt, name, weather, onClose,onDelete }) {
    const handleDelete = () => {
        onClose(false)
        onDelete(true)
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={() => onClose(false)}>×</button>
                <img src={imgSrc} alt={imgAlt} className="modal-image" />
                <div className="modal__information">
                    <div className="modal-details">
                        <p><strong>{name}</strong></p>
                        <p>Weather: {weather}</p>
                    </div>
                    <div className="modal-delete">
                        <button onClick={handleDelete} className='button__delete-item'>Delete Item</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
