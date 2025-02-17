import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Issue } from "@/app/types";
import { createIssueSchema } from "../../validationSchemas";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body: Pick<Issue, "title" | "description"> = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
