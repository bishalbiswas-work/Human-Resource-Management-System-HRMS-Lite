import { LayoutDashboard, User } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="h-16 px-8 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between shadow-sm shadow-gray-50/50">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">HRMS Lite</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-1">
                    <span className="text-sm font-semibold text-gray-800">Admin User</span>
                    <span className="text-[10px] text-gray-400 font-medium">Administrator</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                    <User className="w-6 h-6" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
