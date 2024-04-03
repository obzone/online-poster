'use server'

import { monthEndDate, monthStartDate } from "@/utilities/time";
import { env } from "process";
import { Activity, Decoration } from "../actions/calendars";
import { sortActivityLayout } from "@/utilities/calendar";

export async function budibaseFetch(url: string, init: RequestInit) {
  const {body, headers, ...otherFields} = init
  return fetch(`${env.X_BUDIBASE_BASE_URL!}${url}`, {
    ...otherFields,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-budibase-api-key": env.X_BUDIBASE_API_KEY!,
      "x-budibase-app-id": env.X_BUDIBASE_APP_ID!,
      ...headers,
    },
    body
  })
}

export async function budibaseFetchMonthActivities(date: Date) {
  const monthStart = monthStartDate(date)
  const monthEnd = monthEndDate(date)
  const queryBody: any = {
    "query": {
      // "allOr": true, // match any filter
      // "allOr": true, // match all filter
      // "onEmptyFilter": "none", // default return none
      "string": {},
      "fuzzy": {},
      "range": {
        "startTime": {
          "low": monthStart.toISOString(),
          "high": monthEnd.toISOString()
        }
      },
      "equal": {},
      "notEqual": {},
      "empty": {},
      "notEmpty": {},
      "oneOf": {}
    },
    "paginate": false,
    "bookmark": null,
    "limit": 100,
    "sort": {
      "order": "ascending",
      "column": "startTime",
      "type": "string"
    }
  }
  return budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_ACTIVITIES}/rows/search`, {
    method: 'POST',
    body: queryBody
  })
}

export async function budibaseFetchMonthActivitiesWithLayout(date: Date) {
  const startTime = monthStartDate(date)
  const endTime = monthEndDate(date)
  const queryBody: any = {
    parameters: {
      startTime,
      endTime
    }
  }
  const response = await budibaseFetch(`/queries/${env.X_BUDIBASE_QUERY_ID_ACTIVITY_WITH_LAYOUT}`, {
    method: 'POST',
    body: JSON.stringify(queryBody)
  })
  if (response.status != 200) throw new Error(response.statusText)
  const {data} = await response.json()
  data.forEach((activity: Activity) => sortActivityLayout(activity));
  return data
}

export async function upsertLayout(layout: Decoration) {
  const queryBody: any = JSON.stringify({
    parameters: {
      activityId: layout.activityId,
      ...layout,
    }
  })
  const response = await budibaseFetch(`/queries/${env.X_BUDIBASE_QUERY_ID_UPSERT_LAYOUT}`, {
    method: 'POST',
    body: queryBody
  })
  response.status
  return {'status': response.status}
}
