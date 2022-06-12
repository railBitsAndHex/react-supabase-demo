import React from "react";
import { Container, Box, Center } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
function Login() {
  return (
      <Container>
        <Center>
            <LoginForm />
        </Center>
      </Container>
  );
}

export default Login;
