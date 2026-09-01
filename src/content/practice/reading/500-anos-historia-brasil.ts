import type { ReadingArticle } from "./types";
import { historiaBrasil500AnosExpressionGuide } from "./500-anos-historia-brasil-expressions";
import {
  HISTORIA_BRASIL_ADAPTATION_NOTE,
  HISTORIA_BRASIL_DIDACTIC_DISCLAIMER,
  historiaBrasil500AnosSourceCredits,
} from "./500-anos-historia-brasil-legal";
import { historiaBrasil500AnosSubtitles } from "./500-anos-historia-brasil-subtitles";
import { historiaBrasil500AnosWords } from "./500-anos-historia-brasil-words";
import { historiaBrasil500AnosBlockTranslations } from "./500-anos-historia-brasil-block-translations";

export const historiaBrasil500Anos: ReadingArticle = {
  meta: {
    slug: "500-anos-historia-brasil",
    categoryPath: "compreensao-auditiva",
    title: "500 anos de história do Brasil — vídeo anotado",
    seoTitle: "500 anos de história do Brasil — compreensão auditiva (Nostalgia)",
    seoDescription:
      "Vídeo «500 Anos em 1 Hora» (Canal Nostalgia) com legendas, vocabulário histórico e gírias brasileiras com traduções em inglês e russo.",
    eyebrow: "Prática · Ouvir",
    level: "Intermediário avançado",
    duration: "25–35 min",
    tags: ["áudio", "vídeo", "história", "vocabulário", "Nostalgia"],
  },
  hero: {
    kicker: "Compreensão auditiva · vídeo",
    title: "500 anos de história do Brasil",
    lead:
      "Ouça a abertura do vídeo do Canal Nostalgia com legendas e leia a transcrição anotada. Passe o mouse nas expressões sublinhadas; alterne EN/RU na lista à direita.",
    objectives: [
      "Treinar listening-while-reading com narração histórica em português brasileiro",
      "Fixar vocabulário colonial e gírias frequentes na fala informal",
      "Relacionar fatos (Tordesilhas, pau-brasil, capitanias) com expressões em contexto",
    ],
  },
  annotatedText: {
    sectionTitle: "Transcrição anotada (abertura do vídeo)",
    intro:
      "Trecho didático da abertura até o início do ciclo da cana-de-açúcar. O português permanece original no sentido; nomes e pontuação foram ajustados para estudo.",
    blocks: [
      {
        id: "par-1",
        title: "O desafio",
        segments: [
          {
            text: "Olá, meus queridos amigos, tudo bem com vocês? Eu sou o Felipe Castanhari e gostaria de fazer um desafio: vocês sabiam que dá para resumir a história inteira do Brasil em apenas quatro coisinhas? Vai, tenta aí… FHC, Lula, Dilma, Temer? Não. Pelé, Romário, Ronaldinho, Neymar? Não. Se você não faz ideia de quais são essas quatro coisas, este vídeo é especialmente para você. O Nostalgia finalmente está de volta — e hoje eu vou contar 500 anos de história em apenas uma hora. É claro que em uma hora não dá para falar absolutamente tudo, só que vou passar pelas etapas mais importantes e mostrar como elas se ligam. Então ",
          },
          {
            text: "chega de enrolar",
            highlight: true,
            expressionId: "chega-de-enrolar",
          },
          { text: ": vamos começar." },
        ],
      },
      {
        id: "par-2",
        title: "Duas pernas da história",
        segments: [
          {
            text: "Antes de falar dessas quatro coisas, vocês precisam entender como a história do Brasil funciona. Vamos ",
          },
          {
            text: "fazer de conta que",
            highlight: true,
            expressionId: "fazer-de-conta-que",
          },
          {
            text: " toda essa história é uma pessoa — e essa pessoa, como eu e você, tem duas pernas que sustentam o corpo inteiro. Uma dessas pernas é a economia: como as riquezas desse povo são produzidas. No caso do Brasil, são as ",
          },
          {
            text: "matérias-primas",
            highlight: true,
            expressionId: "materias-primas",
          },
          {
            text: " exportadas para o mundo inteiro. A outra perna é o poder político: quem governa o povo. Essas duas pernas ",
          },
          {
            text: "andam juntas",
            highlight: true,
            expressionId: "andar-juntas",
          },
          {
            text: ", porque aqui quem controla as matérias-primas também controla o país. Por isso foram 500 anos de conflitos: em todas as épocas, todo mundo queria uma matéria-prima ",
          },
          {
            text: "para chamar de sua",
            highlight: true,
            expressionId: "para-chamar-de-sua",
          },
          { text: "." },
        ],
      },
      {
        id: "par-3",
        title: "As quatro coisas",
        segments: [
          {
            text: "Depois dessa introdução fica mais fácil descobrir quais são as quatro coisas que resumem a história do Brasil: pau-brasil, cana-de-açúcar, ouro e café. Esses produtos não contam todos os detalhes, mas ajudam demais a enxergar como a história foi escrita — pelo menos depois que os europeus chegaram. Porque é óbvio: a história do Brasil não começou em 1500.",
          },
        ],
      },
      {
        id: "par-4",
        title: "Antes de 1500",
        segments: [
          {
            text: "Todo mundo sabe que já existia gente aqui antes dos portugueses. Existem ",
          },
          {
            text: "sítios arqueológicos",
            highlight: true,
            expressionId: "sitios-arqueologicos",
          },
          {
            text: " que mostram ocupação muito antiga. Estudos apontam presença humana por volta de 45 mil anos atrás. O Parque Nacional da Serra da Capivara, no sudeste do Piauí, tem mais de 400 sítios e a maior concentração de pinturas rupestres do mundo — ",
          },
          {
            text: "vestígios de ocupação",
            highlight: true,
            expressionId: "vestigios-de-ocupacao",
          },
          {
            text: " humana que datam de cerca de 50 mil anos. Isso é a pré-história brasileira. Com o passar dos milênios, essas sociedades se organizaram — e agora estou falando dos povos indígenas.",
          },
        ],
      },
      {
        id: "par-5",
        title: "Povos indígenas por volta de 1500",
        segments: [
          {
            text: "Os historiadores estimam que por volta de 1500 havia cerca de 5 milhões de indígenas no território que hoje é o Brasil; hoje a população indígena é bem menor. Esses povos formavam nações divididas em vários grupos. Aquele papinho de que viviam em paz absoluta antes dos europeus ",
          },
          {
            text: "não condiz com a verdade",
            highlight: true,
            expressionId: "nao-condiz-com-a-verdade",
          },
          { text: ": " },
          {
            text: "a treta rolava solta",
            highlight: true,
            expressionId: "a-treta-rolava-solta",
          },
          {
            text: " entre tribos, porque estavam sempre ",
          },
          {
            text: "saindo na mão",
            highlight: true,
            expressionId: "sair-na-mao",
          },
          {
            text: " — ou no arco e flecha — na disputa por territórios. Mas, em 1500, alguns indígenas viram caravelas no horizonte… e mal desconfiavam do que estava chegando.",
          },
        ],
      },
      {
        id: "par-6",
        title: "Rotas, oceanos e Tordesilhas",
        segments: [
          {
            text: "No final do século XV, os produtos mais valiosos da Europa eram as especiarias das Índias — como os europeus chamavam o Oriente. Todo mundo queria rota direta para comercializar esses produtos. Os navios saíam com a missão de abrir rotas e conquistar terras novas. Quem mandava nos oceanos era Portugal e Espanha; brigavam tanto que até o Papa teve que ",
          },
          {
            text: "entrar em campo",
            highlight: true,
            expressionId: "entrar-em-campo",
          },
          {
            text: " e ajudar a dividir o mundo entre os dois. Esse é o famoso ",
          },
          {
            text: "Tratado de Tordesilhas",
            highlight: true,
            expressionId: "tratar-de-tordesilhas",
          },
          {
            text: ", feito logo depois da descoberta da América: uma linha imaginária no mapa — terras a um lado para Portugal, ao outro para a Espanha.",
          },
        ],
      },
      {
        id: "par-7",
        title: "Cabral: descobrimento ou conquista?",
        segments: [
          {
            text: "Foi com esse tratado no bolso que uma frota portuguesa liderada por Pedro Álvares Cabral chegou ao que hoje é a Bahia, em 22 de abril de 1500. A gente chama isso de «descobrimento do Brasil», mas a história é contada ",
          },
          {
            text: "do ponto de vista de",
            highlight: true,
            expressionId: "do-ponto-de-vista-de",
          },
          {
            text: " os europeus — o território e os povos indígenas já existiam há muito tempo. Na prática, esses navegantes eram conquistadores que ",
          },
          {
            text: "tomavam posse de",
            highlight: true,
            expressionId: "tomar-posse-de",
          },
          {
            text: " novas terras em nome do rei. Muita gente acredita que Cabral se perdeu por acidente; várias teorias dizem que Portugal já sabia da terra e veio justamente tomá-la. Esse primeiro rolezinho durou cerca de 10 dias: exploraram, falaram com nativos, rezaram missas e declararam a terra «Ilha de Vera Cruz» — mas o Brasil ficou quase abandonado por uns 30 anos.",
          },
        ],
      },
      {
        id: "par-8",
        title: "Pau-brasil e o nome do país",
        segments: [
          {
            text: "Portugal esfriou o entusiasmo quando não achou ouro na costa. Aí ",
          },
          {
            text: "cresceram o olho",
            highlight: true,
            expressionId: "crescer-o-olho",
          },
          {
            text: " de verdade ao perceber uma árvore peculiar: o pau-brasil, que produzia tinta vermelha para tingir tecidos e valia muito. O litoral estava cheio delas. Os portugueses ",
          },
          {
            text: "fizeram a festa",
            highlight: true,
            expressionId: "fazer-a-festa",
          },
          {
            text: " e vieram explorar a madeira — na prática, quem derrubava eram indígenas, em troca de ",
          },
          {
            text: "bugigangas",
            highlight: true,
            expressionId: "bugigangas",
          },
          {
            text: " e machados de ferro. Assim a Ilha de Vera Cruz / Terra de Santa Cruz virou Terra do Brasil e, depois, simplesmente Brasil. Quando franceses também passaram a explorar o pau-brasil, Portugal ",
          },
          {
            text: "se ligou que",
            highlight: true,
            expressionId: "se-ligar-que",
          },
          {
            text: " a única maneira de impedir isso era mandar gente para ocupar a terra de verdade.",
          },
        ],
      },
      {
        id: "par-9",
        title: "Capitanias e governadores",
        segments: [
          {
            text: "Em 1530, Martim Afonso de Sousa desembarcou e fundou São Vicente (1532), a primeira vila. Para colonizar sem gastar do próprio bolso, o rei dividiu o Brasil em faixas chamadas ",
          },
          {
            text: "capitanias hereditárias",
            highlight: true,
            expressionId: "capitanias-hereditarias",
          },
          {
            text: " e entregou a donatários: eles deveriam povoar, proteger e fazer a terra ",
          },
          {
            text: "dar lucro",
            highlight: true,
            expressionId: "dar-lucro",
          },
          {
            text: " ao rei. Quase só São Vicente e Pernambuco lucaram de fato. Então veio o passo político: um governador-geral para a colônia inteira. Os mais lembrados na escola são Tomé de Sousa, Duarte da Costa e Mem de Sá. Tomé de Sousa fundou Salvador, a primeira capital. Chegaram também os primeiros jesuítas.",
          },
        ],
      },
      {
        id: "par-10",
        title: "Cruz, espada e cana",
        segments: [
          {
            text: "No século XVI, a Igreja Católica ficava ",
          },
          {
            text: "de mãos dadas",
            highlight: true,
            expressionId: "de-maos-dadas",
          },
          {
            text: " com Portugal e Espanha: onde um ia, a igreja ia atrás. Os jesuítas vinham para ",
          },
          {
            text: "catequizar",
            highlight: true,
            expressionId: "catequizar",
          },
          {
            text: " os indígenas. Cruz e espada — metáfora forte do vídeo — apontam para conquista: a espada contra quem resistia, a cruz para converter. Os portugueses ",
          },
          {
            text: "não estavam nem um pouco",
            highlight: true,
            expressionId: "nem-um-pouco",
          },
          {
            text: " preocupados em preservar a cultura indígena. E aí entra o segundo item da lista: a cana-de-açúcar. Solo e clima do litoral eram ideais; o açúcar valia muito na Europa e virou a principal atividade da colônia, sobretudo no Nordeste. Impossível falar disso sem falar de escravidão: primeiro dos indígenas, depois — com o crescimento das plantações por volta de 1550 — do tráfico africano, porque os colonos precisavam de ",
          },
          {
            text: "mão de obra",
            highlight: true,
            expressionId: "mao-de-obra",
          },
          { text: " para " },
          {
            text: "dar conta de",
            highlight: true,
            expressionId: "dar-conta-de",
          },
          {
            text: " tanta produção — e o próprio tráfico era um dos negócios mais lucrativos da época.",
          },
        ],
      },
    ],
  },
  media: {
    youtubeVideoId: "q7E4XrfGGnE",
    subtitles: historiaBrasil500AnosSubtitles,
    subtitlesLabel: "Legendas + tradução (EN/RU) — vídeo completo",
    words: historiaBrasil500AnosWords,
  },
  expressionGuide: historiaBrasil500AnosExpressionGuide,
  didacticDisclaimer: HISTORIA_BRASIL_DIDACTIC_DISCLAIMER,
  adaptationNote: HISTORIA_BRASIL_ADAPTATION_NOTE,
  sourceCredits: historiaBrasil500AnosSourceCredits,
  closingNote: {
    title: "Próximo passo",
    body: "Ouça de novo o trecho no YouTube sem olhar o texto; depois volte ao glossário e tente usar 5 expressões em frases suas.",
    links: [
      { label: "Voltar a Ouvir", href: "/pt-br/pratica/compreensao-auditiva" },
      { label: "Hub Prática", href: "/pt-br/pratica" },
      {
        label: "Vídeo original (Nostalgia)",
        href: "https://www.youtube.com/watch?v=q7E4XrfGGnE",
      },
    ],
  },
} satisfies ReadingArticle;

function enrichBlocksWithTranslations() {
  for (const block of historiaBrasil500Anos.annotatedText.blocks) {
    const tr = historiaBrasil500AnosBlockTranslations[block.id];
    if (!tr) continue;
    block.en = tr.en;
    block.ru = tr.ru;
  }
}
enrichBlocksWithTranslations();

