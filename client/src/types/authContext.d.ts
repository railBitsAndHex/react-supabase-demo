import React, {ReactNode} from "react"
export interface IAuthContext {
    signup: () => void,
    login: () => void,
}
export type AuthPropsType = {
    children: ReactNode
}
export const AuthStateInitial : AuthContextInterface = {
    singup: () => console.log("signup"),
    login: () => console.log("Login")
}