import { getHeaderStyle } from '@/app/actions/calendars';
import { MONTH_TEXT } from '@/app/variable';
import { faArrowLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import styles from './navigation-header.module.scss';
import { getAllOrganizations } from '@/app/actions/organizations';
import { headers } from 'next/headers';

export default async function NavigationHeader(props: {month: Date, displayBackButton?: boolean}) {
  const year = props.month.getFullYear()
  const month = MONTH_TEXT[props.month.getMonth()]
  const [decoration, organizations] = await Promise.all([getHeaderStyle(props.month), getAllOrganizations()])
  const orgId = headers().get('organization-id')
  const organization = organizations.find((org) => `${org.id}` == orgId)
  return (
    <>
      <div 
        style={decoration?.style} 
        className={`${styles.container}`} 
      >
        <div>
          {
            props.displayBackButton && (
              <a href={'/'} style={{marginRight: '10px', verticalAlign: 'middle'}} >
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              </a>
            )
          }
          {`${month}/${year}`}
        </div>
        <div className={styles.oprations} >
          <Link href={`/organizations`} >
            <div>{organization?.name}</div>
          </Link>
          <Link href={`/api/ics?month=${props.month.getFullYear()}-${props.month.getUTCMonth()+1}&orgId=${organization?.id}`} >
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