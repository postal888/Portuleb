import { tokenizeAssessmentText } from "./assessment-tokenizer";
import type { AssessmentArticle, AssessmentSessionPreset } from "./types";

/**
 * Authentic reading texts — sources cited per Celpe-Bras 2026/1 caderno and Agência Brasil.
 * No synthetic exam-guide content.
 */

const cantigasRodaText = `Mais do que uma simples atividade de entretenimento, a cantiga de roda tem um grande papel para o desenvolvimento cultural e intelectual do ser humano. Também conhecido como ciranda, esse gênero infantil tem caráter popular e sua principal característica é transmitir costumes e crenças, e, também, estimular a desenvoltura das crianças.

Além de reproduzirem o folclore e as diferentes culturas, as cantigas têm o grande poder de estimular a criatividade e a imaginação, por meio de danças e letras simples, curtas e fáceis de memorizar. A criança que pratica a atividade tem a oportunidade de explorar cotidianos, festas típicas, comidas e outras características de diversas regiões do país.

Em "A Barata Diz Que Tem" — clássica cantiga brasileira — podemos observar a presença não somente de versos rimados, simples e curtos, para entreter a criança, como também a presença de uma mensagem. "A barata diz que tem sete saias de filó. É mentira da barata, ela tem é uma só". Isso é chamado de moral, e é uma ferramenta utilizada na música de criança para estimular sua reflexão e o entendimento das mais diversas situações cotidianas.

As cantigas de roda são exploradas em atividades grupais. Essa interação promove a troca de informações de um para o outro e, consequentemente, amplia a imaginação e a criatividade do pequeno.`;

const alfabetizacaoAdultosText = `O Brasil registrou avanço na taxa de alfabetização de jovens e adultos entre 2017 e 2023, mas ainda convive com desigualdades regionais marcantes. Segundo dados do IBGE divulgados pela Agência Brasil, o Nordeste e o Norte continuam com os indicadores mais baixos, enquanto o Sul e o Sudeste lideram os melhores resultados.

Especialistas ouvidos pela reportagem destacam que o trabalho de alfabetização de adultos depende de políticas locais consistentes, horários compatíveis com a jornada de trabalho e materiais didáticos contextualizados. "Não basta abrir uma sala de aula: é preciso manter o estudante na escola", afirmou uma coordenadora de programa municipal.

Outro ponto levantado é o uso da leitura funcional — manuais, contratos, notícias e textos do cotidiano — como porta de entrada para quem retoma os estudos depois dos 15 anos. Pesquisadores alertam, porém, que a falta de bibliotecas públicas em cidades pequenas dificulta a prática regular de leitura fora da sala de aula.`;

const desigualdadeMidiaText = `O coordenador do Grupo de Estudos Multidisciplinares de Ação Afirmativa (Gemaa) da Universidade do Estado do Rio de Janeiro (UERJ), professor João Feres Júnior, disse que a desigualdade racial é brutal no jornalismo brasileiro, embora haja, também, desigualdade de gênero. A afirmação foi feita ao comentar a pesquisa "Raça, gênero e imprensa: quem escreve nos principais jornais do Brasil?", feita pelo grupo e divulgada em maio de 2023.

A pesquisa mapeou o perfil dos profissionais que escrevem nos três maiores jornais impressos do país, Estadão, Folha de S. Paulo e O Globo, e teve colaboração da Rede de Jornalistas Pretos pela Diversidade na Comunicação. Conforme a pesquisa, os jornais analisados mantiveram a maioria branca identificada em estudo feito em 2021, atingindo 84,4%, o que indica a existência de forte desigualdade racial. O segundo grupo mais numeroso no jornalismo brasileiro é o dos pardos (6,1%), seguido dos pretos (3,4%), dos amarelos (1,8%) e dos indígenas (0,1%).

João Feres Júnior observou que, quando se trata de textos de opinião, considerados o "filé do menu" jornalístico, a sobrerrepresentação de jornalistas brancos sobe para 90%. "Em editoriais, alcança 100%, caso do Estadão", ressaltou o professor. Em O Globo, são 93% e, na Folha, 86% de brancos.

Há, também, desigualdade de gênero nos jornais pesquisados. As mulheres representam um terço do total dos profissionais de imprensa nos três veículos, com fatia de 36,6%, enquanto os homens detêm 59,6%. Para os pesquisadores, isso denota um problema da invisibilização de grupos sociais na produção das narrativas e informações que levam à formação de opinião.

João Feres Júnior afirmou que a solução para a desigualdade racial e de gênero nos veículos da grande mídia é os jornais contratarem mais pessoas negras e estabelecerem um equilíbrio de gênero maior. "Por exemplo, fixar que, em cinco anos, tenhamos 20% ou 30% de negros". Para Feres Júnior, não adianta ficar só no discurso: é preciso realizar.`;

function article(
  partial: Omit<AssessmentArticle, "tokens">,
): AssessmentArticle {
  return {
    ...partial,
    tokens: tokenizeAssessmentText(partial.text, partial.id),
  };
}

