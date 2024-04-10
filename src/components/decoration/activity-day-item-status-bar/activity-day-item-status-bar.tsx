import { MouseEventHandler } from 'react'
import styles from './activity-day-item-status-bar.module.scss'
import { WEEKS } from '@/app/variable'
import { faChild, faFemale, faGamepad, faHamburger, faMale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const TagMap: {[key: string]: IconProp} = {
  'food': faHamburger,
  'female': faFemale,
  'male': faMale,
  'child': faChild
}

export default function ActivityDayItemStatusBar(props: { date: Date, tags?: string, onClick?: MouseEventHandler }) {
  const tagObjects = props.tags?.split(',')
  return (
    <div className={styles.statusBarContainer} onClick={props.onClick} >
      <div className={styles.tagContainer} >
        {
          tagObjects?.map(tag => (
            <span className='tag icon' key={tag} >
              {
                TagMap[tag] ? (
                  <FontAwesomeIcon icon={TagMap[tag]} />
                ) : tag
              }
            </span>
          ))
        }
      </div>
      <p className={`${styles.text} ${styles.onTabletHidden}`} >{props.date.getDate()}</p>
      <p className={`${styles.text} ${styles.onPCHidden}`} >{`${props.date.getDate()}/${WEEKS[props.date.getDay()]}`}</p>
    </div>
  )
}