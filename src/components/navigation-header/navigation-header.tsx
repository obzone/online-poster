import { getHeaderStyle } from '@/app/actions/calendars';
import { MONTH_TEXT } from '@/app/variable';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import styles from './navigation-header.module.scss';

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
        
        <div className={styles.oprations} >
          <Link href={`/api/auth/login`} >
            <div>SUCCI</div>
          </Link>
          <Link href={`/api/ics?month=${props.month.getFullYear()}-${props.month.getUTCMonth()+1}`} >
            <div className="icon-text" >
              <span className="icon has-text-info">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              <span>Download</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}