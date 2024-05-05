import { calendarStartDate as _calendarStartDate, weeksNumberIncludedInMonth } from "@/utilities/time";
import { getAllActivities, getMonthGlobalStyle } from "./actions/calendars";
import styles from './page.module.scss';
import WeekDayHeader from "@/components/week-day-header/week-day-header";
import ActivityWeekItem from "@/components/activity-week-item/activity-week-item";
import NavigationHeader from "@/components/navigation-header/navigation-header";
import { headers } from "next/headers";
import { getAllOrganizations } from "./actions/organizations";
import { env } from "process";

export default async function Home({searchParams: {month}}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  const queryMonth = month ? new Date(month+'-15' as string) : new Date()
  const [decoration, data] = await Promise.all([getMonthGlobalStyle(queryMonth), getAllActivities(queryMonth, headers().get('organization-id') || undefined)])
  const calendarStartDate = _calendarStartDate()
  const neededWeeks = weeksNumberIncludedInMonth()
  const weeksStartDates = new Array(neededWeeks).fill(0).map((_, index) => {
    const date = new Date(calendarStartDate.valueOf())
    date.setDate(date.getDate() + 7 * index)
    return date
  })
  const organizations = await getAllOrganizations()
  const orgId = headers().get('organization-id')
  const organization = organizations.find((org) => `${org.id}` == orgId)
  const jsonLd = {
    "@context": `https://${env.DOMAIN}/`,
    "@type": "Organization",
    "name": `${organization?.name}`,
    "url": `https://${env.DOMAIN}/?orgId=${organization?.id}`,
    "sponsor":
    {
      "@type": "Organization",
      "name": `${organization?.name}`,
      "url": `${organization?.url}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.container}  >
        <style>
          {
            (decoration?.style?.backgroundImageDark || decoration?.style?.backgroundImageLight) ?
            `
            .customizeBG {
              background-image: url(${decoration?.style?.backgroundImageLight});
              @media (prefers-color-scheme: dark) {
                background-image: url(${decoration?.style?.backgroundImageDark})
              }
            }
            ` : ''
          }
        </style>
        <div className={`${styles.month} customizeBG`} style={{...decoration?.style}} >
          <NavigationHeader month={queryMonth} />
          <WeekDayHeader />
          {
            weeksStartDates.map((startDate) => (
              <div key={`${startDate}`} >
                <ActivityWeekItem data={data} startDate={startDate} currentMonth={queryMonth} />
              </div>
            ))
          }
        </div>
      </div>
      
    </>
  )
}