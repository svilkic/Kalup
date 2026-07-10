import {
  Sparkles, Wrench, Flame, ShowerHead, ThermometerSun, Droplets, Zap,
  FileCheck, Clock, ShieldCheck, Package, MessageSquare, Star, Check,
  Phone, Mail, MapPin, Hammer, Home, Truck, Scissors, Leaf, PaintRoller,
  Lightbulb, Heart, Award, ThumbsUp, Users, Calendar, Settings,
  Coffee, Croissant, Cake, Wifi, Music, Gem,
  Smile, Stethoscope, HeartPulse, Scale, Briefcase, FileText, Handshake,
  Car, Gauge, BatteryCharging, Dumbbell, Activity, Timer,
  UtensilsCrossed, Wine, ChefHat, Salad, Camera, Aperture, Film,
  SprayCan, Calculator, PiggyBank, TrendingUp, Receipt,
  type LucideIcon,
} from "lucide-react";

/*
 * Curated map instead of `import * as icons` so tree-shaking keeps the
 * bundle small. Add icons here as content.json needs them.
 */
const icons: Record<string, LucideIcon> = {
  Sparkles, Wrench, Flame, ShowerHead, ThermometerSun, Droplets, Zap,
  FileCheck, Clock, ShieldCheck, Package, MessageSquare, Star, Check,
  Phone, Mail, MapPin, Hammer, Home, Truck, Scissors, Leaf, PaintRoller,
  Lightbulb, Heart, Award, ThumbsUp, Users, Calendar, Settings,
  Coffee, Croissant, Cake, Wifi, Music, Gem,
  Smile, Stethoscope, HeartPulse, Scale, Briefcase, FileText, Handshake,
  Car, Gauge, BatteryCharging, Dumbbell, Activity, Timer,
  UtensilsCrossed, Wine, ChefHat, Salad, Camera, Aperture, Film,
  SprayCan, Calculator, PiggyBank, TrendingUp, Receipt,
};

/** Full map, exported for the dev editor's icon picker. */
export const iconMap = icons;

/** Look up an icon by its content.json name; unknown names fall back to Sparkles. */
export function Icon({ name, className }: { name?: string; className?: string }) {
  if (process.env.NODE_ENV === "development" && name && !icons[name]) {
    console.warn(`[wbuild] Unknown icon "${name}" in content.json — using Sparkles. Add it to src/lib/icons.tsx.`);
  }
  const Cmp = (name && icons[name]) || Sparkles;
  return (
    <Cmp
      className={className}
      aria-hidden="true"
      // Lets the dev content editor map this icon back to its content.json field.
      {...(process.env.NODE_ENV === "development" && name ? { "data-icon": name } : {})}
    />
  );
}
