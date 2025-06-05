"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function uploadResult(formData: FormData) {
  await prisma.points.create({
    data: {
      name: formData.get("name") as string,
      points: Number(formData.get("points"))
    },
  });
}