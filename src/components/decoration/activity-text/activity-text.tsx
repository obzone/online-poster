import { CSSProperties, ChangeEvent, ReducerAction, ReducerState, useCallback, useReducer, useState } from "react";
import styles from './activity-text.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import DropDown from "@/components/drop-down/drop-down";
import { DecorationComponentCommonProps } from "../control-pannel/control-pannel";
import {Property} from 'csstype'

export const DECORATION_COMPONENT_TYPE_TEXT = 'activity-text'

export default function ActivityText(props: {style?: CSSProperties, value: any}) {
  return (
    <div style={props.style} >
      <p>{props.value}</p>
    </div>
  )
}

function reducer(state: CSSProperties, action: {type: string, payload: CSSProperties}): CSSProperties {
  return {...state, ...action.payload}
}

export function ActivityTextDecorationComponent(props: DecorationComponentCommonProps) {
  const [backgroundColor, setBackgroundColor] = useState(props.fieldLayout.style?.backgroundColor)
  const [fontSize, setFontSize] = useState(props.fieldLayout.style?.fontSize)
  const [fontColor, setFontColor] = useState(props.fieldLayout.style?.color)
  const [marginTop, setMarginTop] = useState(props.fieldLayout.style?.marginTop)
  const [marginLeft, setMarginLeft] = useState(props.fieldLayout.style?.marginLeft)
  const [marginBottom, setMarginBottom] = useState(props.fieldLayout.style?.marginBottom)
  const [marginRight, setMarginRight] = useState(props.fieldLayout.style?.marginRight)
  const [textAlignment, setTextAlignment] = useState(props.fieldLayout.style?.textAlign)
  const [borderRadius, setBorderRadius] = useState(props.fieldLayout.style?.borderRadius)
  const [isFontsizeDropdownActive, setFontsizeDropdownActive] = useState(false)

  const [state, dispatch] = useReducer<typeof reducer>(reducer, props.fieldLayout.style || {})

  const onMarginTopChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMarginTop(e.target.value)
  }, [])
  const onMarginLeftChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMarginLeft(e.target.value)
  }, [])
  const onMarginBottomChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMarginBottom(e.target.value)
  }, [])
  const onMarginRightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMarginRight(e.target.value)
  }, [])

  const onAlignmentChange = useCallback((textAlignment: Property.TextAlign) => {
    setTextAlignment(textAlignment)
    onApplyTrigger()
  }, [])

  const onFontsizeChange = useCallback((size: string) => {
    setFontSize(size)
    onApplyTrigger()
    setFontsizeDropdownActive(false)
  }, [])

  const onFontColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFontColor(e.target.value)
  }, [])

  const onBackgroundColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value)
  }, [])

  const onBorderRadiusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBorderRadius(e.target.value)
  }, [])

  const onApplyTrigger = useCallback(() => {
    if (!props.onChange) return
    const layout = {
      ...props.fieldLayout,
      style: {
        backgroundColor,
        fontSize: `${fontSize}px`,
        fontColor,
        marginTop: `${marginTop}px`,
        marginLeft: `${marginLeft}px`,
        marginBottom: `${marginBottom}px`,
        marginRight: `${marginRight}px`,
        textAlignment,
      }
    }
    props?.onChange && props?.onChange(layout)
  }, [backgroundColor, fontSize, fontColor, marginTop, marginLeft, marginBottom, marginRight, textAlignment])

  return (
    <div className={styles.itemContainer} >
      <div>
        <p>Font Size</p>
        <DropDown title={`${fontSize || 'Font size'}`} onClick={() => setFontsizeDropdownActive(true)} isActive={isFontsizeDropdownActive} >
          {
            new Array(15).fill(0).map((_, index) => {
              return (
                <div onClick={() => onFontsizeChange(`${index + 10}`)} key={index} className="dropdown-item" >{index + 10}</div>
              )
            })
          }
        </DropDown>
      </div>
      <div>
        <p>Font Color</p>
        <input onChange={onFontColorChange} onBlur={onApplyTrigger} className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
      <div>
        <p>Alignment</p>
        <div className={styles.iconGroupContainer} >
          <FontAwesomeIcon onClick={() => onAlignmentChange('left')} className={textAlignment == 'left' ? "has-text-primary" : undefined} icon={faAlignLeft} />
          <FontAwesomeIcon onClick={() => onAlignmentChange('center')} className={textAlignment == 'center' ? "has-text-primary" : undefined} icon={faAlignCenter} />
          <FontAwesomeIcon onClick={() => onAlignmentChange('right')} className={textAlignment == 'right' ? "has-text-primary" : undefined} icon={faAlignRight} />
        </div>
      </div>
      <div>
        <p>Margin</p>
        <div className={styles.iconGroupContainer} >
          <input className="input" onBlur={onApplyTrigger} onChange={onMarginTopChange} type="text" defaultValue={marginTop} placeholder="Top" />
          <input className="input" onBlur={onApplyTrigger} onChange={onMarginLeftChange} type="text" defaultValue={marginLeft} placeholder="Left" />
          <input className="input" onBlur={onApplyTrigger} onChange={onMarginBottomChange} type="text" defaultValue={marginBottom} placeholder="Bottom" />
          <input className="input" onBlur={onApplyTrigger} onChange={onMarginRightChange} type="text" defaultValue={marginRight} placeholder="Right" />
        </div>
      </div>
      <div>
        <p>BackgroundColor</p>
        <input onChange={onBackgroundColorChange} onBlur={onApplyTrigger} className="input" type="text" placeholder="e.g. #FFFFFF" />
      </div>
      <div>
        <p>BorderRadius</p>
        <input onChange={onBorderRadiusChange} onBlur={onApplyTrigger} className="input" type="text" placeholder="e.g. 9" />
      </div>
    </div>
  )
}