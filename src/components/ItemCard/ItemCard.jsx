import { useState } from 'react';
import ItemModal from '../ItemModal/ItemModal';
import './ItemCard.css'

export default function ItemCard({ name, imgSrc, imgAlt, weather }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <article className="item-card" >
                <div className="item-card__image-wrapper " onClick={() => setIsOpen(true)}>
                    <span className="item-card__label">{name}</span>
                    <img
                        className="item-card__image"
                        src={imgSrc}
                        alt={imgAlt}
                        width={300}
                        height={300}
                    />
                </div>
            </article>

            {isOpen && (
                <ItemModal
                    imgSrc={imgSrc}
                    imgAlt={imgAlt}
                    name={name}
                    weather={weather}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
