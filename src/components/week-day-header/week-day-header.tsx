import { WEEKS } from '@/app/variable'
import styles from './week-day-header.module.scss'

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