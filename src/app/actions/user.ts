import { budibaseFetchAllAdmistrators } from "../services/user";

export async function getAllAdministrators() {
  return budibaseFetchAllAdmistrators()
}