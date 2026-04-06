import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

// Initialise Prisma with the pg adapter
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  // Get the current session from the JWT token in the request cookies
  const session = await auth();

  // If there is no session the user is not logged in — reject
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Admins manage requests, they don't create them — enforced at the API level
  // This is a server-side guard in addition to hiding the button in the UI
  if (session.user.role === "ADMIN") {
    return NextResponse.json(
      { error: "Admins cannot submit requests" },
      { status: 403 },
    );
  }

  // Parse the JSON body sent from the new request form
  const { title, description, amount, category } = await req.json();

  // Basic server-side validation
  if (!title || !amount || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (amount <= 0) {
    return NextResponse.json(
      { error: "Amount must be greater than zero" },
      { status: 400 },
    );
  }

  // Create the request in the DB, linking it to the logged-in user as the requester
  // Status defaults to PENDING as defined in the Prisma schema
  const request = await prisma.purchaseRequest.create({
    data: {
      title,
      description: description || null,
      amount,
      category,
      requesterId: session.user.id,
    },
  });

  return NextResponse.json(request, { status: 201 });
}
