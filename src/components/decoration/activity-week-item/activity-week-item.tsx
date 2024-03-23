import ActivityDayItem from "@/components/decoration/activity-day-item/activity-day-item";
import styles from './activity-week-item.module.scss'
import { Activity } from "@/app/actions/calendars";

export default function ActivityWeekItem(props: {data?: Array<Activity>, startDate: Date, currentMonth: Date}) {
  return (
    <div>
      <div className={styles.week}>
        {
          new Array(7).fill(0).map((_, index) => {
            const date = new Date(props.startDate.valueOf())
            date.setDate(date.getDate() + index)
            const dayInCurrentMonth = date.getMonth() == props.currentMonth.getMonth()
            const currentDayActivities = props.data?.filter(({startTime, endTime}) => {
              return startTime.getFullYear() == date.getFullYear() && startTime.getMonth() == date.getMonth() && startTime.getDate() == date.getDate()
            })
            return (
              <div className={`${styles.day} ${dayInCurrentMonth ? "" : styles.dayNotInCurrentMonth}`} key={index} >
                <ActivityDayItem activities={currentDayActivities} date={date} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}