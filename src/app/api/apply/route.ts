import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, whatsapp, collegeYear, track, links, proudBuild } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!whatsapp || typeof whatsapp !== "string" || whatsapp.trim().length < 7) {
      return NextResponse.json(
        { error: "Please enter a valid WhatsApp number." },
        { status: 400 }
      );
    }

    if (!collegeYear || typeof collegeYear !== "string" || collegeYear.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your college and current year of study." },
        { status: 400 }
      );
    }

    const validTracks = ["engineering", "business", "mixed"];
    if (!track || !validTracks.includes(track.toLowerCase())) {
      return NextResponse.json(
        { error: "Please select a valid track (Engineering, Business, or Mixed)." },
        { status: 400 }
      );
    }

    if (!links || typeof links !== "string" || links.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide at least one proof of work link (GitHub, LinkedIn, or Portfolio)." },
        { status: 400 }
      );
    }

    if (!proudBuild || typeof proudBuild !== "string" || proudBuild.trim().length === 0) {
      return NextResponse.json(
        { error: "Please describe one thing you built or solved that you are proud of." },
        { status: 400 }
      );
    }

    if (proudBuild.trim().length > 500) {
      return NextResponse.json(
        { error: "Your build description exceeds the 500 character limit." },
        { status: 400 }
      );
    }

    const submissionPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
      collegeYear: collegeYear.trim(),
      track: track.toLowerCase(),
      links: links.trim(),
      proudBuild: proudBuild.trim(),
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Forward to external webhook or form backend if provided in environment
    const webhookUrl =
      process.env.APPLICATION_WEBHOOK_URL ||
      process.env.FORM_BACKEND_ENDPOINT;

    if (webhookUrl) {
      try {
        const upstreamResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(submissionPayload),
        });

        if (!upstreamResponse.ok) {
          console.error(
            "Upstream form backend returned error status:",
            upstreamResponse.status
          );
        }
      } catch (upstreamErr) {
        console.error("Failed to forward application to webhook:", upstreamErr);
      }
    } else {
      // In local development or when webhook is not yet configured
      console.log(
        "[Sadhna Circle] Application received (set APPLICATION_WEBHOOK_URL to forward):",
        submissionPayload
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application received successfully.",
      reference: `SC-APP-${Date.now().toString(36).toUpperCase()}`,
      track: track.toLowerCase(),
    });
  } catch (error) {
    console.error("Application submission processing error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application. Please try again." },
      { status: 500 }
    );
  }
}
