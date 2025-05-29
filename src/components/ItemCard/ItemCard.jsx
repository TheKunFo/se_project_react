import { useState } from 'react';
import ItemModal from '../ItemModal/ItemModal';
import './ItemCard.css'
import ItemDelete from '../ItemDelete/ItemDelete';

export default function ItemCard({ id,name, imgSrc, imgAlt, weather,items,setItems }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

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
                    id={id}
                    imgSrc={imgSrc}
                    imgAlt={imgAlt}
                    name={name}
                    weather={weather}
                    onClose={setIsOpen}
                    onDelete={setIsConfirm}
                />
            )}

            {isConfirm && (
                <ItemDelete
                    id={id}
                    items={items}
                    setItems={setItems}
                    onClose={setIsOpen}
                    onDelete={setIsConfirm}
                />
            )}
        </>
    );
}
