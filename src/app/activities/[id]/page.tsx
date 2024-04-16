import { getActivityById } from "@/app/actions/calendars";
import ActivityCard from "@/components/activity-card/activity-card";
import moment from "moment";
import { Metadata, ResolvingMetadata } from "next";

export default async function Page(props: { params: { id: string } }) {
  const activity = await getActivityById(props.params.id)
  return (
    <div>
      <ActivityCard activity={activity} />
    </div>
  )
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const activity = await getActivityById(params.id)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  const time = `${activity?.startTime ? moment.utc(activity.startTime).format('yyyy-MM-DD') : null } ${activity?.startTime ? ' ' + moment.utc(activity?.startTime!).local().format('hh:mm A') : null} ${activity?.endTime ? ' ~ ' +  moment.utc(activity?.endTime!).local().format('hh:mm A') : null}`
 
  return {
    title: activity.title,
    description: `${activity.spot} ${'\n'} ${time}`,
    openGraph: {
      images: [activity.post || activity.favicon || '', ...previousImages],
    },
  }
}