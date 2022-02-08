import React from 'react'
import BEMHelper from 'react-bem-helper';
import './ProfilePageContent.css';

const classes = new BEMHelper({
  name: 'profile-page'
})

const ProfilePageContent = () => {
  return (
    <div {...classes()}>
      sdfsd
    </div>
  )
}

export default ProfilePageContent
