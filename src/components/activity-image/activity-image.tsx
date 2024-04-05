import Image from "next/image";
import { CSSProperties } from "react";
import variables from '@/app/variable.module.scss'

export default function ActivityImage(props: {style?: CSSProperties, value: any}) {
  const optimizeHeight = Number.parseInt(`${props.style?.height || '100px'}`.replace('px', ''))
  const optimizeWidth = Number.parseInt(`${variables?.minCalendarItemWidth || '200px'}`.replace('px', ''))
  return (
    <div style={props.style} >
      <Image 
        src={props.value}
        width={optimizeWidth}
        height={optimizeHeight}
        alt="" 
      />
    </div>
  )
}