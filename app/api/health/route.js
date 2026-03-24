export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      version: "1.0.0",
      environment: "production",
      database: "connected",
      uptime: process.uptime(),
      node_version: process.version,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Powered-By": "Next.js",
        "Server": "VibeTasks/1.0",
      },
    }
  );
}
