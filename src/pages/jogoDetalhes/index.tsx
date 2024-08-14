import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import styles from './styles.module.scss';
import Header from '../../components/Header';
import TicketPix from '../payments/TicketPix';

const JogoDetalhes = () => {
    const { id } = useParams<{ id: string }>(); // Pega o ID do jogo da URL
    
    interface Jogo {
        nome: string;
        data: string;
        horario: string;
        local: string;
        valor: number;
        estaPago: boolean;
    }
    
    const [jogo, setJogo] = useState<Jogo | null>(null);

    useEffect(() => {
        const fetchJogo = async () => {
            if (id) {
                try {
                    const jogoDoc = doc(db, 'jogos', id);
                    const docSnap = await getDoc(jogoDoc);

                    if (docSnap.exists()) {
                        setJogo(docSnap.data() as Jogo);
                    } else {
                        console.error('Nenhum jogo encontrado com o ID:', id);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o jogo:', error);
                }
            }
        };

        fetchJogo();
    }, [id]);

    if (!jogo) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
            
            <div className={styles.card}>
            <Header />
                <h2 className={styles.title}>Detalhes do Jogo</h2>
                <p><strong>Nome:</strong> {jogo.nome}</p>
                <p><strong>Data:</strong> {jogo.data}</p>
                <p><strong>Horário:</strong> {jogo.horario}</p>
                <p><strong>Local:</strong> {jogo.local}</p>
                <p><strong>Valor:</strong> {jogo.valor}</p>
                {jogo.estaPago ? (
                    <div className={styles.message}>
                        <h3>Jogo já comprado!</h3>
                    </div>
                ) : (
                    <TicketPix valor={jogo.valor} />
                )}
            </div>
    </div>
    );
};

export default JogoDetalhes;