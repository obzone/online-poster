import { Activity, Decoration } from "@/app/actions/calendars"

export const defaultActivityLayout: Decoration[] = [{
  type: 'activity-text',
  keyExtractor: 'title',
  displayOrder: 1,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'subject',
  displayOrder: 2,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-date',
  keyExtractor: 'startTime',
  displayOrder: 3,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'spot',
  displayOrder: 4,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-text',
  keyExtractor: 'target',
  displayOrder: 5,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}]

export function sortActivityLayout(activity: Activity) {
  if (!activity.layout || activity.layout.length == 0) {
    activity.layout = defaultActivityLayout
    return activity
  }
  activity.layout
  .sort((previous, current) => previous.displayOrder! - current.displayOrder!)
  return activity
}