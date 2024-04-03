import DropDown from "@/components/drop-down/drop-down";
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useCallback, useEffect, useReducer, useState } from "react";
import { DecorationComponentCommonProps } from "../control-pannel/control-pannel";
import styles from './activity-date.module.scss';
import { CustomCSSProperties } from "@/app/actions/calendars";

export const DECORATION_COMPONENT_TYPE_DATE = 'activity-Date'

export default function ActivityDate(props: {style?: CustomCSSProperties, value: any}) {
  const defaultDateFormate: any = {
    hour: "numeric",
    minute: "numeric",
  }
  return (
    <div style={props.style} className="activity-Date" >
      <p>{new Intl.DateTimeFormat("en-US", props.style?.dateFormate || defaultDateFormate).format(new Date(props.value)) }</p>
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

export function ActivityDateDecorationComponent(props: DecorationComponentCommonProps) {
  const [isFontsizeDropdownActive, setFontsizeDropdownActive] = useState(false)

  const [state, dispatch] = useReducer<typeof reducer>(reducer, props.fieldLayout.style || {})

  const onFontsizeChange = useCallback((size: string) => {
    dispatch({payload: {fontSize: size}})
    setFontsizeDropdownActive(false)
  }, [])

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
        <p>Font Size</p>
        <DropDown title={`${state.fontSize || 'Font size'}`} onClick={() => setFontsizeDropdownActive(true)} isActive={isFontsizeDropdownActive} >
          {
            new Array(15).fill(0).map((_, index) => {
              return (
                <div onClick={() => onFontsizeChange(`${index + 10}px`)} key={index} className="dropdown-item" >{index + 10}</div>
              )
            })
          }
        </DropDown>
      </div>
      <div>
        <p>Font Color</p>
        <input onChange={e => dispatch({payload: {color: e.target.value}})} className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
      <div>
        <p>Alignment</p>
        <div className={styles.iconGroupContainer} >
          <FontAwesomeIcon onClick={() => dispatch({payload: {textAlign: 'left'}})} className={state.textAlign == 'left' ? "has-text-primary" : undefined} icon={faAlignLeft} />
          <FontAwesomeIcon onClick={() => dispatch({payload: {textAlign: 'center'}})} className={state.textAlign == 'center' ? "has-text-primary" : undefined} icon={faAlignCenter} />
          <FontAwesomeIcon onClick={() => dispatch({payload: {textAlign: 'right'}})} className={state.textAlign == 'right' ? "has-text-primary" : undefined} icon={faAlignRight} />
        </div>
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
    </div>
  )
}