import { useState, useEffect, type FormEvent } from 'react';

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
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Employee Directory</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage and monitor all personnel details.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${isAdding
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95'
                        }`}
                >
                    {isAdding ? 'Close Form' : 'Add New Employee'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-[2rem] border border-gray-100 mb-10 shadow-xl shadow-gray-100/50 space-y-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Employee ID</label>
                            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. EMP001" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-400 outline-none transition-all" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and Last name" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-400 outline-none transition-all" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@company.com" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-400 outline-none transition-all" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Department</label>
                            <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="e.g. Engineering" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-400 outline-none transition-all" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full md:w-auto px-10 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95">
                        Register Employee
                    </button>
                </form>
            )}

            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">ID Number</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Full Name</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Contact</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Department</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-16 text-center text-gray-400 italic font-medium">No records found. Get started by adding your first employee.</td>
                            </tr>
                        ) : (
                            employees.map(emp => (
                                <tr key={emp.employee_id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="px-8 py-5 font-mono text-xs font-bold text-gray-400">{emp.employee_id}</td>
                                    <td className="px-8 py-5 font-bold text-gray-900">{emp.full_name}</td>
                                    <td className="px-8 py-5 text-gray-500 font-medium">{emp.email}</td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 group-hover:bg-white transition-colors">{emp.department}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button onClick={() => handleDelete(emp.employee_id)} className="text-red-400 hover:text-red-600 text-xs font-black uppercase tracking-wider transition-colors">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeManagement