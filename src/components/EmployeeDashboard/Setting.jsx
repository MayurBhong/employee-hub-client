import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword) {
            setError("Password doesn't match");
        } else {
          try {
            const response = await axios.put(
                "https://employee-hub-server.onrender.com/api/setting/change-password",
                setting,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
                setError("");
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            }
          }
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>

            {/* Department name */}
            <div>
                <label className="text-sm font-medium text-gray-700">
                     Old Password
                </label>
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Change Password"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>

            <button
                type="submit"
                className="bg-[#0A5EB0] text-white py-2 px-4 mt-6 rounded-md hover:bg-[#4CC9FE]"
            >
                Change Password
            </button>
            </form>

        </div>
    )
};


export default Setting