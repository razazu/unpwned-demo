export async function GET() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin", phone: "+1-555-0100" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", phone: "+1-555-0101" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "user", phone: "+1-555-0102" },
  ];

  return new Response(JSON.stringify(users), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
