import { MetadataRoute } from 'next'
import { getAllOrganizations } from './actions/organizations'
import { env } from 'process'
import { getAllActivities } from './actions/calendars'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const organizations = await getAllOrganizations()
  const sitemaps = await Promise.all(organizations.map(({id}) => organizationsSitemaps(id)))
  const result = sitemaps.reduce((previousValue, currentValue) => {
    return [...previousValue, ...currentValue]
  }, [])
  return result as MetadataRoute.Sitemap
}

async function organizationsSitemaps(id: string) {
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