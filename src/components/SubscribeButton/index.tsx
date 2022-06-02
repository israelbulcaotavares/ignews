import { signIn, useSession } from 'next-auth/react';
import { stripe } from '../../services/stripe';
import styles from './styles.module.scss'


interface SusbcribeButtonProps {
    priceId: string;

}
export function SubscribeButton({ priceId }: SusbcribeButtonProps) {
    const  {data: session}  = useSession();


    function handleSubscrible() {
        if (!session) {
            signIn('github')
            return;
        }

        //criação da checkout session
        //stripe.checkout.sessions.create

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscrible}
        >
            Subscribe now

        </button>
    )
}