import React from 'react';

const Error = (props) => {
  if (!props.error) return null;
  return <p className="text-red-600 my-4 mx-0">{props.error}</p>;
};

export default Error;
