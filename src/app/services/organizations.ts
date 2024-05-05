import { env } from "process"
import { budibaseFetch } from "./calendar"

export async function budibaseFetchOrganizations() {
  const requetBody: any = JSON.stringify({
    "query": {
      "string": {},
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
    "limit": 10,
    "sort": {
      "order": "descending",
      "column": "createdAt",
      "type": "string"
    }
  })
  const response = await budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_ORGANIZATION}/rows/search`, {
    method: 'POST',
    body: requetBody
  })
  const {data} = await response.json()
  return data
}
