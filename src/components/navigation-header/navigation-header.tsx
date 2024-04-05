import { getHeaderStyle } from '@/app/actions/calendars'
import { MONTH_TEXT } from '@/app/variable'
import styles from './navigation-header.module.scss'

export default async function NavigationHeader(props: {month: Date}) {
  const year = props.month.getFullYear()
  const month = MONTH_TEXT[props.month.getMonth()]

  const decoration = await getHeaderStyle(props.month)

  return (
    <>
      <div 
        style={decoration?.style} 
        className={`${styles.container}`} 
      >
        <div>{`${month}/${year}`}</div>
        <div>SUCCI</div>
      </div>
    </>
  )
}