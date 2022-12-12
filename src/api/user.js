import requestClient from './';

export const getMyProfileRequest = async () => {
    return await requestClient.get('user/my_profile')
}

export const updateProfiveImageRequest = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    return await requestClient.post('user/update_image', formData, { 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const changePasswordRequest = async (old_password, new_password, new_password_confirm) => {
    return await requestClient.post('user/change_password', {
        old_password, new_password, new_password_confirm
    })
}