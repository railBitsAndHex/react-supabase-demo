import React from 'react'
import ProfileEditForm from './../components/ProfileEditForm';
import "../styles/profileEdit.modules.css"
function ProfileEdit() {
  return (
    <>
    <section className='profile-edit-sect-1'>
        <h2 id='profile-edit-h2'>Edit Profile</h2>
        <div className='profile-edit-div-1'>
          <ProfileEditForm/>
        </div>
    </section>
    </>
  )
}

export default ProfileEdit