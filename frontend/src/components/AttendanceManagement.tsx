import(useEffect, useState) from "react";

interface Employee {
    employee_id: string;
    full_name: string;
    department: string;
}
interface Attendance {
    employee_id: string;
    date: string;
    status: string;
}
const AttendanceManagement = () => {
    return (
        <div>
            <h1>Attendance Management</h1>
        </div>
    )
}

export default AttendanceManagement
