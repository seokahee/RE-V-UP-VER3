import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  matcher: ["/mypage/:path*"],
};
