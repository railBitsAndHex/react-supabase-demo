import React from "react";
import { Container, Box, Center } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
function Login() {
  return (
    <div>
      <Container>
        <Center>
          <Box>
            <LoginForm />
          </Box>
        </Center>
      </Container>
    </div>
  );
}

export default Login;
