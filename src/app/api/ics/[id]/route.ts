import { getActivityById } from "@/app/actions/calendars";
import { RouterErrorResponse } from "@/utilities/response";
import { createEvent, EventAttributes } from "ics";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const activity = await getActivityById(params.id)
    if (!activity) throw new Error('NO Event Found', { cause: 400 })
    const event: EventAttributes = {
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
        trigger: { minutes: 30, before: true },
        action: 'audio'
      }],
      uid: `${activity.id}`,
      created: new Date(activity.createdAt!).getTime(),
      lastModified: new Date(activity.updatedAt!).getTime(),
      htmlContent: ''
    }
    const evetntResponse = createEvent(event)
    const { error, value } = evetntResponse
    if (error) throw error
    return new Response(value, {
      headers: {
        'Content-Disposition': `attachment; filename=SUCCI_${activity.title}.ics`,
        'Content-Type': 'text/calendar'
      }
    })
  } catch (error) {
    console.error(error)
    return RouterErrorResponse(error)
  }
}