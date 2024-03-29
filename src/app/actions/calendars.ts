'use server'

import { CSSProperties } from "react"

const defaultActivityLayout: Decoration[] = [{
  type: 'activity-text',
  keyExtractor: 'title',
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'subject',
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-date',
  keyExtractor: 'title',
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'spot',
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'target',
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}]

export interface Activity {
  id: string
  favicon?: string
  title: string
  subject?: string
  startTime: Date
  endTime?: Date
  spot: string
  target?: string
  tags?: Array<string>
  layout: Array<Decoration>
}

export interface Decoration {
  type: string
  keyExtractor: keyof Activity | 'calendarHeader'
  style?: CSSProperties
}

export async function getAllActivities(): Promise<Array<Activity>> {
  const date = new Date()
  return new Array(10).fill(0).map((_, index) => {
    const _date = new Date(date.valueOf())
    _date.setDate(_date.getDate() + index)
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
  return {type: 'calendar-header', keyExtractor: 'calendarHeader'}
}