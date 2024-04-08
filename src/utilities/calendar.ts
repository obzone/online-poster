import { Activity, Decoration } from "@/app/actions/calendars"

export const defaultActivityLayout: Decoration[] = [{
  type: 'activity-image',
  keyExtractor: 'favicon',
  displayOrder: 1,
  style: {
    overflow: 'hidden',
    maxWidth: '180px',
    height: '60px',
    margin: 'auto',
    objectFit: 'contain'
  }
}, {
  type: 'activity-text',
  keyExtractor: 'title',
  displayOrder: 2,
  style: {
    marginTop: '6px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
  }
}, {
  type: 'activity-text',
  keyExtractor: 'subject',
  displayOrder: 3,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}, {
  type: 'activity-date',
  keyExtractor: 'dateRange',
  displayOrder: 4,
  style: {
    marginTop: '6px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}, {
  type: 'activity-text',
  keyExtractor: 'spot',
  displayOrder: 5,
  style: {
    marginTop: '6px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}, {
  type: 'activity-text',
  keyExtractor: 'target',
  displayOrder: 6,
  style: {
    marginTop: '6px',
    textAlign: 'center',
  }
}]

export function sortActivityLayout(activity: Activity) {
  activity.layout = defaultActivityLayout.map((defaultLayout) => {
    return activity.layout.find((activityLayout) => activityLayout.keyExtractor == defaultLayout.keyExtractor) || defaultLayout
  })
  activity.layout
  .sort((previous, current) => previous.displayOrder! - current.displayOrder!)
  return activity
}