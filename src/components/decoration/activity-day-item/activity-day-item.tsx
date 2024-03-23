import { Activity } from '@/app/actions/calendars'
import ActivityDayItemStatusBar from '../activity-day-item-status-bar/activity-day-item-status-bar'
import styles from './activity-day-item.module.scss'

export default function ActivityDayItem(props: {date: Date, activities?: Array<Activity>}) {
  return (
    <div className={`${styles.container}`} >
      <ActivityDayItemStatusBar date={props.date} />
      {
        props.activities?.map(({id, title, subject, startTime, endTime, target}) => (
          <div key={id} >
            <h3>{title}</h3>
            {
              subject && (
                <p>{subject}</p>
              )
            }
            <p style={{width: '180px'}} >{Intl.DateTimeFormat('en-GB').format(startTime)}{endTime ? Intl.DateTimeFormat('en-GB').format(endTime) : null}</p>
            {
              target && (
                <p>{target}</p>
              )
            }
          </div>
        ))
      }
    </div>
  )
}