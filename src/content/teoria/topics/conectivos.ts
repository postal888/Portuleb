import type { TheoryTopic } from "./types";

export const conectivos: TheoryTopic = {
  meta: {
    slug: "conectivos",
    keyword: "conectivos",
    title: "Conectivos",
    seoTitle: "Conectivos: lista completa por função e como usar",
    seoDescription:
      "Lista de conectivos do português organizados por função — adição, oposição, causa, consequência, conclusão, condição e tempo — com exemplos, pontuação e os erros mais comuns.",
    eyebrow: "Teoria · Gramática",
    axis: "gramatica",
    level: "Intermediário",
    readingTime: "8–10 min",
    tags: ["conectivos", "coesão", "conjunções", "escrita formal"],
    publishedAt: "2026-09-01",
  },
  hero: {
    kicker: "Coesão textual",
    title: "Conectivos",
    lead:
      "Os conectivos são as palavras que amarram as ideias de um texto. Escolher o conectivo errado não deixa a frase apenas estranha: muda a relação lógica entre as duas partes e, com isso, muda o que você disse.",
    quickAnswer:
      "Conectivos são palavras ou expressões que ligam orações, períodos e parágrafos, indicando a relação lógica entre eles — adição, oposição, causa, consequência, conclusão, condição, finalidade, tempo ou explicação. Incluem conjunções (mas, porque, embora), preposições e locuções (devido a, apesar de, a fim de) e advérbios (portanto, entretanto, assim).",
  },
  sections: [
    {
      kind: "prose",
      id: "o-que-sao",
      title: "O que são conectivos",
      paragraphs: [
        "Um texto não é uma pilha de frases soltas. Entre uma ideia e a seguinte existe sempre uma relação — uma acrescenta, outra contrapõe, outra explica o motivo — e o conectivo é a palavra que torna essa relação visível para quem lê.",
        "Compare: «O preço subiu. A procura continuou alta.» O leitor precisa adivinhar a relação. Agora com conectivo: «Embora o preço tenha subido, a procura continuou alta.» A oposição ficou explícita, e o texto passou a ter um argumento em vez de duas informações.",
        "Vale a distinção: conectivo não é sinônimo de conjunção. Conjunção é uma classe gramatical; conectivo é uma função. Preposições («devido a»), locuções («apesar de») e advérbios («portanto») também conectam, e por isso entram na lista.",
      ],
    },
    {
      kind: "table",
      id: "tipos",
      title: "Tipos de conectivos por função",
      intro:
        "Esta é a tabela de consulta rápida. Organize sempre pela relação lógica que você quer expressar, não pela palavra que primeiro vem à cabeça — é assim que se evita o conectivo trocado.",
      columns: ["Relação", "Conectivos", "Exemplo"],
      rows: [
        [
          "Adição",
          "e; também; além disso; ademais; não só… mas também",
          "O relatório está pronto; além disso, os anexos já foram revisados.",
        ],
        [
          "Oposição / contraste",
          "mas; porém; todavia; contudo; entretanto; no entanto; apesar de; embora; ainda que",
          "O prazo era curto, porém entregamos o relatório.",
        ],
        [
          "Causa",
          "porque; pois; já que; uma vez que; visto que; devido a; em virtude de",
          "O evento foi adiado porque o auditório estava em reforma.",
        ],
        [
          "Consequência",
          "por isso; de modo que; tanto que; consequentemente; como resultado",
          "Não houve inscrições suficientes, por isso a turma foi cancelada.",
        ],
        [
          "Conclusão",
          "portanto; logo; assim; dessa forma; em suma; por fim",
          "Os dados se repetiram nas três amostras; portanto, o resultado é consistente.",
        ],
        [
          "Condição",
          "se; caso; desde que; contanto que; a menos que; salvo se",
          "Caso a chuva continue, a prova oral será remarcada.",
        ],
        [
          "Finalidade",
          "para; para que; a fim de; a fim de que; com o objetivo de",
          "Revisamos o texto duas vezes a fim de evitar ambiguidades.",
        ],
        [
          "Tempo",
          "quando; enquanto; assim que; logo que; antes que; depois que",
          "Assim que receber a confirmação, envio os documentos.",
        ],
        [
          "Explicação / reformulação",
          "isto é; ou seja; a saber; por exemplo; em outras palavras",
          "O pedido foi indeferido, ou seja, será preciso apresentar novo recurso.",
        ],
        [
          "Comparação",
          "como; assim como; tal qual; mais… que; menos… que",
          "A segunda etapa exige tanta atenção quanto a primeira.",
        ],
        [
          "Proporção",
          "à medida que; à proporção que; quanto mais… mais",
          "À medida que o curso avança, as tarefas ficam mais longas.",
        ],
      ],
      note:
        "«Outrossim» e «porquanto» ainda aparecem em listas escolares, mas soam datados fora de textos jurídicos. Em redação, prefira «além disso» e «porque».",
    },
    {
      kind: "rule",
      id: "como-escolher",
      title: "Como escolher o conectivo certo",
      intro:
        "Três verificações resolvem quase todos os casos duvidosos. Faça-as na ordem, antes de escrever a frase.",
      items: [
        {
          label: "Primeiro, nomeie a relação",
          text:
            "Diga em voz alta o que a segunda parte faz com a primeira: acrescenta, contraria, explica o motivo, apresenta o resultado, fecha o raciocínio. Só depois procure o conectivo na coluna correspondente da tabela.",
          example:
            "«Estudou pouco ___ passou.» A segunda parte contraria a expectativa criada pela primeira → oposição → «mas / porém».",
        },
        {
          label: "Depois, teste a direção causa → efeito",
          text:
            "Causa e consequência apontam para lados opostos, e é aí que mora o erro mais frequente. «Porque» introduz o motivo; «portanto» e «por isso» introduzem o resultado. Se você pode inverter as orações sem mudar o sentido, escolheu errado.",
          example:
            "«Chovia, portanto o jogo foi adiado.» (resultado) ≠ «O jogo foi adiado porque chovia.» (motivo)",
        },
        {
          label: "Por fim, confira o modo do verbo",
          text:
            "Alguns conectivos exigem subjuntivo: «embora», «ainda que», «caso», «a menos que», «para que», «antes que». Ignorar isso produz um erro gramatical mesmo quando a relação lógica está correta.",
          example:
            "«Embora o preço tenha subido» (não: «Embora o preço subiu»); «Caso você precise» (não: «Caso você precisa»).",
        },
      ],
    },
    {
      kind: "rule",
      id: "pontuacao",
      title: "Pontuação com conectivos",
      intro:
        "A vírgula muda de posição conforme o conectivo — e é um dos detalhes que mais denuncia texto pouco revisado.",
      items: [
        {
          label: "«mas» abre a oração e vem depois da vírgula",
          text:
            "«Mas» não se desloca: fica sempre no início da segunda oração, precedido de vírgula.",
          example: "O prazo era curto, mas entregamos o relatório.",
        },
        {
          label: "«porém», «contudo», «entretanto», «no entanto» podem se deslocar",
          text:
            "Podem abrir a oração ou aparecer intercalados. Quando intercalados, ficam entre vírgulas.",
          example:
            "O prazo era curto; entregamos, porém, o relatório completo.",
        },
        {
          label: "«portanto» e «por isso» aceitam vírgula antes e depois",
          text:
            "Em conclusões, é comum o ponto e vírgula antes do conectivo, que separa dois períodos longos com clareza.",
          example:
            "Os dados se repetiram nas três amostras; portanto, o resultado é consistente.",
        },
        {
          label: "Conectivo no início do parágrafo pede vírgula",
          text:
            "Locuções como «além disso», «dessa forma», «por outro lado» e «em suma» funcionam como marcadores e são seguidas de vírgula.",
          example: "Além disso, o orçamento previsto já havia sido aprovado.",
        },
      ],
    },
    {
      kind: "mistakes",
      id: "erros",
      title: "Erros mais comuns",
      intro:
        "Todos estes aparecem com frequência em textos de candidatos — inclusive em textos com vocabulário avançado.",
      items: [
        {
          wrong: "O prazo era curto, mas porém entregamos o relatório.",
          right: "O prazo era curto, porém entregamos o relatório.",
          why:
            "«Mas» e «porém» marcam a mesma relação. Usar os dois juntos é redundância — escolha um.",
        },
        {
          wrong: "Não estudou, portanto foi reprovado por não estudar.",
          right: "Não estudou, portanto foi reprovado.",
          why:
            "Depois de um conectivo de conclusão, repetir a causa esvazia a frase. O conectivo já fez o trabalho de ligar as duas ideias.",
        },
        {
          wrong: "Devido o atraso, a reunião foi cancelada.",
          right: "Devido ao atraso, a reunião foi cancelada.",
          why:
            "«Devido a» é locução prepositiva e exige a preposição «a», que se contrai com o artigo: devido ao, devido à, devido aos.",
        },
        {
          wrong: "Na medida que o curso avança, as tarefas ficam mais longas.",
          right: "À medida que o curso avança, as tarefas ficam mais longas.",
          why:
            "«À medida que» indica proporção (duas coisas variando juntas). «Na medida em que» indica causa. «Na medida que», sem o «em», não existe na norma.",
        },
        {
          wrong: "Ao invés de estudar gramática, decidiu ler mais.",
          right: "Em vez de estudar gramática, decidiu ler mais.",
          why:
            "Na norma culta, «ao invés de» significa «ao contrário de» e pede ideias opostas; «em vez de» indica substituição. Estudar e ler não são opostos, são alternativas.",
        },
        {
          wrong: "Além disso, também vale acrescentar que ainda existe outro ponto.",
          right: "Vale acrescentar outro ponto.",
          why:
            "Acumular três marcadores de adição não reforça o argumento — só alonga a frase. Um conectivo por relação é suficiente.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "conectivos-q1",
      question: "Complete: «Estudou muito, ___ não passou na prova.»",
      hint: "A segunda parte contraria a expectativa criada pela primeira.",
      options: [
        {
          id: "q1-porem",
          text: "porém",
          correct: true,
          feedback:
            "Correto. A relação é de oposição: quem estuda muito costuma passar, e a frase contraria essa expectativa.",
        },
        {
          id: "q1-portanto",
          text: "portanto",
          feedback:
            "«Portanto» marca conclusão — indicaria que não passar foi a consequência lógica de estudar muito.",
        },
        {
          id: "q1-porque",
          text: "porque",
          feedback:
            "«Porque» introduz o motivo. Aqui a segunda oração não explica por que estudou, ela contraria o resultado esperado.",
        },
        {
          id: "q1-logo",
          text: "logo",
          feedback: "«Logo» é conclusivo, como «portanto». A relação aqui é de contraste.",
        },
      ],
    },
    {
      id: "conectivos-q2",
      question: "Complete: «___ o preço tenha subido, a procura continuou alta.»",
      hint: "Observe o verbo: «tenha subido» está no subjuntivo.",
      options: [
        {
          id: "q2-embora",
          text: "Embora",
          correct: true,
          feedback:
            "Correto. «Embora» expressa concessão e exige subjuntivo — exatamente a forma «tenha subido».",
        },
        {
          id: "q2-portanto",
          text: "Portanto",
          feedback:
            "«Portanto» é conclusivo e não abre oração subordinada; também não combina com o subjuntivo aqui.",
        },
        {
          id: "q2-pois",
          text: "Pois",
          feedback: "«Pois» introduz causa ou explicação, e pede indicativo: «pois o preço subiu».",
        },
        {
          id: "q2-logoque",
          text: "Logo que",
          feedback:
            "«Logo que» é temporal — indicaria sequência no tempo, não oposição entre preço e procura.",
        },
      ],
    },
    {
      id: "conectivos-q3",
      question: "Qual frase usa o conectivo de forma adequada?",
      options: [
        {
          id: "q3-porem",
          text: "O prazo era curto, porém entregamos o relatório.",
          correct: true,
          feedback: "Correto. Um único conectivo adversativo, marcando a oposição com clareza.",
        },
        {
          id: "q3-masporem",
          text: "O prazo era curto, mas porém entregamos o relatório.",
          feedback:
            "Redundância: «mas» e «porém» expressam a mesma relação. Use apenas um dos dois.",
        },
        {
          id: "q3-portanto",
          text: "O prazo era curto, portanto entregamos o relatório.",
          feedback:
            "«Portanto» marca consequência — sugere que o prazo curto causou a entrega. A relação real é de oposição.",
        },
      ],
    },
  ],
  examAngle: {
    title: "Como isso aparece no Celpe-Bras",
    body:
      "Na parte escrita, a coesão entra na avaliação da adequação linguística: o avaliador observa se as relações entre as ideias estão marcadas e se a marcação é a correta. Conectivo trocado é mais grave do que conectivo ausente, porque induz o leitor a uma leitura errada do seu argumento.",
    bullets: [
      "Nas tarefas em que você precisa argumentar ou justificar uma posição, os conectivos de oposição e de causa são os que fazem o texto parecer raciocínio e não lista.",
      "Em gêneros como carta e e-mail, o excesso de marcadores formais («outrossim», «ademais») desalinha o registro em relação ao interlocutor — e o registro também é avaliado.",
      "Revisar só os conectivos, numa leitura dedicada, é um dos ajustes mais rápidos que cabem nos minutos finais da prova escrita.",
    ],
  },
  faq: [
    {
      question: "Quais são os principais conectivos do português?",
      answer:
        "Os mais usados, por função: adição (e, também, além disso); oposição (mas, porém, contudo, entretanto, embora, apesar de); causa (porque, pois, já que, devido a); consequência (por isso, de modo que, consequentemente); conclusão (portanto, logo, assim, em suma); condição (se, caso, desde que); finalidade (para que, a fim de); tempo (quando, enquanto, assim que).",
    },
    {
      question: "Qual a diferença entre conectivo e conjunção?",
      answer:
        "Conjunção é uma classe gramatical; conectivo é uma função. Toda conjunção é conectivo, mas preposições («devido a»), locuções («apesar de») e advérbios («portanto») também exercem essa função sem serem conjunções.",
    },
    {
      question: "Quantos conectivos usar em uma redação?",
      answer:
        "Não há número. A regra prática é um conectivo por relação lógica que você realmente quer marcar. Acumular marcadores («além disso, também vale dizer que ainda») alonga o texto sem acrescentar argumento.",
    },
    {
      question: "Qual a diferença entre «à medida que» e «na medida em que»?",
      answer:
        "«À medida que» indica proporção — duas coisas que variam juntas: «à medida que o curso avança, as tarefas ficam mais longas». «Na medida em que» indica causa: «na medida em que não houve inscrições, a turma foi cancelada». A forma «na medida que», sem o «em», não existe na norma culta.",
    },
    {
      question: "Pode começar frase com «mas»?",
      answer:
        "Sim. A recomendação escolar de não iniciar período com «mas» é estilística, não gramatical. Em texto formal, porém, é mais comum ligar as orações com vírgula («era curto, mas entregamos») ou usar «porém» e «contudo» no início da frase.",
    },
  ],
  related: [
    {
      label: "Produção escrita",
      href: "/pt-br/pratica/producao-escrita",
      description: "Aplicar os conectivos nas quatro tarefas escritas, com avaliação por critério.",
    },
    {
      label: "Estruturas do português de negócios",
      href: "/pt-br/pratica/gramatica-vocabulario/estruturas-portugues-negocios",
      description: "Lição interativa sobre «não só… mas também» em contexto profissional.",
    },
    {
      label: "Teoria",
      href: "/pt-br/teoria",
      description: "Voltar ao índice de temas de gramática e vocabulário.",
    },
  ],
};
