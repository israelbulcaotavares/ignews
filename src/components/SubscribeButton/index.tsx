import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api'; 
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'


interface SusbcribeButtonProps {
    priceId: string;

}
export function SubscribeButton({ priceId }: SusbcribeButtonProps) {
    const { data: session } = useSession();


   async function handleSubscrible() {
        if (!session) {
            signIn('github')
            return;
        }

        try {
            const response = await  api.post('/subscribe')

            const {sessionId} = response.data;

            const stripe = await getStripeJs()

            stripe.redirectToCheckout({sessionId})  

        } catch(err) {
            alert(err.message)
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