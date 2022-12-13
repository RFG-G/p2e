import requestClient from '.';

export const getMyProfileRequest = () => {
    return requestClient.get('user/my_profile')
}

export const updateProfileImageRequest = async (image: any) => {
    const formData = new FormData();
    formData.append('image', image);

    return await requestClient.post('user/update_image', formData, { 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const changePasswordRequest = async (old_password: string, new_password: string, new_password_confirm: string) => {
    return await requestClient.post('user/change_password', {
        old_password, new_password, new_password_confirm
    })
}