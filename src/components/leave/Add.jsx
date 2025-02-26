import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const { user } = useAuth();

    const [leave, setLeave] = useState({
        userId: user._id,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://employee-hub-server-production.up.railway.app/api/leave/add`,leave,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`);
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Request For Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Leave Type
                        </label>
                        <select
                          name="leaveType"
                          onChange={handleChange}
                          className="mt-1 p-2 black w-full border border-gray-300 rounded-md"
                          required
                        >
                          <option value="">Select Department</option>  
                          <option value="Casual Leave">Casual Leave</option>
                          <option value="Sick Leave">Sick Leave</option>
                          <option value="Annual Leave">Annual Leave</option>  
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* From date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                onChange={handleChange}
                                className="mt-1 p-2 black w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* To date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                onChange={handleChange}
                                className="mt-1 p-2 black w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                        {/* Description */}
                    <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="reason"
                                placeholder="Reason"
                                onChange={handleChange}
                                className="w-full border border-gray-300"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#0A5EB0] text-white py-2 px-4 rounded-md hover:bg-[#4CC9FE]"
                    >
                        Add Leave
                    </button>
                
            </form>

        </div>
    )
};

export default Add; 