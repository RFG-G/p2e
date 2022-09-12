import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import tgB from '../../assets/icon-tg-bl.svg'
import tgG from '../../assets/icon-tg-gr.svg'
import tg from '../../assets/icon-tg.svg'
import { MAIN_URL } from '../../utils/links'
import vk from '../../assets/vk.svg';
import vkG from '../../assets/vk-gr.svg';
import vkB from '../../assets/vk-bl.svg';
import yt from '../../assets/yt.svg';
import ytG from '../../assets/yt-gr.svg';
import ytB from '../../assets/yt-bl.svg';
import wa from '../../assets/wa.svg';
import waG from '../../assets/wa-gr.svg';
import waB from '../../assets/wa-bl.svg';
import inst from '../../assets/inst.svg';
import instG from '../../assets/inst-gr.svg';
import instB from '../../assets/inst-bl.svg';

export default function Footer(){
    return(
        <footer className={styles.container}>
            <div className={styles.groupLink}>
                <Link to={{pathname: MAIN_URL}}>
                    Политика конфиденциальности
                </Link>
                <Link to={{pathname: MAIN_URL}}>
                    Политика cookie 
                </Link>
                <Link to={{pathname: MAIN_URL}}>
                    Отправить запрос
                </Link>
            </div>
            <div className={styles.groupSocial}>
                        <a href='#' target='_blank'>
                            <img src={tg} className={styles.t} alt="icon" />
                            <img src={tgB} className={styles.b} alt="icon" />
                            <img src={tgG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={wa} className={styles.t} alt="icon" />
                            <img src={waB} className={styles.b} alt="icon" />
                            <img src={waG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={yt} className={styles.t} alt="icon" />
                            <img src={ytB} className={styles.b} alt="icon" />
                            <img src={ytG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={inst} className={styles.t} alt="icon" />
                            <img src={instB} className={styles.b} alt="icon" />
                            <img src={instG} className={styles.g} alt="icon" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={vk} className={styles.t} alt="icon" />
                            <img src={vkB} className={styles.b} alt="icon" />
                            <img src={vkG} className={styles.g} alt="icon" />
                        </a>
            </div>
        </footer>
    )
}