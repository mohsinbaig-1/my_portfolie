import type { ContactFormData } from "@/types";
import { NextResponse } from "next/server";

function validate(data: ContactFormData): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Valid email is required";
  }
  if (!data.subject?.trim()) return "Subject is required";
  if (!data.message?.trim() || data.message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormData;
    const error = validate(body);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. Your message has been received.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
