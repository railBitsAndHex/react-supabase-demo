import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import {validation2} from "../utils/validations"
function PrivateRoute() {
  const {user, session} = useAuth();
  const isAuth : boolean = validation2(user, session)
  return (isAuth ? <Outlet/> : <Navigate to="/home"/>)
}

export default PrivateRoute