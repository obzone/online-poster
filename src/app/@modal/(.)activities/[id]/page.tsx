import { getActivityById } from '@/app/actions/calendars';
import ActivityCard from '@/components/activity-card/activity-card';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Page(props: { params: { id: string } }) {
  const activity = await getActivityById(props.params.id)
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <ActivityCard activity={activity} />
      </div>
      <span className="icon modal-close">
        <a href={`javascript:history.back()`} >
          <FontAwesomeIcon size='2x' icon={faClose} />
        </a>
      </span>
    </div>
  )
}