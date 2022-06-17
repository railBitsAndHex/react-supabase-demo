import React, {ReactNode} from "react"
export type TSignUp = {
    email: string,
    password: string,
    passwordCfm: string
}
export type TLogin = {
    email: string,
    password: string
}
export type TResetPasswordEmail = {
    email: string
}
export type TResetPassword = {
    password: string,
    passwordCfm: string,
}
export interface IAuthContext {
    user: any,
    session: any,
    sessionTrigger: boolean,
    signup: (credentials: TSignUp) => void,
    login: (credentials: TLogin) => void,
    resetPasswordEmail: (credentials: TResetPasswordEmail) => void,
    resetPassword: (credentials: TResetPassword) => void
    logout: () => void
}
export const AuthStateInitial : AuthContextInterface = {
    sessionTrigger: false,
    signup: (credentials: TSignUp) => console.log("signup"),
    login: (credentials: TLogin) => console.log("Login"),
    logout: () => console.log("Logout"),
    resetPasswordEmail: (credentials: TResetPasswordEmail) => console.log("Reset Pw Email"),
    resetPassword: (credentials: TResetPassword) => console.log("Password Reset")
}
export type AuthPropsType = {
    children: ReactNode
}