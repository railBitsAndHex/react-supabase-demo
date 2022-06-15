import React from 'react'
import ResetPwFormEmail from '../components/ResetPwFormEmail'
import "../styles/resetPassword.modules.css"
function ResetPassword() {
  return (
    <>
      <section className='reset-section-1'>
        <div className='reset-div-1'>
          <h1>Reset Password</h1>
          <p>Enter your email to receive a link to reset your password.</p>
          <ResetPwFormEmail/>
        </div>
      </section>
    </>
  )
}

export default ResetPassword