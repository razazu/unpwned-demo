export const metadata = {
  title: "YOU GOT PWNED — UNPWNED Demo Target",
  description: "A deliberately vulnerable demo site. Scan it with UNPWNED to see what AI-powered security scanning finds.",
  openGraph: {
    title: "YOU GOT PWNED — UNPWNED Demo Target",
    description: "This site is intentionally vulnerable. Scan it with UNPWNED to see real security findings.",
    url: "https://demo.unpwned.io",
    siteName: "UNPWNED Demo",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
