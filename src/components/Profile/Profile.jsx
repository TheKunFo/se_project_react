
import ClothesSection from '../ClothesSection/ClothesSection';
import Sidebar from '../Sidebar/Sidebar';
import './Profile.css';

export default function Profile({
    setShowModal,
    items,
    setItems,
    weatherType,
    isOpen,
    onAddItem,
    isSubmitEnabled,
    handleChange,
    formData,
    errors
}) {
    return (
        <div className="profile">
            <div className="sidebar__section">
                <Sidebar />
            </div>
            <div className="clother__section">
                <ClothesSection 
                    setShowModal={setShowModal}
                    items={items}
                    setItems={setItems}
                    weatherType={weatherType}
                    isOpen={isOpen}
                    onAddItem={onAddItem}
                    isSubmitEnabled={isSubmitEnabled}
                    handleChange={handleChange}
                    formData={formData}
                    errors={errors}
                />
            </div>
        </div>
    )
}