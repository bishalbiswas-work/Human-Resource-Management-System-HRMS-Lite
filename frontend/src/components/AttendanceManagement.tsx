import { useEffect, useState } from "react";

interface Employee {
    employee_id: string;
    full_name: string;
    department: string;
}
interface AttendanceRecord {
    employee_id: string;
    date: string;
    status: string;
}
const AttendanceManagement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const [empRes, attRes] = await Promise.all([
                    fetch('http://localhost:8000/employees/'),
                    fetch(`http://localhost:8000/attendance/?date=${selectedDate}`)
                ]);

                const emps = await empRes.json();
                const atts = await attRes.json();

                setEmployees(emps);
                setAttendanceRecords(atts);
            } catch (err) {
                console.error("Error loading attendance data", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [selectedDate]);

    const markAttendance = async (empId: string, status: string) => {
        try {
            const res = await fetch('http://localhost:8000/attendance/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employee_id: empId,
                    date: selectedDate,
                    status: status
                })
            });

            if (res.ok) {
                const updated = await res.json();
                setAttendanceRecords(prev => {
                    const filtered = prev.filter(r => r.employee_id !== empId);
                    return [...filtered, updated];
                });
            } else {
                alert('Failed to mark attendance');
            }
        } catch (err) {
            alert('Error connecting to server');
        }
    };

    const getStatus = (empId: string) => {
        const record = attendanceRecords.find(r => r.employee_id === empId);
        return record ? record.status : 'Not Marked';
    };

    if (loading) return <div className="p-10 text-center text-gray-400">Loading attendance data...</div>;

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Attendance Tracking</h1>
                    <p className="text-gray-500 font-medium mt-1">Monitor daily presence and absence logs.</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 p-2 pl-4 rounded-2xl shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Date</span>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="p-2 px-3 border border-gray-100 rounded-xl text-sm font-bold bg-gray-50 outline-none focus:bg-white focus:border-blue-400 transition-all cursor-pointer"
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Employee Details</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">ID Number</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none text-center">Current Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {employees.map(emp => {
                            const status = getStatus(emp.employee_id);
                            return (
                                <tr key={emp.employee_id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-gray-900">{emp.full_name}</div>
                                        <div className="text-xs text-gray-400 font-semibold">{emp.department}</div>
                                    </td>
                                    <td className="px-8 py-5 font-mono text-xs font-bold text-gray-400">{emp.employee_id}</td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Present' ? 'bg-emerald-50 text-emerald-600' :
                                                status === 'Absent' ? 'bg-rose-50 text-rose-600' :
                                                    'bg-gray-50 text-gray-400'
                                            }`}>
                                            {status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => markAttendance(emp.employee_id, 'Present')}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Present'
                                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                                                        : 'bg-white border border-gray-100 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-sm'
                                                    }`}
                                            >
                                                Present
                                            </button>
                                            <button
                                                onClick={() => markAttendance(emp.employee_id, 'Absent')}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Absent'
                                                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-100'
                                                        : 'bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-200 hover:shadow-sm'
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
                                <td colSpan={4} className="px-8 py-16 text-center text-gray-400 italic font-medium">No employees found in the directory.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AttendanceManagement
