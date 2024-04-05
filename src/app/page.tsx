import { calendarStartDate as _calendarStartDate, weeksNumberIncludedInMonth } from "@/utilities/time";
import { getAllActivities, getMonthGlobalStyle } from "./actions/calendars";
import styles from './page.module.scss';
import WeekDayHeader from "@/components/week-day-header/week-day-header";
import ActivityWeekItem from "@/components/activity-week-item/activity-week-item";
import NavigationHeader from "@/components/navigation-header/navigation-header";

export default async function Home(props: {date: Date}) {

  const [decoration, data] = await Promise.all([getMonthGlobalStyle(new Date()), getAllActivities(new Date())])
  const calendarStartDate = _calendarStartDate(props.date)
  const neededWeeks = weeksNumberIncludedInMonth(props.date)
  const weeksStartDates = new Array(neededWeeks).fill(0).map((_, index) => {
    const date = new Date(calendarStartDate.valueOf())
    date.setDate(date.getDate() + 7 * index)
    return date
  })

  return (
    <>
      <div className={styles.container}  >
        <style>
          {
            (decoration?.style?.backgroundImageDark || decoration?.style?.backgroundImageLight) ?
            `
            .customizeBG {
              background-image: url(${decoration?.style?.backgroundImageLight});
              @media (prefers-color-scheme: dark) {
                background-image: url(${decoration?.style?.backgroundImageDark})
              }
            }
            ` : ''
          }
        </style>
        <div className={`${styles.month} customizeBG`} style={{...decoration?.style}} >
          <NavigationHeader month={new Date()} />
          <WeekDayHeader />
          {
            weeksStartDates.map((startDate) => (
              <div key={`${startDate}`} >
                <ActivityWeekItem data={data} startDate={startDate} currentMonth={props.date || new Date()} />
              </div>
            ))
          }
        </div>
      </div>
      
    </>
  )
}