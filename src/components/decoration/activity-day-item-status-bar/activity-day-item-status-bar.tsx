import styles from './activity-day-item-status-bar.module.scss'

export default function ActivityDayItemStatusBar({ date, tags }: { date: Date, tags?: Array<string> }) {
  return (
    <div className={styles.statusBarContainer} >
      <div className={styles.tagContainer} >
        {
          tags?.map(tag => (
            <p key={tag} >{tag}</p>
          ))
        }
      </div>
      <p className={`${styles.text} ${styles.onMobileHidden}`} >{new Intl.DateTimeFormat('en-US').format(date)}</p>
      <p className={`${styles.text} ${styles.onTabletHidden}`} >{date.getDate()}</p>
    </div>
  )
}