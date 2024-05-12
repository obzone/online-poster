import { getAllAdministrators } from "@/app/actions/user";
import { RouterErrorResponse } from "@/utilities/response";
import { getSession } from "@auth0/nextjs-auth0";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { env } from "process";

export async function GET(request: NextRequest) {
  try {
    const { user } = await getSession() as any || {}
    // fetch user from budibase usertable
    // check whether current user in budibase user table
    // if not display error page

    const admistrators = await getAllAdministrators()
    const currentUserWithAuth = admistrators?.find(({ email }: { email: string }) => {
      return email == user?.email
    })
    if (!currentUserWithAuth) throw new Error('Without authorization')
    const searchParams = request.nextUrl.searchParams
    const activityId = searchParams.get('activityId')
    if (activityId) {
      const budibaseId = encodeURIComponent(JSON.stringify([activityId]))
      revalidateTag(`/tables/${env.X_BUDIBASE_TABLE_ID_ACTIVITIES}/rows/${budibaseId}`)
      return new Response('success')
    }
    revalidateTag(`/queries/${env.X_BUDIBASE_QUERY_ID_ACTIVITY_WITH_LAYOUT}`)
    revalidateTag(`/queries/${env.X_BUDIBASE_QUERY_ID_ORGANIZATION_ACTIVITY_WITH_LAYOUT}`)
    revalidateTag(`/tables/${env.X_BUDIBASE_TABLE_ID_LAYOUT}/rows/search`)
    revalidateTag(`/tables/${env.X_BUDIBASE_TABLE_ID_ORGANIZATION}/rows/search`)
    return new Response('success')
  } catch (error) {
    console.error(error)
    return RouterErrorResponse(error)
  }
}