import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
  session, // Pass the session data as a prop
}: {
  children: React.ReactNode;
  session: any; // Adjust the type as needed
}) {
  return (
    <html lang='en'>
      <body>
        <main>
          <Navbar session={session} /> {/* Pass the session data as a prop */}
          {children}
        </main>
      </body>
    </html>
  );
}
