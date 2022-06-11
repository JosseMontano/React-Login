import React from 'react'
import { Link } from 'react-router-dom'

const welcome = () => {
  return (
    <Link to={'/login'}>Login</Link>
  )
}

export default welcome