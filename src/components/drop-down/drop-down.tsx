import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode, useEffect, useState } from "react";

export default function DropDown(props: { children: ReactNode, title: string, isActive: boolean, onClick?: () => void }) {
  return (
    <div className={`dropdown is-right ${props.isActive ? 'is-active' : null}`}>
      <div className="dropdown-trigger">
        <button onClick={props.onClick} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{props.title}</span>
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