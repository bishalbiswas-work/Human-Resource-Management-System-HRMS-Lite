import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import EmployeeManagement from "./EmployeeManagement";
import AttendanceManagement from "./AttendanceManagement";


const Dashboard = () => {
    const [currentWindow, setCurrentWindow] = useState("overview");
    const renderView = () => {
        switch (currentWindow) {
            case "overview":
                return <Overview />;
            case "employees":
                return <EmployeeManagement />;
            case "attendance":
                return <AttendanceManagement />;
            default:
                return <Overview />;
        }
    }
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar currentWindow={currentWindow} setView={setCurrentWindow} />
                <div className="flex-1 overflow-y-auto p-6">
                    {renderView()}
                </div>
            </div>

        </div>
    )
}

export default Dashboard