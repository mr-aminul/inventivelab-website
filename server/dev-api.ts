import { createServer, type IncomingMessage } from "node:http";
import { sendContactEmail, type ContactPayload } from "./contact.js";

const PORT = Number(process.env.CONTACT_API_PORT ?? "8787");

function readJsonBody(request: IncomingMessage): Promise<ContactPayload> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")) as ContactPayload);
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/contact") {
    try {
      const payload = await readJsonBody(request);
      const result = await sendContactEmail(payload);

      if (!result.ok) {
        response.writeHead(result.status, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: result.error }));
        return;
      }

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ success: true }));
    } catch {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Invalid request body." }));
    }
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Not found." }));
}).listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
