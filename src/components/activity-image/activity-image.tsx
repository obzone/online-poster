import Image from "next/image";
import { CSSProperties } from "react";

export default function ActivityImage(props: {style?: CSSProperties, value: any}) {
  return (
    <img style={props.style} src={props.value} alt="" />
  )
}