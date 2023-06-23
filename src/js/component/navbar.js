import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/index.css'

export const Navbar = () => {
  return (
    <nav className='navbar navbar-light bg-light mb-3'>
      <Link className='Navbar-link' to='/'>
        <span className='Navbar-title navbar-brand mb-0 h1 p-3'>Contact List</span>
      </Link>
      <div className='ml-auto'></div>
    </nav>
  )
}
