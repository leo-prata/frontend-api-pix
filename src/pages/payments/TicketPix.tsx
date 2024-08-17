
import React, { useState, useEffect } from "react";
import styles from './styles.module.scss';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input'; 
import { toast } from "react-toastify";

import { setUpAPI } from '../../services/api';

import { db } from '../../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import { initMercadoPago } from '@mercadopago/sdk-react';

interface TicketPixProps {
    valor: number;
    jogoId: string;
}

const TicketPix: React.FC<TicketPixProps> = ({valor, jogoId}) => {
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    const [qrCodeBase64, setQrCodeBase64] = useState('');
    const [codigoPix, setCodigoPix] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (paymentId) {
            console.log('Iniciando verificação de pagamento para ID:', paymentId);
            interval = setInterval(async () => {
                try {
                    const api = setUpAPI();
                    const response = await api.get(`/payment-info/${paymentId}`);
                    console.log('Status do pagamento:', response.data); // Verifique o que está sendo retornado
                    const status = response.data.status || response.data; // Verifique a estrutura da resposta
    
                    if (status === 'approved') {
                        setPaymentStatus('approved');
                        clearInterval(interval);
                        console.log('Pagamento aprovado!');

                        const jogoRef = doc(db, "jogos", jogoId);
                        await updateDoc(jogoRef, {
                            estaPago: true
                        });
                    }
                } catch (error) {
                    console.error('Erro ao obter status do pagamento:', error);
                }
            }, 5000);
        }
    
        return () => {
            if (interval) {
                clearInterval(interval);
                console.log('Intervalo limpo');
            }
        };
    }, [paymentId, jogoId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (isNaN(Number(valor))) {
            toast.warning('The value must be a number');
            return;
        }
        if (cpf.length !== 11) {
            toast.warning('CPF must have 11 digits');
            return;
        }

        const api = setUpAPI();
        initMercadoPago(import.meta.env.VITE_MERCADOPAGO_TOKEN);
        const response = await api.post('/create-pix', {
            transaction_amount: valor,
            description: "payment",
            paymentMethodId: "pix",
            email: email,
            identificationType: "CPF",
            number: cpf
        });

        console.log('Resposta da API:', response.data);

        const qrCodeBase64 = response.data.qr_code_base64;
        setQrCodeBase64(qrCodeBase64);
        const codigoPix = response.data.qrCode;
        setCodigoPix(codigoPix);
        const paymentId = response.data.paymentId; // Captura o ID do pagamento
        setPaymentId(paymentId);
        setPaymentStatus('pending');
        console.log('Pagamento iniciado com ID:', paymentId);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(codigoPix)
            .then(() => {
                toast.success('Código copiado para a área de transferência!');
            })
            .catch(err => {
                console.error('Erro ao copiar o código:', err);
                toast.error('Erro ao copiar o código.');
            });
    };

    return (
        <div className={styles.container}>
            {paymentStatus !== 'approved' && !qrCodeBase64 ? (
                <div className={styles.card}>
                    <h2 className={styles.title}>Pagamento via Pix</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="CPF"
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <Button type="submit">Pagar</Button>
                    </form>
                </div>
            ) : (
                qrCodeBase64 && (
                    <div className={styles.qrCodeContainer}>
                        <h3>Pague com o QRCode abaixo ou com o código:</h3>
                        <img 
                            src={`data:image/png;base64,${qrCodeBase64}`} 
                            alt="QR Code for Pix Payment" 
                            className={styles.qrCodeImage}
                        />
                        <div className={styles.textoContainer}>
                            <div className={styles.texto}>{codigoPix}</div>
                            <button className={styles.copyButton} onClick={handleCopy}>Copiar</button>
                        </div>
                        <p>Aguardando pagamento...</p>
                    </div>
                )
            )}
        </div>
    )
}

export default TicketPix;