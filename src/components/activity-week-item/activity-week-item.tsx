import { Activity } from "@/app/actions/calendars";
import { isDateInRange } from "@/utilities/time";
import ActivityDayItem from "../activity-day-item/activity-day-item";
import styles from './activity-week-item.module.scss';

export default async function ActivityWeekItem(props: { data?: Array<Activity>, startDate: Date, currentMonth: Date }) {
  return (
    <div className={styles.week}>
      {
        new Array(7).fill(0).map((_, index) => {
          const date = new Date(props.startDate.valueOf())
          date.setDate(date.getDate() + index)
          const dayInCurrentMonth = date.getMonth() == props.currentMonth.getMonth()
          const revertData = props.data?.map(item => item).reverse()
          const currentDayActivities = revertData?.filter(({startTime, endTime}) => {
            const startTimeObj = new Date(startTime)
            const endTimeObj = endTime ? new Date(endTime) : undefined
            return isDateInRange(date, startTimeObj, endTimeObj)
          })
          return (
            <div className={`${styles.day} ${dayInCurrentMonth ? "" : styles.dayNotInCurrentMonth}`} key={index} >
              <ActivityDayItem activities={currentDayActivities} date={date} />
            </div>
          )
        })
      }
    </div>
  )
}