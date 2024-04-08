'use client'

import ActivityWeekItem from "@/components/decoration/activity-week-item/activity-week-item";
import DecorationControlPannel from "@/components/decoration/control-pannel/control-pannel";
import CalendarHeader from "@/components/decoration/header/header";
import WeekDayHeader from "@/components/decoration/week-day-header/week-day-header";
import { calendarStartDate as _calendarStartDate, weeksNumberIncludedInMonth } from "@/utilities/time";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Decoration, getAllActivities, getMonthGlobalStyle, upsertLayout } from "../actions/calendars";
import styles from './page.module.scss';

export default function Decoration() {
  const [data, setData] = useState<Activity[]>()
  const [decoration, setDecoration] = useState<Decoration>()
  const [changedDecoration, setChangedDecoration] = useState<Decoration>()

  useEffect(() => {
    getMonthGlobalStyle(new Date()).then(decoration => setDecoration(decoration))
    getAllActivities(new Date()).then(data => setData(data))
  }, [])

  const onDecorateControlCancelClick = useCallback(() => {}, [])
  const onDecorateControlConfirmClick = useCallback(async () => {
    if (!decoration) return
    const newStyle = {
      ...decoration?.style,
      ...changedDecoration?.style
    }
    await upsertLayout({...decoration, style: newStyle})
  }, [changedDecoration, decoration])

  const weeksStartDates = useMemo(() => {
    const calendarStartDate = _calendarStartDate()
    const neededWeeks = weeksNumberIncludedInMonth()
    return new Array(neededWeeks).fill(0).map((_, index) => {
      const date = new Date(calendarStartDate.valueOf())
      date.setDate(date.getDate() + 7 * index)
      return date
    })
  }, [])

  return (
    <>
      {
        decoration && (
          <DecorationControlPannel
            isCancelButtonHidden
            selectedFieldLayout={decoration} 
            onChange={(layout) => setChangedDecoration(layout)} 
            onConfirmClick={onDecorateControlConfirmClick} 
            onCancelClick={onDecorateControlCancelClick} 
          />
        )
      }
      <div className={styles.container}  >
        <style>
          {
            (changedDecoration?.style?.backgroundImageDark || changedDecoration?.style?.backgroundImageLight) ?
            `
            .customizeBG {
              background-image: url(${changedDecoration?.style?.backgroundImageLight});
              @media (prefers-color-scheme: dark) {
                background-image: url(${changedDecoration?.style?.backgroundImageDark})
              }
            }
            ` : ''
          }
        </style>
        <div className={`${styles.month} customizeBG`} style={{...decoration?.style, ...changedDecoration?.style }} >
          <CalendarHeader month={new Date()} />
          <WeekDayHeader />
          {
            weeksStartDates.map((startDate) => (
              <div key={`${startDate}`} >
                <ActivityWeekItem data={data} startDate={startDate} currentMonth={new Date()} />
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