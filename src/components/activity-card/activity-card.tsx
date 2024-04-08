import { Activity } from "@/app/actions/calendars";
import { faCalendarAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './activity-card.module.scss';
import moment from "moment";

export default function ActivityCard(props: { activity?: Activity }) {
  return (
    <div className={`card ${styles.container}`}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={props.activity?.post}
            alt="PLACEHOLDER"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={props.activity?.favicon}
                alt="PLACEHOLDER"
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
                props.activity?.startTime ? `${moment.utc(props.activity.startTime).format('yyyy-MM')}` : null
              }
              {
                props.activity?.startTime ? ' ' + moment.utc(props.activity?.startTime!).local().format('hh:mm A') : null
              }
              {props.activity?.endTime ? ' ~ ' +  moment.utc(props.activity?.endTime!).local().format('hh:mm A') : null}
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