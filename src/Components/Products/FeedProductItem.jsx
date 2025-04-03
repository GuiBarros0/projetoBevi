import React from 'react';

const FeedProductItem = ({ product, setModalProduct }) => {
  // Função para determinar o estilo do status
  const getStatusStyle = (status) => {
    switch (status) {
      case 1:
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Ativo' };
      case 2:
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Reposição' };
      case 3:
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Falta' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Desconhecido' };
    }
  };

  const statusStyle = getStatusStyle(product.status);

  function handleClick() {
    setModalProduct(product);
  }

  return (
    <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-4 border border-blue-200 hover:border-blue-800 cursor-pointer" onClick={handleClick}>
      <div className="p-6 ">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}>{statusStyle.label}</span>
        </div>
        {product.description && <p className="text-gray-600 mb-4">{product.description}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500 font-medium">Preço</p>
            <p className="text-lg font-semibold text-blue-600">R$ {product.price.toFixed(2)}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500 font-medium">Estoque</p>
            <p className={`text-lg font-semibold ${product.stock_quantity > 10 ? 'text-green-600' : product.stock_quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>{product.stock_quantity} un.</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Status atual:{' '}
            <span className={`font-medium ${statusStyle.text}`}>
              {statusStyle.label} - {product.status === 1 ? 'Disponível para venda' : product.status === 2 ? 'Em reposição (estoque baixo)' : 'Esgotado (sem estoque)'}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default FeedProductItem;
