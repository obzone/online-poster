import Image from "next/image";
import { CSSProperties } from "react";
import variables from '@/app/variable.module.scss'
import styles from './activity-image.module.scss'

export default function ActivityImage(props: {style?: CSSProperties, value: any}) {
  const optimizeHeight = Number.parseInt(`${props.style?.height || '60px'}`.replace('px', ''))
  const optimizeWidth = Number.parseInt(`${variables?.minCalendarItemWidth || '180px'}`.replace('px', ''))
  return (
      <Image 
        src={props.value}
        objectFit='contain'
        className={styles.container}
        width={optimizeWidth}
        height={optimizeHeight}
        style={props.style}
        alt="PLACEHOLDER" 
      />
  )
}