"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function uploadResult(formData: FormData) {
  const name = formData.get("name") as string
  const points = Number(formData.get("points"));

  const existing = await prisma.points.findFirst({
    where: { name },
  })

  if (existing) {
    return { error: "This Name already exists"};
  }
  await prisma.points.create({
    data: { name, points},
  });

  return { success: true };
}