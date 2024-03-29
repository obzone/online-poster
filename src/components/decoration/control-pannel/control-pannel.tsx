import { Activity, Decoration } from '@/app/actions/calendars'
import styles from './control-pannel.module.scss'
import { ActivityTextDecorationComponent, DECORATION_COMPONENT_TYPE_TEXT } from '../activity-text/activity-text'
import { JSXElementConstructor } from 'react'
import { ActivityHeaderDecorationComponent, DECORATION_COMPONENT_TYPE_HEADER } from '../activity-header/activity-header'

export interface DecorationComponentCommonProps {
  fieldLayout: Decoration
  onChange?: (layout: Decoration) => void
}

export const COMPONENTS_MAP: {[key: string]: JSXElementConstructor<DecorationComponentCommonProps>} = {
  [DECORATION_COMPONENT_TYPE_TEXT]: ActivityTextDecorationComponent,
  [DECORATION_COMPONENT_TYPE_HEADER]: ActivityHeaderDecorationComponent,
}

interface ControlPannelProps {
  onCancelClick: ()=>void
  onConfirmClick: ()=>void
  onChange?: (layout: Decoration)=>void
  selectedActivity?: Activity
  selectedFieldLayout: Decoration
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