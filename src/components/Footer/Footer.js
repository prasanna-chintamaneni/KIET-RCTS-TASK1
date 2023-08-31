import React from 'react'
import './Footer.css';
import Git from './github.png';
export default function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='footer-section1'>
          <img src={Git} alt='Small Pic' className='footer-image' />
        </div>
        <div className='footer-section2'>
          <div className='footer_container'>
          &copy; {new Date().getFullYear()} Copyright Raj Reddy Center For Tecnology And Society All Rights Reserved </div>
        </div>
      </div>
    </div>
  )
}