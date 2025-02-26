import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const Table = () => {

    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(
                "https://employee-hub-server.onrender.com/api/leave",
                {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.data.success) {
                let sno = 1;
                const data = await response.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,
                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days:
                            new Date(leave.endDate).getDate() -
                            new Date(leave.startDate).getDate(),
                        status: leave.status,
                        action: (<LeaveButtons Id={leave._id} />),
                    }
                ));
                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLeaves(data);
    };

    const filterByButton = (status) => {
        const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()));
        setFilteredLeaves(data);
    };

    return (
    <>
        {filteredLeaves ? (
        <div className="p-6">         
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search By Emp ID"
                    className="px-4 py-0.5 border border-[#0A5EB0] rounded"
                    onChange={filterByInput}
                />

                <div className="space-x-3">
                    <button 
                      className="bg-[#0A5EB0] text-white px-4 py-1 rounded hover:bg-[#3674B5]"
                      onClick={() => filterByButton("Pending")}>
                        Pending
                    </button>

                    <button 
                      className="bg-[#0A5EB0] text-white px-4 py-1 rounded hover:bg-[#3674B5]"
                      onClick={() => filterByButton("Approved")}>
                        Approved
                    </button>

                    <button 
                      className="bg-[#0A5EB0] text-white px-4 py-1 rounded hover:bg-[#3674B5]"
                      onClick={() => filterByButton("Rejected")}>
                        Rejected
                    </button>

                </div>
            </div>

            <div className="mt-6">
              <DataTable columns={columns} data={filteredLeaves} pagination/>
            </div>
        </div>
        ) : <div>Loading...</div>}
    </>
    );
};

export default Table;