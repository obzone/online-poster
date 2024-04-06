import { getActivityById } from "@/app/actions/calendars";
import ActivityCard from "@/components/activity-card/activity-card";

export default async function Page(props: { params: { id: string } }) {
  const activity = await getActivityById(props.params.id)
  return (
    <div>
      <ActivityCard activity={activity} />
    </div>
  )
}