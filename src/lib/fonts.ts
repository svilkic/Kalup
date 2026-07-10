import { Inter, Manrope, Sora, Work_Sans, DM_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const sora = Sora({ subsets: ["latin"], display: "swap" });
const workSans = Work_Sans({ subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

/*
 * next/font requires each font to be a literal, build-time import, so fonts
 * are opt-in here rather than fully dynamic. Add a new Google font by
 * importing it above and adding one map entry.
 */
const fonts: Record<string, { className: string }> = {
  Inter: inter,
  Manrope: manrope,
  Sora: sora,
  "Work Sans": workSans,
  "DM Sans": dmSans,
};

export function getFontClass(family: string): string {
  return (fonts[family] ?? inter).className;
}
