import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/user/edit':
        setTitle('Editar Produto');
        break;
      case '/user/post':
        setTitle('Postar Produtos');
        break;
      default:
        setTitle('Meus Produtos');
    }
  }, [location]);

  return (
    <header className="anime-left grid grid-cols-2 items-center mb-8 relative ">
      <h1 className="text-5xl spectral-bold relative my-4 mx-0">
        <span className="relative z-10">{title}</span>
        <span
          className="
    block w-6 h-6 bg-blue-500
    absolute bottom-2 left-0
    rounded-md z-0
  "
        ></span>
      </h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
