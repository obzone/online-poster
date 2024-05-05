import { MetadataRoute } from 'next'
import { getAllOrganizations } from './actions/organizations'
import { env } from 'process'

export async function generateSitemaps() {
  return getAllOrganizations()
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {

  /// TODO add event page sitemap
  return [{
    url: `https://${env.DOMAIN}/?orgId=${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  }]
}