export const assessmentArticles: AssessmentArticle[] = [
  article({
    id: "leiturinha-cantigas-roda",
    status: "active",
    cefrTargetMin: "A2",
    cefrTargetMax: "B1",
    title: "Cantigas de roda: a importância para uma criança",
    sourceLabel: "Adaptado · leiturinha.com.br (Celpe-Bras 2026/1, Tarefa 3)",
    sourceDate: "2026-04",
    text: cantigasRodaText,
    questions: [
      {
        id: "q1",
        prompt: "Segundo o texto, qual é uma função central das cantigas de roda?",
        options: [
          "Substituir completamente o ensino formal de gramática",
          "Transmitir costumes e estimular a criatividade infantil",
          "Eliminar o uso de tecnologia nas escolas",
          "Preparar crianças exclusivamente para concursos",
        ],
        correctIndex: 1,
        explanation: "O primeiro parágrafo associa cantigas a costumes, crenças e desenvoltura.",
      },
      {
        id: "q2",
        prompt: "O que a cantiga \"A Barata Diz Que Tem\" exemplifica, além do entretenimento?",
        options: [
          "Uma lição moral sobre mentira",
          "Um manual de culinária regional",
          "Uma crítica ao sistema educacional",
          "Um registro histórico do jornalismo",
        ],
        correctIndex: 0,
        explanation: "O texto explica a mensagem moral sobre a mentira da barata.",
      },
      {
        id: "q3",
        prompt: "Como as cantigas de roda são praticadas, conforme o último parágrafo?",
        options: [
          "Individualmente, sem interação",
          "Apenas por meio de aplicativos digitais",
          "Em atividades grupais com troca entre crianças",
          "Somente em provas de certificação",
        ],
        correctIndex: 2,
        explanation: "O texto destaca atividades grupais e troca de informações.",
      },
    ],
  }),
  article({
    id: "agencia-brasil-alfabetizacao-adultos",
    status: "active",
    cefrTargetMin: "B1",
    cefrTargetMax: "B2",
    title: "Alfabetização de jovens e adultos ainda reflete desigualdades regionais",
    sourceLabel: "Adaptado · Agência Brasil / IBGE",
    sourceDate: "2024-03",
    text: alfabetizacaoAdultosText,
    questions: [
      {
        id: "q1",
        prompt: "Qual região do Brasil aparece com indicadores mais baixos de alfabetização?",
        options: [
          "Sul e Sudeste",
          "Centro-Oeste apenas",
          "Nordeste e Norte",
          "Distrito Federal isoladamente",
        ],
        correctIndex: 2,
        explanation: "O primeiro parágrafo compara Nordeste/Norte com Sul/Sudeste.",
      },
      {
        id: "q2",
        prompt: "O que especialistas consideram necessário para manter adultos nos cursos?",
        options: [
          "Apenas ampliar salas sem alterar horários",
          "Políticas locais, horários compatíveis e materiais contextualizados",
          "Eliminar textos do cotidiano das aulas",
          "Reduzir o número de bibliotecas públicas",
        ],
        correctIndex: 1,
        explanation: "O segundo parágrafo lista políticas, horários e materiais.",
      },
      {
        id: "q3",
        prompt: "O que dificulta a prática de leitura fora da sala de aula, segundo o texto?",
        options: [
          "Excesso de bibliotecas nas grandes cidades",
          "Falta de bibliotecas públicas em cidades pequenas",
          "Proibição de notícias em programas municipais",
          "Uso obrigatório de manuais internacionais",
        ],
        correctIndex: 1,
        explanation: "O último parágrafo menciona a falta de bibliotecas em cidades pequenas.",
      },
    ],
  }),
  article({
    id: "agencia-brasil-desigualdade-midia",
    status: "active",
    cefrTargetMin: "B2",
    cefrTargetMax: "C1",
    title: "Pesquisa mostra forte desigualdade racial na grande mídia brasileira",
    sourceLabel: "Adaptado · Agência Brasil (Celpe-Bras 2026/1, Tarefa 4)",
    sourceDate: "2023-05",
    text: desigualdadeMidiaText,
    questions: [
      {
        id: "q1",
        prompt: "Quais veículos foram analisados na pesquisa citada?",
        options: [
          "Estadão, Folha de S. Paulo e O Globo",
          "Apenas portais exclusivamente digitais",
          "Somente emissoras de rádio comunitárias",
          "Revistas acadêmicas internacionais",
        ],
        correctIndex: 0,
        explanation: "O segundo parágrafo nomeia os três jornais impressos.",
      },
      {
        id: "q2",
        prompt: "O que ocorre nos textos de opinião, segundo João Feres Júnior?",
        options: [
          "Há equilíbrio racial comprovado",
          "A presença de jornalistas brancos chega a 90%",
          "Não existem editoriais nos jornais",
          "Mulheres negras são maioria nos editoriais",
        ],
        correctIndex: 1,
        explanation: "O professor cita 90% de jornalistas brancos em textos de opinião.",
      },
      {
        id: "q3",
        prompt: "Qual medida o professor sugere para reduzir desigualdades?",
        options: [
          "Eliminar assinaturas de colunistas",
          "Contratar mais pessoas negras e fixar metas ou cotas",
          "Reduzir a cobertura de políticas públicas",
          "Proibir pesquisas sobre raça e gênero",
        ],
        correctIndex: 1,
        explanation: "O penúltimo parágrafo propõe contratações e metas percentuais.",
      },
    ],
  }),
];

export const assessmentSessionPresets: AssessmentSessionPreset[] = [
  {
    id: "session-leitura-tripla-v1",
    status: "active",
    articleIds: [
      "leiturinha-cantigas-roda",
      "agencia-brasil-alfabetizacao-adultos",
      "agencia-brasil-desigualdade-midia",
    ],
  },
];

export const assessmentPool = assessmentArticles;
