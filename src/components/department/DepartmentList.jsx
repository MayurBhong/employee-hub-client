import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDepartmentDelete =  () => {
        fetchDepartments();
    }
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get("https://employee-hub-server-production.up.railway.app/api/department",{
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if(response.data.success) {
                    let sno = 1;
                    const data = await response.data.departments.map((dep) => (
                        {
                            _id: dep._id,
                            sno: sno++,
                            dep_name: dep.dep_name,
                            action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
                        }
                    ));
                    setDepartments(data);
                    setFilteredDepartments(data);
                }
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };
    

    useEffect(() => {
       fetchDepartments();
    }, []);

    const filterDepartments = async (e) => {
      const records = departments.filter((dep) => 
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()));  
      setFilteredDepartments(records);
    }

    return (
        <>{depLoading ? <div>Loading...</div> :
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input 
                   type="text" 
                   placeholder='Search By Dep Name' 
                   className='px-4 py-0.5 border border-[#0A5EB0] rounded-md'
                   onChange={filterDepartments}
                />
                <Link 
                   to="/admin-dashboard/add-department" 
                   className='px-4 py-1 bg-[#0A5EB0] text-white rounded hover:bg-[#4CC9FE]'
                >
                    Add New Department
                </Link>
            </div>

            <div className='mt-5'>
                <DataTable columns={columns} data={filteredDepartments} pagination/>
            </div>

        </div>
        }</>
    );
};   

export default DepartmentList