
import { prisma } from "@/lib/prisma";
import { rateLimit, rateLimitHeaders, getClientIp } from "@/lib/rate-limit";
import { checkForSpam } from "@/lib/spam-protection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(`contact:${ip}`, {
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

    const {
      firstName,
      lastName,
      email,
      phone,
      projectType,
      message,
      honeypot,
      formStartedAt,
    } = body;

    const spamCheck = checkForSpam({ honeypot, formStartedAt, message });
    if (spamCheck.blocked) {
      return NextResponse.json(
        { error: "Submission rejected." },
        { status: 400, headers: rateLimitHeaders(limitResult) }
      );
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, message" },
        { status: 400, headers: rateLimitHeaders(limitResult) }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: rateLimitHeaders(limitResult) }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        projectType: projectType || null,
        message,
      },
    });

    return NextResponse.json(submission, {
      status: 201,
      headers: rateLimitHeaders(limitResult),
    });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "10");

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactSubmission.count(),
    ]);

    return NextResponse.json(
      { items: submissions, total, skip, take },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
