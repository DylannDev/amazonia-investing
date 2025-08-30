import { Outfit } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <div className="min-h-screen">{children}</div>
        <Toaster
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: "toast",
              title: "title",
              description: "description",
              actionButton: "action-button",
              cancelButton: "cancel-button",
              closeButton: "close-button",
            },
          }}
        />
      </body>
    </html>
  );
}
