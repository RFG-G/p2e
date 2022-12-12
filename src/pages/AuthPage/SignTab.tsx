import styles from './AuthPage.module.scss'
import InputIcon from './InputIcon'
import {useState, useCallback, FormEvent, useRef} from 'react'
import checkSubmit from '../../utils/checkSubmit';
import Repatcha from 'react-google-recaptcha'
import { PROFILE_URL } from '../../utils/links';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toastify } from '../../components/Toastify/Toastify';
import { loginRequest } from '../../api/auth';

export default function SignTab() {
    const history = useHistory();
    const [toastifyStatus, setToastifyStatus] = useState<'success' | 'error'>('success')

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const ref = useRef<HTMLFormElement>(null)

    const [captchaVerify, setCaptchaVerify] = useState(true)
    const captchaRef = useRef<any>(null)
    const handleCaptchaVerify = useCallback((token: string | null) => {
        if (token === null) setCaptchaVerify(false);
        setCaptchaVerify(true)
    }, []);

    const handleSubmit = useCallback((event: FormEvent) =>  {
        event.preventDefault()
        const mResp = checkSubmit('mail', email)
        const PLResp = checkSubmit('passwordL', pass)

        if(mResp.status && PLResp.status && captchaVerify){
            loginRequest(email, pass).then((res) => {
                if (res?.status === 200) {
                    setErr('')
                    setEmail('')
                    setPass('')
                    setRememberMe(false)
                    setCaptchaVerify(false)
                    setToastifyStatus('success')
                    captchaRef.current?.reset && captchaRef.current?.reset()
                    toast('Успех')
                    history.push(PROFILE_URL)
                }
            }).catch(() => {
                setToastifyStatus('error')
                toast('Неправильная почта или пароль')
            })
        } else {
            setErr( (!mResp.status && mResp.text) ||
            (!PLResp.status && PLResp.text) ||
            (!captchaVerify && 'Вы должны пройти капчу') ||
            'Что-то пошло не так...')
            setToastifyStatus('error')
            toast('Неправильная почта или пароль')
        }
    }, [checkSubmit, email, pass, rememberMe, captchaVerify])
    return(
        <form className={styles.body} onSubmit={handleSubmit} ref={ref}>
            {err !== '' && <div className={styles.err}>{err}</div>}
            <InputIcon
                value={email}
                onChange={setEmail}
                placeholder={'Почта'}
                type='email'
                // icon={user}
            />
            <InputIcon
                value={pass}
                onChange={setPass}
                placeholder={'Пароль'}
                // icon={lock}
                type='password'
            />
            <div className={styles.bodyRow}>
                <input checked={rememberMe} onChange={() => setRememberMe(prev => !prev)} type='checkbox' className={styles.radio} id='radio' />
                <label htmlFor='radio'>Запомнить меня</label>
            </div>
            {/* <Repatcha ref={captchaRef} onChange={handleCaptchaVerify} size={window.innerWidth <= 400 ? 'compact' : 'normal'} theme='dark' hl='ru' sitekey={'6LcF4-whAAAAAMUm1K7CQkl04fG7f2yOxDPzmeaQ'} /> */}
            <button className={styles.btn}  style={{marginBottom: 0}}>Войти</button>
            <Toastify status={toastifyStatus} />
        </form>
    )
}