import { CSSProperties } from "react";
import styles from './activity-text.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignRight, faAlignCenter, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import DropDown from "@/components/drop-down/drop-down";

export default function ActivityText(props: {style?: CSSProperties, value: any}) {
  return (
    <div style={props.style} >
      <p>{props.value}</p>
    </div>
  )
}

export function ActivityTextDecorationComponent() {
  return (
    <div className={styles.itemContainer} >
      <div>
        <p>Font Size</p>
        <DropDown>
          <div></div>
        </DropDown>
      </div>
      <div>
        <p>Font Color</p>
        <input className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
      <div>
        <p>Alignment</p>
        <div className={styles.iconGroupContainer} >
          <FontAwesomeIcon color="has-text-primary" icon={faAlignLeft} />
          <FontAwesomeIcon icon={faAlignCenter} />
          <FontAwesomeIcon icon={faAlignRight} />
        </div>
      </div>
      <div>
        <p>Margin</p>
        <div className={styles.iconGroupContainer} >
          <input className="input" type="text" placeholder="Top" />
          <input className="input" type="text" placeholder="Left" />
          <input className="input" type="text" placeholder="Bottom" />
          <input className="input" type="text" placeholder="Right" />
        </div>
      </div>
      <div>
        <p>BackgroundColor</p>
        <input className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
    </div>
  )
}