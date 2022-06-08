import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react"
type LoginVal = {
  email: string
  password: string
}
function LoginForm() {
  const {
    register,
    handleSubmit,
    // watch triggers re-render at root of app
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginVal>()
  const hello = (data: LoginVal) => {
    reset()
  }

  console.log(errors)
  const emailRegister = () => {
    return register("email", {
      required: "Email is required",
      validate: (value) => {
        const emailRe = /[0-9]*[a-z]+[0-9]*@([a-z]+\.)+/
        // console.log(value.match(emailRe))
        return value.match(emailRe) !== null
      },
    })
  }
  const pwRegister = () => {
    return register("password", {
      required: "Password is required",
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit((data) => hello(data))}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="email" type="email" {...emailRegister()} />
          {errors.email && errors.email.message}
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" type="password" {...pwRegister()} />
          {errors.password && errors.password.message}
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </>
  )
}

export default LoginForm
