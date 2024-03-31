'use client'

import ActivityWeekItem from "@/components/decoration/activity-week-item/activity-week-item";
import DecorationControlPannel from "@/components/decoration/control-pannel/control-pannel";
import CalendarHeader from "@/components/decoration/header/header";
import WeekDayHeader from "@/components/decoration/week-day-header/week-day-header";
import { calendarStartDate as _calendarStartDate, weeksNumberIncludedInMonth } from "@/utilities/time";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Decoration, getAllActivities, getMonthGlobalStyle } from "../actions/calendars";
import styles from './page.module.scss';

export default function Decoration(props: {date: Date}) {
  const [data, setData] = useState<Activity[]>()
  const [decoration, setDecoration] = useState<Decoration>()
  const [changedDecoration, setChangedDecoration] = useState<Decoration>()

  useEffect(() => {
    getMonthGlobalStyle().then(decoration => setDecoration(decoration))
    getAllActivities().then(data => setData(data))
  }, [props.date])

  const onDecorateNodeCancelClick = useCallback(() => {
  }, [])
  const onDecorateNodeConfirmClick = useCallback(() => {
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

  console.debug(changedDecoration)

  return (
    <>
      {
        decoration && (
          <DecorationControlPannel
            isCancelButtonHidden
            selectedFieldLayout={decoration} 
            onChange={(layout) => setChangedDecoration(layout)} 
            onConfirmClick={onDecorateNodeConfirmClick} 
            onCancelClick={onDecorateNodeCancelClick} 
          />
        )
      }
      <div className={styles.container}  >
        <div className={styles.month} style={{...decoration?.style, ...changedDecoration?.style }} >
          <CalendarHeader month={new Date()} />
          <WeekDayHeader />
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
      
    </>
  )
}