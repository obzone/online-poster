import { monthEndDate, monthStartDate } from "@/utilities/time";
import { env } from "process";
import { Activity, Decoration } from "../actions/calendars";

export const defaultActivityLayout: Decoration[] = [{
  type: 'activity-text',
  keyExtractor: 'title',
  displayOrder: 1,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'subject',
  displayOrder: 2,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-date',
  keyExtractor: 'startTime',
  displayOrder: 3,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'spot',
  displayOrder: 4,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'target',
  displayOrder: 5,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}]

export async function budibaseFetch(url: string, init: RequestInit) {
  const {body, headers, ...otherFields} = init
  return fetch(`${env.X_BUDIBASE_BASE_URL!}${url}`, {
    ...otherFields,
    headers: {
      'x-budibase-api-key': env.X_BUDIBASE_API_KEY!,
      'x-budibase-app-id': env.X_BUDIBASE_APP_ID!,
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
    body: queryBody,
    cache: 'no-cache'
  })
}

export async function budibaseFetchMonthActivitiesWithLayout(date: Date) {
  const startTime = monthStartDate(date)
  const endTime = monthEndDate(date)
  const queryBody: any = {
    startTime,
    endTime
  }
  const response = await budibaseFetch(`/queries/${env.X_BUDIBASE_QUERY_ID_ACTIVITY_WITH_LAYOUT}`, {
    method: 'POST',
    body: queryBody
  })
  if (response.status != 200) throw new Error(response.statusText)
  const {data} = await response.json()
  data.forEach((activity: Activity) => sortActivityLayout(activity));
  return data
}

export async function upsertLayout(activity: Activity, layout: Decoration) {
  const queryBody: any = {
    activityId: activity.id,
    ...layout,
  }
  return budibaseFetch(`/queries/${env.X_BUDIBASE_QUERY_ID_UPSERT_LAYOUT}`, {
    method: 'POST',
    body: queryBody
  })
}

export function sortActivityLayout(activity: Activity) {
  if (!activity.layout || activity.layout.length == 0) {
    activity.layout = defaultActivityLayout
    return activity
  }
  activity.layout
  .sort((previous, current) => previous.displayOrder! - current.displayOrder!)
  return activity
}
