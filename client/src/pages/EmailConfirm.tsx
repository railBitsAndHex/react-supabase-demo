import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function EmailConfirm() {
  const navigate = useNavigate();
  const { session, sessionTrigger } = useAuth();
  useEffect(() => {
    if (session !== null && session !== undefined) {
      navigate("/home");
    }
  }, [sessionTrigger]);
  return (
    <div>
      A confirmation link was sent to your email account. Please click it to
      verify your account.
    </div>
  );
}

export default EmailConfirm;
