import React from 'react'
import ResetPwFormPassword from '../components/ResetPwFormPassword'
import "../styles/resetPassword.modules.css"
function ResetPassword() {
  return (
    <>
      <section className='pwreset-section-1' id='pwreset-sect'>
        <div className='reset-div-1'>
          <h1>Reset Password</h1>
          <p>Enter your new password</p>
          <ResetPwFormPassword/>
      </div>
      </section>
    </>
  )
}

export default ResetPassword