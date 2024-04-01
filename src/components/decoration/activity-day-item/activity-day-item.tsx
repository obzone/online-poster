import { Activity, Decoration } from '@/app/actions/calendars'
import ActivityDayItemStatusBar from '../activity-day-item-status-bar/activity-day-item-status-bar'
import styles from './activity-day-item.module.scss'
import DecorationControlPannel, { DecorationComponentCommonProps } from '../control-pannel/control-pannel'
import { CSSProperties, useCallback, useEffect, useReducer, useState } from 'react'
import ActivityText, { DECORATION_COMPONENT_TYPE_TEXT } from '../activity-text/activity-text'

export default function ActivityDayItem(props: {date: Date, activities?: Array<Activity>}) {
  const [isFieldLayoutControlPannelVisible, setFieldLayoutControlPannelVisible] = useState(false)
  const [isDayItemLayoutControlPannelVisible, seDayItemLayoutControlPannelVisible] = useState(false)
  const [selectedFieldLayout, setSelectedFieldLayout] = useState<Decoration>()
  const [selectedDayItemLayout, setSelectedDayItemLayout] = useState<Decoration>()
  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const [changedFieldLayout, setChangedFieldLayout] = useState<Decoration>()

  const onNodeClick = useCallback((activity: Activity, node?: Decoration) => {
    setSelectedActivity(activity)
    setSelectedFieldLayout(node)
    setFieldLayoutControlPannelVisible(true)
  }, [])

  const onDecorateNodeCancelClick = useCallback(() => {
    setFieldLayoutControlPannelVisible(false)
    setSelectedActivity(undefined)
    setSelectedFieldLayout(undefined)
  }, [])
  const onDecorateNodeConfirmClick = useCallback(() => {
    setFieldLayoutControlPannelVisible(false)
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
                isFieldLayoutControlPannelVisible && (
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

function reducer(state: CSSProperties, action: {type?: string, payload: CSSProperties}): CSSProperties {
  switch (action.type) {
    case 'delete':
      // TODO delete keys
      return state
  
    default:
      return {...state, ...action.payload}
  }
}

// provide field order and operation functions
export function DayItemDecorationComponent(props: DecorationComponentCommonProps) {

  const [state, dispatch] = useReducer<typeof reducer>(reducer, props.fieldLayout.style || {})

  useEffect(() => {
    props.onChange && props.onChange({
      ...props.fieldLayout,
      style: state
    })
  }, [state])

  return (
    <div className={styles.itemContainer} >
      <h1 >Font setting</h1>
      <div>
        <p>Font Color</p>
        <input onChange={e => dispatch({payload: {color: e.target.value}})} className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
      <div>
        <p>Margin</p>
        <div className={styles.iconGroupContainer} >
          <input className="input" onChange={e => dispatch({payload: {marginTop: `${e.target.value}px`}})} type="text" defaultValue={state.marginTop} placeholder="Top" />
          <input className="input" onChange={e => dispatch({payload: {marginLeft: `${e.target.value}px`}})} type="text" defaultValue={state.marginLeft} placeholder="Left" />
          <input className="input" onChange={e => dispatch({payload: {marginBottom: `${e.target.value}px`}})} type="text" defaultValue={state.marginBottom} placeholder="Bottom" />
          <input className="input" onChange={e => dispatch({payload: {marginRight: `${e.target.value}px`}})} type="text" defaultValue={state.marginRight} placeholder="Right" />
        </div>
      </div>
      <div>
        <p>BackgroundColor</p>
        <input onChange={e => dispatch({payload: {backgroundColor: `${e.target.value}`}})} className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
      <div>
        <p>BorderRadius</p>
        <input onChange={e => dispatch({payload: {borderRadius: `${e.target.value}px`}})} className="input" type="text" placeholder="e.g. 9" />
      </div>
      <div>
        <p>Display</p>
        <span className="checkbox">
          <input type="checkbox" value={'none'} onChange={e => dispatch({payload: {display: e.target.checked ? 'none' : 'unset'}})} />
          Hidden
        </span>
      </div>
    </div>
  )
}