import { useEffect, useState } from "react";

interface Employee {
    employee_id: string;
    full_name: string;
    email: string;
    department: string;
}

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState<Employee[]>([
        {
            employee_id: "EMP001",
            full_name: "Rahul Sharma",
            email: "rahul.sharma@company.com",
            department: "Engineering",
        },
        {
            employee_id: "EMP002",
            full_name: "Ananya Verma",
            email: "ananya.verma@company.com",
            department: "HR",
        },
        {
            employee_id: "EMP003",
            full_name: "Amit Gupta",
            email: "amit.gupta@company.com",
            department: "Finance",
        },
        {
            employee_id: "EMP004",
            full_name: "Priya Singh",
            email: "priya.singh@company.com",
            department: "Marketing",
        },
    ]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dept, setDept] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    // Dummy handlers (so component works without backend)
    const handleAdd = (e: FormEvent) => {
        e.preventDefault();
        const newEmployee: Employee = {
            employee_id: id,
            full_name: name,
            email: email,
            department: dept,
        };

        setEmployees((prev) => [...prev, newEmployee]);
        setId("");
        setName("");
        setEmail("");
        setDept("");
        setIsAdding(false);
    };

    const handleDelete = (empId: string) => {
        setEmployees((prev) => prev.filter((emp) => emp.employee_id !== empId));
    };
    return (
        <div>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                    >
                        {isAdding ? 'Close Form' : 'Add Employee'}
                    </button>
                </div>

                {isAdding && (
                    <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Employee ID (e.g. EMP001)" className="p-2 border rounded" required />
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="p-2 border rounded" required />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="p-2 border rounded" required />
                            <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="Department" className="p-2 border rounded" required />
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700">Save Employee</button>
                    </form>
                )}

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">No employees found. Add one to get started!</td>
                                </tr>
                            ) : (
                                employees.map(emp => (
                                    <tr key={emp.employee_id} className="border-b last:border-0 hover:bg-gray-50 transition-all">
                                        <td className="px-6 py-4 font-mono text-xs">{emp.employee_id}</td>
                                        <td className="px-6 py-4 font-semibold">{emp.full_name}</td>
                                        <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{emp.department}</td>
                                        <td className="px-6 py-4">
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeManagement