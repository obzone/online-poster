import { MouseEventHandler } from 'react'
import { WEEKS } from '../week-day-header/week-day-header'
import styles from './activity-day-item-status-bar.module.scss'

export default function ActivityDayItemStatusBar(props: { date: Date, tags?: Array<string>, onClick?: MouseEventHandler }) {
  return (
    <div className={styles.statusBarContainer} onClick={props.onClick} >
      <div className={styles.tagContainer} >
        {
          props.tags?.map(tag => (
            <span className='tag' key={tag} >{tag}</span>
          ))
        }
      </div>
      <p className={`${styles.text} ${styles.onTabletHidden}`} >{props.date.getDate()}</p>
      <p className={`${styles.text} ${styles.onPCHidden}`} >{`${props.date.getDate()}/${WEEKS[props.date.getDay()]}`}</p>
    </div>
  )
}