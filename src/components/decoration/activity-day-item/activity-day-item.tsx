import { Activity, Decoration } from '@/app/actions/calendars'
import ActivityDayItemStatusBar from '../activity-day-item-status-bar/activity-day-item-status-bar'
import styles from './activity-day-item.module.scss'
import DecorationControlPannel from '../control-pannel/control-pannel'
import { useCallback, useState } from 'react'
import ActivityText, { DECORATION_COMPONENT_TYPE_TEXT } from '../activity-text/activity-text'

export default function ActivityDayItem(props: {date: Date, activities?: Array<Activity>}) {
  const [isControlPannelVisible, setControlPannelVisible] = useState(false)
  const [selectedFieldLayout, setSelectedFieldLayout] = useState<Decoration>()
  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const [changedFieldLayout, setChangedFieldLayout] = useState<Decoration>()

  const onNodeClick = useCallback((activity: Activity, node?: Decoration) => {
    setSelectedActivity(activity)
    setSelectedFieldLayout(node)
    setControlPannelVisible(true)
  }, [])

  const onDecorateNodeCancelClick = useCallback(() => {
    setControlPannelVisible(false)
    setSelectedActivity(undefined)
    setSelectedFieldLayout(undefined)
  }, [])
  const onDecorateNodeConfirmClick = useCallback(() => {
    setControlPannelVisible(false)
    setSelectedActivity(undefined)
    setSelectedFieldLayout(undefined)
    // TODO save to server with activityid and keyextra

  }, [])

  const renderActivitiyContent = useCallback((activity: Activity) => {
    return (
      <>
      {
        activity.layout?.map(nodeLayout => {
          const isCurrentNodeSelected = selectedFieldLayout?.keyExtractor == nodeLayout.keyExtractor && selectedFieldLayout?.type == nodeLayout.type
          switch (nodeLayout.type) {
            case DECORATION_COMPONENT_TYPE_TEXT:
              return (
                <div key={`${nodeLayout.keyExtractor}`} className={`${isCurrentNodeSelected ? styles.isSelected : ''}`} onClick={e => {
                  e.stopPropagation()
                  onNodeClick(activity, nodeLayout)
                }} >
                  <ActivityText style={isCurrentNodeSelected ? changedFieldLayout?.style : nodeLayout.style} value={activity[nodeLayout.keyExtractor]} />
                </div>
              )
            default:
              break;
          }
        })
      }
      </>
    )
  }, [selectedFieldLayout, selectedActivity, changedFieldLayout])

  return (
    <div className={`${styles.container}`} >
      {
        (!props.activities || !props.activities.length) && (
          <ActivityDayItemStatusBar date={props.date} />
        )
      }
      {
        props.activities?.map(activity => {
          const {id, tags} = activity
          return (
            <div key={id} >
              <ActivityDayItemStatusBar tags={tags} date={props.date} />
              {
                renderActivitiyContent(activity)
              }
              {
                isControlPannelVisible && (
                  <DecorationControlPannel selectedActivity={selectedActivity} selectedFieldLayout={selectedFieldLayout!} onChange={(layout) => setChangedFieldLayout(layout)} onConfirmClick={onDecorateNodeConfirmClick} onCancelClick={onDecorateNodeCancelClick} />
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}