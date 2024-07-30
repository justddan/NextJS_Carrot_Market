import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContents {
  id?: number;
}

export default async function getSession() {
  return await getIronSession<SessionContents>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}
