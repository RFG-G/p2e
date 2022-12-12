import requestClient from './';

export const loginRequest = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return await requestClient.post('auth/login', formData, { 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        localStorage.setItem('token', res.data?.access_token);
        return res
    })
}

export const registerRequest = async (email, login, password) => {
    return await requestClient.post('auth/registration', {
        email, login, password
    }).then((res) => {
        localStorage.setItem('token', res.data?.token);
        return res
    })
}