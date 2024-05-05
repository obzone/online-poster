import { budibaseFetchOrganizations } from "../services/organizations";

export interface Organization {
  id: string
  name: string
  description: string
  defaultPoster: string
  defaultFavicon: string
  userEmail: string
}

export async function getAllOrganizations(): Promise<Organization[]> {
  return budibaseFetchOrganizations()
}