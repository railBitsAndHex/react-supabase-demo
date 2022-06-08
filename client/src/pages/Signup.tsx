import { Box, Center, Container, Stack } from "@chakra-ui/react";
import React from "react";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <>
      <Container>
        <Center>
          <SignupForm />
        </Center>
      </Container>
    </>
  );
}

export default Signup;
