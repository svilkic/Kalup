"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { getConfig, getContent } from "@/lib/site";
import { themeToCssVars } from "@/lib/theme";
import { getFontClass } from "@/lib/fonts";
import { SiteRenderer } from "@/components/SiteRenderer";
import { ConfigSidebar } from "@/components/ConfigSidebar";
import { ContentEditor } from "@/components/ContentEditor";
import { PRESET_DATA } from "@/lib/presets";

/*
 * Public showcase of the configurator. Everything runs in browser state —
 * no files are written, nothing persists across reloads. Enabled only when
 * the build has NEXT_PUBLIC_DEMO=1, so client deployments 404 here.
 */
export default function DemoPage() {
  if (process.env.NEXT_PUBLIC_DEMO !== "1") notFound();
  return <DemoApp />;
}

function DemoApp() {
  const [config, setConfig] = useState(getConfig);
  const [content, setContent] = useState(getContent);
  // Bumped on preset apply so both editors remount with the fresh state.
  const [epoch, setEpoch] = useState(0);

  const applyPreset = (id: string) => {
    const preset = PRESET_DATA[id];
    if (!preset) return;
    setConfig(preset.config);
    setContent(preset.content);
    setEpoch((e) => e + 1);
  };

  return (
    <div
      style={themeToCssVars(config.theme)}
      className={`${getFontClass(config.theme.fontFamily)} min-h-screen bg-page text-body`}
    >
      <div data-dev-ui className="bg-gray-900 px-4 py-2 text-center text-xs text-white/80">
        Demo playground — changes live only in your browser. Use the sidebar to switch presets and layouts,
        right-click any text, image, or icon to edit, and Download to export your JSON.
      </div>
      <SiteRenderer config={config} content={content} />
      <ConfigSidebar key={`config-${epoch}`} initial={config} onChange={setConfig} onPreset={applyPreset} />
      <ContentEditor key={`content-${epoch}`} initial={content} onChange={setContent} />
    </div>
  );
}
