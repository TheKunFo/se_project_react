import { useContext, useState } from 'react';
import ItemModal from '../ItemModal/ItemModal';
import './ItemCard.css'
import ItemDelete from '../ItemDelete/ItemDelete';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ItemCard({
    id,
    name,
    imgSrc,
    imgAlt,
    weather,
    items,
    owner,
    setItems,
    likes = [],
    onCardLike,
    isLoggedIn,
}) {
    const currentUser = useContext(CurrentUserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const isLiked = likes.some((userId) => userId === currentUser?._id);

    const handleLike = (e) => {
        e.stopPropagation();
        onCardLike({ id, isLiked });
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenDelete = () => setIsConfirmDeleteOpen(true);
    const handleCloseDelete = () => setIsConfirmDeleteOpen(false);

    return (
        <article className="item-card">
            <div className="item-card__image-wrapper" onClick={handleOpenModal}>
                <span className="item-card__label">{name}</span>

                {isLoggedIn && (
                    <div className="item-card__likes">
                        <button
                            className={`item-card__like ${isLiked ? 'item-card__like_active' : ''}`}
                            onClick={handleLike}
                            aria-label="Like this item"
                        >
                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>
                )}

                <img
                    className="item-card__image"
                    src={imgSrc}
                    alt={imgAlt}
                    width={300}
                    height={300}
                />
            </div>

            {isModalOpen && (
                <ItemModal
                    id={id}
                    imgSrc={imgSrc}
                    imgAlt={imgAlt}
                    name={name}
                    owner={owner}
                    weather={weather}
                    onClose={handleCloseModal}
                    onDelete={handleOpenDelete}
                />
            )}

            {isConfirmDeleteOpen && (
                <ItemDelete
                    id={id}
                    items={items}
                    setItems={setItems}
                    onClose={handleCloseDelete}
                    onDelete={handleCloseModal}
                />
            )}
        </article>
    );
}