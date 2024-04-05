export function RouterErrorResponse(error: unknown): Response {
  if (typeof error === "string") {
      return new Response(error, {status: 500})
  } else if (error instanceof Error) {
      return new Response(error.message, {status: typeof error.cause == 'number' ? error.cause : 500})
  } else if (error && typeof error == 'object' && 'message' in error) {
    return new Response(`${error.message}`, {status: 500})
  }
  return new Response('', {status: 500})
}