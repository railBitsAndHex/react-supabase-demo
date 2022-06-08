import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";

type SignupVals = {
  email: string;
  password: string;
  passwordCfm: string;
};
function SignupForm() {
  const [disableSignup, setDisableSignup] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<SignupVals>();
  console.log(errors);
  useEffect(() => {
    console.log(`ErrosLen: ${Object.keys(errors).length}`);
    Object.keys(errors).length === 0
      ? setDisableSignup(false)
      : setDisableSignup(true);
  }, [Object.keys(errors).length]);
  const emailReg = () => {
    return register("email", {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /[0-9]*[a-z]+[0-9]*@([a-z]+\.)+/,
        message: "Please enter a valid email format",
      },
    });
  };
  const passwordReg = () => {
    return register("password", {
      required: {
        value: true,
        message: "Password field is required",
      },
      validate: (value: string) => {
        const pwCfmValue: string = watch().passwordCfm;
        if (pwCfmValue === value) {
          clearErrors(["passwordCfm", "password"]);
          return true;
        } else {
          return "Passwords do not match!";
        }
      },
    });
  };
  const passwordCfmReg = () => {
    return register("passwordCfm", {
      required: {
        value: true,
        message: "Confirm Password field is empty!",
      },
      onChange: (e) => {
        const pwValue: string = watch().password;
        const cfmPwValue: string = e.target.value;
        console.log(`pwVal: ${pwValue}`);
        console.log(`cpw: ${cfmPwValue}`);
        if (pwValue === cfmPwValue) {
          console.log("TRuee");
          clearErrors(["passwordCfm", "password"]);
          return true;
        } else {
          setError("passwordCfm", {
            type: "custom",
            message: "Passwords do not match",
          });
        }
      },
      validate: (value: string) => {
        const pwValue: string = watch().password;
        if (pwValue === value) {
          clearErrors(["passwordCfm", "password"]);
          return true;
        } else {
          return "Passwords do not match!";
        }
      },
    });
  };
  console.log(isValid);
  const hello = (data: SignupVals) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit((data) => hello(data))}>
        <Stack spacing={3}>
          <FormControl isInvalid={errors.email && true}>
            <FormLabel>Email</FormLabel>
            <Input {...emailReg()} type="email" placeholder="Email" />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password && true}>
            <FormLabel>Password</FormLabel>
            <Input {...passwordReg()} type="password" placeholder="Password" />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.passwordCfm && true}>
            <FormLabel htmlFor="passwordCfm">Confirm Password</FormLabel>
            <Input
              {...passwordCfmReg()}
              type="password"
              placeholder="Confirm Password"
            />
            <FormErrorMessage>
              {errors.passwordCfm && errors.passwordCfm.message}
            </FormErrorMessage>
          </FormControl>
          <Button disabled={disableSignup} type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default SignupForm;
