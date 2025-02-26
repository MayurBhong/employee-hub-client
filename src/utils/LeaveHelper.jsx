import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No.",
        selector: (row) => row.sno,    
        width: "70px"
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "140px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "160px",
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "160px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "180px",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "100px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "150px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true",
    },
];

export const LeaveButtons = ({Id}) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };

    return (
        <button 
          className="bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-600 rounded-lg"
          onClick={() => handleView(Id)}
        >
            View
        </button>
    );
}