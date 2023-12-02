import { Inter, Poppins } from "next/font/google";
import "./fonts.scss";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default [inter, poppins].map((i) => i.className).join(" ");
