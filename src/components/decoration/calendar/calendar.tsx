import { CSSProperties, useCallback, useEffect, useReducer, useState } from "react"
import { DecorationComponentCommonProps } from "../control-pannel/control-pannel"
import { signedUploadUrl, upload } from "@/app/actions/file"
import styles from './calendar.module.scss'
import FileUpload from "@/components/file-upload/file-upload"

export const DECORATION_COMPONENT_TYPE_MONTH_GLOBAL = 'month-global'

function reducer(state: CSSProperties, action: {type?: string, payload: CSSProperties}): CSSProperties {
  switch (action.type) {
    case 'delete':
      // TODO delete keys
      return state
  
    default:
      return {...state, ...action.payload}
  }
}

export function MonthGlobalSetting(props: DecorationComponentCommonProps) {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, props.fieldLayout.style || {})

  const onBackgroundImageSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    const file = files[0]
    const resignedUrl = await signedUploadUrl({key: file.name})
    console.debug(resignedUrl)
    const uploadResult = await fetch(resignedUrl, {
      headers: {'Content-Type': file.type},
      body: files[0],
      method: 'PUT'
    })
    console.debug(uploadResult)
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
        <p>BackgroundImage</p>
        <FileUpload onChange={e => onBackgroundImageSelect(e.target.files)} />
      </div>
    </div>
  )
}