// api.test.js
import { API_URL, TOKEN_POST, USER_GET, PRODUCT_POST, PRODUCT_GET } from '../src/api';

test('configuração da URL base', () => {
  expect(API_URL).toBe('http://34.71.240.100/api');
});

test('configuração do TOKEN_POST', () => {
  const body = { email: 'test@test.com', password: '123456' };
  const config = TOKEN_POST(body);

  expect(config.url).toBe('http://34.71.240.100/api/auth/login');
  expect(config.options.method).toBe('POST');
  expect(config.options.headers['Content-Type']).toBe('application/json');
  expect(config.options.body).toBe(JSON.stringify(body));
});

test('configuração do USER_GET', () => {
  const token = 'token123';
  const config = USER_GET(token);

  expect(config.url).toBe('http://34.71.240.100/api/auth/me');
  expect(config.options.method).toBe('POST');
  expect(config.options.headers.Authorization).toBe('Bearer token123');
});

test('configuração do PRODUCT_POST', () => {
  const token = 'token123';
  const formData = new FormData();
  formData.append('name', 'Produto Teste');

  const config = PRODUCT_POST(token, formData);

  expect(config.url).toBe('http://34.71.240.100/api/product/create');
  expect(config.options.method).toBe('POST');
  expect(config.options.headers.Authorization).toBe('Bearer token123');
  expect(config.options.body).toBe(formData);
});

test('configuração do PRODUCT_GET', () => {
  const token = 'token123';
  const id = '1';
  const config = PRODUCT_GET(token, id);

  expect(config.url).toBe('http://34.71.240.100/api/product/read?id=1');
  expect(config.options.method).toBe('GET');
  expect(config.options.headers.Authorization).toBe('Bearer token123');
});
