import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import EmployeeManagement from "./EmployeeManagement";
import AttendanceManagement from "./AttendanceManagement";


const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard