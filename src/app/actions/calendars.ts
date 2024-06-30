'use server'

import { CSSProperties } from "react"
import { budibaseFetchActivityById, budibaseFetchMonthActivitiesWithLayout, budibaseFetchMonthGlobalLayout, budibaseFetchMonthHeaderLayout, budibaseUpsertLayout } from "../services/calendar"
import { cookies } from "next/headers"

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
  tags?: string
  layout: Array<Decoration>
  [key: string]: any
}

export interface CustomCSSProperties extends CSSProperties {
  backgroundImageDark?: string
  backgroundImageLight?: string
  dateFormate?: any
}

export interface Decoration {
  id?: string
  type: string
  keyExtractor: (keyof Activity)
  style?: CustomCSSProperties
  displayOrder: number
  activityId?: string
}

export async function getAllActivities(date: Date, orgId?: string, useCache=true): Promise<Array<Activity>> {
  const organizationId = orgId ? orgId : cookies().get('orgId')?.value
  const activities = await budibaseFetchMonthActivitiesWithLayout(date, organizationId!, {cache: useCache ? 'default' : 'no-cache'})
  return activities
}

export async function upsertLayout(layout: Decoration) {
  await budibaseUpsertLayout(layout)
}

export async function getActivityById(id: string): Promise<Activity> {
  const budibaseId = encodeURIComponent(JSON.stringify([id]))
  return budibaseFetchActivityById(budibaseId)
}

export async function getHeaderStyle(date: Date): Promise<Decoration> {
  return budibaseFetchMonthHeaderLayout(date)
}

export async function getMonthGlobalStyle(date: Date): Promise<Decoration> {
  return budibaseFetchMonthGlobalLayout(date)
}

export async function downLoadMonthCalendar(date: Date) {
}