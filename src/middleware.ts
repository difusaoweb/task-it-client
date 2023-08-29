import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { DateTime } from "luxon";

const TOKEN_ACCESS_KEY = "task-it-access-token";

interface GetIsAuthenticatedReturnSuccess {
  authenticated: boolean
  id: number
  token: string
}
type GetIsAuthenticatedReturn = Promise<{
  success: GetIsAuthenticatedReturnSuccess | null;
  failure: true | null;
}>

async function checkAuthentication(
  request: NextRequest
): GetIsAuthenticatedReturn {
  const theToken = request.cookies.get(TOKEN_ACCESS_KEY);
  if (theToken === undefined) {
    return { success: null, failure: true };
  }
  const returnApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/accesses`, {
    headers: { Authorization: `Bearer ${theToken.value}`}
  })
  if (!returnApi.ok) {
    return { success: null, failure: true }
  }
  
  const success: GetIsAuthenticatedReturnSuccess = await returnApi.json()

  return { success: {...success, token: theToken.value}, failure: null };
}

async function redirect({
  request,
  dateTime,
  sign = false,
}: {
  request: NextRequest;
  dateTime: string;
  sign?: boolean;
}) {
  function setCookies(
    response: NextResponse<unknown>,
    success: GetIsAuthenticatedReturnSuccess
  ) {
    response.cookies.set(TOKEN_ACCESS_KEY, success.token);
    return response;
  }
  function deleteCookies(response: NextResponse<unknown>) {
    response.cookies.delete(TOKEN_ACCESS_KEY);
    return response;
  }

  const { success } = await checkAuthentication(request);
  if (success === null) {
    // Não logado
    if (sign === false) {
      // Não logado e em páginas "comuns"
      let response = NextResponse.redirect(new URL("/login", request.url));
      response = deleteCookies(response);
      response.cookies.set("timeout", dateTime);

      return response;
    } else {
      // Não logado e na página de login
      let response = NextResponse.next();
      response = deleteCookies(response);
      response.cookies.set("timeout", dateTime);

      return response;
    }
  }
  // Logado
  if (sign === false) {
    // Logado e em páginas "comuns"
    let response = NextResponse.next();
    response.cookies.set("timeout", dateTime);

    return setCookies(response, success);
  } else {
    // Logado e na página de login
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("timeout", dateTime);

    return setCookies(response, success);
  }
}

export async function middleware(request: NextRequest) {
  const timeout = request.cookies.get("timeout");
  if (
    timeout === undefined ||
    DateTime.now().diff(DateTime.fromISO(timeout.value), "seconds").seconds > 1
  ) {
    const dateTime = DateTime.now().toString();
    switch (true) {
      case request.nextUrl.pathname.startsWith("/login"):
        return redirect({ request, dateTime, sign: true });
      case request.nextUrl.pathname.startsWith("/"):
        return redirect({ request, dateTime });
    }
  }
}
