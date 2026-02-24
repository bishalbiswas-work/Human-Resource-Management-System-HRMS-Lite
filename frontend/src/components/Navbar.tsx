const Navbar = () => {
    return (
        <>
            <nav className="h-14 px-6 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">HRMS Lite</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Admin User</span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200" />
                </div>
            </nav>
        </>
    )
}

export default Navbar
