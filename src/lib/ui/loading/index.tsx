import './style.css'
import styles from './styles.module.sass';


export const Loader = () => (
    <div className={styles.loader}>Loading...</div>
);

export const LoaderPages = () => (
    <div className="cube">
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
    </div>
);
