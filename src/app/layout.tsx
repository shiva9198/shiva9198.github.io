import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SS - AI/ML Developer & Full-Stack Engineer",
  description: "Portfolio of SS (Shiva Santosh Reddy Aenugu) - Aspiring Computer Science Engineer specializing in AI/ML and Full-Stack Development",
  keywords: ["AI", "ML", "Full-Stack", "React", "Python", "TypeScript", "Computer Science"],
  authors: [{ name: "SS (Shiva Santosh Reddy Aenugu)" }],
  openGraph: {
    title: "SS - AI/ML Developer",
    description: "Innovative AI/ML solutions and full-stack development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-storage');
                  if (theme) {
                    const parsed = JSON.parse(theme);
                    // Handle both old and new Zustand storage formats
                    const isDark = parsed.state?.isDark || parsed.isDark;
                    if (isDark) {
                      document.documentElement.classList.add('dark');
                      document.body.style.backgroundColor = '#0F0F1A';
                    } else {
                      document.documentElement.classList.remove('dark');
                      document.body.style.backgroundColor = '#9381FF';
                    }
                  } else {
                    // Default to dark mode
                    document.documentElement.classList.add('dark');
                    document.body.style.backgroundColor = '#0F0F1A';
                  }
                } catch (e) {
                  // Default to dark mode if error
                  document.documentElement.classList.add('dark');
                  document.body.style.backgroundColor = '#0F0F1A';
                }
              })();
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}