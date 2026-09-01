import type { TheoryTopic } from "./types";

export const crase: TheoryTopic = {
  meta: {
    slug: "crase",
    keyword: "crase",
    title: "Crase",
    seoTitle: "Crase: quando usar o «à», com dois testes práticos",
    seoDescription:
      "Quando usar crase e quando não usar: os dois testes que resolvem quase todos os casos, tabela de uso obrigatório, proibido e facultativo, locuções com «à» e os erros mais comuns.",
    eyebrow: "Teoria · Gramática",
    axis: "gramatica",
    level: "Intermediário",
    readingTime: "7–9 min",
    tags: ["crase", "acentuação", "preposições", "escrita formal"],
    publishedAt: "2026-09-01",
  },
  hero: {
    kicker: "Regra com atalho",
    title: "Crase",
    lead:
      "A crase assusta mais do que deveria. Por trás da longa lista de casos há um só fenômeno — dois «a» que se juntam — e dois testes que resolvem a grande maioria das dúvidas em segundos.",
    quickAnswer:
      "Crase é a fusão de duas vogais iguais, normalmente a preposição «a» com o artigo feminino «a(s)», marcada pelo acento grave: à, às. Também ocorre com os demonstrativos «aquele», «aquela», «aquilo» (àquele, àquela, àquilo) e com o relativo «a qual» (à qual). O teste mais rápido é trocar a palavra feminina por uma masculina: se aparecer «ao», há crase.",
  },
  sections: [
    {
      kind: "prose",
      id: "o-que-e",
      title: "O que é crase",
      paragraphs: [
        "«Crase» vem do grego e significa fusão. No português, descreve o encontro de duas vogais iguais que se contraem numa só, marcada pelo acento grave.",
        "O caso mais comum é a preposição «a» encontrando o artigo definido feminino «a»: «Vou a» + «a praia» = «Vou à praia». Existem apenas dois «a» ali, um exigido pelo verbo e outro que acompanha o substantivo — o acento grave é o registro dessa soma.",
        "Isso explica por que a crase não aparece antes de verbo: verbo não tem artigo. «Começou a chover» tem um único «a», o da preposição. Não há nada com que se fundir.",
      ],
    },
    {
      kind: "rule",
      id: "testes",
      title: "Os dois testes que resolvem quase tudo",
      intro:
        "Antes de decorrer a lista de casos, aprenda estes dois testes. Eles cobrem a maior parte das situações reais de escrita.",
      items: [
        {
          label: "Teste 1 — troque por uma palavra masculina",
          text:
            "Substitua o substantivo feminino por um masculino equivalente. Se a frase pedir «ao», existe crase e o acento é obrigatório. Se pedir apenas «a», não há.",
          example:
            "«Vou à praia» → «Vou ao parque» ✓ com crase. «Andamos a pé» → «Andamos a nado», não «ao nado» ✗ sem crase.",
        },
        {
          label: "Teste 2 — para nomes de lugar, use «voltar de / da»",
          text:
            "Com cidades, estados e países, verifique como se diz a volta. Se você volta «da», vai «à». Se volta «de», vai «a».",
          example:
            "«Volto da Bahia» → «Vou à Bahia». «Volto de Roma» → «Vou a Roma».",
        },
        {
          label: "Atalho para os demonstrativos",
          text:
            "Se a frase aceitar «àquele» no masculino, o feminino leva acento também. É o mesmo raciocínio do Teste 1, aplicado a «aquele/aquela/aquilo».",
          example: "«Refiro-me àquela decisão» → «Refiro-me àquele documento» ✓",
        },
      ],
    },
    {
      kind: "table",
      id: "casos",
      title: "Quando há, quando não há e quando é facultativa",
      intro:
        "A tabela abaixo agrupa os casos pelo que você precisa decidir na hora de escrever. Se o teste da palavra masculina já respondeu, não precisa consultá-la.",
      columns: ["Situação", "Uso", "Exemplo"],
      rows: [
        [
          "Substantivo feminino com artigo",
          "Obrigatória",
          "Entreguei o documento à secretária.",
        ],
        [
          "Locuções adverbiais e conjuntivas femininas",
          "Obrigatória",
          "à noite, às pressas, à vontade, às vezes, à medida que",
        ],
        ["Horas determinadas", "Obrigatória", "A prova começa às oito horas."],
        [
          "Antes de «aquele», «aquela», «aquilo»",
          "Obrigatória",
          "Refiro-me àquela decisão do conselho.",
        ],
        [
          "«à moda de», «à maneira de» (mesmo antes de masculino)",
          "Obrigatória",
          "bife à milanesa; um texto à Machado de Assis",
        ],
        ["Antes de verbo", "Não há", "Começou a chover. A partir de hoje."],
        ["Antes de palavra masculina", "Não há", "Escrevi a lápis. Andamos a pé."],
        ["Antes de artigo indefinido", "Não há", "Referiu-se a uma colega do curso."],
        [
          "Antes de pronome que não admite artigo",
          "Não há",
          "Entreguei a ela. Refiro-me a esta questão. A quem devo responder?",
        ],
        [
          "Plural com preposição no singular",
          "Não há",
          "Referiu-se a pessoas estranhas ao grupo.",
        ],
        ["Palavras repetidas em expressão", "Não há", "cara a cara; gota a gota; frente a frente"],
        [
          "«casa» e «terra» sem especificação",
          "Não há",
          "Voltei a casa. Os marinheiros desceram a terra.",
        ],
        ["Nome próprio feminino", "Facultativa", "Refiro-me a Marina. / Refiro-me à Marina."],
        [
          "Pronome possessivo feminino",
          "Facultativa",
          "Entreguei a minha mãe. / Entreguei à minha mãe.",
        ],
        ["Depois de «até»", "Facultativa", "Fui até a porta. / Fui até à porta."],
      ],
      note:
        "«Casa» e «terra» voltam a exigir crase quando vêm especificadas: «Voltei à casa dos meus pais», «Chegamos à terra prometida». O mesmo vale para cidades caracterizadas: «Chegou à Roma dos Césares».",
    },
    {
      kind: "contrast",
      id: "a-ha",
      title: "«a», «à» e «há»: três coisas diferentes",
      intro:
        "Esta é a confusão que mais aparece em texto de candidato, porque as três formas soam parecidas na fala.",
      pairs: [
        {
          left: "a",
          leftGloss: "Preposição ou artigo, sem fusão. Um único «a» na frase.",
          right: "à",
          rightGloss: "Preposição + artigo feminino fundidos. Dois «a» somados.",
          test: "Troque por masculino: se der «ao», é «à»; se der «a», é «a».",
        },
        {
          left: "há",
          leftGloss:
            "Verbo «haver»: existe, ou tempo já decorrido. «Há dois anos que estudo português.»",
          right: "a",
          rightGloss:
            "Tempo que falta, contado para frente. «Estamos a dois meses da prova.»",
          test:
            "Se o tempo já passou, use «há»; se ainda vai chegar, use «a». Troque «há» por «faz»: se couber, está certo.",
        },
      ],
    },
    {
      kind: "examples",
      id: "locucoes",
      title: "Locuções com crase que vale memorizar",
      intro:
        "Estas não precisam de teste: são expressões fixas femininas e levam acento sempre. Reconhecê-las de imediato economiza tempo na revisão.",
      items: [
        { text: "à noite, à tarde", note: "Mas «de manhã», sem crase — palavra masculina implícita não entra aqui." },
        { text: "às vezes, às claras, às escondidas" },
        { text: "à vontade, à toa, à parte" },
        { text: "às pressas, à força, à mão" },
        { text: "à procura de, à espera de, à disposição de" },
        { text: "à medida que, à proporção que", note: "Proporção: duas coisas variando juntas." },
        { text: "à esquerda, à direita, à frente" },
        { text: "às ordens, às custas de" },
      ],
    },
    {
      kind: "mistakes",
      id: "erros",
      title: "Erros mais comuns",
      intro: "Seis casos que respondem pela maioria dos acentos graves fora de lugar.",
      items: [
        {
          wrong: "Começou à chover durante a prova oral.",
          right: "Começou a chover durante a prova oral.",
          why:
            "«Chover» é verbo, e verbo não tem artigo. Sem artigo, não há duas vogais para fundir.",
        },
        {
          wrong: "À partir de segunda-feira, as inscrições estarão abertas.",
          right: "A partir de segunda-feira, as inscrições estarão abertas.",
          why:
            "«A partir de» é locução formada com o verbo «partir». Nunca leva crase, apesar de aparecer com acento com muita frequência.",
        },
        {
          wrong: "Refiro-me à esta questão do formulário.",
          right: "Refiro-me a esta questão do formulário.",
          why:
            "«Esta» é pronome demonstrativo e não admite artigo antes. Sem artigo, sem crase. O mesmo vale para «essa», «ela», «quem».",
        },
        {
          wrong: "Escrevi o rascunho à lápis.",
          right: "Escrevi o rascunho a lápis.",
          why:
            "«Lápis» é masculino. Crase é a fusão da preposição com o artigo feminino — não existe diante de palavra masculina, fora das expressões «à moda de».",
        },
        {
          wrong: "Estudo português à dois anos.",
          right: "Estudo português há dois anos.",
          why:
            "Tempo já decorrido pede o verbo «haver»: «há». O teste é trocar por «faz»: «faz dois anos» funciona, então é «há».",
        },
        {
          wrong: "Enviei o documento à você ontem.",
          right: "Enviei o documento a você ontem.",
          why:
            "«Você» é pronome de tratamento e não aceita artigo. Escreve-se «a você», «a Vossa Senhoria».",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "crase-q1",
      question: "Complete: «Vou ___ praia depois da prova.»",
      hint: "Troque «praia» por «parque» e veja o que a frase pede.",
      options: [
        {
          id: "q1-a-acento",
          text: "à",
          correct: true,
          feedback:
            "Correto. «Vou ao parque» mostra que há preposição + artigo, logo o feminino leva acento grave.",
        },
        {
          id: "q1-a",
          text: "a",
          feedback:
            "O teste da palavra masculina dá «ao parque», e não «a parque» — então há crase.",
        },
        {
          id: "q1-ha",
          text: "há",
          feedback:
            "«Há» é o verbo haver, usado para existência ou tempo passado. Não cabe depois de «vou».",
        },
      ],
    },
    {
      id: "crase-q2",
      question: "Qual frase está correta?",
      options: [
        {
          id: "q2-correta",
          text: "Começou a chover assim que saímos.",
          correct: true,
          feedback:
            "Correto. Antes de verbo não há crase: «chover» não vem acompanhado de artigo.",
        },
        {
          id: "q2-crase-verbo",
          text: "Começou à chover assim que saímos.",
          feedback:
            "Erro clássico. «Chover» é verbo e não admite artigo, então não há duas vogais para fundir.",
        },
        {
          id: "q2-ha",
          text: "Começou há chover assim que saímos.",
          feedback: "«Há» é o verbo haver. Aqui o que se pede é apenas a preposição «a».",
        },
      ],
    },
    {
      id: "crase-q3",
      question: "Complete: «Saímos ___ pressas para chegar no horário.»",
      hint: "É uma expressão fixa feminina.",
      options: [
        {
          id: "q3-as-acento",
          text: "às",
          correct: true,
          feedback:
            "Correto. «Às pressas» é locução adverbial feminina — locuções desse tipo levam crase sempre.",
        },
        {
          id: "q3-as",
          text: "as",
          feedback:
            "Sem o acento, «as» seria apenas artigo, e a frase perderia a preposição exigida por «sair».",
        },
        {
          id: "q3-a",
          text: "a",
          feedback:
            "A expressão está no plural («pressas»), portanto a forma correta é «às», com acento.",
        },
      ],
    },
  ],
  examAngle: {
    title: "Como isso aparece no Celpe-Bras",
    body:
      "Seja realista sobre o peso da crase: um acento fora de lugar quase nunca impede a comunicação, e o exame avalia primeiro se o seu texto cumpre o propósito para o interlocutor previsto. O que pesa é o padrão — crase errada de forma sistemática entra na avaliação da adequação linguística e sinaliza domínio incompleto da norma escrita.",
    bullets: [
      "Nas tarefas escritas de registro mais formal, como carta e ofício, a expectativa de norma é maior do que em gêneros informais.",
      "Vale mais decorar as locuções fixas («à noite», «às vezes», «à medida que») do que a lista completa de casos: elas aparecem em quase todo texto.",
      "«A partir de» e crase antes de verbo são os dois erros que mais aparecem — conferir só esses dois já elimina boa parte dos acentos indevidos.",
    ],
  },
  faq: [
    {
      question: "Como saber se usa crase ou não?",
      answer:
        "Troque a palavra feminina por uma masculina equivalente. Se a frase pedir «ao», há crase e o «à» leva acento grave; se pedir apenas «a», não há. Exemplo: «Vou à praia» → «Vou ao parque» (com crase); «Andamos a pé» → «Andamos a nado» (sem crase).",
    },
    {
      question: "Tem crase antes de verbo?",
      answer:
        "Não. Verbo não é acompanhado de artigo, e a crase é justamente a fusão da preposição «a» com o artigo. Por isso se escreve «começou a chover», «passou a estudar», «a partir de hoje».",
    },
    {
      question: "Qual a diferença entre «há» e «a» em expressões de tempo?",
      answer:
        "«Há» indica tempo já decorrido: «estudo português há dois anos». «A» indica tempo que ainda falta: «estamos a dois meses da prova». O teste é trocar por «faz» — se couber, é «há».",
    },
    {
      question: "Quando a crase é facultativa?",
      answer:
        "Em três casos: antes de nome próprio feminino («refiro-me a/à Marina»), antes de pronome possessivo feminino («entreguei a/à minha mãe») e depois da preposição «até» («fui até a/à porta»). Nesses casos as duas formas estão corretas.",
    },
    {
      question: "Por que «à moda de» leva crase antes de palavra masculina?",
      answer:
        "Porque o substantivo feminino «moda» está elíptico, isto é, subentendido. «Bife à milanesa» equivale a «bife à moda milanesa»; «um texto à Machado de Assis» equivale a «à maneira de Machado de Assis».",
    },
  ],
  related: [
    {
      label: "Exercícios de gramática e vocabulário",
      href: "/pt-br/pratica/polimento-de-base",
      description: "Drills curtos de conjugação, artigos e contrações para fixar a regra.",
    },
    {
      label: "Conectivos",
      href: "/pt-br/teoria/conectivos",
      description: "Lista por função e pontuação — inclui locuções com crase como «à medida que».",
    },
    {
      label: "Teoria",
      href: "/pt-br/teoria",
      description: "Voltar ao índice de temas de gramática e vocabulário.",
    },
  ],
};
