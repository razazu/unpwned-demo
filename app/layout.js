export const metadata = {
  title: "VibeTasks - AI Task Manager",
  description: "The AI-powered task manager built with vibes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
