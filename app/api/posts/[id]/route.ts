import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();
  const updated = await prisma.post.update({
    where: {
      id: parseInt(id, 10),
    },

    // remove data if not sent
    data: {
      title: json.title || null,
      content: json.content || null,
    },
  });
  return NextResponse.json(updated);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();
  const updated = await prisma.post.update({
    where: {
      id: parseInt(id, 10),
    },
    data: json,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleted = await prisma.post.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(deleted);
}
