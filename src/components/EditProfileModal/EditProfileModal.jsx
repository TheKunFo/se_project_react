import CurrentUserContext from "../../contexts/CurrentUserContext";
import { regiter } from "../../utils/auth";
import { updateUserProfile } from "../../utils/user";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";

export default function EditProfileModal({
    showModal,
    setShowModal,
    isSubmitEnabled,
    setIsSubmitEnabled,
    setCurrentUser,
}) {
    const currentUser = useContext(CurrentUserContext);

    const [errors, setErrors] = useState({
        name: "",
        avatar: "",
    });

    const [formData, setFormData] = useState({
        name: "",
        avatar: "",
    });

    // const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || "",
                avatar: currentUser.avatar || "",
            });
        }
    }, [currentUser]);
    useEffect(() => {
        const noErrors = Object.values(errors).every((err) => err === "");
        const allFilled = Object.values(formData).every((val) => val.trim() !== "");
        setIsSubmitEnabled(noErrors && allFilled);
    }, [errors, formData]);

    const handleProfileFormChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate
        let error = "";
        if (!value.trim()) {
            error = "This field is required";
        } else {
            if (name === "avatar" && !/^https?:\/\/.+\..+/.test(value)) {
                error = "Invalid URL format";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleUpdateProfileFormSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            name: !formData.name ? "This field is required" : "",
            avatar: !/^https?:\/\/.+\..+/.test(formData.avatar)
                ? "Invalid URL format"
                : "",
        };

        setErrors(newErrors);


        const hasError = Object.values(newErrors).some((err) => err !== "");
        if (hasError) return;

        const token = localStorage.getItem('jwt');
        updateUserProfile({
            token,
            name: formData.name,
            avatar: formData.avatar,
        }).then((res) => {
            setCurrentUser(res.data);
            console.log('Succefully update Account: ', res)
            setShowModal(false);
        }).catch((err) => {
            console.log("Error Created Account : ", err)
        })


        setShowModal(false);
    };
    return (
        <ModalWithForm
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Change Profile"
            name="change-profile"
            buttonText="Change Profile"
            onSubmit={handleUpdateProfileFormSubmit}
            isSubmitEnabled={isSubmitEnabled}
        >
            <label
                htmlFor="name"
                className={`modal__label ${errors.name ? "label-error" : ""}`}
            >
                Name {errors.name && `(${errors.name})`}
            </label>
            <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleProfileFormChange}
                className={errors.name ? "input-error" : ""}
                placeholder="Name"
            />



            <label
                htmlFor="avatar"
                className={`modal__image ${errors.avatar ? "label-error" : ""}`}
            >
                Avatar URL {errors.avatar && `(${errors.avatar})`}
            </label>
            <input
                id="avatar"
                name="avatar"
                type="url"
                value={formData.avatar}
                onChange={handleProfileFormChange}
                className={errors.avatar ? "input-error" : ""}
                placeholder="Avatar URL"
            />
        </ModalWithForm>

    )
}