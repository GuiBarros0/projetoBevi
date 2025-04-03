import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('renderiza o componente App com link Home', () => {
  render(<App />);
  const acessLogin = screen.getByText('Acessar Login');
  expect(acessLogin).toBeInTheDocument();
});

test('navega para a página de Login', () => {
  render(<App />);
  const loginLink = screen.getByText('Login');
  fireEvent.click(loginLink);
});

test('tenta acessar rota protegida sem autenticação', () => {
  render(<App />);
  // Deve redirecionar para login quando não autenticado
  expect(screen.getByText('Entrar')).toBeInTheDocument();
});
