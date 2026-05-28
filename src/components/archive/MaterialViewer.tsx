import { materialPublicUrl } from "@/lib/materials/registry";

type Props = {
  sessionSlug: string;
  materialId: string;
  kind: "pdf" | "video" | "audio";
  title: string;
};

export function MaterialViewer({ sessionSlug, materialId, kind, title }: Props) {
  const src = materialPublicUrl(sessionSlug, materialId);

  return (
    <article id={`material-${materialId}`} className="archive-viewer-block">
      <h3 className="archive-viewer-title">{title}</h3>
      {kind === "pdf" && (
        <object data={src} type="application/pdf" className="archive-pdf-frame" title={title}>
          <iframe src={src} title={title} className="archive-pdf-frame" />
          <p className="archive-muted">
            O PDF não pode ser exibido aqui.{" "}
            <a href={src} target="_blank" rel="noopener noreferrer">
              Abrir o caderno em nova aba
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
          Abrir em nova aba
        </a>
      </p>
    </article>
  );
}
