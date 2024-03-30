import styles from './week-day-header.module.scss'

export const WEEKS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function WeekDayHeader() {
  return (
    <div className={styles.container} >
      {
        WEEKS.map(date => (
          <div key={`${date}`} >{date}</div>
        ))
      }
    </div>
  )
}