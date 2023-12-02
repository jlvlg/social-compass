import { Provider } from "@store";
import fonts from "@styles/fonts";
import "@styles/fonts.scss";
import type { Metadata } from "next";
import "reset-css";

export const metadata: Metadata = {
  title: "Social Compass",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" style={{ blockSize: "100%" }}>
      <body className={fonts} style={{ blockSize: "100%" }}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
