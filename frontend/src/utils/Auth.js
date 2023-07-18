export const BASE_URL = 'https://localhost:4000';

const handleResponse = (response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        const error = new Error('Ошибка сервера');
        error.data = err;
        throw error;
      });
    }
    return response.json();
  }

  
export const registration = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
    })
    .then(handleResponse)
    .then((data) => {
      return data.data;
    });
};
export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({email, password })
    })
    .then(handleResponse)

};


export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': "application/json",
            'Content-type': 'application/json',
        },
        credentials: "include",
    })
    .then(res => res.json())
    .then(data => data)

} 
