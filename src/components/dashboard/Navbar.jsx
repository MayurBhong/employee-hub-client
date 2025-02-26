import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user, logout} = useAuth();
    return (
        <div className='flex items-center text-white justify-between h-12 bg-[#0A5EB0] px-5'>
            <p>Welcome {user.name}</p>
            <button className='bg-red-500 px-2 py-1 rounded hover:bg-red-600'onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar