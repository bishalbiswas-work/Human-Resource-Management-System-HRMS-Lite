import { useState, useEffect, FormEvent } from 'react';

interface Employee {
    employee_id: string;
    full_name: string;
    email: string;
    department: string;
}

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // form state
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dept, setDept] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // fetch employees on mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/employees/');
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setEmployees(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: FormEvent) => {
        e.preventDefault();
        const newEmp = {
            employee_id: id,
            full_name: name,
            email: email,
            department: dept
        };

        try {
            const res = await fetch('http://localhost:8000/employees/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEmp)
            });

            if (!res.ok) {
                const errData = await res.json();
                alert(errData.detail || 'Error adding employee');
                return;
            }

            // reset form and refresh list
            setId(''); setName(''); setEmail(''); setDept('');
            setIsAdding(false);
            fetchEmployees();
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleDelete = async (empId: string) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;

        try {
            const res = await fetch(`http://localhost:8000/employees/${empId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchEmployees();
            } else {
                alert('Delete failed');
            }
        } catch (err) {
            alert('Error deleting');
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-400">Loading employees...</div>;
    if (error) return <div className="p-10 text-center text-red-400">Error: {error}</div>;

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
                                            <button onClick={() => handleDelete(emp.employee_id)} className="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
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