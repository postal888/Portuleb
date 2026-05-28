import { ImageResponse } from "next/og";
import { getBlogPost } from "@/content/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Celpe-Dê Pé";

type Props = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "Celpe-Dê Pé";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#1a3e4c",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>Celpe-Dê Pé · Blog</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>celpe-depe.com — um passo de cada vez</div>
      </div>
    ),
    { ...size },
  );
}
