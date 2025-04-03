import React from 'react';
import { X, Save } from 'lucide-react';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_PUT } from '../../api';
import Error from '../ElementInterface/Error';

const FeedModalEdit = ({ product, onClose, onSuccess }) => {
  const name = useForm('', product.name);
  const description = useForm('', product.description);
  const price = useForm('number', product.price);
  const status = useForm('numeric', product.status);
  const stock_quantity = useForm('number', product.stock_quantity);
  const { loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    // Valida todos os campos
    if (!name.validate() || !description.validate() || !price.validate() || !status.validate() || !stock_quantity.validate()) return;

    const token = window.localStorage.getItem('token');
    if (!token) return;

    const { url, options } = PRODUCT_PUT(token, product.id, {
      name: name.value,
      description: description.value,
      price: Number(price.value),
      status: Number(status.value),
      stock_quantity: Number(stock_quantity.value),
    });

    const { response } = await request(url, options);

    if (response.ok) {
      onSuccess(); // Atualiza a lista
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Nome*</label>
              <input type="text" value={name.value} onChange={name.onChange} onBlur={name.onBlur} className="w-full px-3 py-2 border rounded-md" />
              {name.error && <p className="text-red-500 text-sm">{name.error}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Descrição*</label>
              <textarea value={description.value} onChange={description.onChange} onBlur={description.onBlur} className="w-full px-3 py-2 border rounded-md" rows="3" />
              {description.error && <p className="text-red-500 text-sm">{description.error}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Preço*</label>
                <input type="number" step="0.01" min="0" value={price.value} onChange={price.onChange} onBlur={price.onBlur} className="w-full px-3 py-2 border rounded-md" />
                {price.error && <p className="text-red-500 text-sm">{price.error}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Estoque*</label>
                <input type="number" min="0" value={stock_quantity.value} onChange={stock_quantity.onChange} onBlur={stock_quantity.onBlur} className="w-full px-3 py-2 border rounded-md" />
                {stock_quantity.error && <p className="text-red-500 text-sm">{stock_quantity.error}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Status*</label>
              <select value={status.value} onChange={status.onChange} onBlur={status.onBlur} className="w-full px-3 py-2 border rounded-md">
                <option value="1">Disponível</option>
                <option value="2">Reposição</option>
                <option value="3">Esgotado</option>
              </select>
              {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading} className={`flex items-center gap-2 px-4 py-2 rounded-md ${loading ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
            <Save size={18} />
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          {error && <Error error={error} className="mt-2" />}
        </form>
      </div>
    </div>
  );
};

export default FeedModalEdit;
