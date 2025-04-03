import React from 'react';
import { TOKEN_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getUser(access_token) {
    const { url, options } = USER_GET(access_token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ email, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Email ou senha errado ou não encontrado!`);
      const { access_token } = await tokenRes.json();
      window.localStorage.setItem('token', access_token);
      await getUser(access_token);
      navigate('/user');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token && !login) {
      // Só executa se não estiver logado
      const validateToken = async () => {
        try {
          setLoading(true);
          const { url, options } = USER_GET(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error('Token Inválido');

          const json = await response.json();
          setData(json);
          setLogin(true);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      };
      validateToken();
    }
  }, [login, userLogout]);

  return <UserContext.Provider value={{ userLogin, userLogout, error, loading, login, data }}>{children}</UserContext.Provider>;
};
