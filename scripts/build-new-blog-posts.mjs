import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "blog", "posts");

const repeticao = {
  slug: "repeticao-espacada-aprendizado-vocabulario",
  locale: "pt-br",
  title: "Repetição espaçada: o que a ciência diz sobre fixar vocabulário",
  seoTitle: "Repetição espaçada no estudo de português — o que a pesquisa mostra",
  seoDescription:
    "Como a repetição espaçada (SRS) ajuda a fixar vocabulário para o Celpe-Bras: evidências, intervalos ideais e como combinar com leitura e produção escrita.",
  subtitle:
    "SRS, encontros com palavras em contexto e produção escrita — o que funciona de verdade para reter vocabulário em português.",
  eyebrow: "Blog / Método",
  category: "Estratégia de preparação",
  readTime: "8–10 min",
  featured: false,
  publishedAt: "2026-06-22",
  tags: [
    "repetição espaçada",
    "SRS",
    "vocabulário",
    "Celpe-Bras",
    "preparação",
    "memória",
    "português",
  ],
  faq: [
    {
      question: "O que é repetição espaçada (SRS)?",
      answer:
        "É revisar palavras em intervalos crescentes (horas, dias, semanas), no momento em que você está prestes a esquecê-las. Isso fortalece a memória de longo prazo com menos tempo total de estudo.",
    },
    {
      question: "Quantas vezes preciso ver uma palavra para aprendê-la?",
      answer:
        "Para reconhecimento confiável, a literatura aponta cerca de 8–10 encontros em contextos variados; para uso ativo na escrita, 14–18 encontros ou mais, especialmente para colocações.",
    },
    {
      question: "SRS substitui ler textos e fazer provas anteriores?",
      answer:
        "Não. Cartões complementam leitura autêntica, provas anteriores e produção escrita. O Celpe-Bras exige compreensão e escrita em contexto real — o SRS fixa o léxico que você encontra nesses materiais.",
    },
    {
      question: "Posso usar SRS de graça para o Celpe-Bras?",
      answer:
        "Sim. Você pode começar com cartões a partir de textos e provas anteriores gratuitas do celpe-depe.com, combinando revisão espaçada com prática guiada e leitura anotada.",
    },
  ],
  sidebar: {
    summary:
      "Como a repetição espaçada fixa vocabulário: evidências de SLA, número de encontros com palavras, ILH e aplicação prática na preparação para o Celpe-Bras.",
    audience: [
      "Quem estuda português e esquece palavras logo depois de aprendê-las",
      "Candidatos ao Celpe-Bras que querem ampliar vocabulário ativo",
      "Professores de PLE que buscam base científica para revisão de léxico",
    ],
    links: [
      {
        label: "Guia completo do Celpe-Bras",
        href: "/pt-br/celpe-bras",
        hint: "formato do exame, partes e níveis",
      },
      {
        label: "Provas anteriores 2026/1",
        href: "/pt-br/provas-anteriores/2026-1",
        hint: "caderno, vídeos e materiais reais",
      },
    ],
  },
  blocks: [
    {
      type: "p",
      content:
        "Você anota dezenas de palavras novas em cada texto do Celpe-Bras — e, uma semana depois, não lembra a metade. Esse ciclo frustra candidatos em todos os níveis. A repetição espaçada (Spaced Repetition System, SRS) é uma das técnicas mais estudadas para quebrar esse padrão: revisar no momento certo, com esforço de recordação ativa, em vez de reler a mesma lista todos os dias.",
      lead: true,
    },
    {
      type: "geoBox",
      title: "Resumo rápido:",
      variant: "summary",
      items: [
        "SRS revisa palavras em intervalos crescentes — quando você quase esquece, não quando ainda lembra.",
        "A pesquisa aponta ganho relevante na retenção de longo prazo em relação a revisão em bloco.",
        "Palavras precisam de 8–10 encontros em contextos variados para reconhecimento; mais para uso ativo.",
        "Combine SRS com leitura, provas anteriores e produção escrita — não substitua uma pela outra.",
      ],
    },
    {
      type: "h2",
      content: "O que é repetição espaçada e por que funciona",
    },
    {
      type: "p",
      content:
        "Em vez de revisar tudo na véspera do exame, o SRS agenda cada item para o dia em que a probabilidade de esquecimento sobe — tipicamente horas, depois dias, depois semanas. O mecanismo central é a recordação ativa: você tenta lembrar antes de ver a resposta, o que consolida a memória melhor do que reler passivamente.",
    },
    {
      type: "ul",
      items: [
        "Intervalo crescente: cada acerto aumenta o prazo até a próxima revisão.",
        "Recordação ativa: pergunta → tentativa → feedback (não só reler o par palavra-tradução).",
        "Menos tempo total: menos revisões desnecessárias de itens que você já domina.",
      ],
    },
    {
      type: "callout",
      title: "O que diz a pesquisa",
      content:
        "Meta-análises e estudos controlados em contexto de ensino de línguas indicam que a repetição espaçada melhora a retenção de vocabulário de longo prazo em relação a estudo em massa (cramming). O efeito mantém-se quando o vocabulário é aprendido em contexto, não só em listas isoladas (Kim & Webb, 2022, Language Learning; Sisti, Glass & Shors, Learning & Memory).",
    },
    {
      type: "h2",
      content: "Quantos encontros uma palavra precisa?",
    },
    {
      type: "p",
      content:
        "Não basta ver a palavra uma vez no caderno do exame. Estudos de aquisição incidental e de vocabulário em L2 convergem para um patamar de encontros antes que a palavra se torne estável — especialmente se você quer usá-la na parte escrita do Celpe-Bras, não só reconhecê-la na leitura.",
    },
    {
      type: "scale",
      title: "Encontros com a palavra (síntese da literatura)",
      content:
        "1–3 encontros: traço frágil, fácil de perder. 4–5: reconhecimento começa a se formar. 8–10: reconhecimento confiável na leitura. 14–18: uso ativo na produção escrita. Colocações (dar uma olhada, levar em conta) costumam exigir mais repetições do que palavras isoladas.",
    },
    {
      type: "h2",
      content: "Profundidade de processamento: além do cartão simples",
    },
    {
      type: "p",
      content:
        "Cartões só palavra → tradução ajudam no primeiro contato, mas a Hipótese da Carga de Envolvimento (Involvement Load Hypothesis, Laufer & Hulstijn, 2001) mostra que tarefas com maior necessidade, busca e avaliação fixam melhor o léxico. Por isso a sequência ideal combina SRS com exercícios de preenchimento de lacunas e, sobretudo, produção escrita — o índice de envolvimento sobe quando você precisa usar a palavra em um texto seu.",
    },
    {
      type: "h3",
      content: "Três tipos de cartão (do mais simples ao mais profundo)",
    },
    {
      type: "ul",
      items: [
        "Forma → significado: palavra em português na frente, tradução atrás.",
        "Contexto → palavra: frase do texto com lacuna; você lembra a forma.",
        "Definição → palavra: explicação em português na frente — força pensar na língua-alvo.",
      ],
    },
    {
      type: "h2",
      content: "Como aplicar na preparação para o Celpe-Bras",
    },
    {
      type: "p",
      content:
        "O exame não testa listas de vocabulário isoladas: testa compreensão de vídeo, áudio e texto, e produção nos gêneros pedidos. Use o SRS para fixar o léxico que você extrai de materiais reais — provas anteriores, textos jornalísticos, expressões das tarefas — e volte a esses itens em novos contextos, não só no cartão.",
    },
    {
      type: "ul",
      items: [
        "Extraia palavras e colocações de provas anteriores e de leituras anotadas.",
        "Revise com SRS nos dias seguintes; não acumule centenas de cartões novos de uma vez.",
        "Alterne cartões com uma frase curta escrita por você usando o item.",
        "Antes do exame, priorize colocações e conectores discursivos que aparecem nos gêneros pedidos (e-mail, carta, artigo).",
      ],
    },
    {
      type: "callout",
      title: "Comece de graça",
      content:
        "Você pode montar seu deck a partir do acervo aberto de provas anteriores e da prática guiada do celpe-depe.com — sem prometer que «tudo» seja gratuito para sempre, mas com acesso aberto suficiente para começar hoje.",
    },
    {
      type: "h2",
      content: "Leitura + escuta + produção: a tríade",
    },
    {
      type: "p",
      content:
        "Estudos comparando leitura e escuta mostram que ler enquanto ouve (reading-while-listening) enriquece o contato inicial com formas e pronúncia. Já a produção escrita — mesmo um parágrafo curto — converte conhecimento receptivo em ativo (Swain, Output Hypothesis). O SRS encaixa entre esses polos: fixa o que você encontrou na leitura e prepara para a escrita.",
    },
    {
      type: "internalLinks",
      links: [
        { label: "Guia do Celpe-Bras", href: "/pt-br/celpe-bras" },
        { label: "Provas anteriores 2026/1", href: "/pt-br/provas-anteriores/2026-1" },
        { label: "Prática guiada", href: "/pt-br/pratica" },
      ],
    },
    {
      type: "h2",
      content: "Referências selecionadas",
    },
    {
      type: "ul",
      items: [
        "Laufer, B. & Hulstijn, J. (2001). Incidental vocabulary acquisition in a second language: The construct of task-induced involvement. Applied Linguistics.",
        "Kim, J. & Webb, S. (2022). The effects of spaced practice on L2 vocabulary learning. Language Learning.",
        "Sisti, H. M., Glass, A. M. & Shors, T. J. Spaced training enhances memory and prefrontal cortex activity. Learning & Memory.",
        "Swain, M. The output hypothesis and beyond: Mediating acquisition through collaborative dialogue.",
      ],
    },
  ],
};

