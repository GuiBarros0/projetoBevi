import '@testing-library/jest-dom';

// Mock dos componentes e hooks
vi.mock('../../Hooks/useForm', () => ({
  default: () => ({
    value: '',
    onChange: vi.fn(),
    validate: () => true,
    error: null,
  }),
}));

vi.mock('../../Hooks/useFetch', () => ({
  default: () => ({
    loading: false,
    error: null,
    request: vi.fn(),
  }),
}));

test('Renderiza o modal de edição', () => {
  const mockProduct = {
    id: 1,
    name: 'Produto Teste',
    description: 'Descrição teste',
    price: 10.99,
    status: 1,
    stock_quantity: 100,
  };
});
