import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../ElementInterface/Error';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }
  return (
    <section className="anime-left ">
      <h1 className="text-5xl spectral-bold relative my-4 mx-0">
        <span className="relative z-10">Login</span>
        <span
          className="
    block w-8 h-9 bg-blue-500
    absolute bottom-2 left-0
    rounded-md z-0
  "
        ></span>
      </h1>
      <form onSubmit={handleSubmit}>
        <Input label="email" type="text" name="email" {...email} />
        <Input label="senha" type="password" name="password" {...password} />
        {loading ? <Button isDisabled={true}>Carregando ...</Button> : <Button isDisabled={false}>Entrar</Button>}

        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginForm;
