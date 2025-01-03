import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "./Login.css";
function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email && !password) {
            return handleError('email and password are required')
        }
           if (!email) {
              return handleError( 'Email is required ');
           }
           if (!password) {
              return handleError("password is required ");
           }
        try {
            const url = `https://form-builder-vikram3.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken,id,workspaceId, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                  localStorage.setItem("userId", id);
                  localStorage.setItem("workspaceId", workspaceId);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }

        } catch (err) {
            handleError(err);
        }
    }

    return (
      <>
        <div className="login-container">
          <img
            className="back-arrow"
            onClick={() => navigate("/")}
            src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734936217/arrow_back_y5cpkw.png"
          />
          <img
            className="triangle"
            src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734926219/Group_2_poa6zj.png"
          />
          <img
            className="circle-pink"
            src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734926219/Ellipse_2_qqltoe.png"
          />
          <img
            className="login-circle-orange"
            src="https://res.cloudinary.com/dlwpgtmcn/image/upload/v1734926219/Ellipse_1_b6ugk7.png"
          />

          <div className="login-form">
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={loginInfo.email}
                autoComplete="email"
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="*********"
                value={loginInfo.password}
                autoComplete="current-password"
              />
              <button type="submit" className="login-btn">
                Log In
              </button>
              <p>OR</p>
              <button className="google-btn">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15" cy="20" r="15" fill="white" />
                  <g transform="translate(4 8)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 11.7614C22 10.946 21.9286 10.1619 21.7959 9.40916H11.2245V13.8576H17.2653C17.0051 15.2951 16.2143 16.513 15.0255 17.3285V20.2139H18.6531C20.7755 18.2119 22 15.2637 22 11.7614Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2245 23C14.2551 23 16.7959 21.9703 18.6531 20.2139L15.0255 17.3285C14.0204 18.0185 12.7347 18.4261 11.2245 18.4261C8.30103 18.4261 5.82654 16.4032 4.94389 13.685H1.19388V16.6645C3.04082 20.423 6.83674 23 11.2245 23Z"
                      fill="#34A853"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.94389 13.685C4.7194 12.995 4.59184 12.258 4.59184 11.5001C4.59184 10.7421 4.71939 10.0051 4.94388 9.31506V6.33552H1.19388C0.433674 7.88802 0 9.64438 0 11.5001C0 13.3557 0.433679 15.112 1.19388 16.6645L4.94389 13.685Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2245 4.57387C12.8725 4.57387 14.3521 5.15409 15.5153 6.29364L18.7347 2.99523C16.7908 1.13955 14.25 0 11.2245 0C6.83674 0 3.04082 2.57711 1.19388 6.33552L4.94388 9.31506C5.82653 6.59688 8.30103 4.57387 11.2245 4.57387Z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
                <p> Sign Up with Google</p>
              </button>
              <span>
                Does't have an account ?
                <Link to="/signup"> &nbsp;Register now</Link>
              </span>
            </form>
            <ToastContainer />
          </div>
        </div>
      </>
    );
}

export default Login
