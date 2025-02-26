import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'

const AdminSidebar = () => {
    return (
        <div className="bg-[#5DADE2] text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-[#0A5EB0] h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-pacific">Employee M S</h3>
            </div>
            <div className='px-4'> 
                <NavLink to="/admin-dashboard"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >
                    <FaTachometerAlt/> 
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin-dashboard/employees"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end>
                    <FaUsers/> 
                    <span>Employee</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments" 
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >
                    <FaBuilding/> 
                    <span>Department</span>
                </NavLink>

                <NavLink to="/admin-dashboard/leaves"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >                    
                    <FaCalendarAlt/> 
                    <span>Leave</span>
                </NavLink>

                <NavLink to="/admin-dashboard/salary/add"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >
                    <FaMoneyBillWave/> 
                    <span>Salary</span>
                </NavLink>

                <NavLink to="/admin-dashboard/setting"
                    className={({ isActive }) => `flex items-center space-x-4 block py-2.5 px-4 rounded ${isActive ? "bg-[#3674B5]" : "hover:bg-[#4CC9FE]"}`}
                    end >                    
                    <FaCogs/> 
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar