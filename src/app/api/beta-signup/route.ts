import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase
      .from("beta_signups")
      .insert([{ email, signed_up_at: new Date().toISOString() }]);

    // Unique constraint violation = already signed up
    if (error?.code === "23505") {
      return NextResponse.json({ success: true, message: "Already signed up" });
    }

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
