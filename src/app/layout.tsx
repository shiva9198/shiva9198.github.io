import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shiva9198.github.io"),
  title: "Shiva Santosh Reddy Aenugu | FDE & AI/Full-Stack Engineer",
  description: "Portfolio of Shiva Santosh Reddy Aenugu, an FDE at BuildWithRV working across production web, mobile, backend, and applied-AI systems.",
  keywords: ["FDE", "AI Engineer", "Full-Stack Engineer", "React", "React Native", "FastAPI", "Python", "TypeScript", "RAG"],
  authors: [{ name: "Shiva Santosh Reddy Aenugu" }],
  openGraph: {
    title: "Shiva Santosh Reddy Aenugu | Engineering Portfolio",
    description: "Production web, mobile, backend, and applied-AI engineering with verified public projects and contributions.",
    type: "website",
    url: "https://shiva9198.github.io",
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
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } else {
                    // Default to dark mode
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Default to dark mode if error
                  document.documentElement.classList.add('dark');
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
        <ErrorBoundary>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
