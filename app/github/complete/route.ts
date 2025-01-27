import {
  getGithubAccessToken,
  getGithubUserEmail,
  getGithubUserProfile,
  loginWithId,
} from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { error, access_token } = await getGithubAccessToken(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { id, avatar_url, login } = await getGithubUserProfile(access_token);

  const userEmailData = await getGithubUserEmail(access_token);

  const email = userEmailData[0].email;

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await loginWithId(user.id);
    return redirect("/profile");
  }

  const duplicateUser = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });
  if (duplicateUser) {
    const newUser = await db.user.create({
      data: {
        username: login + "-gh",
        github_id: id + "",
        avatar: avatar_url,
        email,
      },
      select: {
        id: true,
      },
    });
    await loginWithId(newUser.id);
    return redirect("/profile");
  }

  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: id + "",
      avatar: avatar_url,
      email,
    },
    select: {
      id: true,
    },
  });
  await loginWithId(newUser.id);
  return redirect("/profile");
}
