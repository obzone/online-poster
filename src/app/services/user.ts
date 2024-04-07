import { env } from "process"
import { budibaseFetch } from "./calendar"

export async function budibaseFetchAllAdmistrators() {

  const queryBody: any = JSON.stringify({
    "query": {
      // "allOr": true, // match any filter
      // "allOr": true, // match all filter
      // "onEmptyFilter": "none", // default return none
      "string": {
        status: 'active',
        roleId: 'ADMIN',
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
      "order": "ascending",
      "column": "updatedAt",
      "type": "string"
    }
  })
  const response = await budibaseFetch(`/tables/${env.X_BUDIBASE_TABLE_ID_USERS}/rows/search`, {
    method: 'POST',
    body: queryBody
  })
  const {data} = await response.json()
  return data
}