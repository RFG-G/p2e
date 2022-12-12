import styles from './AuthPage.module.scss'
import InputIcon from './InputIcon'
import { useState, useCallback, FormEvent, useRef } from 'react'
import checkSubmit from '../../utils/checkSubmit'
import Repatcha from 'react-google-recaptcha'
import { SINGIN_URL } from '../../utils/links';
import { useHistory } from "react-router-dom";
import { Toastify } from './../../components/Toastify/Toastify';
import { toast } from 'react-toastify';
import { registerRequest } from '../../api/auth';

export default function RegTab() {
    const history = useHistory();
    const [toastifyStatus, setToastifyStatus] = useState<'success' | 'error'>('success')

    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [passT, setPassT] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState('')
    const [TOUR, setTOUR] = useState<'true' | 'false'>('false') //terms of the user afteement
    const ref = useRef<HTMLFormElement>(null)

    const [captchaVerify, setCaptchaVerify] = useState(true)
    const captchaRef = useRef<any>(null)
    const handleCaptchaVerify = useCallback((token: string | null) => {
        if (token === null) setCaptchaVerify(false);
        token && setCaptchaVerify(true)
    }, []);

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        const nResp = checkSubmit('name', name)
        const pResp = checkSubmit('password', pass)
        const mResp = checkSubmit('mail', mail)
        const ptResp = checkSubmit('passwordT', passT)
        const TOURResp = checkSubmit('TOUR', TOUR)
        console.log(mResp, nResp, pResp, TOURResp, captchaVerify)
        if (nResp.status &&
            pResp.status &&
            ptResp.status &&
            mResp.status &&
            pass === passT && TOURResp.status && captchaVerify
        ) {
            registerRequest(mail, name, pass).then((res) => {
                if (res.status === 200) {
                    setErr('')
                    setName('')
                    setMail('')
                    setPassT('')
                    setPass('')
                    setTOUR('false')
                    setCaptchaVerify(false)
                    captchaRef.current?.reset && captchaRef.current?.reset()
                    setToastifyStatus('success')
                    toast('Успех')
                    history.push(SINGIN_URL)
                }
            }).catch(() => {
                setToastifyStatus('error')
                toast('Неправильная почта или пароль')
            })
        } else {
            setErr(
                (!nResp.status && nResp.text) ||
                (!pResp.status && pResp.text) ||
                (!ptResp.status && ptResp.text) ||
                (!mResp.status && mResp.text) ||
                (!TOURResp.status && TOURResp.text) ||
                (!captchaVerify && 'Вы должны пройти капчу') ||
                'Что-то пошло не так...'
            )
            setToastifyStatus('error')
            toast('Неправильная почта или пароль')
        }
    }, [name, checkSubmit, mail, passT, pass, TOUR, captchaVerify])

    return (

        <form className={styles.body} onSubmit={handleSubmit} ref={ref}>
            {err !== '' && <div className={styles.err}>{err}</div>}
            <InputIcon
                value={name}
                onChange={setName}
                placeholder={'Имя пользователя'}
            // icon={user}
            />
            <InputIcon
                value={mail}
                onChange={setMail}
                placeholder={'Email'}
                // icon={mailSvg}
                type='email'
            />
            <InputIcon
                value={pass}
                onChange={setPass}
                placeholder={'Пароль'}
                // icon={lock}
                type='password'
            />
            <InputIcon
                value={passT}
                onChange={setPassT}
                placeholder={'Подтвердите пароль'}
                // icon={lock}
                type='password'
            />
            <div className={styles.bodyRow}>
                <input onChange={() => setTOUR(prev => prev === 'false' ? 'true' : 'false')} checked={TOUR === 'true'} type='checkbox' className={styles.radio} id='radio' />
                <label htmlFor='radio' style={{ fontSize: 10 }}>Я прочитал(а) и принимаю условия пользовательсткого соглашения</label>
            </div>
            {/* <Repatcha ref={captchaRef} onChange={handleCaptchaVerify} size={window.innerWidth <= 400 ? 'compact' : 'normal'} theme='dark' hl='ru' sitekey={'6LcF4-whAAAAAMUm1K7CQkl04fG7f2yOxDPzmeaQ'} /> */}
            <button className={styles.btn} style={{ marginBottom: 0 }}>Регистрация</button>
            <Toastify status={toastifyStatus} />
        </form>
    )
}