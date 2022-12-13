import requestClient from '.';

export const loginRequest = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return await requestClient.post('auth/login', formData, { 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        console.log(res.data?.access_token)
        localStorage.setItem('token', res.data?.access_token);
        return res
    })
}

export const registerRequest = async (email: string, login: string, password: string) => {
    return await requestClient.post('auth/registration', {
        email, login, password
    }).then((res) => {
        localStorage.setItem('token', res.data?.token);
        return res
    })
}