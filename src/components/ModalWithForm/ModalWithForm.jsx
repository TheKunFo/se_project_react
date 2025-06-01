import './ModalWithForm.css';
import { useEffect } from 'react';
import  useModalClose  from '../../utils/useModalClose';

export default function ModalWithForm({
    isOpen,
    onClose,
    title,
    name,
    buttonText,
    children,
    onSubmit,
    isSubmitEnabled
}) {
    useModalClose(isOpen, onClose);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={`modal modal_type_${name}`}>
                <button className="close-btn" onClick={onClose} aria-label="Close modal">✕</button>
                <h2 id="modal-title">{title}</h2>
                <form name={name} className="modal-form" onSubmit={onSubmit}>
                    {children}
                    <button
                        className={isSubmitEnabled ? "modal-form__button" : "modal-form_button_disabled"}
                        type="submit"
                        disabled={!isSubmitEnabled}
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
