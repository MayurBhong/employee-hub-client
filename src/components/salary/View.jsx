import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {

    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;
    const {user} = useAuth();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`https://employee-hub-server.onrender.com/api/salary/${id}/${user.role}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) => 
            leave.employeeId.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
        setFilteredSalaries(filteredRecords);
    }

    return (
        <>
          {filteredSalaries === null ? (
            <div>Loading ...</div>
          ) : (
            <div className="overflow-x-auto p-5">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        Salary History
                    </h2>
                </div>
                <div className="flex justify-end">
                    <input 
                      type="text" 
                      placeholder="Search"
                      className="px-4 py-0.5 border border-[#0A5EB0] rounded-md" 
                      onChange={filterSalaries} 
                    />
                </div>

                {filteredSalaries.length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 mt-4">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                            <tr>
                                <th className="px-6 py-3">SNo</th>
                                <th className="px-6 py-3">Emp ID</th>
                                <th className="px-6 py-3">Salary</th>
                                <th className="px-6 py-3">Allowance</th>
                                <th className="px-6 py-3">Deduction</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Pay Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salary) => (
                                <tr 
                                  key={salary._id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  
                                >
                                    <td className="px-6 py-3">{sno++}</td>
                                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                    <td className="px-6 py-3">{salary.basicSalary}</td>
                                    <td className="px-6 py-3">{salary.allowances}</td>
                                    <td className="px-6 py-3">{salary.deductions}</td>
                                    <td className="px-6 py-3">{salary.netSalary}</td>
                                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <div>No Records</div>}
            </div>
            )}
        </>
    );
};  

export default View;