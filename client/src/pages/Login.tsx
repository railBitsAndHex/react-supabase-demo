import React from "react";
import { Container, Box, Center } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import "../styles/loginPage.modules.css"
function Login() {
  return (
        <section className="login-section-1">
          <div className="login-div-1">
            <h1>Login</h1>
            <LoginForm />
          </div>
        </section>
  );
}

export default Login;
