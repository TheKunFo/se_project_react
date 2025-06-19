
import { useContext } from 'react';
import './ItemModal.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function ItemModal({ id, imgSrc, imgAlt, name,owner ,weather, onClose, onDelete }) {
    const handleDelete = () => {
        onClose(false)
        onDelete(true)
    }
    const currentUser = useContext(CurrentUserContext);

    const isOwn = currentUser._id === owner;
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
                    {isOwn && (
                        <div className="modal-delete">
                            <button onClick={handleDelete} className='button__delete-item'>Delete Item</button>
                        </div>
                    ) }

                </div>
            </div>
        </div>
    );
}
