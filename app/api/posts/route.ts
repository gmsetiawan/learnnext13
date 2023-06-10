import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get("skip");
  const take = request.nextUrl.searchParams.get("take");
  const posts = await prisma.post.findMany({
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined,
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  //  For Auth
  //   const session = await getServerSession();
  //   if (!session) {
  //     return new Response(null, { status: 401 });
  //   }

  const body = await request.json();
  const { title, content } = body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return new NextResponse(JSON.stringify(post), { status: 201 });
}
