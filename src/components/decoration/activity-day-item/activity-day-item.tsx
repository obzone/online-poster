import { Activity, DecorationComponent } from '@/app/actions/calendars'
import ActivityDayItemStatusBar from '../activity-day-item-status-bar/activity-day-item-status-bar'
import styles from './activity-day-item.module.scss'
import ControlPannel from '../control-pannel/control-pannel'
import { useCallback, useState } from 'react'
import ActivityText from '../activity-text/activity-text'

export default function ActivityDayItem(props: {date: Date, activities?: Array<Activity>}) {
  const [isControlPannelVisible, setControlPannelVisible] = useState(false)
  const [selectedNode, setSelectedNode] = useState<DecorationComponent>()
  const [selectedActivity, setSelectedActivity] = useState<Activity>()


  const onNodeClick = useCallback((activity: Activity, node?: DecorationComponent) => {
    setSelectedActivity(activity)
    setSelectedNode(node)
    setControlPannelVisible(true)
  }, [])

  const onDecorateNodeCancelClick = useCallback(() => {
    setControlPannelVisible(false)
    setSelectedActivity(undefined)
    setSelectedNode(undefined)
  }, [])
  const onDecorateNodeConfirmClick = useCallback(() => {
    setControlPannelVisible(false)
  }, [])

  const renderActivitiyContent = useCallback((activity: Activity) => {
    return (
      <>
      {
        activity.layout?.map(nodeLayout => {
          const isCurrentNodeSelected = selectedNode?.keyExtractor == nodeLayout.keyExtractor && selectedNode?.type == nodeLayout.type
          switch (nodeLayout.type) {
            case 'activity-text':
              return (
                <div key={`${nodeLayout.keyExtractor}`} className={`${styles.nodeItem} ${isCurrentNodeSelected ? styles.isSelected : ''}`} onClick={e => {
                  e.stopPropagation()
                  onNodeClick(activity, nodeLayout)
                }} >
                  <ActivityText value={activity[nodeLayout.keyExtractor]} />
                </div>
              )
            default:
              break;
          }
        })
      }
      </>
    )
  }, [selectedNode, selectedActivity])

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
                  <ControlPannel activity={selectedActivity} node={selectedNode} onConfirmClick={onDecorateNodeConfirmClick} onCancelClick={onDecorateNodeCancelClick} />
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}