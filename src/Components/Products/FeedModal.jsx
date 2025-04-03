import React, { useRef, useEffect, useState } from 'react';
import { X, Trash2, Check } from 'lucide-react';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_DELETE } from '../../api';

const FeedModal = ({ product, onClose }) => {
  const { loading, error, request } = useFetch();
  const modalRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fecha modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  async function handleDelete() {
    setShowConfirm(true);
  }

  async function confirmDelete(confirmed) {
    setShowConfirm(false);
    if (!confirmed) return;

    const token = window.localStorage.getItem('token');
    if (!token) return;

    const { url, options } = PRODUCT_DELETE(token, product.id);
    const { response } = await request(url, options);

    if (response.ok) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        window.location.reload();
      }, 1500);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <div className="flex items-start mb-2">
          <h2 className="text-2xl font-bold pr-8">{product.name}</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">ID: {product.id}</span>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-500">Preço:</p>
            <p className="text-lg font-semibold">R$ {product.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Estoque:</p>
            <p className="text-lg font-semibold">{product.stock_quantity} unidades</p>
          </div>
        </div>

        <button onClick={handleDelete} disabled={loading} className={`flex items-center gap-2 px-4 py-2 rounded-md ${loading ? 'bg-gray-300' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}>
          <Trash2 size={18} />
          {loading ? 'Excluindo...' : 'Excluir Produto'}
        </button>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        {/* Modal de confirmação */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirmar exclusão</h3>
              <p className="mb-6">
                Tem certeza que deseja excluir "{product.name}" (ID: {product.id})?
              </p>

              <div className="flex justify-end gap-3">
                <button onClick={() => confirmDelete(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => confirmDelete(true)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de sucesso */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
              <div className="flex justify-center mb-4">
                <Check className="text-green-500" size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2">Produto excluído com sucesso!</h3>
              <p className="text-gray-600">"{product.name}" foi removido do sistema.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedModal;
