import React, { Component } from 'react'
import { NavLink }  from 'react-router-dom'
import urls from '../constants/Urls'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div>--year</div>
    </footer>
  )
};
export default Footer;