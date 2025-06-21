import { checkToken, login } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
export default function SignIn({
  showModal,
  setShowModal,
  isSubmitEnabled,
  setIsSubmitEnabled,
  setIsLoggedIn,
  setCurrentUser,
  setShowSignUp,
}) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => err === "");
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    setIsSubmitEnabled(noErrors && allFilled);
  }, [errors, formData]);

  const handleSignInFormChange = (e) => {
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
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSignInFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email ? "This field is required" : "",
      password:
        !formData.password || formData.password.length < 6
          ? "Password must be at least 6 characters"
          : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;

    login({
      email: formData.email,
      password: formData.password,
    })
      .then((res) => {
        checkToken(res.token)
          .then((row) => {
            console.log("Succefully Login Account: ", row.data);
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            setCurrentUser(row.data);
          })
          .catch((err) => {
            console.log("Error token Account : ", err);
          });
        setShowModal(false);
      })
      .catch((err) => {
        console.log("Error login Account : ", err);
      });
  };

  const handleParse = () => {
    setShowModal(false);
    setShowSignUp(true);
  };

  return (
    <ModalWithForm
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title="Log in"
      name="log-in"
      buttonText="Log In"
      onSubmit={handleSignInFormSubmit}
      isSubmitEnabled={isSubmitEnabled}
      optionButton={
        <>
          <button className="button__parse" onClick={handleParse}>
            or Sign up
          </button>
        </>
      }
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
        onChange={handleSignInFormChange}
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
        onChange={handleSignInFormChange}
        className={errors.password ? "input-error" : ""}
        placeholder="Password"
      />
    </ModalWithForm>
  );
}
