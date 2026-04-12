import "./globals.css";
import "../../../packages/lumina-ui/theme.css";

export const metadata = {
  title: "Neelora | Premium AI E-Commerce",
  description: "Next-generation intelligent shopping experience powered by Neelora AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600&family=Inter:wght@300;400;600&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
