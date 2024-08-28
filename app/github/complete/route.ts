import { getGithubAccessToken, getGithubEmail, githubLogin } from "@/lib/auth";
import db from "@/lib/db";
import { commonLogin } from "@/lib/sessions";
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
  //   Code Challenge 3. 이메일 정보 가져오기
  const githubEmail = await getGithubEmail(access_token);

  const { id, avatar_url, login } = await githubLogin(access_token);

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) await commonLogin(user.id);

  const hasUserName = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });

  const newUser = await db.user.create({
    data: {
      username: Boolean(hasUserName!.id) ? login + "-gh" : login,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  await commonLogin(newUser.id);
}
