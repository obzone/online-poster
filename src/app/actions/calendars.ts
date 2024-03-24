'use server'

import { CSSProperties } from "react"

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
  layout?: Array<DecorationComponent>
}

export interface DecorationComponent {
  type: string
  keyExtractor: keyof Activity
  style?: CSSProperties
}

export async function getAll(): Promise<Array<Activity>> {
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
      layout: [{
        type: 'activity-text',
        keyExtractor: 'title',
        style: {backgroundColor: 'red'}
      }, {
        type: 'activity-text',
        keyExtractor: 'subject'
      }, {
        type: 'activity-date',
        keyExtractor: 'title'
      }, {
        type: 'activity-text',
        keyExtractor: 'spot'
      }, {
        type: 'activity-text',
        keyExtractor: 'target'
      }]
    }
  })
}
export async function getById(id: string) {

}