import { Activity } from "@/app/actions/calendars";
import { budibaseFetchMonthActivities } from "@/app/services/calendar";
import { RouterErrorResponse } from "@/utilities/response";
import { EventAttributes, createEvents } from 'ics';
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const month = searchParams.get('month') || new Date()
    if (!month) throw new Error('month should be specified', { cause: 400 })
    const response = await budibaseFetchMonthActivities(new Date(month))
    const { data } = await response.json()
    if (!data || !data.length) throw new Error('NO Event Found', { cause: 400 })
    const events = (data as Activity[]).map<EventAttributes>((activity) => {
      return {
        start: new Date(activity.startTime).getTime(),
        startInputType: 'utc',
        end: activity.endTime ? new Date(activity.endTime).getTime() : new Date(activity.startTime).getTime(),
        endInputType: 'utc',
        title: activity.title,
        description: activity.subject,
        location: activity.spot,
        url: activity.post,
        status: 'CONFIRMED',
        alarms: [{
          trigger: {minutes: 30, before: true},
          action: 'audio'
        }],
        uid: `${activity.id}`,
        created: new Date(activity.createdAt!).getTime(),
        lastModified: new Date(activity.updatedAt!).getTime(),
        htmlContent: ''
      }
    })
    const evetntResponse = createEvents(events)
    const {error, value} = evetntResponse
    if (error) throw error
    return new Response(value, { 
      headers: { 
        'Content-Disposition': `attachment; filename=SUCCI_${month}.ics`,
        'Content-Type': 'text/calendar'
      } 
    })
  } catch (error) {
    console.error(error)
    return RouterErrorResponse(error)
  }
}