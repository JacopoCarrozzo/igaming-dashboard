import '@/globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-50 text-gray-900">
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-10">TaDa Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-blue-400">Overview</Link>
            <Link href="/games" className="hover:text-blue-400">Games</Link>
            <Link href="/partners" className="hover:text-blue-400">Partners</Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}