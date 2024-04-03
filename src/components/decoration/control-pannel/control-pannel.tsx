import { Activity, Decoration } from '@/app/actions/calendars'
import styles from './control-pannel.module.scss'
import { ActivityTextDecorationComponent, DECORATION_COMPONENT_TYPE_TEXT } from '../activity-text/activity-text'
import { JSXElementConstructor, useEffect } from 'react'
import { ActivityHeaderDecorationComponent } from '../header/header'
import { MonthGlobalSetting } from '../calendar/calendar'
import { DECORATION_COMPONENT_TYPE_DATE, DECORATION_COMPONENT_TYPE_HEADER, DECORATION_COMPONENT_TYPE_MONTH_GLOBAL } from '@/app/variable'
import { ActivityDateDecorationComponent } from '../activity-date/activity-date'

export interface DecorationComponentCommonProps {
  fieldLayout: Decoration
  onChange?: (layout: Decoration) => void
}

export const COMPONENTS_MAP: {[key: string]: JSXElementConstructor<DecorationComponentCommonProps>} = {
  [DECORATION_COMPONENT_TYPE_TEXT]: ActivityTextDecorationComponent,
  [DECORATION_COMPONENT_TYPE_HEADER]: ActivityHeaderDecorationComponent,
  [DECORATION_COMPONENT_TYPE_MONTH_GLOBAL]: MonthGlobalSetting,
  [DECORATION_COMPONENT_TYPE_DATE]: ActivityDateDecorationComponent,
}

interface ControlPannelProps {
  onCancelClick: ()=>void
  onConfirmClick: ()=>void
  onChange?: (layout: Decoration)=>void
  selectedActivity?: Activity
  selectedFieldLayout: Decoration
  isCancelButtonHidden?: boolean
}

const decorationComponentStack: Function[] = []

export default function DecorationControlPannel(props: ControlPannelProps) {
  const DecorationComponent = COMPONENTS_MAP[props.selectedFieldLayout.type]

  useEffect(() => {
    if (decorationComponentStack.length > 1) decorationComponentStack.pop()!()
    decorationComponentStack.push(props.onCancelClick)

    return () => {
      if (decorationComponentStack.length > 1) decorationComponentStack.pop()!()
    }
  }, [])

  return (
    <div className={styles.container} >
      <div className={styles.operatorContainer} >
        {
          <DecorationComponent onChange={props.onChange} fieldLayout={props.selectedFieldLayout} />
        }
      </div>
      <div className={styles.actionContainer} >
        {
          !props.isCancelButtonHidden ? (
            <button className='button is-text' onClick={props.onCancelClick} >Cancel</button>
          ) : <div></div>
        }
        <button className='button is-primary' onClick={props.onConfirmClick} >Confirm</button>
      </div>
    </div>
  )
}