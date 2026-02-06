import { prisma } from "@/lib/prisma";
import { rateLimit, rateLimitHeaders, getClientIp } from "@/lib/rate-limit";
import { checkForSpam } from "@/lib/spam-protection";
import { NextRequest, NextResponse } from "next/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "10");

    const [subscribers, total] = await Promise.all([
      prisma.subscriber.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.subscriber.count(),
    ]);

    return NextResponse.json({ subscribers, total, skip, take }, { status: 200 });
  } catch (error) {
    console.error("GET /api/subscribers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(`subscribers:${ip}`, {
      windowMs: 10 * 60 * 1000,
      max: 5,
    });

    if (!limitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: rateLimitHeaders(limitResult) }
      );
    }

    const body = await request.json();
    const { email, honeypot, formStartedAt } = body;

    const spamCheck = checkForSpam({ honeypot, formStartedAt });
    if (spamCheck.blocked) {
      return NextResponse.json(
        { error: "Submission rejected." },
        { status: 400, headers: rateLimitHeaders(limitResult) }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400, headers: rateLimitHeaders(limitResult) }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400, headers: rateLimitHeaders(limitResult) }
      );
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Subscriber already exists" },
        { status: 409, headers: rateLimitHeaders(limitResult) }
      );
    }

    const subscriber = await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json(subscriber, {
      status: 201,
      headers: rateLimitHeaders(limitResult),
    });
  } catch (error) {
    console.error("POST /api/subscribers error:", error);
    return NextResponse.json(
      { error: "Failed to create subscriber" },
      { status: 500 }
    );
  }
}
