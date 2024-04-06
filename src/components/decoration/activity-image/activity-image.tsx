import { CSSProperties, useEffect, useReducer } from "react";
import { DecorationComponentCommonProps } from "../control-pannel/control-pannel";
import styles from './activity-image.module.scss';

export default function ActivityImage(props: {style?: CSSProperties, value: any}) {
  return (
    <img style={props.style} src={props.value} />
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

export function ActivityImageDecorationComponent(props: DecorationComponentCommonProps) {

  const [state, dispatch] = useReducer<typeof reducer>(reducer, props.fieldLayout.style || {})

  useEffect(() => {
    props.onChange && props.onChange({
      ...props.fieldLayout,
      style: state
    })
  }, [state])

  return (
    <div className={styles.itemContainer} >
      <h1 >Image setting</h1>
      <div>
        <p>Margin</p>
        <div className={styles.iconGroupContainer} >
          <input className="input" onChange={e => dispatch({payload: {marginTop: e.target.value.length ? `${e.target.value.replace('px', '')}px` : undefined}})} type="text" defaultValue={state.marginTop} placeholder="Top" />
          <input className="input" onChange={e => dispatch({payload: {marginLeft: e.target.value.length ? `${e.target.value.replace('px', '')}px` : undefined}})} type="text" defaultValue={state.marginLeft} placeholder="Left" />
          <input className="input" onChange={e => dispatch({payload: {marginBottom: e.target.value.length ? `${e.target.value.replace('px', '')}px` : undefined}})} type="text" defaultValue={state.marginBottom} placeholder="Bottom" />
          <input className="input" onChange={e => dispatch({payload: {marginRight: e.target.value.length ? `${e.target.value.replace('px', '')}px` : undefined}})} type="text" defaultValue={state.marginRight} placeholder="Right" />
        </div>
      </div>
      <div>
        <p>Height</p>
        <input onChange={e => dispatch({payload: {height: `${e.target.value.replace('px', '')}px`}})} className="input" type="text" defaultValue={state.height} placeholder="e.g. 100" />
      </div>
      <div>
        <p>BorderRadius</p>
        <input onChange={e => dispatch({payload: {borderRadius: `${e.target.value.replace('px', '')}px`}})} className="input" type="text" defaultValue={state.borderRadius} placeholder="e.g. 9" />
      </div>
    </div>
  )
}