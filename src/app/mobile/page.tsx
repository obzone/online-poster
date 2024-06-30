import NavigationHeader from "@/components/navigation-header/navigation-header";
import { headers } from "next/headers";
import { ActivityModel, budibaseFetchMonthActivities } from "../services/calendar";
import MobileItem from "./components/item";
import styles from './page.module.scss';

export default async function MobileHome({ searchParams: { month } }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const queryMonth = month ? new Date(month + '-15' as string) : new Date()
  const response = await budibaseFetchMonthActivities(queryMonth, headers().get('organization-id')!)
  const { data }: {data: ActivityModel[]} = await response.json()
  console.debug(data)
  return (
    <div className={styles.container} >
      <NavigationHeader month={queryMonth} />
      {
        data.map(item => {
          return (
            <MobileItem key={item.id} {...item} />
          )
        })
      }
    </div>
  )
}