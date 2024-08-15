
import styles from './styles.module.scss';
import Header from '../../components/Header';

import Jogos from '../jogos';

import CalendarPage from '../CalendarPage';

const PaginaInicial = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.card}>
                <h2 className={styles.title}>Inicio</h2>
                {/* Adicione aqui mais conteúdo ou componentes que serão listados verticalmente */}
            </div>
            <div className={styles.card}>
                <h2 className={styles.title}>Próximos Jogos</h2>
                <Jogos />   
            </div>
            <div className={styles.card}>
                <h2 className={styles.title}>Calendário</h2>
                <CalendarPage />   
            </div>
        </div>
    );
};

export default PaginaInicial;