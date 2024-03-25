import { Activity, DecorationComponent } from '@/app/actions/calendars'
import styles from './control-pannel.module.scss'
import { ActivityTextDecorationComponent, DECORATION_COMPONENT_TYPE_TEXT } from '../activity-text/activity-text'
import { JSXElementConstructor } from 'react'

export interface DecorationComponentCommonProps {
  fieldLayout: DecorationComponent
  onChange?: (layout: DecorationComponent) => void
}

export const COMPONENTS_MAP: {[key: string]: JSXElementConstructor<DecorationComponentCommonProps>} = {
  [DECORATION_COMPONENT_TYPE_TEXT]: ActivityTextDecorationComponent
}

interface ControlPannelProps {
  onCancelClick: ()=>void
  onConfirmClick: ()=>void
  onChange?: (layout: DecorationComponent)=>void
  selectedActivity?: Activity
  selectedFieldLayout: DecorationComponent
}

export default function DecorationControlPannel(props: ControlPannelProps) {
  const DecorationComponent = COMPONENTS_MAP[props.selectedFieldLayout.type]
  return (
    <div className={styles.container} >
      <div className={styles.operatorContainer} >
        {
          <DecorationComponent onChange={props.onChange} fieldLayout={props.selectedFieldLayout} />
        }
      </div>
      <div className={styles.actionContainer} >
        <button className='button is-text' onClick={props.onCancelClick} >Cancel</button>
        <button className='button is-primary' onClick={props.onConfirmClick} >Confirm</button>
      </div>
    </div>
  )
}