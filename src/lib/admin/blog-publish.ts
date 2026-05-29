import type { BlogPost } from "@/content/blog/types";
import { saveBlogPostJson } from "@/lib/blog/loader";
import {
  getDueScheduledPosts,
  markScheduledFailed,
  markScheduledPublished,
} from "@/lib/admin/db";

export function publishBlogPost(post: BlogPost): void {
  saveBlogPostJson(post);
}

export function publishDueScheduledPosts(): { published: number; errors: string[] } {
  const due = getDueScheduledPosts();
  let published = 0;
  const errors: string[] = [];

  for (const row of due) {
    try {
      const post = JSON.parse(row.payload_json) as BlogPost;
      publishBlogPost(post);
      markScheduledPublished(row.id);
      published += 1;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      markScheduledFailed(row.id, msg);
      errors.push(`${row.slug}: ${msg}`);
    }
  }

  return { published, errors };
}
