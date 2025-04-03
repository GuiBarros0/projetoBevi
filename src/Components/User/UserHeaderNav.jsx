import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import ProductsList from '../../Assets/productsList.svg?react';
import Estatisticas from '../../Assets/estatisticas.svg?react';
import Adicionar from '../../Assets/adicionar.svg?react';

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null);

  return (
    <div className="flex justify-end">
      <nav className="grid grid-cols-3 gap-6  p-1 rounded-lg">
        <NavLink to={'/user'} className="user-nav" end>
          <ProductsList />
          {mobile && <span className="ml-2">Meus Produtos</span>}
        </NavLink>

        <NavLink to={'/user/edit'} className="user-nav">
          <Estatisticas />
          {mobile && <span className="ml-2">Editar produto</span>}
        </NavLink>

        <NavLink to={'/user/post'} className="user-nav">
          <Adicionar />
          {mobile && <span className="ml-2">Adicionar Produto</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default UserHeaderNav;
