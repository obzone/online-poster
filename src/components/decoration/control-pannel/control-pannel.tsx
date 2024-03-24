import { Activity, DecorationComponent } from '@/app/actions/calendars'
import styles from './control-pannel.module.scss'
import { ActivityTextDecorationComponent } from '../activity-text/activity-text'

interface ControlPannelProps {
  onCancelClick: ()=>void
  onConfirmClick: ()=>void
  activity?: Activity
  node?: DecorationComponent
}

export default function ControlPannel(props: ControlPannelProps) {
  return (
    <div className={styles.container} >
      <div className={styles.operatorContainer} >
        <ActivityTextDecorationComponent />
      </div>
      <div className={styles.actionContainer} >
        <button className='button is-text' onClick={props.onCancelClick} >Cancel</button>
        <button className='button is-primary' onClick={props.onConfirmClick} >Confirm</button>
      </div>
    </div>
  )
}