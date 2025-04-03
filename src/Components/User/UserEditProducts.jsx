import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input.jsx';
import Button from '../Forms/Button.jsx';
import useForm from '../../Hooks/useForm.jsx';
import useFetch from '../../Hooks/useFetch.jsx';
import Error from '../ElementInterface/Error.jsx';
import { PRODUCT_GET, PRODUCT_PUT, PRODUCT_GET_LIST } from '../../api.jsx';
import { CheckCircle, Search, ChevronLeft } from 'lucide-react';

const UserProductEdit = () => {
  const [step, setStep] = useState('list');
  const [success, setSuccess] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProductId, setCurrentProductId] = useState(null);

  // Formulário de edição com validações
  const name = useForm();
  const description = useForm();
  const price = useForm('number');
  const status = useForm('numeric');
  const stock_quantity = useForm('number');

  const { error, loading, request } = useFetch();

  // Busca todos os produtos - reutiliza request do useFetch
  const fetchProducts = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    const { url, options } = PRODUCT_GET_LIST(token);
    const { response, json } = await request(url, options);
    if (response.ok && json.data) setProductsList(json.data);
  };

  // Carrega produtos ao iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Seleciona produto para edição
  const handleSelectProduct = async (product) => {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    const { url, options } = PRODUCT_GET(token, product.id);
    const { response, json } = await request(url, options);

    if (response.ok && json.data) {
      const { name: pName, description: pDesc, price: pPrice, status: pStatus, stock_quantity: pStock } = json.data;

      name.setValue(pName);
      description.setValue(pDesc);
      price.setValue(pPrice);
      status.setValue(pStatus);
      stock_quantity.setValue(pStock);

      setCurrentProductId(product.id);
      setStep('edit');
    }
  };

  // Limpa todos os campos do formulário
  const resetForm = () => {
    name.setValue('');
    description.setValue('');
    price.setValue('');
    status.setValue('');
    stock_quantity.setValue('');
    setCurrentProductId(null);
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida todos os campos usando a função validate do useForm
    const isValid = [name, description, price, status, stock_quantity].map((field) => field.validate()).every(Boolean);

    if (!isValid) return;

    const token = window.localStorage.getItem('token');
    if (!token) return;

    const { url, options } = PRODUCT_PUT(token, currentProductId, {
      name: name.value,
      description: description.value,
      price: Number(price.value),
      status: Number(status.value),
      stock_quantity: Number(stock_quantity.value),
    });

    const { response } = await request(url, options);

    if (response.ok) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        resetForm();
        fetchProducts(); // Atualiza a lista
        setStep('list'); // Volta para a lista
      }, 1500);
    }
  };

  // Filtra produtos
  const filteredProducts = productsList.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toString().includes(searchTerm));

  // Renderização da lista de produtos
  if (step === 'list') {
    return (
      <section className="anime-left mb-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="mb-4">
            <Input label="Buscar produto por nome ou ID" type="text" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Digite nome ou ID do produto" icon={<Search size={18} className="text-gray-400" />} />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 p-3 border-b border-gray-200 font-medium text-gray-600">
              <div className="col-span-1">ID</div>
              <div className="col-span-5">Nome</div>
              <div className="col-span-3">Preço</div>
              <div className="col-span-2">Estoque</div>
              <div className="col-span-1">Ação</div>
            </div>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-12 p-3 border-b border-gray-100 hover:bg-gray-50 items-center">
                  <div className="col-span-1 text-gray-600">{product.id}</div>
                  <div className="col-span-5 truncate">{product.name}</div>
                  <div className="col-span-3">R$ {product.price.toFixed(2)}</div>
                  <div className="col-span-2">{product.stock_quantity}</div>
                  <div className="col-span-1">
                    <button onClick={() => handleSelectProduct(product)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Editar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">Nenhum produto encontrado</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Renderiza formulário de edição
  return (
    <>
      <section className="anime-left mb-8 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setStep('list');
              }}
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
            >
              <ChevronLeft size={16} className="mr-1" />
              Voltar para lista
            </button>
            <h2 className="text-lg font-semibold">Editando produto ID: {currentProductId}</h2>
          </div>

          <div className="space-y-4">
            <Input label="Nome*" type="text" name="name" {...name} required />
            <Input label="Descrição*" type="text" name="description" {...description} required />
            <Input label="Preço*" type="number" name="price" {...price} required />
            <Input label="Status*" type="number" name="status" {...status} required placeholder="1 - estoque, 2 - reposição, 3 - falta" />
            <Input label="Quantidade no estoque*" type="number" name="stock_quantity" {...stock_quantity} required />
          </div>

          <div className="mt-6">
            <Button type="submit" isDisabled={loading} className="w-full">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>

          {error && <Error error={error} className="mt-4" />}
        </form>
      </section>

      {/* Modal de sucesso */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Produto atualizado!</h3>
            <p className="text-gray-600 mb-4">As alterações foram salvas com sucesso.</p>
            <button
              onClick={() => {
                setSuccess(false);
                resetForm();
                setStep('list');
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProductEdit;
