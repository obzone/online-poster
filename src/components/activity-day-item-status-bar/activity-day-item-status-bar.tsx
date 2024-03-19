import styles from './activity-day-item-status-bar.module.scss'

export default function ActivityDayItemStatusBar({date}: {date: Date}) {
    return (
        <div>
            <p className={`${styles.text} ${styles.withMobileHidden}`} >{new Intl.DateTimeFormat('en-US').format(date)}</p>
            <p className={`${styles.text} ${styles.withTabletHidden}`} >{date.getDate()}</p>
        </div>
    )
}