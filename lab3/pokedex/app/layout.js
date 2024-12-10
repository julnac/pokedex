import "./globals.css";

export const metadata = {
  title: "Pokedex",
  description: "Pokemon finder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
