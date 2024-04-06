'use client'

import { Activity, CustomCSSProperties } from '@/app/actions/calendars'
import { DECORATION_COMPONENT_TYPE_DATE, DECORATION_COMPONENT_TYPE_IMAGE, DECORATION_COMPONENT_TYPE_TEXT } from '@/app/variable'
import useEmblaCarousel from 'embla-carousel-react'
import { JSXElementConstructor, useCallback } from 'react'
import ActivityDate from '../activity-date/activity-date'
import ActivityDayItemStatusBar from '../activity-day-item-status-bar/activity-day-item-status-bar'
import ActivityImage from '../activity-image/activity-image'
import ActivityText from '../activity-text/activity-text'
import styles from './activity-day-item.module.scss'
import { useDotButton } from '../carousel-dot-hooks/carousel-dot-hooks'

interface PureComponentProps {
  style?: CustomCSSProperties
  value: any
}

const ACTIVITY_ITEMS: {[key: string]: JSXElementConstructor<PureComponentProps>} = {
  [DECORATION_COMPONENT_TYPE_TEXT]: ActivityText,
  [DECORATION_COMPONENT_TYPE_DATE]: ActivityDate,
  [DECORATION_COMPONENT_TYPE_IMAGE]: ActivityImage,
}

export default function ActivityDayItem(props: {date: Date, activities?: Array<Activity>}) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const renderActivitiyContent = useCallback((activity: Activity) => {
    activity.dateRange = [activity.startTime, activity.endTime]
    return (
      <>
      {
        activity.layout?.map(nodeLayout => {
          const Comp = ACTIVITY_ITEMS[nodeLayout.type]
          if (!Comp) return null
          return (
            <div key={`${nodeLayout.keyExtractor}`} >
              <Comp style={nodeLayout.style} value={activity[nodeLayout.keyExtractor]} />
            </div>
          )
        })
      }
      </>
    )
  }, [])

  return (
    <div className={`${styles.container}`} ref={props.activities?.length ? emblaRef : undefined} >
      {
        (!props.activities || !props.activities.length) && (
          <ActivityDayItemStatusBar date={props.date} />
        )
      }
      <div className={`${props.activities?.length ? styles.embla__container : ''}`} >
        {
          props.activities?.map(activity => {
            const {id, tags} = activity
            return (
              <div key={id} className={`${props.activities?.length ? styles.embla__slide : ''}`} >
                <ActivityDayItemStatusBar tags={tags} date={props.date} />
                {
                  renderActivitiyContent(activity)
                }
              </div>
            )
          })
        }
      </div>
      {
        (!!props.activities?.length) && (
          <div className={styles.carouselContainer}>
            {
              props.activities.map((_, index) => {
                return (
                  <div onClick={() => onDotButtonClick(index)} className={`${ selectedIndex == index ? styles.selected : 'aaa'}`} />
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}