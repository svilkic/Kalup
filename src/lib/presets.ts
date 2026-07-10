import { mergeConfig } from "./site";
import type { SiteConfig, SiteContent } from "./types";

import plumberConfig from "@config/presets/plumber/config.json";
import plumberContent from "@config/presets/plumber/content.json";
import salonConfig from "@config/presets/salon/config.json";
import salonContent from "@config/presets/salon/content.json";
import cafeConfig from "@config/presets/cafe/config.json";
import cafeContent from "@config/presets/cafe/content.json";
import electricianConfig from "@config/presets/electrician/config.json";
import electricianContent from "@config/presets/electrician/content.json";
import dentistConfig from "@config/presets/dentist/config.json";
import dentistContent from "@config/presets/dentist/content.json";
import lawConfig from "@config/presets/law/config.json";
import lawContent from "@config/presets/law/content.json";
import autoConfig from "@config/presets/auto/config.json";
import autoContent from "@config/presets/auto/content.json";
import fitnessConfig from "@config/presets/fitness/config.json";
import fitnessContent from "@config/presets/fitness/content.json";
import restaurantConfig from "@config/presets/restaurant/config.json";
import restaurantContent from "@config/presets/restaurant/content.json";
import photographerConfig from "@config/presets/photographer/config.json";
import photographerContent from "@config/presets/photographer/content.json";
import cleaningConfig from "@config/presets/cleaning/config.json";
import cleaningContent from "@config/presets/cleaning/content.json";
import accountingConfig from "@config/presets/accounting/config.json";
import accountingContent from "@config/presets/accounting/content.json";

/*
 * Statically bundled preset data for the /demo configurator, which runs
 * entirely in the browser and can't read preset files from disk. Only the
 * demo route imports this, so client sites don't carry the weight.
 */
export const PRESET_DATA: Record<string, { config: SiteConfig; content: SiteContent }> = {
  plumber: { config: mergeConfig(plumberConfig), content: plumberContent as SiteContent },
  salon: { config: mergeConfig(salonConfig), content: salonContent as SiteContent },
  cafe: { config: mergeConfig(cafeConfig), content: cafeContent as SiteContent },
  electrician: { config: mergeConfig(electricianConfig), content: electricianContent as SiteContent },
  dentist: { config: mergeConfig(dentistConfig), content: dentistContent as SiteContent },
  law: { config: mergeConfig(lawConfig), content: lawContent as SiteContent },
  auto: { config: mergeConfig(autoConfig), content: autoContent as SiteContent },
  fitness: { config: mergeConfig(fitnessConfig), content: fitnessContent as SiteContent },
  restaurant: { config: mergeConfig(restaurantConfig), content: restaurantContent as SiteContent },
  photographer: { config: mergeConfig(photographerConfig), content: photographerContent as SiteContent },
  cleaning: { config: mergeConfig(cleaningConfig), content: cleaningContent as SiteContent },
  accounting: { config: mergeConfig(accountingConfig), content: accountingContent as SiteContent },
};
