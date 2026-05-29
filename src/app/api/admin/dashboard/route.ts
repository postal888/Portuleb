import { requireAdmin } from "@/lib/admin/auth";
import { getDashboardCounts, getTrafficStats } from "@/lib/admin/db";
import { fetchCloudflareOverview, isCloudflareConfigured } from "@/lib/admin/cloudflare";
import { loadAllBlogPosts } from "@/lib/blog/loader";
import { listScheduledPosts } from "@/lib/admin/db";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const posts = loadAllBlogPosts();
  const counts = getDashboardCounts();
  const traffic = getTrafficStats(7);
  const cloudflare = isCloudflareConfigured() ? await fetchCloudflareOverview(7) : null;
  const scheduled = listScheduledPosts("scheduled").slice(0, 5);

  return Response.json({
    posts: posts.length,
    scheduled: counts.scheduled,
    failed: counts.failed,
    viewsToday: counts.viewsToday,
    traffic,
    cloudflare,
    upcoming: scheduled.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      publishAtUtc: r.publish_at_utc,
    })),
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? null,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://celpe-depe.com",
  });
}
