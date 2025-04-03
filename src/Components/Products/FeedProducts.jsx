import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_GET_LIST } from '../../api';
import FeedProductItem from './FeedProductItem';
import Error from '../ElementInterface/Error';
import Loading from '../ElementInterface/Loading';

const FeedProducts = ({ setModalProduct }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchProduct() {
      const token = window.localStorage.getItem('token');

      const { url, options } = PRODUCT_GET_LIST(token);
      await request(url, options);
    }
    fetchProduct();
  }, [request]);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && data.data)
    return (
      <ul className="anime-left grid grid-cols-3 gap-4 mb-4 justify-center max-sm:grid-cols-2">
        {data.data.map((product) => (
          <FeedProductItem key={product.id} product={product} setModalProduct={setModalProduct} />
        ))}
      </ul>
    );
  else return null;
};

export default FeedProducts;
