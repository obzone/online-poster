import { monthEndDate, monthStartDate } from "@/utilities/time";
import { env } from "process";
import { Activity, Decoration } from "../actions/calendars";
import { sortActivityLayout } from "@/utilities/calendar";
import { DECORATION_COMPONENT_TYPE_HEADER, DECORATION_COMPONENT_TYPE_MONTH_GLOBAL } from "../variable";

export async function budibaseFetch(url: string, init: RequestInit) {
  const { body, headers, ...otherFields } = init
  const response = await fetch(`${env.X_BUDIBASE_BASE_URL!}${url}`, {
    ...otherFields,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-budibase-api-key": env.X_BUDIBASE_API_KEY!,
      "x-budibase-app-id": env.X_BUDIBASE_APP_ID!,
      ...headers,
    },
    body,
    next: { tags: [url] },
  },)
  if (response.status != 200) throw new Error(response.statusText)
  return response
}

export interface ActivityModel {
  id: number
  title: string
  subject: string
  startTime: string
  endTime: string
  spot: string
  target: string
  createdAt: string
  updatedAt: string
  post: string
  organizationId: string
}

export async function budibaseFetchMonthActivities(date: Date, orgId?: string) {
  const monthStart = monthStartDate(date)
  const monthEnd = monthEndDate(date)
  const queryBody: any = JSON.stringify({
    "query": {
      // "allOr": true, // match any filter
      // "allOr": true, // match all filter
      // "onEmptyFilter": "none", // default return none
      "string": {
        "organizationId": orgId
      },
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
      "column": "updatedAt",
      "type": "string"
    }
  })
  return budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_ACTIVITIES}/rows/search`, {
    method: 'POST',
    body: queryBody
  })
}

export async function budibaseFetchMonthActivitiesWithLayout(date: Date, orgId: string, config?: { cache?: RequestCache }) {
  const startTime = monthStartDate(date)
  const endTime = monthEndDate(date)
  const queryBody: any = {
    parameters: {
      startTime,
      endTime
    }
  }
  if (orgId) {
    queryBody.parameters.orgId = orgId
  }
  const response = await budibaseFetch(`/queries/${orgId ? env.X_BUDIBASE_QUERY_ID_ORGANIZATION_ACTIVITY_WITH_LAYOUT : env.X_BUDIBASE_QUERY_ID_ACTIVITY_WITH_LAYOUT}`, {
    method: 'POST',
    body: JSON.stringify(queryBody),
    cache: config?.cache
  })
  const { data } = await response.json()
  data.forEach((activity: Activity) => sortActivityLayout(activity));
  return data
}

export async function budibaseUpsertLayout(layout: Decoration) {
  const queryBody: any = JSON.stringify({
    parameters: layout
  })
  return budibaseFetch(`/queries/${env.X_BUDIBASE_QUERY_ID_UPSERT_LAYOUT}`, {
    method: 'POST',
    body: queryBody
  })
}

export async function budibaseFetchMonthGlobalLayout(date = new Date(), orgId?: string) {
  const keyExtractor = `${date.getFullYear()}_${date.getMonth()}`
  const requetBody: any = JSON.stringify({
    "query": {
      "string": {
        "type": DECORATION_COMPONENT_TYPE_MONTH_GLOBAL,
        "keyExtractor": keyExtractor
      },
      "fuzzy": {},
      "range": {},
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
      "order": "descending",
      "column": "createdAt",
      "type": "string"
    }
  })
  const response = await budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_LAYOUT}/rows/search`, {
    method: 'POST',
    body: requetBody
  })
  const { data } = await response.json()
  if (data && data.length) return data[0]
  return { type: DECORATION_COMPONENT_TYPE_MONTH_GLOBAL, keyExtractor: keyExtractor }
}

export async function budibaseFetchMonthHeaderLayout(date = new Date()) {
  const keyExtractor = `${date.getFullYear()}_${date.getMonth()}`
  const requetBody: any = JSON.stringify({
    "query": {
      "string": {
        "type": DECORATION_COMPONENT_TYPE_HEADER,
        "keyExtractor": keyExtractor
      },
      "fuzzy": {},
      "range": {},
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
      "order": "descending",
      "column": "createdAt",
      "type": "string"
    }
  })
  const response = await budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_LAYOUT}/rows/search`, {
    method: 'POST',
    body: requetBody
  })
  const { data } = await response.json()
  if (data && data.length) return data[0]
  return { type: DECORATION_COMPONENT_TYPE_HEADER, keyExtractor: keyExtractor }
}

export async function budibaseFetchActivityById(id: string) {
  const response = await budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_ACTIVITIES}/rows/${id}`, {
    method: 'GET'
  })
  const { data } = await response.json()
  return data
}
