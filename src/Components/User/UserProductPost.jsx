import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Error from '../ElementInterface/Error.jsx';
import { PRODUCT_POST } from '../../api';
import { CheckCircle } from 'lucide-react';

const UserProductPost = () => {
  const name = useForm();
  const description = useForm();
  const price = useForm('number');
  const status = useForm('numeric');
  const stock_quantity = useForm('number');
  const { error, loading, request } = useFetch();
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const isNameValid = name.validate();
    const isDescriptionValid = description.validate();
    const isPriceValid = price.validate();
    const isStatusValid = status.validate();
    const isStockValid = stock_quantity.validate();

    if (!isNameValid || !isDescriptionValid || !isPriceValid || !isStatusValid || !isStockValid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('price', Number(price.value));
    formData.append('status', Number(status.value));
    formData.append('stock_quantity', Number(stock_quantity.value));

    const token = window.localStorage.getItem('token');
    if (token) {
      const { url, options } = PRODUCT_POST(token, formData);
      const { response } = await request(url, options);

      if (response && response.ok) {
        // Limpa os campos
        name.setValue('');
        description.setValue('');
        price.setValue('');
        status.setValue('');
        stock_quantity.setValue('');

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    }
  }

  return (
    <>
      <section className="anime-left mb-8 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="space-y-4">
            <Input label={'Nome*'} type="text" name="name" {...name} required />
            <Input label={'Descrição*'} type="text" name="description" {...description} required />
            <Input label={'Preço*'} type="number" name="price" {...price} required />
            <Input label={'Status*'} type="number" name="status" {...status} required placeholder={'1 - estoque, 2 - reposição, 3 - falta'} />
            <Input label={'Quantidade no estoque*'} type="number" name="stock_quantity" {...stock_quantity} required />
          </div>
          <div className="mt-6">
            {loading ? (
              <Button isDisabled={true} className="w-full">
                Enviando...
              </Button>
            ) : (
              <Button isDisabled={false} className="w-full">
                Enviar
              </Button>
            )}
            {error && <Error error={error} className="mt-4" />}
          </div>
        </form>
      </section>

      {/* Modal de sucesso  */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Produto cadastrado!</h3>
            <p className="text-gray-600 mb-4">O produto foi cadastrado com sucesso no sistema.</p>
            <button onClick={() => setSuccess(false)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProductPost;
