import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const NavBar = () => {
  const { role, loginAsUser, loginAsAdmin, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Provider Directory
        </Link>
        <div className="flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `text-gray-600 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`}>Contact</NavLink>
          {role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 ${isActive ? 'font-semibold ring-2 ring-blue-400' : ''}`}>
              <Shield className="h-4 w-4 mr-2" />
              Admin Area
            </NavLink>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {role ? (
            <Button onClick={logout} variant="outline">Logout</Button>
          ) : (
            <>
              <Button onClick={loginAsUser} variant="outline" size="sm">Login as User</Button>
              <Button onClick={loginAsAdmin} variant="outline" size="sm">Login as Admin</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;