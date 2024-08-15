import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.scss'; 
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; 

interface Jogo {
    id: string;
    data: string; 
    nome: string;
}

// Função para converter "dd-mm-yyyy" para um objeto Date
const convertStringToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Subtrai 1 do mês porque os meses são indexados a partir de 0 em Date
};

const CalendarPage: React.FC = () => {
    const [date, setDate] = useState<Date | Date[]>(new Date());
    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [jogosParaData, setJogosParaData] = useState<Jogo[]>([]);

    useEffect(() => {
        // Função para buscar os jogos do Firestore
        const fetchJogos = async () => {
            const jogosCollection = collection(db, "jogos");
            const jogosSnapshot = await getDocs(jogosCollection);
            const jogosList = jogosSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Jogo[];

            setJogos(jogosList);
        };

        fetchJogos();
    }, []);

    // Função para manipular a mudança de data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDateChange = (newDate: any) => {
        if (newDate instanceof Date) {
            setDate(newDate);
            setSelectedDate(newDate);
            const jogosNoDia = jogos.filter(jogo => convertStringToDate(jogo.data).toDateString() === newDate.toDateString());
            setJogosParaData(jogosNoDia);
        }
    };

    // Função para adicionar uma classe especial aos dias com jogos
    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            if (jogos.some(jogo => convertStringToDate(jogo.data).toDateString() === date.toDateString())) {
                return styles.jogoMarcado;
            }
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <Calendar 
                onChange={handleDateChange} 
                value={date instanceof Array ? date[0] : date} 
                tileClassName={tileClassName} 
                className={styles.calendar} 
            />
            {selectedDate && jogosParaData.length > 0 && (
                <div className={styles.jogosContainer}>
                    <h3 className={styles.titulo}>Jogos para {selectedDate.toLocaleDateString()}</h3>
                    <ul className={styles.jogosList}>
                        {jogosParaData.map(jogo => (
                            <li key={jogo.id} className={styles.jogoItem}>
                                <Link to={`/jogo/${jogo.id}`} className={styles.jogo}>
                                <span>Jogo: </span> {`${jogo.nome}`}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CalendarPage;