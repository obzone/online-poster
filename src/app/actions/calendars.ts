'use server'

import { CSSProperties } from "react"
import { budibaseFetchActivityById, budibaseFetchMonthActivitiesWithLayout, budibaseFetchMonthGlobalLayout, budibaseFetchMonthHeaderLayout, budibaseFetchOrganizations, budibaseUpsertLayout } from "../services/calendar"
import { revalidatePath, revalidateTag } from "next/cache"
import { env } from "process"

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
  organizationId: string
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

export interface Organization {
  id: string
  name: string
}

export async function getAllActivities(date: Date, orgId?: string): Promise<Array<Activity>> {
  const activities = await budibaseFetchMonthActivitiesWithLayout(date, orgId)
  return activities
}

export async function upsertLayout(layout: Decoration) {
  await budibaseUpsertLayout(layout)
  revalidateTag(`/queries/${env.X_BUDIBASE_QUERY_ID_ACTIVITY_WITH_LAYOUT}`)
  revalidateTag(`/tables/${env.X_BUDIBASE_TABLE_ID_LAYOUT}/rows/search`)
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

export async function getAllOrganizations(): Promise<Organization[]> {
  return budibaseFetchOrganizations()
}