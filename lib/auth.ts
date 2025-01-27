import getSession from "./session";

export const loginWithId = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
};

export const getGithubAccessToken = async (code: string) => {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const result = await accessTokenResponse.json();
  return result;
};

export const getGithubUserProfile = async (accessToken: string) => {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-cache",
  });

  const result = await userProfileResponse.json();
  return result;
};

export const getGithubUserEmail = async (accessToken: string) => {
  const userProfileResponse = await fetch(
    "https://api.github.com/user/emails",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }
  );

  const result = await userProfileResponse.json();
  return result;
};
