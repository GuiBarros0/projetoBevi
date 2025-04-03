import React from 'react';
import { render } from '@testing-library/react';
import { UserStorage } from '../src/UserContext';

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
global.localStorage = localStorageMock;

test('renderiza os filhos e fornece contexto', () => {
  const { getByText } = render(
    <UserStorage>
      <div>Teste Child</div>
    </UserStorage>
  );

  // Verifica se renderiza os children
  expect(getByText('Teste Child')).toBeInTheDocument();
});
