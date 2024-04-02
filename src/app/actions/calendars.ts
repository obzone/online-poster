'use server'

import { CSSProperties } from "react"
import { budibaseFetchMonthActivitiesWithLayout, defaultActivityLayout } from "../services/calendar"

export interface Activity {
  id: string
  favicon?: string
  thumbnail?: string
  post?: string
  title: string
  subject?: string
  startTime: Date
  endTime?: Date
  createdAt?: Date
  updatedAt?: Date
  spot: string
  target?: string
  tags?: Array<string>
  layout: Array<Decoration>
  [key: string]: any
}

export interface MediaCSSProperties extends CSSProperties {
  backgroundImageDark?: string
  backgroundImageLight?: string
}

export interface Decoration {
  id?: string
  type: string
  keyExtractor: (keyof Activity) | 'calendarHeader' | 'monthGlobal'
  style?: MediaCSSProperties
  displayOrder: number
}

export async function getAllActivities(date: Date): Promise<Array<Activity>> {
  const activities = await budibaseFetchMonthActivitiesWithLayout(date)
  console.debug(activities)
  return activities

  return new Array(10).fill(0).map((_, index) => {
    const _date = new Date(date.valueOf())
    _date.setDate(_date.getDate() - index)
    return {
      id: `${Date.now()}`,
      title: 'TITLE CAN BE VERY LONG',
      subject: `introduct the activty${_date}`,
      startTime: _date,
      endTime: _date,
      spot: 'can be a text to describe the spot',
      target: 'maybe empty sometimes',
      tags: ['food', '$4/per'],
      layout: defaultActivityLayout
    }
  })
}

export async function getActivityById(id: string) {

}

export async function getHeaderStyle(): Promise<Decoration> {
  return {type: 'calendar-header', keyExtractor: 'calendarHeader', displayOrder: 1}
}

export async function getMonthGlobalStyle(): Promise<Decoration> {
  return {type: 'month-global', keyExtractor: 'monthGlobal', displayOrder: 1}
}