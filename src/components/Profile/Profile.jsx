
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
    setIsSubmitEnabled,
    handleChange,
    formData,
    errors,
    isLoggedIn,
    showUpdateProfile,
    setShowUpdateProfile,
    setCurrentUser,
    setIsLoggedIn,
}) {
    return (
        <div className="profile">
            <div className="sidebar__section">
                <Sidebar
                    isLoggedIn={isLoggedIn}
                    showUpdateProfile={showUpdateProfile}
                    setShowUpdateProfile={setShowUpdateProfile}
                    isSubmitEnabled={isSubmitEnabled}
                    setIsSubmitEnabled={setIsSubmitEnabled}
                    setCurrentUser={setCurrentUser}
                    setIsLoggedIn={setIsLoggedIn}
                />
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
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </div>
    )
}