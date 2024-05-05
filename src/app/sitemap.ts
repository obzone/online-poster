import { MetadataRoute } from 'next'
import { getAllOrganizations } from './actions/organizations'
import { env } from 'process'
import { getAllActivities } from './actions/calendars'

export async function generateSitemaps() {
  return getAllOrganizations()
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {

  const activities = await getAllActivities(new Date(), `${id}`) || []
  const activitSiteMaps: MetadataRoute.Sitemap = activities?.map((activity) => {
    return {
      url: `https://${env.DOMAIN}/activities/${activity.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    }
  })
  return [{
    url: `https://${env.DOMAIN}/?orgId=${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  }, ...activitSiteMaps]
}