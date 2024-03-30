import { WEEKS } from '../week-day-header/week-day-header'
import styles from './activity-day-item-status-bar.module.scss'

export default function ActivityDayItemStatusBar({ date, tags }: { date: Date, tags?: Array<string> }) {
  return (
    <div className={styles.statusBarContainer} >
      <div className={styles.tagContainer} >
        {
          tags?.map(tag => (
            <span className='tag' key={tag} >{tag}</span>
          ))
        }
      </div>
      <p className={`${styles.text} ${styles.onPCHidden}`} >{`${date.getDate()}/${WEEKS[date.getDay()]}`}</p>
      <p className={`${styles.text} ${styles.onTabletHidden}`} >{date.getDate()}</p>
    </div>
  )
}