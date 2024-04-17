'use client'

import { Decoration, getHeaderStyle } from '@/app/actions/calendars'
import DropDown from '@/components/drop-down/drop-down'
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties, MouseEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import DecorationControlPannel, { DecorationComponentCommonProps } from '../control-pannel/control-pannel'
import styles from './header.module.scss'
import { MONTH_TEXT } from '@/app/variable'
import Link from 'next/link'

export default function Header(props: {month: Date}) {
  const [isControlPannelVisible, setControlPannelVisible] = useState(false)
  const [changedFieldLayout, setChangedFieldLayout] = useState<Decoration>()
  const [decoration, setDecoration] = useState<Decoration>()
  const year = useMemo(() => props.month.getFullYear(), [props.month])
  const month = useMemo(() =>MONTH_TEXT[props.month.getMonth()], [props.month]) 

  useEffect(() => {
    (async () => {
      const data = await getHeaderStyle(props.month)
      setDecoration(data)
    })()
  }, [props.month])

  const onDecorateNodeCancelClick = useCallback(() => {
    setControlPannelVisible(false)
  }, [])
  const onDecorateNodeConfirmClick = useCallback(() => {
    setControlPannelVisible(false)
  }, [])
  const onHeaderClick = useCallback((e: MouseEvent) => {
    setControlPannelVisible(true)
  }, [])

  return (
    <>
      <div 
        style={changedFieldLayout?.style} 
        className={`${styles.container} ${isControlPannelVisible ? styles.isSelected: ''}`} 
        onClick={onHeaderClick} 
      >
        <div>{`${month}/${year}`}</div>
        <Link href={`/api/auth/login`}>
          <div>ConfederationCollege</div>
        </Link>
      </div>
      {
        (isControlPannelVisible && decoration) && (
          <DecorationControlPannel 
            selectedFieldLayout={decoration} 
            onChange={(layout) => setChangedFieldLayout(layout)} 
            onConfirmClick={onDecorateNodeConfirmClick} 
            onCancelClick={onDecorateNodeCancelClick} 
          />
        )
      }
    </>
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

export function ActivityHeaderDecorationComponent(props: DecorationComponentCommonProps) {
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
      <h1 >Header setting</h1>
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