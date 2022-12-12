import { useState } from 'react'
import Card from './Card'
import SettingsInput from './SettingsInput'
import styles from './SettingsPage.module.scss'
import { changePasswordRequest } from '../../api/user'
import { toast } from 'react-toastify';

export default function PassCard(){
    const [nowPass, setNowPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [addPass, setAddPass] = useState('');

    const handleClick = () => {
        if (nowPass && newPass && addPass) {
            changePasswordRequest(nowPass, newPass, addPass)
                .then((res) => {
                    toast('Пароль успешно изменён')
                    setNowPass('');
                    setNewPass('');
                    setAddPass('');
                })
                .catch((err) => {
                    toast('Повторите попытку')
                })
        }  
    }

    return(
        <Card
        title='Смена пороля:'
    >
        <SettingsInput
            label='Текущий пароль:'
            placeholder='введите текущий пароль'
            type='password'
            value={nowPass}
            onChange={setNowPass}
        />
        <SettingsInput
            label='Новый пароль:'
            placeholder='введите новый пароль'
            type='password'
            value={newPass}
            onChange={setNewPass}
        />
        <SettingsInput
            label='Подвтвердите пароль:'
            placeholder='Подвтвердите пароль'
            type='password'
            value={addPass}
            onChange={setAddPass}
        />
        <button className={styles.btn} onClick={handleClick}>Поменять</button>
    </Card>
    )
}