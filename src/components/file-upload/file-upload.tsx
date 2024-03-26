import { ChangeEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUpload } from '@fortawesome/free-solid-svg-icons'

export default function FileUpload(props: {onChange?: ChangeEventHandler<HTMLInputElement>}) {
  return (
    <div className="file">
      <label className="file-label">
        <input onChange={props.onChange} className="file-input" type="file" name="file" />
        <span className="file-cta">
          <span className="file-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <span className="file-label">Choose file</span>
        </span>
      </label>
    </div>
  )
}