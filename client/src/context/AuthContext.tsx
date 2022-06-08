import React, { useState, useContext } from "react"
import {
  IAuthContext,
  AuthStateInitial,
  AuthPropsType,
} from "./../types/authContext.d"

const AuthContext = React.createContext<IAuthContext>(AuthStateInitial)

export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }: AuthPropsType) => {
  const signup = () => {
    console.log("This is auth context signup")
  }
  const login = () => {
    console.log("This is auth contect login")
  }
  const values = {
    signup,
    login,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
