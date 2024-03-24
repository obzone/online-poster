import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode } from "react";

export default function DropDown(props: {children: ReactNode}) {
  return (
    <div className="dropdown is-right">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Font size</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {
                props.children
              }
            </div>
          </div>
        </div>
  )
}