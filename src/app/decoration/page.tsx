'use client'

import ActivityWeekItem from "@/components/decoration/activity-week-item/activity-week-item";
import styles from './page.module.scss'
import { Activity, getAll } from "../actions/calendars";
import { useEffect, useMemo, useState } from "react";
import { calendarStartDate as _calendarStartDate, weeksNumberIncludedInMonth } from "@/utilities/time";

export default function Decoration(props: {date: Date}) {
  const [data, setData] = useState<Array<Activity>>()

  useEffect(() => {
    (async () => {
      const data = await getAll()
      setData(data)
      props
    })()
  }, [])

  const weeksStartDates = useMemo(() => {
    const calendarStartDate = _calendarStartDate(props.date)
    const neededWeeks = weeksNumberIncludedInMonth(props.date)
    return new Array(neededWeeks).fill(0).map((_, index) => {
      const date = new Date(calendarStartDate.valueOf())
      date.setDate(date.getDate() + 7 * index)
      return date
    })
  }, [props.date])

  return (
    <div className={styles.container} >
      <div className={styles.month} >
        {
          weeksStartDates.map((startDate) => (
            <div key={`${startDate}`} >
              <ActivityWeekItem data={data} startDate={startDate} currentMonth={props.date || new Date()} />
            </div>
          ))
        }
      </div>
      <div className={styles.decorationPanel} >

      </div>
    </div>
  )
}