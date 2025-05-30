
import './ItemModal.css';

export default function ItemModal({ imgSrc, imgAlt, name, weather, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <img src={imgSrc} alt={imgAlt} className="modal-image" />
                <div className="modal-details">
                    <p><strong>{name}</strong></p>
                    <p>Weather: {weather}</p>
                </div>
            </div>
        </div>
    );
}
