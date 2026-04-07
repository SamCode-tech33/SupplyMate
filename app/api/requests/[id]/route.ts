import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  // Only authenticated admins can approve or reject
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { action, reviewNote } = await req.json();

  if (!["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // Check the request exists and is still pending
  const existing = await prisma.purchaseRequest.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (existing.status !== "PENDING") {
    return NextResponse.json(
      { error: "Request has already been reviewed" },
      { status: 409 },
    );
  }

  const updated = await prisma.purchaseRequest.update({
    where: { id },
    data: {
      status: action === "approve" ? "APPROVED" : "REJECTED",
      reviewerId: session.user.id,
      reviewedAt: new Date(),
      reviewNote: reviewNote || null,
    },
  });

  return NextResponse.json(updated);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const request = await prisma.purchaseRequest.findUnique({
    where: { id },
    include: { requester: true },
  });

  if (!request) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(request);
}
