import { regiter } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function SignUp({
    showModal,
    setShowModal,
    isSubmitEnabled,
    setIsSubmitEnabled,
}) {
    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: "",
        avatar: "",
    });

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        avatar: "",
    });

    // const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    useEffect(() => {
        const noErrors = Object.values(errors).every((err) => err === "");
        const allFilled = Object.values(formData).every((val) => val.trim() !== "");
        setIsSubmitEnabled(noErrors && allFilled);
    }, [errors, formData]);

    const handleSignUpFormChange = (e) => {
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
            if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
                error = "Invalid email format";
            }
            if (name === "password" && value.length < 6) {
                error = "Password must be at least 6 characters";
            }
            if (name === "avatar" && !/^https?:\/\/.+\..+/.test(value)) {
                error = "Invalid URL format";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSignUpFormSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            email: !formData.email ? "This field is required" : "",
            name: !formData.name ? "This field is required" : "",
            password: !formData.password || formData.password.length < 6
                ? "Password must be at least 6 characters"
                : "",
            avatar: !/^https?:\/\/.+\..+/.test(formData.avatar)
                ? "Invalid URL format"
                : "",
        };

        setErrors(newErrors);


        const hasError = Object.values(newErrors).some((err) => err !== "");
        if (hasError) return;

        regiter({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            avatar: formData.avatar,
        }).then((res) => {
            console.log('Succefully create Account: ', res)
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
            title="Sign Up"
            name="sign-up"
            buttonText="Sign Up"
            onSubmit={handleSignUpFormSubmit}
            isSubmitEnabled={isSubmitEnabled}
        >
            <label
                htmlFor="email"
                className={`modal__label ${errors.email ? "label-error" : ""}`}
            >
                Email {errors.email && `(${errors.email})`}
            </label>
            <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleSignUpFormChange}
                className={errors.email ? "input-error" : ""}
                placeholder="email"
            />

            <label
                htmlFor="password"
                className={`modal__label ${errors.password ? "label-error" : ""}`}
            >
                Password {errors.password && `(${errors.password})`}
            </label>
            <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleSignUpFormChange}
                className={errors.password ? "input-error" : ""}
                placeholder="Password"
            />

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
                onChange={handleSignUpFormChange}
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
                onChange={handleSignUpFormChange}
                className={errors.avatar ? "input-error" : ""}
                placeholder="Avatar URL"
            />
        </ModalWithForm>

    )
}