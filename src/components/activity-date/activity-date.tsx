import { CustomCSSProperties } from "@/app/actions/calendars";

export default function ActivityDate(props: {style?: CustomCSSProperties, value: [Date]}) {
  const defaultDateFormate: any = {
    hour: "numeric",
    minute: "numeric",
  }
  const valueArray = props.value.map((date)=> new Intl.DateTimeFormat("en-US", props.style?.dateFormate || defaultDateFormate).format(new Date(date)) )
  return (
    <div style={props.style} className="activity-date" >
      <p>{valueArray.join('~')}</p>
    </div>
  )
}