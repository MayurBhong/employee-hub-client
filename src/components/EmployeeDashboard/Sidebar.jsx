import React from 'react'
import { useAuth } from '../../context/authContext'
import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'

const Sidebar = () => {
    const {user} = useAuth();
    return (
        <div className="bg-[#5DADE2] text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-[#0A5EB0] h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-pacific">Employee M S</h3>
            </div>
            <div className='px-4'> 
                <NavLink to="/employee-dashboard"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >
                    <FaTachometerAlt/> 
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end>
                    <FaUsers/> 
                    <span>My Profile</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/leaves/${user._id}`} 
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >
                    <FaBuilding/> 
                    <span>Leaves</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/salary/${user._id}`}
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >
                    <FaMoneyBillWave/> 
                    <span>Salary</span>
                </NavLink>

                <NavLink to="/employee-dashboard/setting"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >                    
                    <FaCogs/> 
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar