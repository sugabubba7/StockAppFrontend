import React from 'react'
import { Button } from './ui/button'

function Header() {
  return (
    <div className='p-5 shadow-2xl  flex justify-between items-center'>
    <h1>Stock App</h1>
    <Button>Login/Register</Button>
</div>

  )
}

export default Header
