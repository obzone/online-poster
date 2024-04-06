import { Activity } from "@/app/actions/calendars";
import { faCalendarAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './activity-card.module.scss';

export default function ActivityCard(props: { activity?: Activity }) {
  const defaultDateFormate: any = {
    hour: "numeric",
    minute: "numeric",
  }
  return (
    <div className={`card ${styles.container}`}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={props.activity?.post}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={props.activity?.favicon}
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{props.activity?.title}</p>
            <p className="subtitle is-6">
              {props.activity?.spot}
            </p>
            <p className="subtitle is-6">
              {
                props.activity?.startTime ? `${new Date(props.activity.startTime).getFullYear()}-${new Date(props.activity.startTime).getUTCMonth()} ` : null
              }
              {
                props.activity?.startTime ? ' / ' + new Intl.DateTimeFormat("en-US", defaultDateFormate).format(new Date(props.activity?.startTime!)) : null
              }
              {props.activity?.endTime ? ' ~ ' + new Intl.DateTimeFormat("en-US", defaultDateFormate).format(new Date(props.activity?.endTime!)) : null}
            </p>
          </div>
        </div>

        <div className="content">
          {
            props.activity?.subject
          }
        </div>
      </div>
      <footer className="card-footer">
        <a href={`/api/ics/${props.activity?.id}`} className="card-footer-item">
          <span className="icon">
            <FontAwesomeIcon icon={faCalendarAlt} /> 
            Download
          </span>
        </a>
        <a href="#" className="card-footer-item">
          <span className="icon">
            <FontAwesomeIcon icon={faShare} /> 
            Share
          </span>
        </a>
      </footer>
    </div>
  )
}