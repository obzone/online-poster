import { CSSProperties } from "react";

export default function ActivityText(props: {style?: CSSProperties, value: any}) {
  return (
    <div style={props.style} >
      <p>{props.value}</p>
    </div>
  )
}