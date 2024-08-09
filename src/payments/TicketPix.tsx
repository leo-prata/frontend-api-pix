import React from "react";
import styles from './styles.module.scss';
import { Button } from '../components/ui/Button';

const TicketPix = () => {
    const [loading, setLoading] = React.useState(false);

    return (
        <div>
            <div className={styles.card}>
            <Button
                type="submit"
                loading={loading}
            >
                Pay
            </Button>
            </div>
        </div>
    )
}

export default TicketPix;