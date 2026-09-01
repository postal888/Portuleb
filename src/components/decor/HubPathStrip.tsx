import Link from "next/link";
import { IconCheck } from "@/components/home/HomeIcons";

const steps = [
  {
    href: "/pt-br/teoria",
    label: "Teoria",
    desc: "revisar a base gramatical e de vocabulário",
    points: ["Estruturas", "Verbos", "Léxico"],
  },
  {
    href: "/pt-br/pratica",
    label: "Prática",
    desc: "aplicar no formato do exame",
    points: ["Leitura", "Escrita", "Áudio"],
  },
  {
    href: "/pt-br/provas-anteriores",
    label: "Provas",
    desc: "materiais reais de edições anteriores",
    points: ["Cadernos", "Vídeos", "Roteiros"],
  },
] as const;

export function HubPathStrip() {
  return (
    <div className="hub-path-panel">
      <p className="hub-path-kicker">Jornada sugerida</p>
      <ol className="hub-path-grid home-stagger">
        {steps.map((step, i) => (
          <li key={step.href} className="hub-path-item">
            <Link href={step.href} className="hub-path-card group">
              <span className="hub-path-num">{i + 1}</span>
              <span className="hub-path-card-body">
                <span className="hub-path-card-title">{step.label}</span>
                <span className="hub-path-card-desc">{step.desc}</span>
                <ul className="hub-path-points">
                  {step.points.map((p) => (
                    <li key={p}>
                      <IconCheck className="hub-path-check" />
                      {p}
                    </li>
                  ))}
                </ul>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
