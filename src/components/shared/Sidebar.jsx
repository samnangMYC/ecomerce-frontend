
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaChartBar,
  FaCube,
  FaThLarge,
  FaUserFriends,
  FaTools,
  FaSignOutAlt,
  FaShoppingCart
} from 'react-icons/fa';



const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const currentPath = location.pathname;

const menuItems = [
  { label: 'Dashboard', icon: <FaChartBar />, path: '/admin/dashboard' },
    { label: 'Orders', icon: <FaShoppingCart />, path: '/admin/orders' },
  { label: 'Products', icon: <FaCube />, path: '/admin/products' },
  { label: 'Categories', icon: <FaThLarge />, path: '/admin/categories' },
  { label: 'Seller', icon: <FaUserFriends />, path: '/admin/seller' },
  { label: 'Settings', icon: <FaTools />, path: '/admin/settings' },
];

const navigate = useNavigate();
const navigateToHomePage = () => {
  navigate("/");
}

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-white to-gray-50 border-r-2 border-indigo-200 shadow-md fixed top-0 left-0 flex flex-col z-20">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <NavLink
              to={item.path}
              key={item.label}
              className={`flex items-center gap-4 px-4 py-3 mb-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer (Logout) */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={navigateToHomePage} // replace with your logout handler
          className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg w-full transition"
        >
          <FaSignOutAlt className="text-base" />
          Go to HomePage
        </button>
        <p className="text-xs text-gray-400 mt-4 text-center">
          © {new Date().getFullYear()} E-Shop Admin
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
