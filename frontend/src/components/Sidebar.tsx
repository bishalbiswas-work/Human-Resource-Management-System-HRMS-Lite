import { LayoutDashboard, Users, CalendarCheck } from "lucide-react";

interface SidebarProps {
    currentWindow: string;
    setView: (view: string) => void;
}

const Sidebar = ({ currentWindow, setView }: SidebarProps) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    ];

    return (
        <aside className="w-64 h-full bg-gray-50/50 border-r border-gray-100 p-6">
            <div className="mb-6 px-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</span>
            </div>
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${currentWindow === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar