import "./globals.css";
import Navigation from "@/app/components/Navigation";

export const metadata = {
  title: "Pokedex",
  description: "Pokemon finder",
    icons: {
      icon: "/favicon.png",
    },
};

export default function RootLayout({ children }) {

    return (
      <html lang="en">
          <body>
              <Navigation/>
              <main>{children}</main>
          </body>
      </html>
    );
}
