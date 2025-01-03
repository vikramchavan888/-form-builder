import React, { useState,useEffect } from "react";
import axios from "axios"; 
import {  useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./Setting.css";

const Setting = () => {
const [loggedInUser, setLoggedInUser] = useState("");
const navigate = useNavigate();
useEffect(() => {
  setLoggedInUser(localStorage.getItem("loggedInUser"));
}, []);

const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("workspaceId");
     localStorage.removeItem("selectedForm");
  handleSuccess("User Loggedout");
  setTimeout(() => {
    navigate("/login");
  }, 1000);
};



const userId = localStorage.getItem("userId");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Data to send to the backend
  const userData = {
    name,
    email,
    oldPassword,
    newPassword,
  };
console.log("Payload being sent:", userData);
console.log("User ID:", localStorage.getItem("userId"));
  try {
    const response = await axios.put(
      `http://localhost:3000/auth/${userId}`,
      userData
    ); // Adjust API endpoint as needed
   handleSuccess(response.data.message || "Profile updated successfully!");
   setName("");
   setEmail("");
   setOldPassword("");
   setNewPassword("");
  } catch (error) {
   handleError(error.response?.data?.message || "Failed to update profile.");
  }
};



  return (
    <>
      <div className="setting-container">
        <h4>Setting</h4>
        <div className="setting-form">
          <form onSubmit={handleSubmit}>
            <div className="input-div">
              <span className="icon-before">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M16.5468 21.1133C11.7922 21.1133 7.73193 21.8321 7.73193 24.7111C7.73193 27.5901 11.7665 28.3347 16.5468 28.3347C21.3013 28.3347 25.3604 27.6147 25.3604 24.7369C25.3604 21.8591 21.3271 21.1133 16.5468 21.1133Z"
                    stroke="#828282"
                    stroke-width="1.84399"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M16.5467 17.0063C19.6669 17.0063 22.1958 14.4762 22.1958 11.3561C22.1958 8.23593 19.6669 5.70703 16.5467 5.70703C13.4266 5.70703 10.8965 8.23593 10.8965 11.3561C10.886 14.4657 13.3985 16.9957 16.5069 17.0063H16.5467Z"
                    stroke="#828282"
                    stroke-width="1.75618"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <input
                className="nameinput"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-div">
              <span className="icon-before">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0513 14.165V10.0304V10.0304C11.0513 6.98593 13.5196 4.51758 16.5641 4.51758V4.51758C19.6085 4.51758 22.0768 6.98593 22.0768 10.0304V10.0304V14.165"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5641 19.6777V23.8123"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M23.4549 29.3242H9.6729C8.14999 29.3242 6.9165 28.0907 6.9165 26.5678V16.9205C6.9165 15.3975 8.14999 14.1641 9.6729 14.1641H23.4549C24.9778 14.1641 26.2113 15.3975 26.2113 16.9205V26.5678C26.2113 28.0907 24.9778 29.3242 23.4549 29.3242Z"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <input
                className="nameinput"
                type="email"
                placeholder="Update email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-div">
              <span className="icon-before">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0513 14.165V10.0304V10.0304C11.0513 6.98593 13.5196 4.51758 16.5641 4.51758V4.51758C19.6085 4.51758 22.0768 6.98593 22.0768 10.0304V10.0304V14.165"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5641 19.6777V23.8123"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M23.4549 29.3242H9.6729C8.14999 29.3242 6.9165 28.0907 6.9165 26.5678V16.9205C6.9165 15.3975 8.14999 14.1641 9.6729 14.1641H23.4549C24.9778 14.1641 26.2113 15.3975 26.2113 16.9205V26.5678C26.2113 28.0907 24.9778 29.3242 23.4549 29.3242Z"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <input
                className="setting-form-input"
                type={isOldPasswordVisible ? "text" : "password"}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                onClick={() => setIsOldPasswordVisible((prev) => !prev)}
                className="icon-after"
              >
                {isOldPasswordVisible ? (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M4.58953 17.3867C4.37315 16.9856 4.37315 16.4991 4.58953 16.0981C7.19708 11.2758 12.0139 7.0957 16.8307 7.0957C21.6475 7.0957 26.4643 11.2758 29.0718 16.0995C29.2882 16.5005 29.2882 16.987 29.0718 17.3881C26.4643 22.2104 21.6475 26.3905 16.8307 26.3905C12.0139 26.3905 7.19708 22.2104 4.58953 17.3867Z"
                      stroke="#828282"
                      stroke-width="2.06729"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.754 13.8204C21.3686 15.435 21.3686 18.0529 19.754 19.6676C18.1393 21.2822 15.5214 21.2822 13.9068 19.6676C12.2921 18.0529 12.2921 15.435 13.9068 13.8204C15.5214 12.2057 18.1393 12.2057 19.754 13.8204"
                      stroke="#828282"
                      stroke-width="1.96889"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M4.58953 17.3867C4.37315 16.9856 4.37315 16.4991 4.58953 16.0981C7.19708 11.2758 12.0139 7.0957 16.8307 7.0957C21.6475 7.0957 26.4643 11.2758 29.0718 16.0995C29.2882 16.5005 29.2882 16.987 29.0718 17.3881C26.4643 22.2104 21.6475 26.3905 16.8307 26.3905C12.0139 26.3905 7.19708 22.2104 4.58953 17.3867Z"
                      stroke="#828282"
                      stroke-width="2.06729"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <path
                      d="M19.754 13.8204C21.3686 15.435 21.3686 18.0529 19.754 19.6676C18.1393 21.2822 15.5214 21.2822 13.9068 19.6676C12.2921 18.0529 12.2921 15.435 13.9068 13.8204C15.5214 12.2057 18.1393 12.2057 19.754 13.8204"
                      stroke="#828282"
                      stroke-width="1.96889"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <line
                      x1="5"
                      y1="5"
                      x2="29"
                      y2="29"
                      stroke="#828282"
                      stroke-width="2.06729"
                      stroke-linecap="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            <div className="input-div">
              <span className="icon-before">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0513 14.165V10.0304V10.0304C11.0513 6.98593 13.5196 4.51758 16.5641 4.51758V4.51758C19.6085 4.51758 22.0768 6.98593 22.0768 10.0304V10.0304V14.165"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5641 19.6777V23.8123"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M23.4549 29.3242H9.6729C8.14999 29.3242 6.9165 28.0907 6.9165 26.5678V16.9205C6.9165 15.3975 8.14999 14.1641 9.6729 14.1641H23.4549C24.9778 14.1641 26.2113 15.3975 26.2113 16.9205V26.5678C26.2113 28.0907 24.9778 29.3242 23.4549 29.3242Z"
                    stroke="#828282"
                    stroke-width="2.06729"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <input
                className="setting-form-input"
                type={isNewPasswordVisible ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                className="icon-after"
              >
                {isNewPasswordVisible ? (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M4.58953 17.3867C4.37315 16.9856 4.37315 16.4991 4.58953 16.0981C7.19708 11.2758 12.0139 7.0957 16.8307 7.0957C21.6475 7.0957 26.4643 11.2758 29.0718 16.0995C29.2882 16.5005 29.2882 16.987 29.0718 17.3881C26.4643 22.2104 21.6475 26.3905 16.8307 26.3905C12.0139 26.3905 7.19708 22.2104 4.58953 17.3867Z"
                      stroke="#828282"
                      stroke-width="2.06729"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.754 13.8204C21.3686 15.435 21.3686 18.0529 19.754 19.6676C18.1393 21.2822 15.5214 21.2822 13.9068 19.6676C12.2921 18.0529 12.2921 15.435 13.9068 13.8204C15.5214 12.2057 18.1393 12.2057 19.754 13.8204"
                      stroke="#828282"
                      stroke-width="1.96889"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M4.58953 17.3867C4.37315 16.9856 4.37315 16.4991 4.58953 16.0981C7.19708 11.2758 12.0139 7.0957 16.8307 7.0957C21.6475 7.0957 26.4643 11.2758 29.0718 16.0995C29.2882 16.5005 29.2882 16.987 29.0718 17.3881C26.4643 22.2104 21.6475 26.3905 16.8307 26.3905C12.0139 26.3905 7.19708 22.2104 4.58953 17.3867Z"
                      stroke="#828282"
                      stroke-width="2.06729"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <path
                      d="M19.754 13.8204C21.3686 15.435 21.3686 18.0529 19.754 19.6676C18.1393 21.2822 15.5214 21.2822 13.9068 19.6676C12.2921 18.0529 12.2921 15.435 13.9068 13.8204C15.5214 12.2057 18.1393 12.2057 19.754 13.8204"
                      stroke="#828282"
                      stroke-width="1.96889"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <line
                      x1="5"
                      y1="5"
                      x2="29"
                      y2="29"
                      stroke="#828282"
                      stroke-width="2.06729"
                      stroke-linecap="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            <button type="submit" className="login-btn">
              Update
            </button>
          </form>
          <ToastContainer />
        </div>
        <img
          className="logout-btn"
          onClick={handleLogout}
          src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734949157/Frame_6_jmu7n3.png"
        />
      </div>
    </>
  );
};

export default Setting;
