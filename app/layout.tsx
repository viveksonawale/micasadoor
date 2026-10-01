import type { Metadata } from "next";
import "./globals.css";
import "./global1.css";

export const metadata: Metadata = {
  title: "Micasa Door Pvt. Ltd. | Wooden Doors & Frames Manufacturer",
  description:
    "Micasa Doors Pvt. Ltd provides precision-engineered doors and architectural frames crafted for durability, acoustic performance, and timeless architectural luxury.",
};

import SmoothScroll from "./components/SmoothScroll";
import WhatsAppButton from "./components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('micasa-entered')) {
                  document.documentElement.classList.add('micasa-entered');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-ivory">
        <SmoothScroll>
          {children}
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
