import { useEffect, useState } from "react";

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
    const [employees] = useState<Employee[]>([
        { employee_id: "EMP001", full_name: "Rahul Sharma", department: "Engineering" },
        { employee_id: "EMP002", full_name: "Ananya Verma", department: "HR" },
        { employee_id: "EMP003", full_name: "Amit Gupta", department: "Finance" },
        { employee_id: "EMP004", full_name: "Priya Singh", department: "Marketing" },
    ]);

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [attendance, setAttendance] = useState<{
        [date: string]: { [empId: string]: Status };
    }>({});

    const getStatus = (empId: string): Status => {
        return attendance[selectedDate]?.[empId] || "Not Marked";
    };

    const markAttendance = (empId: string, status: Status) => {
        setAttendance((prev) => ({
            ...prev,
            [selectedDate]: {
                ...prev[selectedDate],
                [empId]: status,
            },
        }));
    };
    return (
        <div>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Mark daily attendance for all employees</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                        <span className="text-sm font-bold text-gray-600">Date:</span>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="p-1 border rounded text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Current Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => {
                                const status = getStatus(emp.employee_id);
                                return (
                                    <tr key={emp.employee_id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{emp.full_name}</div>
                                            <div className="text-xs text-gray-500">{emp.department}</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-600">{emp.employee_id}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${status === 'Present' ? 'bg-green-100 text-green-700' :
                                                status === 'Absent' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => markAttendance(emp.employee_id, 'Present')}
                                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${status === 'Present' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    onClick={() => markAttendance(emp.employee_id, 'Absent')}
                                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${status === 'Absent' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    Absent
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {employees.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">No employees found. Go to Employee Management to add some!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AttendanceManagement
