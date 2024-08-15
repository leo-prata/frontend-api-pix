import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase'; 
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Jogos = () => {
    interface Jogo {
        id: string;
        nome: string;
        data: string;
        estaPago: boolean;
    }
    
    const [jogos, setJogos] = useState<Jogo[]>([]);

    const convertStringToDate = (dateString: string): Date => {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    useEffect(() => {
        const fetchJogos = async () => {
            try {
                const jogosCollection = collection(db, 'jogos');
                const jogosSnapshot = await getDocs(jogosCollection);
                const jogosList = jogosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Jogo[];
                
                jogosList.sort((a, b) => {
                    const dateA = convertStringToDate(a.data);
                    const dateB = convertStringToDate(b.data);
                    return dateA.getTime() - dateB.getTime();
                });
                
                setJogos(jogosList);
            } catch (error) {
                console.error('Erro ao buscar os jogos:', error);
            }
        };

        fetchJogos();
    }, []);

    return (
        /*
        <div className={styles.jogosContainer}>
        {jogos.map((jogo) => (
            <Link key={jogo.id} to={`/jogo/${jogo.id}`} className={styles.jogo}>
                <div 
                    className={`${styles.statusIndicator} ${jogo.estaPago ? styles.pago : styles.pendente}`}
                />
                <div className={styles.jogoInfo}>
                    <p className={styles.nome}>{jogo.nome}</p>
                    <p className={styles.data}>{jogo.data}</p>
                </div>
            </Link>
        ))}
    </div>
    */

    <div className={styles.jogosContainer}>
    {jogos.map((jogo) => (
        <Link key={jogo.id} to={`/jogo/${jogo.id}`} className={styles.jogo}>
            <div className={styles.left}>
            <div className={jogo.estaPago ? styles.pago : styles.pendente}></div>
            <p className={styles.nome}>{jogo.nome}</p>
            </div>
            <p className={styles.data}>{jogo.data}</p>
        </Link>
    ))}
</div>
    );
};

export default Jogos;
