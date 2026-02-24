import { useState, useEffect } from 'react';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Overview = () => {
    const [stats, setStats] = useState({ employees: 0, attendance: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const empRes = await fetch(`${API_BASE_URL}/employees/`);
                const emps = await empRes.json();

                const date = new Date().toISOString().split('T')[0];
                const attRes = await fetch(`${API_BASE_URL}/attendance/?date=${date}`);
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
        <div className="max-w-5xl mx-auto space-y-10 animate-fade pb-12">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Overview Dashboard</h1>
                <p className="text-gray-500 font-medium">Monthly performance and today's activity snapshot.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/50 transition-all group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                            <Users className="w-8 h-8" />
                        </div>
                        <ArrowRight className="text-gray-200 group-hover:text-blue-200 transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Employees</p>
                    <p className="text-6xl font-black text-gray-900 tracking-tighter">{stats.employees}</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-50/50 transition-all group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-green-50 rounded-2xl text-green-600 group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <ArrowRight className="text-gray-200 group-hover:text-green-200 transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Marked Today</p>
                    <p className="text-6xl font-black text-gray-900 tracking-tighter">{stats.attendance}</p>
                </div>
            </div>

            <div className="bg-gray-900 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">System Notification</h3>
                        <p className="text-gray-400 font-medium leading-relaxed max-w-md">
                            Don't forget to review the attendance records for the new onboarding session today.
                        </p>
                    </div>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
                        Dismiss Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Overview