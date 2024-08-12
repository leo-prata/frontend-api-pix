import React from "react";
import styles from './styles.module.scss';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input'; 
import { toast } from "react-toastify";

import { setUpAPI } from '../services/api';

const TicketPix = () => {
   
    const [valor, setValor] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    
    const [qrCodeBase64, setQrCodeBase64] = React.useState('');
    const [codigoPix, setCodigoPix] = React.useState('');
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if(valor === '' || email === '' || cpf === ''){
            toast.warning('Fill in all fields');
            return;
        }
        if (isNaN(Number(valor))) {
            toast.warning('The value must be a number');
            return;
        }
        if (cpf.length !== 11) {
            toast.warning('CPF must have 11 digits');
            return;
        }

        const valorNumber = Number(valor);

        const api = setUpAPI();
        const response = await api.post('/create-pix', {
            transaction_amount: valorNumber,
	        description: "payment",
	        paymentMethodId: "pix",
	        email: email,
	        identificationType: "CPF",
	        number: cpf
        });
        
        const qrCodeBase64 = response.data.qr_code_base64;
        setQrCodeBase64(qrCodeBase64);
        const codigoPix = response.data.qrCode;
        setCodigoPix(codigoPix);

    } 


    return (
        <div className={styles.container}>  
            <div className={styles.card}>
            <h2 className={styles.title}>Pagamento via Pix</h2>
            <form className={styles.form} onSubmit={handleSubmit} >
            <Input 
                    placeholder="Valor da transação"
                    type="text"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
            />
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
            <Button
                type="submit"
            >
                Pagar
            </Button>
            </form>
            {qrCodeBase64 && (
                    <div className={styles.qrCodeContainer}>
                        <h3>Pague com o QRCode abaixo ou com o código:</h3>
                        <img 
                            src={`data:image/png;base64,${qrCodeBase64}`} 
                            alt="QR Code for Pix Payment" 
                            className={styles.qrCodeImage}
                        />
                        <p className={styles.texto}>${codigoPix}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TicketPix;