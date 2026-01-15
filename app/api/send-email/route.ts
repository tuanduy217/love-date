import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure your email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { days } = await request.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `💕 Daily Update: ${days} Days Together`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63; text-align: center;">Our Love Journey 💕</h2>
          <div style="background: linear-gradient(135deg, #e91e63, #f06292); padding: 30px; border-radius: 10px; color: white; text-align: center;">
            <h1 style="font-size: 48px; margin: 0;">
              ${days} Days
            </h1>
            <p style="font-size: 18px; margin: 10px 0 0 0;">
              Together since 11/10/2025
            </p>
          </div>
          <p style="text-align: center; color: #666; margin-top: 20px;">
            Time is flying when we're together 🥰
          </p>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
            Sent at: ${new Date().toLocaleString("en-US", {
              timeZone: "Asia/Ho_Chi_Minh",
            })}
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
