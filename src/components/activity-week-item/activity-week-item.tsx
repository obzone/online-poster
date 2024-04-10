import { Activity } from "@/app/actions/calendars";
import { isDateInRange } from "@/utilities/time";
import moment from "moment";
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
          const dateActivities: Activity[] = []
          revertData?.forEach((activity) => {
            const startTimeObj = moment.utc(activity.startTime).local()
            const endTimeObj = activity.endTime ? moment.utc(activity.endTime).local() : undefined
            if (date.getFullYear() == startTimeObj.year() && date.getMonth() == startTimeObj.month() && date.getDate() == startTimeObj.date()) {
              dateActivities.unshift(activity)
            } else if (isDateInRange(date, startTimeObj.toDate(), endTimeObj?.toDate())) {
              dateActivities.push(activity)
            }
          })
          return (
            <div className={`${styles.day} ${dayInCurrentMonth ? "" : styles.dayNotInCurrentMonth}`} key={index} >
              <ActivityDayItem activities={dateActivities} date={date} />
            </div>
          )
        })
      }
    </div>
  )
}