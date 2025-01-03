import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css";
const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-container">
        <div className="landingpage-header">
          <span>
            <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734874503/Link_xsjq6b.png" />
          </span>
          <span>
            <button className="sign-in" onClick={() => navigate("/Login")}>
              sign in
            </button>
            <button
              className="create-a-formbot"
              onClick={() => navigate("/Login")}
            >
              create a formbot
            </button>
          </span>
        </div>
        <div className="landingpage-content">
          <div className="landingpage-content-first-div">
            <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734876540/SVG_otj3mu.png" />
          </div>
          <div className="landingpage-content-middle-div">
            <h1>Build advanced chatbots visually</h1>
            <p>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them <br></br> anywhere on your web/mobile apps
              and start collecting results like magic.
            </p>
            <button className="Create-a-FormBot-for-free">
              Create a FormBot for free
            </button>
          </div>
          <div className="landingpage-content-last-div">
            <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734876638/Container_jysmdw.png" />
          </div>
        </div>
        <div>
          <img src="   https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734877407/Container_2_w6wqzf.png" />
        </div>
        <div className="landingpage-footer">
          <div className="footer-section">
            <img src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734874503/Link_xsjq6b.png" />

            <p>Made with ❤️ by,</p>
            <a href="#"> @cuvette</a>
          </div>
          <div className="footer-section">
            <h4>Product</h4>

            <a href="#">
              Scratch&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">
              Documentation&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">
              Roadmap&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">Pricing</a>
          </div>
          <div className="footer-section">
            <h4>Community</h4>

            <a href="#">
              Discord&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">
              GitHub Repository&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">
              Twitter&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">
              LinkedIn&nbsp;
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66699 9.33333L14.0003 2"
                  stroke="white"
                  stroke-opacity="0.92"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">OSS Friends</a>
          </div>
          <div className="footer-section">
            <h4>Company</h4>

            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Terms of service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
