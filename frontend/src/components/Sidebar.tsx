interface SidebarProps {
    currentWindow: string;
    setView: (view: string) => void;
}

const Sidebar = () => {
    return (
        <>
            <aside className="w-56 h-screen bg-gray-50 border-r border-gray-200 p-4">
                <ul className="space-y-1">
                    <li className="px-4 py-2 rounded-md shadow-sm text-sm font-medium cursor-pointer transition-all bg-white text-blue-600 border border-gray-100">
                        Overview
                    </li>
                    <li className="px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all text-gray-600 hover:bg-gray-100">
                        Employees
                    </li>
                    <li className="px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all text-gray-600 hover:bg-gray-100">
                        Attendance
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar