export const API_URL = 'http://34.71.240.100/api';

export function TOKEN_POST(body) {
  return {
    url: API_URL + '/auth/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + '/auth/me',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function PRODUCT_POST(token, formData) {
  return {
    url: API_URL + '/product/create',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}

export function PRODUCT_GET_LIST(token) {
  return {
    url: API_URL + '/product/list',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function PRODUCT_GET(token, id) {
  return {
    url: `${API_URL}/product/read?id=${id}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function PRODUCT_PUT(token, id, data) {
  return {
    url: `${API_URL}/product/update`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ id, ...data }),
    },
  };
}

export function PRODUCT_DELETE(token, id) {
  return {
    url: `${API_URL}/product/delete`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ id }),
    },
  };
}
