import { Box, Center, Container, Stack } from "@chakra-ui/react";
import React from "react";
import SignupForm from "../components/SignupForm";
import "../styles/signup.modules.css";
function Signup() {
  return (
    <>
      <section className="signup-section-1">
        <div className="signup-div-1">
          <h1>Create an account</h1>
          <SignupForm />
        </div>
      </section>
    </>
  );
}

export default Signup;