const metodologia = {
  slug: "metodologia-aprendizado-portugues-pesquisa-sla",
  locale: "pt-br",
  title: "Metodologia de aprendizado de português com base em pesquisas de SLA",
  seoTitle: "Metodologia científica para aprender português — princípios e fases",
  seoDescription:
    "Como funciona a metodologia do Celpe-Dê Pé: diagnóstico, leitura com áudio, SRS, produção escrita e reciclagem — fundamentada em estudos de aquisição de segunda língua.",
  subtitle:
    "Princípios, cinco fases e evidências científicas por trás de um percurso estruturado do diagnóstico à produção escrita.",
  eyebrow: "Blog / Metodologia",
  category: "Língua portuguesa",
  readTime: "12–15 min",
  featured: false,
  publishedAt: "2026-06-22",
  tags: ["metodologia", "SLA", "português", "Celpe-Bras", "vocabulário", "escrita", "pesquisa"],
  faq: [
    {
      question: "Por que separar nível receptivo e produtivo?",
      answer:
        "Muitos candidatos compreendem textos num nível B2, mas escrevem em B1. Média única esconde lacunas; o diagnóstico inicial mede leitura e escrita separadamente para calibrar textos e exigências de produção.",
    },
    {
      question: "O que é Reading-While-Listening (RWL)?",
      answer:
        "Ler o texto enquanto ouve a narração. A pesquisa indica que esse modo enriquece o contato inicial com formas e pronúncia, em comparação com leitura ou escuta isoladas, especialmente em níveis iniciais e intermediários.",
    },
    {
      question: "Por que produção escrita é central?",
      answer:
        "Escrever ativa a hipótese do output (Swain): você descobre o que não sabe ao tentar expressar uma ideia. A escrita também atinge o índice máximo de envolvimento na Hipótese da Carga de Envolvimento (Laufer & Hulstijn), o que favorece retenção de longo prazo.",
    },
    {
      question: "Como isso se conecta ao Celpe-Bras?",
      answer:
        "O exame exige compreensão de insumos e produção nos gêneros pedidos. A metodologia treina exatamente essa combinação — com textos no nível certo, vocabulário reciclado em contextos novos e feedback sobre erros — alinhada aos critérios de adequação contextual, discursiva e linguística.",
    },
  ],
  sidebar: {
    summary:
      "Visão geral da metodologia: três princípios (input, output, reciclagem), cinco fases do diagnóstico à avaliação, e condições sem as quais o método perde efeito.",
    audienceHeading: "Para quem é este artigo",
    audience: [
      "Estudantes de português que querem entender o «porquê» do percurso",
      "Candidatos ao Celpe-Bras que buscam preparação estruturada",
      "Professores de PLE interessados em SLA aplicado",
    ],
    links: [
      {
        label: "Repetição espaçada — o que a ciência diz",
        href: "/pt-br/blog/repeticao-espacada-aprendizado-vocabulario",
        hint: "SRS e fixação de vocabulário",
      },
      {
        label: "Guia do Celpe-Bras",
        href: "/pt-br/celpe-bras",
        hint: "formato e critérios do exame",
      },
      {
        label: "Provas anteriores 2026/1",
        href: "/pt-br/provas-anteriores/2026-1",
        hint: "materiais reais para praticar",
      },
    ],
  },
  blocks: [
    {
      type: "p",
      content:
        "Aprender português para o Celpe-Bras não é acumular regras de gramática em isolamento. A metodologia que orienta o Celpe-Dê Pé parte de três princípios confirmados por décadas de pesquisa em aquisição de segunda língua (SLA): input compreensível antes de output forçado, produção escrita que converte conhecimento passivo em ativo, e reciclagem de léxico em contextos novos — não repetição mecânica do mesmo texto.",
      lead: true,
    },
    {
      type: "geoBox",
      title: "Três princípios:",
      variant: "learn",
      items: [
        "Input antes de output: o material precisa ser encontrado em contexto claro antes de ser exigido na produção.",
        "Output consolida: escrever transforma reconhecimento em uso — mecanismo distinto da leitura.",
        "Reciclagem multicontextual: a palavra só se fixa de verdade após muitos encontros em textos e tarefas diferentes.",
      ],
    },
    {
      type: "h2",
      content: "Fase 0: Diagnóstico de nível",
    },
    {
      type: "p",
      content:
        "O ponto de partida mede duas competências separadas: receptiva (quanto você entende em leitura) e produtiva (quanto consegue escrever). Elas frequentemente divergem em um ou dois níveis CEFR — e tratar tudo como «B1» esconde onde focar.",
    },
    {
      type: "ul",
      items: [
        "Teste lexical adaptativo → estimativa de cobertura léxica (quantos % das palavras de um texto você já conhece).",
        "Dois textos curtos com tempo limitado: um descritivo/narrativo, um argumentativo — avaliados por quatro critérios (conteúdo, organização, léxico, gramática), alinhados à lógica analítica do Celpe-Bras.",
      ],
    },
    {
      type: "h2",
      content: "Fase 1: Primeiro contato com texto autêntico",
    },
    {
      type: "p",
      content:
        "Textos são selecionados para cobertura léxica de 95–98%: acima de 5% de palavras desconhecidas, o contexto deixa de ser suficiente para inferir significados e a carga cognitiva estoura. O primeiro contato usa Reading-While-Listening — ler com áudio paralelo —, o que enriquece a ligação forma–som–significado em relação à leitura ou escuta isoladas.",
    },
    {
      type: "h2",
      content: "Fase 2: Aquisição dirigida (cartões SRS + exercícios)",
    },
    {
      type: "p",
      content:
        "Palavras e colocações extraídas do texto entram em revisão espaçada e em exercícios de carga crescente. A Hipótese da Carga de Envolvimento (Laufer & Hulstijn, 2001) orienta a ordem: matching e lacuna simples servem para familiarização; escrever frases e parágrafos com as formas-alvo produz retenção superior.",
    },
    {
      type: "scale",
      title: "Encontros necessários (síntese)",
      content:
        "4–5 encontros: reconhecimento inicial. 8–10: reconhecimento estável na leitura. 14–18: uso confiável na escrita. Colocações exigem mais repetições do que palavras isoladas.",
    },
    {
      type: "h2",
      content: "Fase 3: Verificação — reler com reflexão",
    },
    {
      type: "p",
      content:
        "Depois de cartões e exercícios, o aluno relê o texto original. Dificuldades não são apenas marcadas: o sistema pede hipótese («não entendo neste contexto», «ainda não fixei», «dúvida gramatical») — isso ativa metalinguagem e direciona o retorno à Fase 2 com prioridade nos itens certos.",
    },
    {
      type: "h2",
      content: "Fase 4: Produção escrita (output forçado)",
    },
    {
      type: "p",
      content:
        "Tarefa comunicativa sobre o tema do texto — não «escreva dez frases com estas palavras», mas opinião, carta ou continuação de história. Palavras-alvo são recursos sugeridos, não obrigatórios. A tentativa de produzir revela lacunas (Swain) e atinge envolvimento máximo na escala ILH.",
    },
    {
      type: "h2",
      content: "Fase 5: Avaliação, feedback e reciclagem",
    },
    {
      type: "p",
      content:
        "A redação é avaliada pelos mesmos quatro critérios do diagnóstico — progresso comparável. Feedback corretivo escrito (WCF) combina correção direta (gramática) e indireta (léxico). Itens errados voltam em textos de gêneros diferentes: notícia → diálogo → e-mail → descrição, porque reciclagem multicontextual supera repetir o mesmo passage.",
    },
    {
      type: "callout",
      title: "Três condições críticas",
      content:
        "1) Cobertura léxica ≥ 95% no texto escolhido. 2) Tarefa ativa em cada escuta — nunca áudio passivo «de fundo». 3) Contagem explícita de encontros por item — sem isso, o sistema não sabe quando o vocabulário atingiu o patamar de fixação.",
    },
    {
      type: "geoBox",
      title: "Arquitetura do método:",
      variant: "summary",
      items: [
        "F0 Diagnóstico → F1 Input (RWL) → F2 SRS + exercícios → F3 Reread → F4 Escrita → F5 Feedback + reciclagem",
        "Ciclo se repete com textos e gêneros novos; léxico problemático recebe intervalo SRS encurtado",
        "Objetivo final: vocabulário e estruturas disponíveis na parte escrita do Celpe-Bras",
      ],
    },
    {
      type: "internalLinks",
      links: [
        { label: "Repetição espaçada", href: "/pt-br/blog/repeticao-espacada-aprendizado-vocabulario" },
        { label: "Guia Celpe-Bras", href: "/pt-br/celpe-bras" },
        { label: "Provas anteriores 2026/1", href: "/pt-br/provas-anteriores/2026-1" },
      ],
    },
  ],
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, `${repeticao.slug}.json`),
  JSON.stringify(repeticao, null, 2),
  "utf8",
);
fs.writeFileSync(
  path.join(outDir, `${metodologia.slug}.json`),
  JSON.stringify(metodologia, null, 2),
  "utf8",
);
console.log("Saved:", repeticao.slug, metodologia.slug);
