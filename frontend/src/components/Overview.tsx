import { useState, useEffect } from 'react';


const Overview = () => {
    const [stats, setStats] = useState({ employees: 0, attendance: 0 });

    useEffect(() => {
        // quick fetch for some stats
        const fetchStats = async () => {
            try {
                const empRes = await fetch('http://localhost:8000/employees/');
                const emps = await empRes.json();

                const date = new Date().toISOString().split('T')[0];
                const attRes = await fetch(`http://localhost:8000/attendance/?date=${date}`);
                const atts = await attRes.json();

                setStats({
                    employees: emps.length,
                    attendance: atts.length
                });
            } catch (err) {
                console.error("Stats fetch error", err);
            }
        };
        fetchStats();
    }, []);
    return (
        <>
            <main className="flex-1 p-10 overflow-y-auto bg-slate-50/50">
                <div className="max-w-4xl mx-auto space-y-8 animate-fade">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">HRMS Dashboard</h1>
                        <p className="text-slate-500 font-medium">Quick overview of your organization status today.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <p className="text-sm font-bold text-slate-400 uppercase mb-2">Total Employees</p>
                            <p className="text-5xl font-black text-blue-600"> {stats.employees}</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <p className="text-sm font-bold text-slate-400 uppercase mb-2">Attendance Marked Today</p>
                            <p className="text-5xl font-black text-green-600">{stats.attendance}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Shortcuts</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm font-medium">
                            <div className="p-4 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 italic">
                                Tip: Don't forget to mark attendance for new employees!
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Overview