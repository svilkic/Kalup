import { getConfig, getContent } from "@/lib/site";
import { SiteRenderer } from "@/components/SiteRenderer";

export default function HomePage() {
  return <SiteRenderer config={getConfig()} content={getContent()} />;
}
