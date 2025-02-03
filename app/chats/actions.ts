"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export async function saveMessage(payload: string, chatroomId: string) {
  const session = await getSession();
  await db.message.create({
    data: {
      payload,
      chatRoomId: chatroomId,
      userId: session.id!,
    },
    select: { id: true },
  });
}
