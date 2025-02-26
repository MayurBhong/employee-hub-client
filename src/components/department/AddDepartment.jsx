import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://employee-hub-server.onrender.com/api/department/add", department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-2xl font-bold mb-6'>Add Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label 
                      htmlFor="dep_name"
                      className='text-sm font-medium text-gray-700'
                      >
                        Department Name
                    </label>
                    <input 
                      type="text"
                      name="dep_name" 
                      onChange={handleChange}
                      placeholder='Enter Department Name'
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                      />
                </div>

                <div className='mt-3'>
                    <label 
                      htmlFor="description"
                      className='block text-sm font-medium text-gray-700'
                      >
                        Description
                    </label>
                    <textarea 
                      name="description" 
                      placeholder='Description'
                      onChange={handleChange}
                      className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                      rows="4"
                    />
                </div>

                <button
                  type='submit'
                  className="w-full mt-6 bg-[#0A5EB0] hover:bg-[#4CC9FE] text-white font-bold py-2 px-4 rounded"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};   

export default AddDepartment