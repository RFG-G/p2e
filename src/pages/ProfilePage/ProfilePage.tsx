import { useState, useEffect } from 'react';
import styles from './ProfilePage.module.scss'
import { getProfilePhotoURL } from '../../api';
import { getMyProfileRequest } from '../../api/user'; 
import { mockUser } from '../../utils/mockData';

type UserData = { 
    status: any,
    role: string,
    login: string,
    email: string, 
    profile_photo?: string,
    balance: string
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        getMyProfileRequest().then((res: any) => {
            console.log('getMyProfileRequest res', res?.data)
            setUser(res?.data)
        }).catch((err: any) => console.log('getMyProfileRequest err', err))
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.title}>Профиль</div>
            <div className={styles.body}>
                <div className={styles.bodyTop}>Информация об аккаунте</div>
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                        <div>
                            <img src={user?.login ? getProfilePhotoURL(user?.login) : mockUser.avatar} alt="Avatar" />
                            {/* <p>{user?.status ? JSON.parse(user?.status)?.['ru'] : 'Не найдено'}</p> */}
                        </div>
                        <div>
                            <span>Ваш статус:</span>
                            <span>Логин:</span>
                            <span>E-mail:</span>
                            <span>Баланс:</span>
                        </div>
                    </div>
                    <div className={styles.contentRight}>
                        <span>{user?.role ?? 'Не найдено'}</span>
                        <span>{user?.login ?? 'Не найдено'}</span>
                        <span>{user?.email ?? 'Не найдено'}</span>
                        <span>{user?.balance ?? 'Не найдено'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}