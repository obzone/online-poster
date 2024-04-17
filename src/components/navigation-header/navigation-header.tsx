import { getAllOrganizations, getHeaderStyle } from '@/app/actions/calendars';
import { MONTH_TEXT } from '@/app/variable';
import { faArrowLeft, faCalendarAlt, faFilter, faSchool } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './navigation-header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function NavigationHeader(props: { month: Date, displayBackButton?: boolean, defaultValue?: string }) {
  const year = props.month.getFullYear()
  const month = MONTH_TEXT[props.month.getMonth()]

  const decoration = await getHeaderStyle(props.month)
  const organizations = await getAllOrganizations()
  const selectedOrganization = organizations.find(org => org.id == props.defaultValue)

  return (
    <>
      <div
        style={decoration?.style}
        className={`${styles.container}`}
      >
        <div>
          {
            props.displayBackButton && (
              <Link href={'/'} style={{ marginRight: '10px', verticalAlign: 'middle' }} >
                <span className="icon">
                  <FontAwesomeIcon size='sm' icon={faArrowLeft} />
                </span>
              </Link>
            )
          }
          {`${month}/${year}`}
        </div>
        <div className={styles.oprations} >
          <div className="dropdown is-hoverable is-right">
            <div className="dropdown-trigger">
              <span className="icon has-text-info">
                <FontAwesomeIcon icon={ !!selectedOrganization ? faSchool : faFilter} /> 
              </span>
              <span>{selectedOrganization?.name || 'Filter'}</span>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {
                  organizations.map(organization => {
                    return (
                      <Link key={organization.id} className={`dropdown-item ${selectedOrganization?.id == organization.id ? 'is-active' : ''}`} href={`/?orgId=${organization.id}`} >
                        <div>{organization.name}</div>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <Link href={`/api/ics?month=${props.month.getFullYear()}-${props.month.getUTCMonth() + 1}`} >
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