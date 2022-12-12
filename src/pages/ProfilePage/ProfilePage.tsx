import { useState, useEffect } from 'react';
import styles from './ProfilePage.module.scss'
import { getMyProfileRequest } from '../../api/user'; 
import { mockUser } from '../../utils/mockData';

type UserData = { 
    status: string,
    role: string,
    name: string,
    mail: string, 
    balance: string
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        getMyProfileRequest().then((res) => {
            console.log(res?.data)
            setUser(res?.data)
        }).catch((err) => console.log(err))
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.title}>Профиль</div>
            <div className={styles.body}>
                <div className={styles.bodyTop}>Информация об аккаунте</div>
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                        <div>
                            <img src={mockUser.avatar} />
                            <p>{user?.status ?? 'Не найдено'}</p>
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
                        <span>{user?.name ?? 'Не найдено'}</span>
                        <span>{user?.mail ?? 'Не найдено'}</span>
                        <span>{user?.balance ?? 'Не найдено'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}