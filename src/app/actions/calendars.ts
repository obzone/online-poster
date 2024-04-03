'use server'

import { CSSProperties } from "react"
import { budibaseFetchMonthActivitiesWithLayout, budibaseFetchMonthGlobalLayout, budibaseFetchMonthHeaderLayout, budibaseUpsertLayout } from "../services/calendar"
import { DECORATION_COMPONENT_TYPE_HEADER } from "@/components/decoration/header/header"

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
  keyExtractor: (keyof Activity)
  style?: MediaCSSProperties
  displayOrder: number
  activityId?: string
}

export async function getAllActivities(date: Date): Promise<Array<Activity>> {
  const activities = await budibaseFetchMonthActivitiesWithLayout(date)
  return activities
}

export async function upsertLayout(layout: Decoration) {
  await budibaseUpsertLayout(layout)
}

export async function getActivityById(id: string) {

}

export async function getHeaderStyle(date: Date): Promise<Decoration> {
  return budibaseFetchMonthHeaderLayout(date)
}

export async function getMonthGlobalStyle(date: Date): Promise<Decoration> {
  return budibaseFetchMonthGlobalLayout(date)
}