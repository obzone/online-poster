import { CustomCSSProperties } from "@/app/actions/calendars";
import moment from "moment";

export default function ActivityDate(props: {style?: CustomCSSProperties, value: [Date]}) {
  const valueArray = props.value.map((date)=> moment.utc(date).local().format('hh:mm A') )
  return (
    <div style={props.style} className="activity-date" >
      <p>{valueArray.join('~')}</p>
    </div>
  )
}