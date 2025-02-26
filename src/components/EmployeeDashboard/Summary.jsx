import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const SummaryCard = () => {
    const {user} = useAuth();
    return (
        <div className='p-6'>
        <div className='rounded flex bg-white'>
            <div className={`text-3xl flex justify-center items-center bg-[#0A5EB0] text-white px-4`}>
                <FaUser />
            </div>
            <div className='pl-4 py-1'>
                <p className='text-lg font-semibold'>Welcome Back</p>
                <p className='text-xl font-bold'>{user.name}</p>
            </div>
        </div>
        </div>
    )
} 

export default SummaryCard