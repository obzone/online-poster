'use client'

import ActivityDayItemStatusBar from '../activity-day-item-status-bar/activity-day-item-status-bar'
import styles from './activity-day-item.module.scss'

export default function ActivityDayItem () {
    return (
        <div className={`${styles.container}`} >
            <ActivityDayItemStatusBar date={new Date()} />
            <p onClick={() => console.debug('------')} >For example, to create your first page, add a page.js fi</p>
            <p>For example, t</p>
            <p>For example, to c</p>
            <p>For example, to create your</p>
            <p>For example, to create your</p>
        </div>
    )
}