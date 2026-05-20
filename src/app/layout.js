import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1E424D',
              color: '#DDB248',
              border: '1px solid #E5D595',
              padding: '16px',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#DDB248',
                secondary: '#1E424D',
              },
            },
            error: {
              style: {
                background: '#ff4b4b',
                color: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}