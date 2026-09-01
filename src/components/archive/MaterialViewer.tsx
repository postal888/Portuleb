import type { Locale } from "@/i18n/locales";
import { materialDomId } from "@/i18n/anchors";
import { materialPublicUrl } from "@/lib/materials/registry";

type Props = {
  locale?: Locale;
  sessionSlug: string;
  materialId: string;
  kind: "pdf" | "video" | "audio";
  title: string;
  openInNewTabLabel?: string;
  pdfFallbackHint?: string;
};

export function MaterialViewer({
  locale = "pt-br",
  sessionSlug,
  materialId,
  kind,
  title,
  openInNewTabLabel = "Abrir em nova aba",
  pdfFallbackHint,
}: Props) {
  const src = materialPublicUrl(sessionSlug, materialId);
  const domId = materialDomId(locale, materialId);

  return (
    <article id={domId} className="archive-viewer-block">
      <h3 className="archive-viewer-title">{title}</h3>
      {kind === "pdf" && (
        <object data={src} type="application/pdf" className="archive-pdf-frame" title={title}>
          <iframe src={src} title={title} className="archive-pdf-frame" />
          <p className="archive-muted">
            {pdfFallbackHint ?? "O PDF não pode ser exibido aqui."}{" "}
            <a href={src} target="_blank" rel="noopener noreferrer">
              {openInNewTabLabel}
            </a>
          </p>
        </object>
      )}
      {kind === "video" && (
        <video src={src} controls preload="metadata" className="archive-media-player">
          <track kind="captions" />
          Seu navegador não suporta reprodução de vídeo.
        </video>
      )}
      {kind === "audio" && (
        <audio src={src} controls preload="metadata" className="archive-media-player w-full">
          Seu navegador não suporta reprodução de áudio.
        </audio>
      )}
      <p className="archive-viewer-hint">
        <a href={src} target="_blank" rel="noopener noreferrer">
          {openInNewTabLabel}
        </a>
      </p>
    </article>
  );
}
