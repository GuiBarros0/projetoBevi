import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/logo.svg?react';
import { User } from 'lucide-react';
import { UserContext } from '../UserContext';
import Sair from '../Assets/sair.svg?react';

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  return (
    <header className="shadow-md fixed w-full z-50 bg-white top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 ">
        <Link to="/" aria-label="Logo sports - home">
          <Logo className="h-8 w-auto" />
        </Link>

        {data ? (
          <div className="flex items-center gap-4 ">
            <Link to="/user">
              <span className="text-gray-800 font-medium">{data.name}</span>
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-800 hover:text-red-950 bg-red-100 rounded-lg px-3 py-1 hover:bg-red-200 transition-all duration-200">
                <Sair className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
            <span>Login</span>
            <User className="h-5 w-5" />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
