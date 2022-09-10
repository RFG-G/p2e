import { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Input from './Input';
import styles from './OrderPage.module.scss'
import Chat, { chatType } from '../../components/Chat/Chat';
import { Link } from 'react-router-dom';
import { COMFIRM_URL, MAIN_URL } from '../../utils/links';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { HistoryReview } from './HistoryReview';

export default function OrderPage() {
    const location = useLocation<{ back: string; game: string; avatar: string; nikname: string, online: string }>()
    const history = useHistory()
    useBreadcrumbs([{ name: location.state?.game, link: `/game/${location.pathname.slice(-1)}` } || '', { name: location.state?.back, link: null }])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('0')
    const [count, setCount] = useState('0')
    const [chat, updateChat] = useState<chatType[]>([])
    const [mess, setMess] = useState('')

    if (!!!location.state) {
        history.replace({ pathname: MAIN_URL })
        return null
    }

    return (
        <div className={styles.container}>
            <Breadcrumbs />
            <div className={styles.title}>{location.state.game || ''}</div>
            <div className={styles.content}>
                <div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>Игра:</span>
                            <span>Категория:</span>
                            <span>Сторона:</span>
                            <span>Сервер:</span>
                            <span>Количество:</span>
                        </div>
                        <div className={styles.tableRow}>
                            <span>AION</span>
                            <span>Кинары</span>
                            <span>Асмодиане</span>
                            <span>Нортика</span>
                            <span>500кк</span>
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            label='Имя персонажа'
                            placeholder='Введите имя персонажа...'
                            value={name}
                            onChange={setName}
                            id='name'
                        />
                        <Input
                            label='Заплачу'
                            placeholder='0'
                            value={price}
                            onChange={setPrice}
                            id='price'
                        />
                        <Input
                            label='Получу'
                            placeholder='0'
                            value={count}
                            onChange={setCount}
                            id='count'
                        />
                    </div>
                    <div className={styles.buy}>
                        <Link to={{ pathname: COMFIRM_URL, state: location.state }} className={styles.selectBtn}>
                            Купить
                        </Link>
                    </div>
                </div>
                <HistoryReview />
                <div className={styles.chat}>
                    <div className={styles.chatHeader}>
                        <img src={location.state.avatar} alt='avatar' />
                        <div>
                            <div className={styles.chatName}>{location.state.nikname || 'nick'}</div>
                            <div className={styles.chatStatus}>{location.state.online === 'Онлайн' ? 'online' : 'offline'}</div>
                        </div>
                    </div>
                    <Chat
                        value={mess}
                        onChange={setMess}
                        chat={chat}
                        setChat={updateChat}
                    />
                </div>
            </div>
        </div>
    )
}