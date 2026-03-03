import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.FROM_EMAIL ?? "FlightReady AI <onboarding@resend.dev>";
const NOTIFY = process.env.NOTIFY_EMAIL!;

function welcomeHtml(email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to FlightReady AI</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#050D17;padding:32px 40px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                FlightReady<span style="color:#007AFF;">AI</span>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 24px;font-size:24px;font-weight:700;color:#050D17;line-height:1.2;letter-spacing:-0.3px;">
                You're on the list.
              </p>

              <p style="margin:0 0 16px;font-size:15px;color:#3a3a3a;line-height:1.6;">
                Hey — thanks for signing up for the FlightReady AI beta.
              </p>

              <p style="margin:0 0 16px;font-size:15px;color:#3a3a3a;line-height:1.6;">
                We're putting the final touches on the app and will reach out personally when your spot is ready. You'll be among the first pilots to try it.
              </p>

              <p style="margin:0 0 32px;font-size:15px;color:#3a3a3a;line-height:1.6;">
                In the meantime, if you have questions or just want to talk aviation — reply to this email. I read every one.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;" />

              <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#050D17;">Jay Khan</p>
              <p style="margin:0;font-size:13px;color:#888;">CEO, FlightReady AI</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;">
              <p style="margin:0;font-size:12px;color:#aaa;line-height:1.5;">
                You received this because ${email} signed up at flightreadyai.com.<br />
                No spam, ever — just beta access when it's ready.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const [notify, welcome] = await Promise.all([
      // Notify the founder
      resend.emails.send({
        from: FROM,
        to: NOTIFY,
        subject: `New beta signup: ${email}`,
        text: `${email} just signed up for the FlightReady AI beta.`,
      }),
      // Welcome the user
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "You're on the FlightReady AI beta list",
        html: welcomeHtml(email),
      }),
    ]);

    if (notify.error || welcome.error) {
      console.error("Resend error:", notify.error ?? welcome.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
