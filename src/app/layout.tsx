import type { Metadata } from "next";
import { Inter, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shiva9198.github.io"),
  title: "Shiva Santosh Reddy Aenugu | Forward Deployed Engineer",
  description: "Portfolio of Shiva Santosh Reddy Aenugu—Forward Deployed Engineer at BuildWithRV, builder of PlaceMe, and an AI/full-stack engineer working across web, mobile, backend, and applied-AI systems.",
  keywords: ["Forward Deployed Engineer", "FDE", "PlaceMe", "AI Engineer", "Full-Stack Engineer", "React", "React Native", "FastAPI", "Python", "TypeScript", "RAG"],
  authors: [{ name: "Shiva Santosh Reddy Aenugu" }],
  openGraph: {
    title: "Shiva Santosh Reddy Aenugu | Engineering Portfolio",
    description: "Forward Deployed Engineer at BuildWithRV, building PlaceMe and reliable web, mobile, backend, and applied-AI products.",
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
        className={`${inter.variable} ${hankenGrotesk.variable} ${jetBrainsMono.variable} ${inter.className} antialiased min-h-screen bg-background text-foreground`}
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
