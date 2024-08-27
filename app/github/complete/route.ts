import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { access } from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenUrl = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avatar_url, login } = await userProfileResponse.json();

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("/profile");
  }
  // Code Challenge 1. 로그인 함수 만들기
  // Code Challenge 2. 새로운 유저를 만들건데 깃허브 닉네임과 중복되면 닉네임-gh 붙이기
  // Code Challenge 3. 이메일 정보 가져오기
  //   const userProfileResponse = await fetch("https://api.github.com/user/emails", {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //     cache: "no-cache",
  //   });
  // Code Challenge 4. request, response 함수로 구분하기

  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/profile");
}
