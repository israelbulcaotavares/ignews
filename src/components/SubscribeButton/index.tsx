import styles from './styles.module.scss'


interface SusbcribeButtonProps{
    priceId: string;

}
export function SubscribeButton({priceId}:SusbcribeButtonProps){
    return(
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now

        </button>
    )
}