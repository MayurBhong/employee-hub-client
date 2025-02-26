import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://employee-hub-server.onrender.com/api/auth/login", { email, password });
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate("/admin-dashboard")
                } else {
                    navigate("/employee-dashboard")
                }
            }

        } catch (error) {
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error Link not verfied");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-[#0A5EB0] from-50% to-white to-50% space-y-6">
            <h2 className="font-sevillana text-3xl text-white">
                Employee Management System
            </h2>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-blod mb-4">Login</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor='email' className="block text-gray-700">Email</label>
                        <input type="email" className="w-full px-3 py-2 border" placeholder="Enter your email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor='password' className="block text-gray-700">Password</label>
                        <input type="password" className="w-full px-3 py-2 border" placeholder="*****" 
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" /> 
                            <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="text-[#5DADE2] hover:text-[#3498DB]">Forgot password?</a>
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="w-full bg-[#0A5EB0] text-white py-2 hover:bg-[#3498DB]">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login