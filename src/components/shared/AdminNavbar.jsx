import { useSelector } from "react-redux";
import { FaAccessibleIcon, FaArrowCircleLeft, FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleToHome = () => {
    navigate("/admin/dashboard");
  }

  return (
    <header className="sticky  top-0 z-[100] bg-white border-b-2 border-indigo-200">
      <div className="max-w-full px-4 md:px-6 h-17 flex items-center justify-between">
        {/* Left: Sidebar toggle & Title */}
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle */}
      
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="-m-2.5 text-gray-700 xl:hidden p-4 hover:cursor-pointer"
          >
            <span className="sr-only">
              {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            </span>
            <div className="duration ease-in-out delay-500">
                {sidebarOpen ? (
              <FaArrowLeft className="text-slate-800 text-2xl" />
            ) : (
              <FaBars className="text-slate-800 text-2xl" />
            )}
            </div>
          
          </button>

          <button onClick={handleToHome} className="text-lg hover:cursor-pointer font-semibold text-gray-800 tracking-tight hidden sm:block">
            Dashboard
          </button>
        </div>

        {/* Right: User profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "admin@example.com"}
            </p>
          </div>

          <div className="relative">
            {/* You can replace with dropdown */}
            <div className="w-10 h-10 animate-pulse bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold uppercase">
              {user.name?.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
