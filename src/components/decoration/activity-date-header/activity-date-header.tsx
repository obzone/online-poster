import styles from './activity-date-header.module.scss'

export const WEEKS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function ActivityDateHeader() {
  return (
    <div className={styles.container} >
      {
        WEEKS.map(date => (
          <div>{date}</div>
        ))
      }
    </div>
  )
}