interface SidebarProps {
    currentWindow: string;
    setView: (view: string) => void;
}

const Sidebar = ({ currentWindow, setView }: SidebarProps) => {
    return (
        <>
            <aside className="w-56 h-screen bg-gray-50 border-r border-gray-200 p-4">
                <ul className="space-y-1">
                    <li
                        onClick={() => setView('dashboard')}
                        className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium cursor-pointer transition-all ${currentView === 'dashboard' ? 'bg-white text-blue-600 border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Dashboard
                    </li>
                    <li
                        onClick={() => setView('employees')}
                        className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${currentView === 'employees' ? 'bg-white text-blue-600 border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Employees
                    </li>
                    <li
                        onClick={() => setView('attendance')}
                        className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${currentView === 'attendance' ? 'bg-white text-blue-600 border border-gray-100' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Attendance
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar