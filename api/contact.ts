import { sendContactEmail, type ContactPayload } from "../server/contact.js";

export async function POST(request: Request): Promise<Response> {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await sendContactEmail(payload);

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ success: true });
}
