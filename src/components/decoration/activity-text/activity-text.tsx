import { CSSProperties, ChangeEvent, ReducerAction, ReducerState, useCallback, useEffect, useReducer, useState } from "react";
import styles from './activity-text.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import DropDown from "@/components/drop-down/drop-down";
import { DecorationComponentCommonProps } from "../control-pannel/control-pannel";
import {Property} from 'csstype'
import FileUpload from "@/components/file-upload/file-upload";
import { upload } from "@/app/actions/file";

export const DECORATION_COMPONENT_TYPE_TEXT = 'activity-text'

export default function ActivityText(props: {style?: CSSProperties, value: any}) {
  return (
    <div style={props.style} >
      <p>{props.value}</p>
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

export function ActivityTextDecorationComponent(props: DecorationComponentCommonProps) {
  const [isFontsizeDropdownActive, setFontsizeDropdownActive] = useState(false)

  const [state, dispatch] = useReducer<typeof reducer>(reducer, props.fieldLayout.style || {})

  const onFontsizeChange = useCallback((size: string) => {
    dispatch({payload: {fontSize: size}})
    setFontsizeDropdownActive(false)
  }, [])

  const onBackgroundImageSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    console.debug(files)
    const formData = new FormData()
    formData.append('file', files[0])
    // TODO append more userinfo
    await upload(formData)
  }, [])

  useEffect(() => {
    props.onChange && props.onChange({
      ...props.fieldLayout,
      style: state
    })
  }, [state])

  return (
    <div className={styles.itemContainer} >
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
      <div>
        <p>BackgroundImage</p>
        <FileUpload onChange={e => onBackgroundImageSelect(e.target.files)} />
      </div>
    </div>
  )
}