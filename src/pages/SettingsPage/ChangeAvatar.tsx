import styles from './SettingsPage.module.scss'
import manSvg from '../../assets/man.svg'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { updateProfileImageRequest } from '../../api/user'
import { toast } from 'react-toastify';

export default function ChangeAvatar(){
    const ref = useRef<HTMLInputElement>(null)
    const [cur, setCur] = useState<File | null>(null)
    const handleClick = useCallback(() => {
        ref.current?.click(); 
    }, [ref.current])

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const file: any = target.files?.[0];
        console.log(file)
        if (file) {
            setCur(file);
            updateProfileImageRequest(file).then(() => {
                toast('Фото профиля изменено')
            }).catch(() => {
                toast('Ошибка при смене фото профиля', { type: 'error' });
                setCur(null); 
            })
        }
    }

    return(
        <div className={styles.avatar} onClick={handleClick}>
            <img src={manSvg} alt="icon" />
            <div className={styles.avatarTitle}>{cur ? cur.name : 'Сменить аватар' }</div>
            <input type="file" onChange={handleChange} ref={ref} />
        </div>
    )
}