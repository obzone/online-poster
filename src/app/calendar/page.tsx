import ActivityDayItem from "@/components/activity-day-item/activity-day-item";
import styles from './page.module.scss'

export default function Calendar() {
  return (
    <div>
      <div className={styles.week}>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
        <div className={styles.day} >
          <ActivityDayItem />
        </div>
      </div>
    </div>
  )
}