'use client'

import { CustomCSSProperties } from "@/app/actions/calendars"
import { signedUploadUrl } from "@/app/actions/file"
import FileUpload from "@/components/file-upload/file-upload"
import { useCallback, useEffect, useReducer } from "react"
import { DecorationComponentCommonProps } from "../control-pannel/control-pannel"
import styles from './calendar.module.scss'
import Image from "next/image"

function reducer(state: CustomCSSProperties, action: {type?: string, payload: CustomCSSProperties}): CustomCSSProperties {
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

  const onBackgroundImageLightSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    const file = files[0]
    const resignedUrl = await signedUploadUrl({key: file.name})
    const {origin, pathname} = new URL(resignedUrl)
    await fetch(resignedUrl, {
      headers: {'Content-Type': file.type},
      body: files[0],
      method: 'PUT'
    })
    dispatch({payload: {backgroundImageLight: `${origin}${pathname}`}})
  }, [])

  const onBackgroundImageDarkSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    const file = files[0]
    const resignedUrl = await signedUploadUrl({key: file.name})
    const {origin, pathname} = new URL(resignedUrl)
    await fetch(resignedUrl, {
      headers: {'Content-Type': file.type},
      body: files[0],
      method: 'PUT'
    })
    dispatch({payload: {backgroundImageDark: `${origin}${pathname}`}})
  }, [])
  
  useEffect(() => {
    props.onChange && props.onChange({
      ...props.fieldLayout,
      style: state
    })
  }, [state, props.fieldLayout])

  return (
    <div className={styles.itemContainer} >
      <h1>Global setting</h1>
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
        <p>BackgroundImage Light</p>
        {
          state.backgroundImageLight ? (
            <div className={styles.imageContainer} >
              <Image
                src={state.backgroundImageLight}
                objectFit='contain'
                width={100}
                height={100}
                alt="PLACEHOLDER" 
              />
              <button 
                className={`${styles.deleteButton} delete`}
                onClick={() => dispatch({payload: {backgroundImageLight: undefined}})}
              ></button>
            </div>
          ) : (
            <FileUpload onChange={e => onBackgroundImageLightSelect(e.target.files)} />
          )
        }
      </div>
      <div>
        <p>BackgroundImage Dark</p>
        {
          state.backgroundImageDark ? (
            <div className={styles.imageContainer} >
              <Image
                src={state.backgroundImageDark}
                objectFit='contain'
                width={100}
                height={100}
                alt="PLACEHOLDER" 
              />
              <button 
                className={`${styles.deleteButton} delete`}
                onClick={() => dispatch({payload: {backgroundImageDark: undefined}})}
              ></button>
            </div>
          ) : (
            <FileUpload onChange={e => onBackgroundImageDarkSelect(e.target.files)} />
          )
        }
      </div>
    </div>
  )
}