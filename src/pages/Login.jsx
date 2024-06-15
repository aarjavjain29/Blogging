import React, { useState } from "react";
import blogLogo from "../assests/blog.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles/register-login.css";
import googleLogo from "../assests/google.png";
import { forgotPassword, signIn, signUpProvider } from "../utils/firebaseUtils";
import { useNavigate } from "react-router-dom";
import passwordImg from "../assests/forgot-password.png";
import { ToastifyInfo } from "../utils/toastNotify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password, navigate);
    // console.log(email, password);
    ToastifyInfo("login successfully")
  };

  const handleProviderLogin = () => {
    signUpProvider(navigate);
  };

  const style = {
    "& label.Mui-focused": {
      color: "#e84224",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ef6f59",
      },
    },
  };

  return (
    <div className="registerMain">
      <div className="registerContainer">
        <img src={blogLogo} alt="blog-logo" className="blogLogo" />
        <h1>── Login ──</h1>

        <form action="" onSubmit={handleSubmit}>
          <TextField
            sx={style}
            className="input"
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            sx={style}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" className="registerButton" type="submit">
            Login
          </Button>
          <Button
            variant="contained"
            className="googleButton"
            onClick={handleProviderLogin}
          >
            WITH <img src={googleLogo} alt="google-logo" />
          </Button>
        </form>

        <div style={{ fontFamily: "sans-serif", fontSize: "12px" }}>
          <p>
            Are you not registered?{" "}
            <Button onClick={() => navigate("/register")}>Register</Button>
          </p>
          <p>
            Do you forgot the password?{" "}
            <Button onClick={() => forgotPassword(email)}>
              <img src={passwordImg} alt="" />
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
