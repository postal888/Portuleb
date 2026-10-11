import type { WritingTask } from "./tasks";

export const HISTORICAL_WRITING_TASK_IDS = [
  "2026-1-t1",
  "2026-1-t2",
  "2026-1-t3",
  "2026-1-t4",
  "2025-2-t1",
  "2025-2-t2",
  "2025-1-t1",
  "2025-1-t2",
  "2024-2.2-t1",
  "2024-2.2-t2",
  "2024-2.2-t3",
  "2024-2.2-t4",
  "2024-2-t1",
  "2024-2-t2",
  "2024-1-t1",
  "2024-1-t2",
  "2024-1-t3",
  "2024-1-t4",
  "2023-2-t1",
  "2023-2-t2",
  "2023-1-t1",
  "2023-1-t2",
  "2023-1-t3",
  "2023-1-t4",
  "2022-2-t1",
  "2022-2-t2",
  "2022-2-t3",
  "2022-2-t4",
  "2021-1-t1",
  "2021-1-t2",
  "2021-1-t3",
  "2021-1-t4",
  "2020-1-t1",
  "2020-1-t2",
  "2020-1-t3",
  "2020-1-t4",
  "2019-2-t1",
  "2019-2-t2",
  "2019-2-t3",
  "2019-2-t4",
  "2019-1-t1",
  "2019-1-t2",
  "2019-1-t3",
  "2019-1-t4",
  "2018-1-t1",
  "2018-1-t2",
  "2018-1-t3",
  "2018-1-t4",
  "2017-2-t1",
  "2017-2-t2",
  "2017-2-t3",
  "2017-2-t4",
  "2017-1-t1",
  "2017-1-t2",
  "2017-1-t3",
  "2017-1-t4",
  "2016-2-t1",
  "2016-2-t2",
  "2016-2-t3",
  "2016-2-t4",
  "2016-1.2-t1",
  "2016-1.2-t2",
  "2016-1.2-t3",
  "2016-1.2-t4",
  "2016-1-t1",
  "2016-1-t2",
  "2016-1-t3",
  "2016-1-t4",
  "2015-2-t1",
  "2015-2-t2",
  "2015-2-t3",
  "2015-2-t4",
  "2015-1-t1",
  "2015-1-t2",
  "2015-1-t3",
  "2015-1-t4",
  "2014-2-t1",
  "2014-2-t2",
  "2014-2-t3",
  "2014-2-t4",
  "2014-1-t1",
  "2014-1-t2",
  "2014-1-t3",
  "2014-1-t4",
  "2013-2-t1",
  "2013-2-t2",
  "2013-2-t3",
  "2013-2-t4",
  "2013-1-t1",
  "2013-1-t2",
  "2013-1-t3",
  "2013-1-t4",
  "2012-2-t1",
  "2012-2-t2",
  "2012-2-t3",
  "2012-2-t4",
  "2012-1-t1",
  "2012-1-t2",
  "2012-1-t3",
  "2012-1-t4",
  "2011-2-t1",
  "2011-2-t2",
  "2011-2-t3",
  "2011-2-t4",
  "2011-1-t1",
  "2011-1-t2",
  "2011-1-t3",
  "2011-1-t4",
  "2010-2-t1",
  "2010-2-t2",
  "2010-2-t3",
  "2010-2-t4",
  "2010-1-t1",
  "2010-1-t2",
  "2010-1-t3",
  "2010-1-t4",
] as const;

export const HISTORICAL_WRITING_TASKS: WritingTask[] = [
  {
    "id": "2026-1-t1",
    "cycle": "2026/1",
    "number": "Tarefa 1",
    "title": "Festival Fartura",
    "shortLabel": "2026/1 · T1",
    "genre": "artigo para jornal",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como jornalista de um jornal de grande circulação, você visitou o “Festival Fartura”. Com base no vídeo, escreva um artigo para a seção de gastronomia do jornal, explicando o que é o Festival. Em seu texto, apresente o objetivo do evento, o que os visitantes podem fazer lá e o que motiva a escolha dos convidados especiais.",
    "sourceKicker": "Insumo · prova 2026/1 · Tarefa 1",
    "sourceTitle": "Festival Fartura",
    "sourceText": "Falante 1: [bipe] No próximo fim de semana, já com os ingressos à venda, a gente faz a quarta edição do Fartura no Jockey Club. É um festival de gastronomia feito em parceria com A Folha. [música nordestina] O pilar do Fartura são as expedições. [tambor] Desde 2012, a gente viaja o Brasil inteiro pra justamente mapear a cadeia do alimento, entender o que tem nesse trajeto do campo ao prato. Quem são esses personagens? Que ingredientes são esses que a gente tem nessa diversidade, nesse tamanho continental de Brasil? Quais são as tradições, né, os modos de preparo, os gestos na hora de cozinhar? Então a gente vai poder provar, por exemplo, uma broa com requeijão moreno e frango na brasa, lá do norte de Minas. A gente tem também, por exemplo, um sanduíche de linguiça conservada na banha de porco. Vem um expert dessa tradição, que também está se perdendo, lá de Brasília preparar isso pra gente. Então a gente traz, por exemplo, o Daniel Castelli, é um sujeito que vem do Sul. Ele desiste da vida na cidade, vai morar em Canela, no campo, numa propriedade pequena que ele tenta tornar autossuficiente. Então ele parte de uma terra absolutamente improdutiva, começa a tratar essa terra, planta um milho crioulo que também tava ali em vias de desaparecer. E aí ele processa esse milho como antigamente, no moinho, até chegar numa polenta em que ele não adiciona nada pra que a gente tenha o resultado final, um sabor bruto do milho. [música nordestina] Você pode também participar de aulas, então aprender receitas, e antes de ir pra casa, passar na feirinha de produtos e produtores e levar essas coisas pra casa. E também coisas aqui de São Paulo. Por exemplo, a Ana Mantegaria, uma garota que teve ensinamentos mineiros, eu diria, e a partir daí ela faz uma receita de doce de leite de mel. Ela usa o mel da fazenda da família, de abelhas nativas, pra fazer um docinho também que cê leva pra casa. [tambor] E todos nós esperamos vocês nos dias três e quatro de agosto no Jockey Club. [bipe] No próximo fim de semana, já com os ingressos à venda, a gente faz a quarta edição do Fartura no Jockey Club. É um festival de gastronomia feito em parceria com A Folha. [música nordestina] O pilar do Fartura são as expedições. [tambor] Desde 2012, a gente viaja o Brasil inteiro pra justamente mapear a cadeia do alimento, entender o que tem nesse trajeto do campo ao prato. Quem são esses personagens? Que ingredientes são esses que a gente tem nessa diversidade, nesse tamanho continental de Brasil? Quais são as tradições, né, os modos de preparo, os gestos na hora de cozinhar? Então a gente vai poder provar, por exemplo, uma broa com requeijão moreno e frango na brasa, lá do norte de Minas. A gente tem também, por exemplo, um sanduíche de linguiça conservada na banha de porco. Vem um expert dessa tradição, que também está se perdendo, lá de Brasília preparar isso pra gente. Então a gente traz, por exemplo, o Daniel Castelli, é um sujeito que vem do Sul. Ele desiste da vida na cidade, vai morar em Canela, no campo, numa propriedade pequena que ele tenta tornar autossuficiente. Então ele parte de uma terra absolutamente improdutiva, começa a tratar essa terra, planta um milho crioulo que também tava ali em vias de desaparecer. E aí ele processa esse milho como antigamente, no moinho, até chegar numa polenta em que ele não adiciona nada pra que a gente tenha o resultado final, um sabor bruto do milho. [música nordestina] Você pode também participar de aulas, então aprender receitas, e antes de ir pra casa, passar na feirinha de produtos e produtores e levar essas coisas pra casa. E também coisas aqui de São Paulo. Por exemplo, a Ana Mantegaria, uma garota que teve ensinamentos mineiros, eu diria, e a partir daí ela faz uma receita de doce de leite de mel. Ela usa o mel da fazenda da família, de abelhas nativas, pra fazer um docinho também que cê leva pra casa. [tambor] E todos nós esperamos vocês nos dias três e quatro de agosto no Jockey Club. [bipe]",
    "keyFacts": [
      "o que é o Festival"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo para jornal",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2026-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2026-1-t2",
    "cycle": "2026/1",
    "number": "Tarefa 2",
    "title": "Cardápio QR Code",
    "shortLabel": "2026/1 · T2",
    "genre": "carta aberta",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você compartilha da opinião de André Trigueiro sobre o cardápio QR Code. Após ouvir o comentário na rádio CBN, escreva uma carta aberta, a ser endereçada aos gestores da sua cidade, solicitando a aprovação de uma lei que regulamente a questão abordada. Em seu texto, apresente argumentos que justifiquem a solicitação.",
    "sourceKicker": "Insumo · prova 2026/1 · Tarefa 2",
    "sourceTitle": "Cardápio QR Code",
    "sourceText": "Falante 1: [bipe] Bom dia, André. Tudo bem?\n\nFalante 2: Bom dia, Fred. Bom dia, ouvintes.\n\nFalante 1: Deixa eu te perguntar um negócio. Você faz parte do time dos que amam ou odeiam cardápio digital com QR code, André?\n\nFalante 2: Eu pertenço à tribo dos mal-humorados [risos] que quando chegam no restaurante, numa lanchonete, num bar e pedem o cardápio, o cara já te olha meio de lado assim, tipo: \"Tenho outras prioridades aqui. Olha aí o QR code que o senhor vai ver do seu celular o que temos aqui.\" Eu acho isso o fim da picada, vou explicar por quê. Bom, em primeiro lugar, não faz sentido manter apenas o recurso tecnológico do QR code para, é, beneficiar os empresários do setor, que deixam de ter custo com o cardápio impresso e a atualização dos valores. Por quê? Bom, vamo lá por partes. Primeiro, tem as pessoas idosas que têm, ou não idosas, enfim, que não têm lá muita familiaridade com aplicativos, que não se familiarizaram com esses recursos tecnológicos. Elas têm o direito, portanto, de ter o cardápio impresso, como sempre foi. É, nem todo mundo enxerga bem e você no celular a letra fica miúda. Aí você vai dizer: \"Ah, mas é só dar aquela esticada na letra, né, na tela digital, que cê enxerga.\" É ruim, desculpa. Cê tá vendo um cardápio inteiro, não enxerga bem. Aí vai ter que ver a letra miúda, vai ter que esticar tudo com o dedinho, né?\n\nFalante 1: É.\n\nFalante 2: \"Ah, deixa eu ver aqui, deixa eu ver aqui, deixa eu ver aqui.\" Não acho confortável. Terceiro, e isso acontece comigo, que meu celular tá velhinho, a bateria vai embora rápido, cara. [risos] A bateria vai embora rápido. Aí eu chego num lugar com a bateria lá, dez por cento, oito por cento, aí o cara: \"É QR code.\" Eu falo: \"Não, senhor. Me traz então teu celular, que eu não vou gastar bateria procurando aqui.\"\n\nFalante 1: E tem que ter internet também, né, pra acessar, né?\n\nFalante 2: É, assim, o combo é ruim. Então por que não, né? Assim, se alegar: \"Ah, isso vai ser um baque no orçamento de bares, restaurantes e lanchonete.\" Com toda a franqueza, sem querer afrontar aqui quem pensa o contrário, eu não acredito nisso. Eu não acredito nisso. Então, se o cliente tem sempre razão, Fred e amigos, e o cliente pede o cardápio impresso, que se satisfaça o cliente.\n\nFalante 1: [bipe] Bom dia, André, tudo bem?\n\nFalante 2: Bom dia, Fred. Bom dia, ouvintes.\n\nFalante 1: Deixa eu te perguntar um negócio. Cê faz parte do time dos que amam ou odeiam cardápio digital com QR code, André?\n\nFalante 2: Eu pertenço à tribo dos mal-humorados [risos] que quando chegam no restaurante, numa lanchonete, num bar e pedem o cardápio, o cara já te olha meio de lado assim, tipo: \"Tenho outras prioridades aqui. Olha aí o QR code que o senhor vai ver do seu celular o que temos aqui.\" Eu acho isso o fim da picada, vou explicar por quê. Bom, em primeiro lugar, não faz sentido manter apenas o recurso tecnológico do QR code para, é, beneficiar os empresários do setor, que deixam de ter custo com o cardápio impresso e a atualização dos valores. Por quê? Bom, vamo lá por partes. Primeiro, tem as pessoas idosas que têm, ou não idosas, enfim, que não têm lá muita familiaridade com aplicativos, que não se familiarizaram com esses recursos tecnológicos. Elas têm o direito, portanto, de ter o cardápio impresso, como sempre foi. É, nem todo mundo enxerga bem e você no celular a letra fica miúda. Aí você vai dizer: \"Ah, mas é só dar aquela esticada na letra, né, na tela digital, que cê enxerga.\" É ruim, desculpa. Cê tá vendo um cardápio inteiro, não enxerga bem. Aí vai ter que ver a letra miúda, vai ter que esticar tudo com o dedinho, né?\n\nFalante 1: É.\n\nFalante 2: \"Ah, deixa eu ver aqui, deixa eu ver aqui, deixa eu ver aqui.\" Não acho confortável. Terceiro, e isso acontece comigo, que meu celular tá velhinho, a bateria vai embora rápido, cara. [risos] A bateria vai embora rápido. Aí eu chego num lugar com a bateria lá, dez por cento, oito por cento, aí o cara: \"É QR code.\" Eu falo: \"Não, senhor. Me traz então teu celular, que eu não vou gastar bateria procurando aqui.\"\n\nFalante 1: E tem que ter internet também, né, pra acessar, né?\n\nFalante 2: É, assim, o combo é ruim. Então por que não, né? Assim, se alegar: \"Ah, isso vai ser um baque no orçamento de bares, restaurantes e lanchonete.\" Com toda a franqueza, sem querer afrontar aqui quem pensa o contrário, eu não acredito nisso. Eu não acredito nisso. Então, se o cliente tem sempre razão, Fred e amigos, e o cliente pede o cardápio impresso, que se satisfaça o cliente.",
    "keyFacts": [
      "argumentos que justifiquem a solicitação"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aberta",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2026-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2026-1-t3",
    "cycle": "2026/1",
    "number": "Tarefa 3",
    "title": "Cantigas de roda",
    "shortLabel": "2026/1 · T3",
    "genre": "e-mail à escola",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é responsável por três crianças pequenas. Após ler o texto “Cantigas de roda: a importância para uma criança”, escreva um e-mail para a escola onde as crianças estudam, sugerindo a inclusão de cantigas de roda no ambiente escolar e argumentando sobre os seus benefícios para o desenvolvimento infantil.",
    "sourceKicker": "Insumo · prova 2026/1 · Tarefa 3",
    "sourceTitle": "Cantigas de roda",
    "sourceText": "Cantigas de roda: a importância para uma criança Cirandas têm o grande poder de estimular a criatividade e a imaginação. Relembre as principais atividades e apresente uma delas para seu(sua) filhota). Mais do que uma simples atividade de entretenimento, a cantiga de roda tem um grande papel para o desen- volvimento cultural e intelectual do ser humano. Também conhecido como ciranda, esse gênero infantil tem caráter popular e sua principal característica é transmitir costumes e crencas, e, também, estimular a desenvoltura das criancas. Além de reproduzirem o folclore e as diferentes culturas, as cantigas têm o grande poder de estimular a cria- tividade e a imaginação, por meio de danças e letras simples, curtas e fáceis de memorizar. A criança que pratica a atividade tem a oportuni- dade de explorar cotidianos, festas típicas, comidas e outras caracterís- ticas de diversas regiões do país. Você, pai ou mãe, deve se lembrar das cantigas mais famosas do Brasil, como \"Ciranda Cirandinha\" ou \"Fonte do Itororó\". Já pensou em cantá-las para seu(sua) filho(a)? A cantiga como instrumento de ética Em \"A Barata Diz Que Tem\" — clás- sica cantiga brasileira — podemos observar a presença não somente de versos rimados, simples e curtos, para entreter a criança, como também a presença de uma mensa- gem. \"A barata diz que tem setes saias de filó E mentira da barata, ela tem é uma só'. Mas no que isso impacta na vida de uma crianca? Isso é chamado de moral, e é uma ferramenta utilizada na música de criança para estimular sua reflexão e o entendimento das mais diversas situacões cotidianas. Nesse caso, a cantiga mostra o lado negativo da mentira. Alem da mensagem, outro benefício da cantiga de roda é poder curtir um momento de aprendizado com — como o próprio os colegas, pois nome diz — as cantigas de roda são exploradas em atividades grupais. Essa interação promove a troca de informações de um para o outro e, consequentemente, amplia e expande a imaginação e a criativi- dade do pequeno. A música infantil educativa também é uma alternativa para os pais que desejam realizar atividades longe de instrumentos tecnológicos, apenas usando a comunicacão oral. As cantigas de roda nos dias atuais As cantigas podem ter variações de geração para geração e entre uma região e outra, mas, basicamente, passam as mesmas mensagens desde a sua origem. O que mudou com passar dos anos, foi a presença dessa atividade na rotina das crian- ças. Infelizmente, é cada vez mais difícil encontrar uma roda com criancas aprendendo cantigas antigas — ou mesmo novas. Mas agora que você sabe a importância delas, que tal apresentá-las para seu(sua) filho(a) e seus colegas? Disponível em: https://leiturinha.com.br/ blog/importancia-das-cantigasde-roda-para- -uma-crianca/ (adaptado).",
    "sourceImage": "/writing/insumos/2026-1-t3.jpg",
    "keyFacts": [
      "Cantigas de roda"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail à escola",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2026-1-t4",
    "cycle": "2026/1",
    "number": "Tarefa 4",
    "title": "Desigualdade racial na mídia brasileira",
    "shortLabel": "2026/1 · T4",
    "genre": "proposta à diretoria",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é Diretor de Gestão de Pessoas de uma empresa brasileira que tem uma realidade semelhante à retratada na matéria da EBC. Com base na discussão apresentada, escreva uma proposta a ser apresentada aos demais membros da diretoria, defendendo o aumento da diversidade nos cargos de chefia e sugerindo ações concretas para viabilizá-la.",
    "sourceKicker": "Insumo · prova 2026/1 · Tarefa 4",
    "sourceTitle": "Desigualdade racial na mídia brasileira",
    "sourceText": "Pesquisa mostra forte desigualdade racial na grande mídia brasileira Brancos são 84% dos profissionais; pardos, 6, 1% e pretos, 3,4% O coordenador do Grupo de Estu- dos Multidisciplinares de Ação Afirma- tiva (Gemaa) da Universidade do Estado do Rio de Janeiro (UERJ), professor João Feres Júnior, disse que a desigualdade racial é brutal no jornalismo brasileiro, embora haja, também, desigualdade de gênero. A afirmação foi feita ao comen- tar a pesquisa \"Raça, gênero e impren- sa: quem escreve nos principais Jornais do Brasil?\", feita pelo grupo e divulgada neste mês. A pesquisa mapeou o perfil dos pro- fissionais que escrevem nos três maiores jornais impressos do país, Estadão, Folha de S. Paulo e 0 Globo, e teve colabora- ção da Rede de Jornalistas Pretos pela Diversidade na Comunicacão, associacão que se dedica a combater a escassez de oportunidades para profissionais negros nesse mercado. Conforme a pesquisa, os jornais analisados mantiveram a maio- ria branca identificada em estudo feito em 2021, atingindo 84,4%, o que indica a existência de forte desigualdade racial. O segundo grupo mais numeroso no jor- nalismo brasileiro é o dos pardos (6,1%), seguido dos pretos (3,4%), dos amarelos (1,8%) e dos indígenas (0,1%). João Feres Júnior observou que, quando se trata de textos de opinião, considerados o \"filé do menu\" jornalísti- co, a sobrerrepresentação de jornalistas brancos sobe para 90%. \"Em editoriais, alcanca 100%, caso do Estadão\", ressal- tou o professor. Em 0 Globo, são 93% e, na Folha, 86% de brancos. \"Não tem só uma subrrepresentação brutal de negros escrevendo nos jornais, mas, também, em termos de espaço de maior poder nos jornais'. Considerando o perfil de raça e gênero, observa-se nos três jornais que a maioria dos textos é assinada por ho- mens brancos, seguidos de mulheres brancas, enquanto uma pequena parcela envolve homens negros e mulheres ne- gras, nessa ordem. Para os pesquisado- res, isso denota um problema da invisi- bilização de grupos sociais na produção das narrativas e informações que levam à formação de opinião. Gênero e idade Há, também, desigualdade de gêne- ro nos jornais pesquisados. As mulheres representam um terço do total dos pro- fissionais de imprensa nos três veículos, com fatia de 36,6%, enquanto os homens detêm 59,6%. Outro dado interessante mostra que as mulheres se concentram nas faixas de idade mais baixas, enquan- to os homens estão, em sua maioria, nas faixas etárias a partir de 50 anos. Solucão João Feres Júnior afirmou que a solução para a desigualdade racial e de gênero nos veículos da grande mídia é os jornais contratarem mais pessoas negras e estabelecerem um equilíbrio de gênero maior. Ele propõe a criação de uma polí- tica de inclusão que atinja metas, ou es- tabeleça cotas. \"Por exemplo, fixar que, em cinco anos, tenhamos 20% ou 30% de negros\". Para Feres Júnior, não adianta ficar só no discurso: é preciso realizar. Passo à frente A professora Dione Moura, diretora da Faculdade de Comunicacão da Univer- sidade de Brasília (UnB), não demonstrou surpresa ante a pesquisa da Gemaa. \"Os dados não causam surpresa, nem es- panto, porque espelham desigualdade de gênero e raça da sociedade brasileira, mas contrariam o nosso desejo de que as instituições deem um passo à frente, no sentido da igualdade de gênero e da re- dução da desigualdade racial' Dione afirmou, no entanto, que não se pode esperar um movimento natural. 'Temos que ter ações afirmativas para os processos seletivos de jornalistas mulheres e mulheres negras e também indígenas e quilombolas. Segundo ela, só uma ação social pode corrigir os resulta- dos da escravização no Brasil e em toda a América Latina. \"Não sairemos disso sem uma acao Incisiva . Edicâo: Nádia Franco Disponível em: https://agenciabrasil.ebc.com.br/direitos-humanos/noticia/2023-05/pesquisa- -mostra-forte-desigualdade-racial-na-grande-midia-brasileira (adaptado).",
    "sourceImage": "/writing/insumos/2026-1-t4.jpg",
    "keyFacts": [
      "apresentada",
      "escreva uma proposta a ser apresentada aos demais membros da diretoria",
      "defendendo o aumento da diversidade nos cargos de chefia",
      "sugerindo ações concretas para viabilizá-la"
    ],
    "mustDo": [
      "escrever no gênero pedido: proposta à diretoria",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2025-2-t1",
    "cycle": "2025/2",
    "number": "Tarefa 1",
    "title": "Armários Coletivos",
    "shortLabel": "2025/2 · T1",
    "genre": "carta de proposta",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de assistir ao vídeo, você resolveu replicar a iniciativa do projeto Armários Coletivos em sua região. Escreva para o presidente da Associação de Moradores do seu bairro, apresentando a proposta e sugerindo a implementação dessa ação no bairro. Em seu texto, explique o funcionamento do projeto, como ele surgiu e que benefícios traz aos moradores.",
    "sourceKicker": "Insumo · prova 2025/2 · Tarefa 1",
    "sourceTitle": "Armários Coletivos",
    "sourceText": "Falante 1: O projeto Armário Coletivo vem com a ideia de conscientizar o descarte consciente. Eles são construídos a partir de materiais coletados nas ruas, produzidos com a ajuda da própria comunidade. Uma ação que envolve arte, educação e a cultura do compartilhamento. Acompanhe essa matéria que veio lá de Santa Catarina para inaugurar o quadro Ressoar pelo Brasil.\n\nFalante 2: Estamos em Florianópolis, Santa Catarina, a Ilha da Magia, o paraíso dos surfistas, das praias que atraem turistas do mundo inteiro. Uma das mais famosas é esta: Ingleses. E é aqui que a gente começa a nossa história. Afinal, o que um armário está fazendo na pracinha do bairro? A gente explica. A peça apareceu oito meses atrás, junto com essas plaquinhas e o aviso: pode pegar o que quiser. E se tiver algo em bom estado que você não usa mais, pode deixar pra outra pessoa. É simples assim. Só abrir e levar ou deixar. Parece confuso? Pois o pessoal logo entendeu a ideia.\n\nFalante 3: Acho que todo mundo deveria fazer, né, pra dar oportunidade pras pessoas que não têm condições, ou de tá comprando uma roupinha, quer vim aqui, então, pra-- até pros moradores de rua ou pras pessoas que não têm condições. Aí fica tudo mais fácil pra todos nós, não é verdade? Todo mundo fazendo uma boa ação.\n\nFalante 4: No armário eu já coloquei roupas de adulto, roupas minhas, e também fui beneficiada, roupas pra minha netinha. Um dia eu precisava, cheguei. Então é uma troca, é uma experiência muito boa.\n\nFalante 2: Cabe de tudo, de roupa a mudinhas de planta.\n\nFalante 4: Tem coisas, assim, que eu fico surpresa. E, assim, a arrumação, como as pessoas vêm doar e deixa organizado. Tem sacolinhas, é arrumado assim por meia, touca, blusa de frio, agasalho, tudo arrumadinho.\n\nFalante 2: E foi aqui, num bairro tranquilo, bem sossegado, longe de toda aquela agitação das praias de Florianópolis, que nasceu a ideia do projeto. Quatro anos atrás, a Karina instalou aqui o primeiro armário. Né, Karina? Vem cá falar com a gente. Desde então, ele nunca ficou vazio, né?\n\nFalante 4: Não, esse armário aqui nos surpreende, até porque como não é um lugar agitado, né, é um bairro supertranquilo, a gente fica pensando da onde vem tanta coisa, né? Da onde toda essa abundância. Então é isso, todo mundo tem um monte de coisa em casa que não utiliza mais por vários motivos e acaba que deixa aqui à disposição pros vizinhos, né? Então é muito legal, a gente se surpreende.\n\nFalante 2: No começo, a Karina mesmo construía os armários no ateliê de casa. Tudo feito com material reutilizado. Depois de prontos, ela foi instalando nos arredores da rua, nos bairros mais próximos, nos mais distantes. Hoje, eles já estão espalhados em treze pontos da cidade e todo bairro quer um armário pra chamar de seu. É que onde essa ideia chega, logo começa uma verdadeira transformação.\n\nFalante 4: Que as pessoas se surpreendem. Como assim? Posso pegar? É gratuito, né? Porque a gente não tá acostumada com isso, né? Ter uma, um, um espaço na rua com coisas que qualquer pessoa pode pegar. Logo todo mundo fica sabendo o que que é e logo já flui, já vem coisas e vão-- é muita troca mesmo que acontece.\n\nFalante 2: É o poder transformador do compartilhamento.",
    "keyFacts": [
      "a proposta",
      "sugerindo a implementação dessa ação no bairro"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta de proposta",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2025-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2025-2-t2",
    "cycle": "2025/2",
    "number": "Tarefa 2",
    "title": "Selo Arte",
    "shortLabel": "2025/2 · T2",
    "genre": "carta aos associados",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é presidente de uma cooperativa de produtos artesanais. Com base no áudio, escreva uma carta para seus associados, explicando o que é o Selo Arte e quais os benefícios de sua regulamentação para os produtores artesanais.",
    "sourceKicker": "Insumo · prova 2025/2 · Tarefa 2",
    "sourceTitle": "Selo Arte",
    "sourceText": "Falante 1: [som de bipe] Seu Aurelino de Almeida começou a criar cabras há trinta anos. A vontade era também de produzir queijos, mas esse sonho ficou adormecido por vinte anos. Agora que ele se aposentou, virou realidade. Numa área de dois hectares, na zona rural de Brasília, ele consegue produzir quatro variedades de queijos artesanais.\n\nFalante 2: A gente tem conseguido vender tudo. A gente trabalha dentro das normas, nos esforçando pra fazer um produto de alta qualidade.\n\nFalante 1: No Brasil, existem cento e setenta mil produtores artesanais, como o senhor Aurelino, que querem que seus produtos sejam certificados com um selo de qualidade para expansão do negócio. A boa notícia é que o Governo Federal acaba de regulamentar a lei do Selo Arte para produtos alimentícios. Os queijos artesanais brasileiros, até agora, não podiam ser comercializados fora do estado de fabricação, mas são reconhecidos internacionalmente. Em junho passado, esses queijos conquistaram cinquenta e nove medalhas no mundial do Fromage, em Paris. E uma das produtoras premiadas é Maria Lucília de Farias, de São Roque, na Serra da Canastra, em Minas Gerais. A produtora comemora o lançamento do selo.\n\nFalante 3: O Selo Arte pra nós, produtores, é o sonho dos nossos antepassados se concretizando, né? Tem de nossas gerações a expectativa por esse momento histórico no queijo artesanal. É, será pra nós, pequenos produtores, reconhecimento, é, ir pelo caminho da legalidade.\n\nFalante 1: Nessa primeira etapa, a aplicação do Selo Arte será para os produtos derivados do leite, especialmente os queijos. As próximas etapas vão ser para embutidos, linguiças, defumados, mel e produtos de origem de pescados. A medida vale para todos os produtores artesanais do país e vai permitir o acesso a mais mercados e o aumento da renda. Com o Selo Arte, o consumidor vai ter a segurança de que a produção é artesanal e respeita as características e métodos tradicionais, assim como os produtos do seu Aurelino.\n\nFalante 2: O que a gente quer é produzir coisa boa e a gente quer que, é, o maior número de pessoas tenham acesso a esses produtos. É nosso sonho, né?",
    "keyFacts": [
      "o que é o Selo Arte",
      "quais os benefícios de sua regulamentação para os produtores artesanais"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aos associados",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2025-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2025-1-t1",
    "cycle": "2025/1",
    "number": "Tarefa 1",
    "title": "Visitação ao Parque Estrada de Santos",
    "shortLabel": "2025/1 · T1",
    "genre": "texto para site de ecoturismo",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você mantém um site de dicas de ecoturismo. Escreva um texto sobre o Parque Serra do Mar para ser publicado nesse site, informando as principais características naturais e históricas do Parque, com o propósito de estimular os turistas a visitarem a Estrada Velha de Santos.",
    "sourceKicker": "Insumo · prova 2025/1 · Tarefa 1",
    "sourceTitle": "Visitação ao Parque Estrada de Santos",
    "sourceText": "Falante 1: [som de bipe] A antiga Estrada de Santos, que liga São Paulo à Baixada Santista, oferece uma boa opção de lazer pra quem quer conhecer um pedacinho da Mata Atlântica. É um passeio ecológico que guarda muitas memórias da história do Brasil, com direito a uma longa caminhada.\n\nFalante 2: Depois do alongamento e as instruções do monitor, esse grupo está pronto para descer a serra a pé. Fechada em 1985 para carros, a Estrada Velha de Santos, hoje chamada de Caminhos do Mar, atrai muitos visitantes que estão procurando natureza e história. E eles vieram preparados.\n\nFalante 3: Passei uma vez aqui quando era pequenininho. Faz pouco tempo, acho que uns cinquenta, cinquenta anos, mais ou menos. Passei por aqui com meus pais. Agora tô vindo a pé.\n\nFalante 2: Em meio à Mata Atlântica, as cachoeiras, árvores e muito verde se destacam pelo caminho. A estrada fica dentro do Parque Serra do Mar, nos limites entre os municípios São Bernardo do Campo e Cubatão.\n\nFalante 4: O Parque Estadual Serra do Mar, ele tem trezentos e trinta e dois mil hectares. Ele vem do Rio de Janeiro e vai até Pedro de Toledo, aqui na, no Vale do Ribeira. Nós temos até espécies ameaçadas de extinção aqui. A gente tem a onça-parda, que ela já foi vista caminhando na estrada com dois filhotes.\n\nFalante 2: As visitas devem ser agendadas. São nove quilômetros de passeio com vários monumentos históricos construídos em 1922, que funcionavam como pontos de repouso para muitos viajantes.\n\nFalante 4: Os carros subiam, eles eram resfriados a água, eles ferviam. Então tinha que parar o carro aqui, ir até aquela peça ali, ó, colocar água no radiador.\n\nFalante 2: A Estrada de Santos sempre ligou São Paulo à Baixada Santista, mas antes dela, outro caminho já era usado para transportar mercadorias de lá pra cá. E essas pedras no meio da mata são da Calçada do Lorena, feita no final do século dezoito. Essa via faz parte de um dos momentos mais emblemáticos da nossa história. Foi aqui que Dom Pedro I, em setembro de 1822, subiu sentido à capital para proclamar a independência do Brasil. A vista exuberante do mar nos faz entender o que Roberto Carlos cantava sobre as curvas da Estrada de Santos, mas elas sempre foram sinuosas e muitas vezes perigosas e por isso a estrada foi fechada anos depois.\n\nFalante 1: [música]\n\nFalante 2: A solidão expressada na música não se vê mais por aqui. Esse grupo de dez amigos se juntou para viver a aventura.\n\nFalante 5: Eu tô gostando bastante. Gostei bastante dos guias. Eles têm bastante informação sobre os monumentos e a, a flora.\n\nFalante 2: Um local cheio de memórias que muita gente ainda não conhece.",
    "keyFacts": [
      "Visitação ao Parque Estrada de Santos"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para site de ecoturismo",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2025-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2025-1-t2",
    "cycle": "2025/1",
    "number": "Tarefa 2",
    "title": "A Última Floresta",
    "shortLabel": "2025/1 · T2",
    "genre": "coluna para website",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é colunista de um website especializado em cinema brasileiro, e decidiu escrever sobre a relação do diretor Luiz Bolognesi com o documentário “A Última Floresta”. Com base nas informações do áudio, escreva um texto para a coluna Por trás das câmeras, apresentando as motivações do cineasta para produzir o filme e seu aprendizado sobre os povos indígenas durante a realização do documentário.",
    "sourceKicker": "Insumo · prova 2025/1 · Tarefa 2",
    "sourceTitle": "A Última Floresta",
    "sourceText": "Falante 1: [som de bipe] Olá, começa agora mais um Brasil de Fato Entrevista. Hoje a nossa conversa é com o diretor de cinema Luiz Bolognese, que acabou de lançar o documentário A Última Floresta, gravado em uma aldeia Yanomami. O roteiro do filme foi feito em parceria com o líder indígena Davi Kopenawa e explora temas como a luta contra o garimpo ilegal, a preservação da floresta e a mitologia Yanomami. Confira.\n\nFalante 2: O relacionamento com os Yanomami, assim, durante algumas semanas, foi uma coisa que realmente mudou a minha vida. Eles não tentam controlar o futuro e isso cria algumas consequências imediatas muito interessantes, que é: eles tão muito presentes no aqui agora. Eles estão muito vivos no momento. E isso faz com que eles façam as coisas mais bem feitas que a gente. Eles conseguem tecer, cozinhar, é, caçar com uma calma ou mesmo ser atores de filme, com uma presença, com um foco, que nenhum ator ou atriz branca que eu trabalhei consegue entregar, porque ele tá disperso. [vinheta Brasil de Fato] A motivação de fazer A Última Floresta, ela tem um, um estopim no longo prazo e no curto. Eu vou falar rapidamente do longo prazo. No longo prazo, é um encantamento que eu tenho há muito tempo, desde a juventude, um fascínio que eu tenho por conhecer como são, como era, como pensam, é, os povos nativos, os povos originais, que a gente chama de povos indígenas, que estavam no nu-- que, que a gente chama de Brasil hoje, antes dos europeus chegarem. Então eu estudei antropologia e esse encantamento foi crescendo, mas ele não se deu apenas no campo intelectual, né. Além de eu aprofundar o meu conhecimento, por entender que a gente sabe muito pouco, apesar de termos quase todos nós, a maioria dos brasileiros, se-segundo estudo, setenta por cento dos brasileiros, têm antepassados indígenas. Eu sei que eu tenho e a grande maioria tem. A nossa cultura é marcada por isso, mas eu acho que a gente ainda tem muito pra aprender. O que me encanta é que esses povos todos, que eram cerca de mil nações, no que é hoje o Brasil, hoje são aproximadamente duzentas, eles desenvolveram ao longo de milhares de anos uma tecnologia, uma ciência, uma filosofia que a gente ignora e que era capaz de prover, num modo de vida bastante coletivo e solidário, fartura de carboidrato, proteína, fartura metafísica, filosófica, mitológica, religiosa, num ambiente de muita coletividade. O próprio modo circular de viver é o impedimento de privilégios. Então é tudo circular. O cacique, o líder, não mora num lugar melhor do que os outros. E é muito interessante a maneira coletiva como eles educam criança, a noção de negar a propriedade privada, tudo isso me encanta. Eu desenvolvi um trabalho intelectual e o meu cinema se aproximou desse universo. E o que eu entendo, eu quero traduzir através do cinema. [som de bipe]\n\nFalante 1: [vinheta Brasil de Fato] Olá, começa agora mais um Brasil de Fato Entrevista. Hoje a nossa conversa é com o diretor de cinema Luiz Bolognese, que acabou de lançar o documentário A Última Floresta, gravado em uma aldeia Yanomami. O roteiro do filme foi feito em parceria com o líder indígena Davi Kopenawa e explora temas como a luta contra o garimpo ilegal, a preservação da floresta e a mitologia Yanomami. Confira.\n\nFalante 2: O relacionamento com os Yanomami, assim, durante algumas semanas, foi uma coisa que realmente mudou a minha vida. Eles não tentam controlar o futuro e isso cria algumas consequências imediatas muito interessantes, que é: eles tão muito presentes no aqui agora. Eles estão muito vivos no momento. E isso faz com que eles façam as coisas mais bem feitas que a gente. Eles conseguem tecer, cozinhar, é, caçar com uma calma ou mesmo ser atores de filme, com uma presença, com um foco, que nenhum ator ou atriz branca que eu trabalhei consegue entregar, porque ele tá disperso. [vinheta Brasil de Fato] A motivação de fazer A Última Floresta, ela tem um, um estopim no longo prazo e no curto. Eu vou falar rapidamente do longo prazo. No longo prazo, é um encantamento que eu tenho há muito tempo, desde a juventude, um fascínio que eu tenho por conhecer como são, como era, como pensam, é, os povos nativos, os povos originais, que a gente chama de povos indígenas, que estavam no nu-- que, que a gente chama de Brasil hoje, antes dos europeus chegarem. Então eu estudei antropologia e esse encantamento foi crescendo, mas ele não se deu apenas no campo intelectual, né. Além de eu aprofundar o meu conhecimento, por entender que a gente sabe muito pouco, apesar de termos quase todos nós, a maioria dos brasileiros, se-segundo estudo, setenta por cento dos brasileiros, têm antepassados indígenas. Eu sei que eu tenho e a grande maioria tem. A nossa cultura é marcada por isso, mas eu acho que a gente ainda tem muito pra aprender. O que me encanta é que esses povos todos, que eram cerca de mil nações, no que é hoje o Brasil, hoje são aproximadamente duzentas, eles desenvolveram ao longo de milhares de anos uma tecnologia, uma ciência, uma filosofia que a gente ignora e que era capaz de prover, num modo de vida bastante coletivo e solidário, fartura de carboidrato, proteína, fartura metafísica, filosófica, mitológica, religiosa, num ambiente de muita coletividade. O próprio modo circular de viver é o impedimento de privilégios. Então é tudo circular. O cacique, o líder, não mora num lugar melhor do que os outros. E é muito interessante a maneira coletiva como eles educam criança, a noção de negar a propriedade privada, tudo isso me encanta. Eu desenvolvi um trabalho intelectual e o meu cinema se aproximou desse universo. E o que eu entendo, eu quero traduzir através do cinema",
    "keyFacts": [
      "do áudio",
      "escreva um texto para a coluna Por trás das câmeras",
      "apresentando as motivações do cineasta para produzir o filme",
      "seu aprendizado sobre os povos indígenas durante a re"
    ],
    "mustDo": [
      "escrever no gênero pedido: coluna para website",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2025-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2024-2.2-t1",
    "cycle": "2024/2.2",
    "number": "Tarefa 1",
    "title": "Aulas práticas",
    "shortLabel": "2024/2.2 · T1",
    "genre": "carta à Secretaria de Ensino",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é diretor da escola onde está sendo implementada a metodologia de ensino apresentada no vídeo. Convencido de seus benefícios, escreva uma carta para a Secretaria de Ensino do seu estado, propondo a ampliação do projeto para outras escolas. Justifique sua proposta mencionando as características e as vantagens do projeto para os estudantes.",
    "sourceKicker": "Insumo · prova 2024/2.2 · Tarefa 1",
    "sourceTitle": "Aulas práticas",
    "sourceText": "Falante 1: [bipe] Aprender conteúdos escolares, na prática, não é novidade na educação, mas uma nova metodologia está mudando o jeito de ensinar crianças e adolescentes.\n\nFalante 2: É o STEAM, uma sigla em inglês que contém as palavras Ciência, Tecnologia, Engenharia, Matemática e Artes. O método ajuda os estudantes a entenderem melhor cada disciplina, interligá-las com a vida real.\n\nFalante 1: Garrafas pet, palitos de sorvete, cola, detergente, uma banana, uma batata. Eis a matéria-prima de um novo método de ensino que junta as ciências exatas e humanas. A ideia é estimular o aluno a querer descobrir coisas e ir em busca das próprias respostas.\n\nFalante 3: Perceber que se eu souber, é, trabalhar com ciência, com tecnologia, com engenharia e matemática e principalmente essas coisas integradas, eu vou conseguir fazer parte do mundo. Porque se eu não trabalhar com a teoria e a prática ao mesmo tempo, eu não vou aprender de verdade.\n\nFalante 1: Nesta escola estadual de Santo André, na Grande São Paulo, o ensino médio é integral e boa parte do tempo os alunos gastam fazendo projetos, como o destes foguetes.\n\nFalante 4: Ele sobe com a força do ar, então-- com a pressão do ar. Então, tipo, quando ele fazer muita pressão aqui dentro, que a garrafa começar a inchar, quando ele soltar, ela vai subir com a pressão do ar que tá aqui dentro.\n\nFalante 5: Quando eles chegam aqui e traz o que aprenderam na sala de aula pro laboratório e vê funcionando, eles começam a sentir muito mais fácil que o conhecimento foi adquirido.\n\nFalante 1: Para muitos alunos, o novo jeito de aprender faz diferença nas notas e na vida.\n\nFalante 6: Eu consegui entender coisas que na outra escola eu não entendia muito d-- muito, muito bem, porque lá não tinha prática. Mas aqui, como tem, eu consigo, é, aumentar mais o conhecimento dessas partes.\n\nFalante 1: Mas pra que toda essa mudança aconteça, os professores precisam estar estimulados e preparados, porque ainda são eles que conduzem os alunos nesse novo jeito de aprender.\n\nFalante 7: Não tem mais como ficar só na lousa e giz. A parte de laboratório marca e ela precisa, tanto pra biologia quanto física, matemática, precisa ter a prática.\n\nFalante 1: [bipe]",
    "keyFacts": [
      "no vídeo"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta à Secretaria de Ensino",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2024-2.2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2024-2.2-t2",
    "cycle": "2024/2.2",
    "number": "Tarefa 2",
    "title": "Comportamento animal",
    "shortLabel": "2024/2.2 · T2",
    "genre": "guia para clientes",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha em um pet shop especializado em gatos. A partir das informações do áudio, escreva um guia para ser distribuído aos clientes, com orientações sobre a adaptação de gatos mais velhos aos mais novos.",
    "sourceKicker": "Insumo · prova 2024/2.2 · Tarefa 2",
    "sourceTitle": "Comportamento animal",
    "sourceText": "Falante 1: [som de bipe] O Jorge Vinícius é nosso ouvinte do Rio de Janeiro. \"Manu, sou taxista e recentemente adotei um gatinho recém-desmamado. Hoje ele tem três meses e não para. Morde todos e não para um segundo. Minha esposa tem uma gata de dez anos que não sai mais do quarto. Está super acuada. Ele tenta chegar perto dela o tempo inteiro e ela some. Como fazer pra que ela se acostume?\" Bom, primeira coisa, Jorge, que vocês precisam ter é paciência e estratégia, um pouquinho de estratégia. O que que a gente vai fazer? O que que eu te sugiro? Na cabeça da gata da tua esposa, sabe o que ela tá pensando? Seguinte: \"A minha casa foi invadida por um pirralho que não para um segundo. É um bebê bagunceiro que não me deixa em paz\". Esse é o pensamento dela, entendeu? Então, o que que vocês devem fazer? Pra gato, a chegada de um outro animal ou de uma pessoa, ou qualquer mudança muito abrupta na rotina, é uma violência, gera um estresse muito grande. Então quando um gato novo chega em casa, normalmente o que a gente faz, e dá muito certo, é: essa apresentação deve ser lenta e gradativa. Cê coloca o pequenininho, tá? Dentro de um quarto. Coloca a ração dele, coloca o banheirinho dele, coloca o comedouro, tudo dele dentro daquele quarto. E você limita ele, ele não fica rodeando pela casa, porque afinal de contas, quem chegou primeiro foi ela. Então ela fica solta e ele está dentro do quarto. Aos poucos, você vai notar que ela vai começar a chegar perto pra investigar. Afinal de contas, eles são muito territorialistas, muito olfativos e ela vai começar a investigar. Quando ela começar a cheirar a porta, de vez em quando você tira o filhote, deixa ela dar uma olhada o que tá acontecendo lá dentro do quarto. Quando começar isso a acontecer, você pode pôr a ração de ambos na beira da porta. Então, eles vão comer juntos, mas com uma porta no meio. E isso, aos poucos, eles vão se acostumando, até que um dia, sob sua supervisão, você abre a porta e vê como é que acontece a coisa. Sempre sob a sua supervisão. Tem que ter paciência e persistência, tá bom? E boa sorte pra vocês. [som de bipe] O Jorge Vinícius é nosso ouvinte do Rio de Janeiro. \"Manu, sou taxista e recentemente adotei um gatinho recém-desmamado. Hoje ele tem três meses e não para. Morde todos e não para um segundo. Minha esposa tem uma gata de dez anos que não sai mais do quarto. Está super acuada. Ele tenta chegar perto dela o tempo inteiro e ela some. Como fazer pra que ela se acostume?\" Bom, primeira coisa, Jorge, que vocês precisam ter é paciência e estratégia, um pouquinho de estratégia. O que que a gente vai fazer? O que que eu te sugiro? Na cabeça da gata da tua esposa, sabe o que ela tá pensando? Seguinte: \"A minha casa foi invadida por um pirralho que não para um segundo. É um bebê bagunceiro que não me deixa em paz\". Esse é o pensamento dela, entendeu? Então, o que que vocês devem fazer? Pra gato, a chegada de um outro animal ou de uma pessoa, ou qualquer mudança muito abrupta na rotina, é uma violência, gera um estresse muito grande. Então quando um gato novo chega em casa, normalmente o que a gente faz, e dá muito certo, é: essa apresentação deve ser lenta e gradativa. Cê coloca o pequenininho, tá? Dentro de um quarto. Coloca a ração dele, coloca o banheirinho dele, coloca o comedouro, tudo dele dentro daquele quarto. E você limita ele, ele não fica rodeando pela casa, porque afinal de contas, quem chegou primeiro foi ela. Então ela fica solta e ele está dentro do quarto. Aos poucos, você vai notar que ela vai começar a chegar perto pra investigar. Afinal de contas, eles são muito territorialistas, muito olfativos e ela vai começar a investigar. Quando ela começar a cheirar a porta, de vez em quando você tira o filhote, deixa ela dar uma olhada o que tá acontecendo lá dentro do quarto. Quando começar isso a acontecer, você pode pôr a ração de ambos na beira da porta. Então, eles vão comer juntos, mas com uma porta no meio. E isso, aos poucos, eles vão se acostumando, até que um dia, sob sua supervisão, você abre a porta e vê como é que acontece a coisa. Sempre sob a sua supervisão. Tem que ter paciência e persistência, tá bom? E boa sorte pra vocês.",
    "keyFacts": [
      "Comportamento animal"
    ],
    "mustDo": [
      "escrever no gênero pedido: guia para clientes",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2024-2.2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2024-2.2-t3",
    "cycle": "2024/2.2",
    "number": "Tarefa 3",
    "title": "O mundo é o que você come",
    "shortLabel": "2024/2.2 · T3",
    "genre": "carta aos vizinhos",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você está organizando um curso de culinária no condomínio onde mora. Para convencer seus vizinhos sobre os benefícios de se cozinhar em casa, escreva a eles uma carta, utilizando argumentos apresentados no texto “O mundo é o que você come”.",
    "sourceKicker": "Insumo · prova 2024/2.2 · Tarefa 3",
    "sourceTitle": "O mundo é o que você come",
    "sourceText": "O mundo é o que você come Para o americano Michael Pollan, o ato de cozinhar tem o poder de nos tornar mais saudá- veis e tirar nosso estômago do controle das corporações. No início, era o churrasco. Depois vieram os cozidos, os assados, os fermentados. E os ultraprocessados, que, na opinião do jornalista Michael Pollan, nos tiram da cozinha e, portanto, do controle de nossa dieta. Nos EUA, o tempo médio gasto no preparo de refeições em casa caiu pela metade desde os anos 1960. Autor de várias obras sobre alimenta- cão, Polian falou à SUPER sobre seu livro, Cozinhar- Uma História Natural da Transformacão, em que vestiu o avental de cozinheiro para investigar métodos de cozi- mento e a importância de pilotar o próprio fogão. O livro deu origem à série Cooked, que estreou em fevereiro no Netflix. Cozinhar é um ato político? E um jeito de retomar o con- trole da sua dieta, que hoje está com as corporações. São elas que decidem quem cultiva o quê e quanto açúcar, sal e gordura vai na comida. Quando você cozinha, você tem influência na agricul- tura. Você vota, com seu garfo, pelo local ou pelo global, e toma decisões sobre energia e água. E como a experiência de cozinhar para o livro o transformou? Passei a comer melhor e até perdi peso. Aprendi sobre agricul- tura, e passei a respeitá-la mais, e sobre o poder das refeições em família. Também fiquei mais sociável, porque, se você cozinha, faz sentido convidar pessoas para comer com você. Se cozinhar nos tornou humanos, como deixar de cozinhar nos afeta? Os países em que se cozinha mais têm menos obesidade. Quanto menos se cozinha, mais fast food se consome. Em casa, as pessoas deixam de comer juntas. O adolescente come uma pizza con- gelada; a mãe, uma salada; o pai, um pedaço de carne pré-prepa- rada; as crianças comem enquanto fazem outra atividade, como licão de casa. A vida familiar se torna mais difusa. E há mesmo um efeito na civilidade. Nas refeicões, as crianças aprendem a arte de viver em sociedade: a dividir, a esperar a vez, a discutir sem brigar. Como reverter a tendência mundial de cozinhar menos? Como jornalistas, contando histórias que estimulem as pessoas a voltar para a cozinha. Aprendo tanto sobre a natureza ao manusear animais e plantas: aprendo sobre transformações, sobre química, física, biologia. E também cultura, porque você está trabalhando com tradicões. É um dos jeitos mais intelectualmente absorventes de passar o tempo. Como transformar acúcar em álcool, por exemplo. Essas trans- formações são milagres, mas a maioria não pensa sobre isso. Ao mesmo tempo em que muita gente já não cozinha tanto nem se senta para comer em família, um monte de fotos de comida é postada nas redes sociais. Esse contato não é tão íntimo. Não contempla a habilidade de conectar com todos os nossos sentidos. As pessoas estão muito interessadas em comida e em cozinhar, mas não cozinham. E uma cultura do espectador, de ver mais do que fazer. A indústria prefere assim, pois pode fazer por nós. Há comidas muito atrativas, como batatas fritas, que dão trabalho para fazer. Mas as com- panhias tornam simples comer isso todo dia. No livro Regras da Comida, eu digo que você pode comer toda a junk food que puder cozinhar. O ato de cozinhar regula a alimentação. Fonte: Superinteressante, edição 363/jul/2016, p. 20-21. (adaptado)",
    "sourceImage": "/writing/insumos/2024-2.2-t3.jpg",
    "keyFacts": [
      "no texto “O mundo é o que você come”"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aos vizinhos",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2024-2.2-t4",
    "cycle": "2024/2.2",
    "number": "Tarefa 4",
    "title": "Patinetes",
    "shortLabel": "2024/2.2 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é usuário de patinete e, após ler a crônica de Mauro Calliari, decidiu escrever para a seção “Carta do Leitor”, posicionando-se sobre as questões levantadas no texto a respeito do uso do patinete na cidade.",
    "sourceKicker": "Insumo · prova 2024/2.2 · Tarefa 4",
    "sourceTitle": "Patinetes",
    "sourceText": "Patinetes, Como tratar esses novos habitantes da cidade? Os patinetes parecem ter invadido não só as ruas e calçadas, mas também o imagi- nário coletivo da cidade. Desde o início do serviço de aluguel de patinetes, tem havido um número crescente de relatos de atropelamentos, de quase atro- pelamentos e muita chateação na convivên- cia entre esse novo ser elétrico e os bípedes. Apesar da base ainda pequena, a novi- dade parece ter agradado uma certa cama- da da população de São Paulo, moradores da região oeste, onde estão concentrados, capaz de pagar um valor de R$l para cada quinze minutos para se deslocar. Pesquisa realizada pela empresa Grow mostra que quase 40% das pessoas que usam os patinetes deixaram de usar o car- ro para ir ao trabalho. Aos finais de semana, porém, o maior uso é para lazer mesmo, até com crianças, o que deveria ser proibido. Em outras cidades do mundo, o confli- to tem sido resolvido de maneiras distintas. Em algumas delas, os patinetes foram proi- bidos nas calçadas. Em outras, regulamen- tados, como parece vir a ser o caso de São Paulo, onde há sugestão de que eles não ul- trapassem 6 km por hora quando estiverem nas calçadas. O arquiteto responsável pelo programa de segurança no trânsito de Lisboa, Pedro Gouveia, acredita que proibir os patinetes seria tão ruim quanto deixá-los trafegar sem regulação nenhuma. Ou seja, é melhor se conformar com o fato de que a tecnologia muda sem nosso controle, mas ao poder público cabe decidir em que condições ela deve funcionar. Como meio de mobilidade, o patine- te é um ser estranho, que se move através de motor elétrico, custa relativamente caro, Mauro Calliari Matéria e fotos chega a perigosos 20 km por hora e tem rodinhas tão pequenas que tornam cada buraco ou desnível um perigo. Mas é uma alternativa ao trânsito, é mais silencioso e polui menos que um carro e hoje já divide as ciclovias com as bicicletas e as calçadas com os pedestres. Especialistas defendem o básico: in- vestir em ciclovias para acomodar patinetes, bicicletas e tudo o mais que parece estar sen- do inventado em termos de mobilidade. Tam- bém precisamos de mais áreas de calçadas. 0 fato é que hoje falta espaço para esse novo habitante que foge dos carros nas ruas, mas que acaba ameaçando as pessoas nas calçadas. É ali que o patinete se torna um motivo de conflito. Assim, ao mesmo tempo em que vale a pena aceitá-lo como solução inevitá- vel de mobilidade, não é possível ignorar o fato de que tem gente que dirige como se estivesse na pista de corrida. A questão é sempre a mesma - edu- cação. Afinal, um patinete não anda sozinho, ainda. Ele depende de motoristas. E muitos dirigem mal mesmo. E a educação que faz a gente não precisar de leis para cada coisa. Nesse caso, elas seriam algo como: \"Não se pode tirar fininho de pes- soas, principalmente se elas estiverem com uma criança no colo\". \"Não avance em direção à canela de alguém a 20km/hora\". \"E proibido assustar os pedestres\". Francamente, em vez de leis, estamos precisando é que as pessoas que dirigem patinetes se preocupem com os outros. Apesar de ser um veículo lúdico e divertido, o patinete pode machucar. Se você for dirigir um deles, quando encontrar pedestres, diminua a velocidade até a mesma velocidade de quem estiver an- dando a pé, ou desça do seu patinete quando tiver muita gente na sua frente. Olhe no olho de quem vem vindo. As- segure à pessoa de que você a viu. Não se trata apenas de mobilidade. Trata-se de educação mesmo. Disponível em: https://sao-paulo.estadao.com. br/blogs/caminhadas-urbanas/patinetes-como- tratar-esses-novos-habitantes-da-cidade/",
    "sourceImage": "/writing/insumos/2024-2.2-t4.jpg",
    "keyFacts": [
      "Patinetes"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2024-2-t1",
    "cycle": "2024/2",
    "number": "Tarefa 1",
    "title": "Cultura da aceleração",
    "shortLabel": "2024/2 · T1",
    "genre": "texto para rede social da empresa",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você atua no setor de Gestão de Pessoas de uma empresa e semanalmente produz conteúdos sobre saúde e bem-estar. Observando os efeitos negativos da “cultura da aceleração”, decidiu escrever sobre o tema na rede social da empresa. Com base nas informações do vídeo, elabore um texto explicando o que é a “cultura da aceleração”, quais problemas podem estar associados a ela e como fazer a prevenção.",
    "sourceKicker": "Insumo · prova 2024/2 · Tarefa 1",
    "sourceTitle": "Cultura da aceleração",
    "sourceText": "Falante 1: [bipe] Depois do excesso de telas, agora são os, os efeitos da chamada cultura da aceleração que preocupam especialistas. A tecnologia criou o hábito de ouvir áudios e assistir a vídeos em velocidades rápidas. Mas essa nova prática de acelerar o ritmo pra tudo, tem consequências.\n\nFalante 2: Na correria do dia a dia, tempo é um bem precioso. Tá com pressa?\n\nFalante 3: É, estou. Agora não dá. Obrigada.\n\nFalante 2: Tá com pressa?\n\nFalante 3: Tô.\n\nFalante 2: Posso fazer duas perguntinhas pra você?\n\nFalante 3: Ai, depende. Por quê?\n\nFalante 2: É sobre pressa. To vendo que você tá meio apressada.\n\nFalante 3: É!\n\nFalante 2: Tá com pressa?\n\nFalante 3: Tô.\n\nFalante 2: Tá sempre com pressa?\n\nFalante 3: Basicamente, sim. Eram duas perguntas, não eram? [risada] Eu preciso ir, obrigada.\n\nFalante 2: O dia tem vinte e quatro horas pra todo mundo, mas pra algumas pessoas parece que não é suficiente. Sabe aquela sensação de que tudo precisa ser feito correndo? Essa pressa não é só uma sensação. O tempo anda mesmo acelerado. Quarenta e três por cento dos brasileiros vivem em velocidade 2X, ou seja, em ritmo muito acelerado, de acordo com uma pesquisa do Datafolha.\n\nFalante 3: É correria total. Conciliar o trabalho, conciliar a vida pessoal. Não-- Só correndo mesmo [risada].\n\nFalante 2: Quando tudo ao redor parece andar depressa, a tendência é acelerar também. Um em cada quatro entrevistados na pesquisa admitiu que ouve áudios e assiste a vídeos também em modo mais rápido.\n\nFalante 4: Costumo, e às vezes eu nem termino de ouvir o áudio. Eu já, já tento responder antes de, de terminar de ouvir.\n\nFalante 2: Essa sensação de ganhar tempo é um sinal perigoso de que a pressa está no comando e pode levar até a sintomas de ansiedade.\n\nFalante 5: A partir do momento que eu golco as coisas, eu perco as sensações das coisas, eu perco informações das coisas. A gente não acompanha esse ritmo e a gente acaba sendo sobrecarregado muitas vezes. É muito valioso com que você realmente se force a ter as coisas no próprio tempo e fazer o tempo trabalhar a seu favor, e não você correr contra o tempo, porque isso vai acelerar você, vai gerar estresse, pode gerar ansiedade.\n\nFalante 2: A pesquisa indica também que nove em cada dez pessoas não se sentem calmas. Por isso, é preciso aprender a diminuir o ritmo.\n\nFalante 6: Estamos doentes de velocidade. E quando eu falo desse jeito, eu, eu tento, é, fazer com que a gente consiga enxergar que sim, no fim da-- lá na ponta, quem acelera os áudios, quem acelera os vídeos, são os indivíduos. Mas eles fazem isso imersos num contexto cultural que de alguma forma os pressiona, né, de algum jeito a fazer isso. Então, tem todo um discurso de que você vai acelerar o áudio pra ganhar tempo, pra dedicar tempo pro que importa, mas na verdade, você termina ocupando aquele tempo com mais trabalho, mais produtividade, mais consumo, que são algumas das engrenagens, digamos assim, dessa cultura da aceleração.",
    "keyFacts": [
      "do vídeo",
      "elabore um texto explicando o que é a “cultura da aceleração”",
      "quais problemas podem estar associados a ela",
      "como fazer a prevenção"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para rede social da empresa",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2024-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2024-2-t2",
    "cycle": "2024/2",
    "number": "Tarefa 2",
    "title": "Raduan Nassar",
    "shortLabel": "2024/2 · T2",
    "genre": "texto para guia literário",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é professor de literatura e está elaborando um guia literário, a ser entregue a seus alunos, sobre obras e autores representativos da literatura brasileira. A partir das informações do áudio, escreva um texto para o guia, apresentando a obra “Lavoura Arcaica” e o seu autor Raduan Nassar.",
    "sourceKicker": "Insumo · prova 2024/2 · Tarefa 2",
    "sourceTitle": "Raduan Nassar",
    "sourceText": "Falante 1: [som de bipe] Lançado em 1975, o livro \"Lavoura Arcaica\" foi recebido imediatamente pela crítica como um clássico. Foi a estreia do escritor paulista Raduan Nassar, que viria a receber o Prêmio Camões anos mais tarde, por sua obra formada por apenas três livros. A história de \"Lavoura Arcaica\" acompanha o sofrimento do jovem André. Movido por uma paixão frustrada pela irmã, ele foge da casa dos pais no interior pra viver na capital. A fuga também representa o desejo de se libertar do domínio paterno e da religião, mas ele é convencido a retornar pra casa como um filho pródigo. Raduan Nassar nasceu em 1935, na cidade de Pindorama, em São Paulo, filho de imigrantes libaneses. Na juventude, ele se mudou com a família pra capital paulista. Estudou Letras e Filosofia. Publicou também o romance \"Um Copo de Cólera\" e a coletânea de contos \"Menina a Caminho\". Nassar abandonou a literatura e a vida pública em 1984 pra viver em uma fazenda no interior de São Paulo, onde trabalhou com agricultura. Posteriormente, ele doou a propriedade pra Universidade Federal de São Carlos. Raduan Nassar recebeu em 2016 o Prêmio Camões pelo conjunto da sua obra. Ele atualmente tem oitenta e sete anos. E o Ítalo Moriconi conta por que \"Lavoura Arcaica\" é um livro imperdível.\n\nFalante 2: \"Lavoura Arcaica\" é um livro de leitura imperdível, não só pela sua qualidade intrínseca, que ninguém pode negar, mas pelo próprio fato de ter se tornado um grande clássico. Nós poderíamos dizer que é um, um dos maiores clássicos da literatura brasileira que surgiu, que explodiu nos anos setenta, oitenta. Então ele é um grande clássico do fim do século, do fim do século, é, XX, mas que perdura pra todo o sempre, como todo grande clássico. Então ele é o grande clássico de uma época, mas ele é um grande clássico da literatura brasileira desde sempre.",
    "keyFacts": [
      "a obra “Lavoura Arcaica”",
      "o seu autor Raduan Nassar"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para guia literário",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2024-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2024-1-t1",
    "cycle": "2024/1",
    "number": "Tarefa 1",
    "title": "Museu da Vida",
    "shortLabel": "2024/1 · T1",
    "genre": "carta-convite",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha na assessoria de imprensa do Museu da Vida e ficou responsável por convidar as escolas do Rio de Janeiro para uma visita em comemoração aos 24 anos da Instituição. Elabore uma carta-convite à diretoria das escolas, informando as atividades oferecidas, a relevância dessa visita para os estudantes e o papel do Museu para a sociedade.",
    "sourceKicker": "Insumo · prova 2024/1 · Tarefa 1",
    "sourceTitle": "Museu da Vida",
    "sourceText": "Falante 1: O Museu da Vida, que fica na Fiocruz, no Rio de Janeiro, completou vinte e quatro anos de existência com uma série de atividades abertas ao público. O espaço ajuda a divulgar a ciência e é um elo entre os pesquisadores e a população.\n\nFalante 2: Em uma gota d'água, podem existir centenas de micro-organismos. Observar esses seres por meio de um microscópio é uma das atividades do Museu da Vida, que ocupa diversos espaços no campus principal da Fiocruz, no Rio de Janeiro.\n\nFalante 3: Os visitantes, principalmente as crianças, ficam bem animadas e entusiasmadas. Eles perguntam se pode beber essa água, se na água da nossa casa também é assim. E a gente fala de importância de tratar a água, lavar bem os alimentos, higienizar as mãos.\n\nFalante 2: Quem visita o local também pode apreciar uma exposição de insetos e entender melhor a atuação de vírus e bactérias no organismo, por meio de esculturas gigantes.\n\nFalante 4: A Fiocruz é uma, é uma instituição de ensino, de pesquisa, de produção, é, de assistência. Então, a nossa grande missão é fazer essa interlocução entre essa grande instituição de pesquisa e a população.\n\nFalante 2: O museu também tem exposições interativas ao ar livre, que ajudam a entender melhor a propagação do som, a geração de energia e o funcionamento do corpo humano. É uma forma de despertar o interesse da ciência nas crianças?\n\nFalante 5: Com certeza, porque daí, além de elas terem o conteúdo nas salas de aula, que é super importante, né, com os professores e professoras, é, elas podem vir com esses professores aqui e passar um tempo com a gente aqui, descobrindo na prática aquilo que elas viram em sala de aula. E isso desperta neles a vontade de questionar mais, de fazer ciência.\n\nFalante 2: Durante o aniversário do Museu da Vida, os visitantes foram convidados a mergulhar na cultura indígena. A programação incluiu oficinas de grafismo corporal, de tupi guarani, apresentação de cânticos e uma feira de artesanato.\n\nFalante 6: Nós tamos fazendo vinte e quatro anos e a gente achou que seria importante a gente ter com a gente os povos indígenas pra gente promover esse diálogo entre ciência e cultura, no sentido da promoção da saúde.",
    "keyFacts": [
      "Museu da Vida"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta-convite",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2024-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2024-1-t2",
    "cycle": "2024/1",
    "number": "Tarefa 2",
    "title": "Estatuto Racial",
    "shortLabel": "2024/1 · T2",
    "genre": "e-mail às prefeituras",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como funcionário da livraria do Senado, você ficou responsável por escrever um e-mail destinado às prefeituras a fim de divulgar e oferecer exemplares da cartilha do “Estatuto da Igualdade Racial em Miúdos”, incentivando-as a distribuí-los nas escolas da cidade. Em seu texto, apresente o objetivo e o público-alvo da Cartilha e destaque sua importância social.",
    "sourceKicker": "Insumo · prova 2024/1 · Tarefa 2",
    "sourceTitle": "Estatuto Racial",
    "sourceText": "Falante 1: Você conhece o Estatuto da Igualdade Racial, uma lei aprovada pelo Congresso em 2010 e que define um conjunto de regras para coibir a discriminação racial e estabelecer políticas para diminuir a desigualdade social no Brasil? Não conhece? Muita gente pode argumentar que é uma lei com um texto muito comprido, com mais de sessenta artigos e com uma linguagem difícil de entender. A Livraria do Senado lançou o Estatuto da Igualdade Racial em Miúdos. A publicação usa os quadrinhos pra explicar, de forma simplificada e direta, os principais pontos da lei. Vamos conversar agora com a escritora Madu Macedo, que fez os textos. Os desenhos são de Felipe Modesto. Bom dia, Madu.\n\nFalante 2: Bom dia. Como vai? Tudo bem?\n\nFalante 1: Tudo ótimo. Madu, eu tô aqui com a cartilha aqui na minha tela, né. A ideia da cartilha surgiu de uma demanda de adolescentes ou você, como escritora, uma pessoa que observa, né, a, o que tá em sua volta, identificou uma dificuldade de as pessoas entenderem o estatuto?\n\nFalante 2: Olha, na verdade, é o que a gente percebia, esse desconhecimento, né, da maioria das pessoas, da nossa legislação, porque é uma linguagem técnica, né, mais complexa. Então, as nossas leis acabam ficando muito distante do grande público. Como eu era diretora da escola, eu achei interessante a gente começar a trazer isso pras escolas, né, um material bacana pra que as escolas, ou seja, os adolescentes já começarem a entender coisas que eu, pelo menos, não tive essa oportunidade, né. E aí, conversando com o presidente da ABL, do Senado, ele achou a ideia interessante. Então a gente começou a fazer essa coleção.\n\nFalante 1: Como é que tem sido o retorno às pessoas? \"Eita, eu não sabia que isso tava no Estatuto da Igualdade Racial. Eu vi aqui no quadrinho. Quer dizer que é isso mesmo?\", e tal. Como é que tem sido o retorno dessa publicação?\n\nFalante 2: Olha, é muito grande, o que deixa tanto eu quanto o Felipe muito felizes, né? Porque a gente faz com muito carinho esse trabalho, exatamente com esse intuito, né, de que as pessoas entendam de forma mais clara uma linguagem que nem sempre, às vezes, é acessível a todo público. Eu recebo muito de toda parte do Brasil, principalmente de escolas, sabe? De trabalhos que tão sendo realizados e como isso tem refletido positivamente nos municípios, até com aumento de denúncias, porque o aluno começa a perceber que aquilo não é normal.",
    "keyFacts": [
      "o objetivo",
      "o público-alvo da Cartilha",
      "destaque sua importância social"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail às prefeituras",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2024-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2024-1-t3",
    "cycle": "2024/1",
    "number": "Tarefa 3",
    "title": "Rapper indígena",
    "shortLabel": "2024/1 · T3",
    "genre": "e-mail de indicação",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "A Secretaria de Cultura da sua cidade está organizando um festival para dar visibilidade a artistas menos conhecidos e abriu uma consulta pública para que a população sugira atrações para o evento. Escreva um e-mail para a Secretaria, a fim de indicar o nome de Kaê Guajajara, ressaltando sua trajetória e o papel de sua música na defesa dos povos indígenas.",
    "sourceKicker": "Insumo · prova 2024/1 · Tarefa 3",
    "sourceTitle": "Rapper indígena",
    "sourceText": "RAPPER INDíGENA KAÊ GUAJAJARA CRITICA O APAGAMENTO DOS POVOS ORIGINÁRIOS NA CULTURA BRASILEIRA ARTISTA FAZ DA MÚSICA UMA FERRAMENTA CRUCIAL PARA DEFENDER NARRATIVAS DE povos INDíGENAS Cantora do povo Guajajara cria contranarrativas com a música (Foto: Scarlett Rocha / Divulgação) or Lucas Feitoza Favelas são territórios indígenas onde são comuns nomes e cpm- portamentos culturais oriundos dos povos originários. Nesse Dia dos Povos Indígenas, conversamos com Kaê Guajajara, cantora, composito- ra e ativista indígena. Nascida no estado do Maranhão, Kaê veio para o Rio de Janeiro ainda criança, tendo morado até recente- mente na Vila dos Pinheiros, no con- junto de' favelas da Maré. Prestes a lançar seu novo álbum, \"Zahitata\", ela conta que sua inspiração veio do incômodo de ver que, quando se trata de temáticas indígenas, a so- ciedade se interessa apenas por nar- rativas de sofrimento. \"A gente fala muito das nossas dores, da nossa sobrevivência, e pouco da nossa vi- vência, da beleza, da celebração da vida, que se supera a cada instante desde 1500. Queremos amar, viver e rir pra além da dor que a colonização nos trouxe\", conta. A MÚSICA COMO FLECHA DE CONTRANARRATIVA \"A música é flecha no nosso arco\", explica Kaê, usada para tocar pes- soas, mostrar pontos de vista, defender a narrativa dos povos originários, que vivem tanto nas comunidades indígenas quanto nas favelas, sempre lutando por direitos, respeito e dignidade em todos os lu- gares. A cantora é fundadora do Coletivo Azuruhu, um selo artístico forma- do por artistas indígenas que criam histórias opostas às produzidas pela sociedade. A partir das suas expe- riências e vivências, esses artistas denunciam o apagamento dos po- vos originários. Kaê também é au- tora do livro \"Descomplicando com Kaê Guajajara — 0 que você precisa saber sobre os povos originários e como ajudar na luta antirracista\". Mudar radicalmente o significado do Dia dos Povos Indígenas é, segun- do Kaê, a melhor forma de entender esta data comemorativa, para isto, é preciso \"parar de fantasiar as crian- ças e de contar histórias de que os indígenas viviam apenas no passa- do ou que aqueles que estão vivos hoje vivem bem distante, apenas na floresta, e não fazem parte da so- ciedade\". A rapper convida pessoas indígenas para pensar em novas for- mas de educar as crianças e a po- pulação, com base no respeito. Disponível em: https://www. vozdascomunidades.com.br/ destaques/rapper-indigena-cria- da-mare-kae-guajajara-critica-o- apagamento-dos-povos-originarios- na-cultura-brasileira/ Acesso em: 23 de junho 2023 (adaptado).",
    "sourceImage": "/writing/insumos/2024-1-t3.jpg",
    "keyFacts": [
      "Rapper indígena"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de indicação",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2024-1-t4",
    "cycle": "2024/1",
    "number": "Tarefa 4",
    "title": "Seu desejo é um algoritmo",
    "shortLabel": "2024/1 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Após ler o texto “Seu desejo é um algoritmo”, escreva uma carta do leitor para ser publicada no mesmo jornal. Em seu texto, posicione-se em relação à opinião da autora e mencione experiências próprias que sustentem o seu ponto de vista.",
    "sourceKicker": "Insumo · prova 2024/1 · Tarefa 4",
    "sourceTitle": "Seu desejo é um algoritmo",
    "sourceText": "DESEJO* UWALGORITMO Cláudia Tajes FRAGILE Seu dinheiro já navegou nas suas redes hoje? claudiatajes@gmail.com Imagine alguém atento aos seus mínimos desejos. Interessado em satis- fazer todas as suas vontades, até as que você mal cogitou, mesmo aquelas que não passaram de uma brisa. Não é uma pessoa da família, um namorado ou ria- morada, muito menos um benfeitor, Nem sequer é alguém, mas algo. 0 algoritmo. Algoritmo: na internet, o respon- sável por processar grandes volumes de informações num curtíssimo espaço de tempo. 0 instrumento para classificar conteúdos em redes sociais e criar reco- mendações ,que são a sua cara. É justamente aí, nas sugestões per- sonalizadas que oferece sem parar, que o algoritmo vira o chato mor para quem navega pelas redes, ele e os produtos e serviços que você não pode deixar de ter, alugar, reservar, conhecer, comprar. Pobre de quem olha, meio distrai- damente, um anúncio de colchão. A cada duas selfies no Instagram, os tipos mais tecnológicos de colchões serão ofereci- dos para que suas noites, seu sono e sua coluna nunca mais sejam os mesmos. Pode pagar em três vezes sem juros ou com 5% de desconto no pix. Passa o anúncio de uma bota lin- dona e você nem clica, só se detém por alguns segundos. Mas, em se tratando de algoritmo, melhor não olhar por mui- to tempo. Em sua próxima incursão aq Instagram, você será submetido a todas as botas que certamente compraria, se seu cartão de crédito já não estivesse sangrando. Até existe a opção \"ocultar anún- cio\", da qual faço uso dezenas de vezes por dia. Mas adianta alegar que os anún- cios estão sendo exibidos com uma fre- quência desesperadora? Óbvio que não. A tendência das botas para o próximo inverno continuará sendo postada até você se render. 0 algoritmo não desiste até que você morra em mais uma com- pra. Aproveite, adquirindo nas próximas 2 horas 14 minutos e 6 segundos. 0 frete é grátis. Sem falar em quando você comen- ta, perto do seu celular, que adoraria viajar para Porto Seguro. Na próxima vez que entrar no Instagram, pacotes turísti- cos, biquínis e passeios de banana boat farão fila na sua timeline. Submetido à propaganda nas re- des, o consumidor chega a ter saudade da velha propaganda na TV. Sou desse tempo e sempre considerei os intervalos da novela perfeitos para ir ao banheiro ou dar comida para o cachorro. Dá para di- zer que o consumidor podia escolher se seria atingido pela propaganda tradicio- nal. Nas redes, não. Os anúncios são en- fiados goela abaixo da gente. Cadastre- -se e ganhe 10% de desconto utilizando o cupom SOUIO. Seu desejo já foi uma ordem. Agora é um algoritmo. Referência: Zero Hora, 20 e 21 de maio de 2023 (adaptado).",
    "sourceImage": "/writing/insumos/2024-1-t4.jpg",
    "keyFacts": [
      "Seu desejo é um algoritmo"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2023-2-t1",
    "cycle": "2023/2",
    "number": "Tarefa 1",
    "title": "Alimentos integrais",
    "shortLabel": "2023/2 · T1",
    "genre": "texto de divulgação para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha na Anvisa e ficou responsável por escrever o texto de divulgação da nova norma de regulamentação dos rótulos dos produtos integrais para ser publicado no site da agência. Em seu texto, explique o que pode ser considerado integral e como essa norma pode auxiliar o consumidor na escolha e na comparação dos produtos.",
    "sourceKicker": "Insumo · prova 2023/2 · Tarefa 1",
    "sourceTitle": "Alimentos integrais",
    "sourceText": "Falante 1: Já está valendo a nova regra da Anvisa que define que, para ter o nome integral, pães, biscoitos e torradas precisam conter no mínimo trinta por cento de ingredientes desse tipo.\n\nFalante 2: Patrícia não brinca quando o assunto é alimentação. Em 2015, ela fez uma cirurgia bariátrica e hoje lê todos os rótulos para ter a certeza que leva pra casa produtos saudáveis.\n\nFalante 3: O bariátrico ele pode comer de tudo, desde que seja uma comida saudável e com qualidade. Portanto, então, a partir daí, eu comecei a buscar alimentos mais naturais, né, verificar o rótulo dos alimentos, ver a composição pra ver se aquilo que tinha na composição do alimento me faria mal ou não.\n\nFalante 2: Fernanda é policial, profissão que exige mente e corpo saudáveis. Para ela, as novas regras vêm facilitar a vida do consumidor.\n\nFalante 4: Às vezes eles falam que são integrais e aí quando você olha no rótulo atrás, eles não, eles usam outro tipo de farinha que não é integral. Nem sempre, a, o que tá, é, na, na embalagem da frente condiz com o que tá atrás.\n\nFalante 2: Arroz, aveia, centeio, milho e quinoa. Cereais que tornam um alimento integral. E para uniformizar a fabricação e garantir uma qualidade do produto, a Anvisa especificou a porcentagem aceitável. Além de exigir na composição trinta por cento de ingredientes naturais, a receita precisa ter uma quantia maior de componentes integrais do que refinados. Caso contrário, o termo integral não poderá ser usado na embalagem. Os fabricantes de pães e biscoitos integrais ganharam um ano de prazo para se adequar à resolução. Já o setor de massas alimentícias, por ter uma estrutura mais complexa, terá o dobro do tempo, vinte e quatro meses. Mas já é possível encontrar nas prateleiras produtos com a nova composição, tanto no conteúdo como no rótulo.\n\nFalante 5: Essa informação ela vem auxiliar o consumidor a melhorar a qualidade da sua, da sua alimentação, bem como facilitar, inclusive, a comparação entre os diferentes produtos.\n\nFalante 1: Já está valendo a nova regra da Anvisa que define que para ter o nome integral, pães, biscoitos e torradas precisam conter no mínimo trinta por cento de ingredientes desse tipo.\n\nFalante 2: Patrícia não brinca quando o assunto é alimentação. Em 2015, ela fez uma cirurgia bariátrica e hoje lê todos os rótulos para ter a certeza que leva pra casa produtos saudáveis.\n\nFalante 3: O bariátrico ele pode comer de tudo, desde que seja uma comida saudável e com qualidade. Portanto, então, a partir daí, eu comecei a buscar alimentos mais naturais, né, verificar o rótulo dos alimentos, ver a composição pra ver se aquilo que tinha na composição do alimento me faria mal ou não.\n\nFalante 2: Fernanda é policial, profissão que exige mente e corpo saudáveis. Para ela, as novas regras vêm facilitar a vida do consumidor.\n\nFalante 4: Às vezes eles falam que são integrais, e aí quando você olha no rótulo atrás, eles não, eles usam outro tipo de farinha que não é integral. Nem sempre, a, o que tá, é, na, na embalagem da frente condiz com o que tá atrás.\n\nFalante 2: Arroz, aveia, centeio, milho e quinoa. Cereais que tornam um alimento integral. E para uniformizar a fabricação e garantir uma qualidade do produto, a Anvisa especificou a porcentagem aceitável. Além de exigir na composição trinta por cento de ingredientes naturais, a receita precisa ter uma quantia maior de componentes integrais do que refinados. Caso contrário, o termo integral não poderá ser usado na embalagem. Os fabricantes de pães e biscoitos integrais ganharam um ano de prazo para se adequar à resolução. Já o setor de massas alimentícias, por ter uma estrutura mais complexa, terá o dobro do tempo, vinte e quatro meses. Mas já é possível encontrar nas prateleiras produtos com a nova composição, tanto no conteúdo como no rótulo.\n\nFalante 5: Essa informação ela vem auxiliar o consumidor a melhorar a qualidade da sua, da sua alimentação, bem como facilitar, inclusive, a comparação entre os diferentes produtos.",
    "keyFacts": [
      "Alimentos integrais"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de divulgação para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2023-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2023-2-t2",
    "cycle": "2023/2",
    "number": "Tarefa 2",
    "title": "O valor de uma boa soneca",
    "shortLabel": "2023/2 · T2",
    "genre": "e-mail à diretoria",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha na área de Gestão de Pessoas de uma empresa que está investindo no bem-estar de sua equipe. Convencido da importância do tema apresentado na reportagem da Rádio Senado, escreva um e-mail endereçado à diretoria da empresa para recomendar a criação de um espaço para a soneca. Com base nas informações do áudio, aponte os benefícios dessa prática e informe como ela deve ser realizada.",
    "sourceKicker": "Insumo · prova 2023/2 · Tarefa 2",
    "sourceTitle": "O valor de uma boa soneca",
    "sourceText": "Falante 1: [som de bipe] Dedo de Prosa, um tema de interesse do cidadão.\n\nFalante 2: Você já ouviu falar em sono bifásico? Um neurocientista inglês, no livro Por que Nós Dormimos, explica que o padrão de sono geneticamente programado para os seres humanos é o bifásico. Um longo período noturno e um curto período durante o dia.\n\nFalante 3: Curto período de sono durante o dia, isso mesmo. Nós estamos falando da sesta, mais conhecida como aquela sonequinha gostosa depois do almoço.\n\nFalante 2: Segundo o neurocientista, o sono bifásico não tem uma origem cultural, e sim biológica. Todos os humanos, qualquer que seja a cultura ou a localização geográfica, sofrem uma redução no seu estado de alerta no começo da tarde.\n\nFalante 3: Daí a importância da soneca da tarde. Mas não é qualquer soneca. O cientista diz que uma soneca ideal tem que ser depois do almoço, tem que ser curta e tem que ser no sofá. Esse cochilo e uma alimentação saudável são os ingredientes para uma vida longa, de acordo com o especialista.\n\nFalante 2: Mas você, que está ouvindo o Dedo de Prosa, pode estar pensando aí com seus botões: legal que uma sonequinha no começo da tarde é bem-vinda. Mas como vou falar isso para o meu chefe?\n\nFalante 3: Temos que concordar, não é mesmo? A maior parte das pessoas trabalha o dia inteiro, tem um horário de almoço corrido, dificilmente consegue parar pra fazer um descanso antes de voltar ao batente.\n\nFalante 2: Assim, sempre que possível, tirar um cochilo de no máximo trinta minutos faz um bem danado para o corpo, além de aumentar a produtividade e a capacidade de aprender coisas novas.\n\nFalante 3: Mas cuidado! Um estudo da Universidade de Harvard revela que sonecas com mais de trinta minutos podem estar ligadas a um risco vinte e três por cento maior de obesidade.\n\nFalante 2: É, pessoas que exageram no descanso após o almoço, indo inclusive pra cama, têm risco de desenvolver pressão alta e de ter alteração no cortisol, o hormônio que está associado ao estresse. Portanto, se você conseguir incorporar a sesta à sua rotina, nada de soneca longa.\n\nFalante 1: [som de bipe] Dedo de Prosa. Um tema de interesse do cidadão.\n\nFalante 2: Você já ouviu falar em sono bifásico? Um neurocientista inglês, no livro Por que Nós Dormimos, explica que o padrão de sono geneticamente programado para os seres humanos é o bifásico. Um longo período noturno e um curto período durante o dia.\n\nFalante 3: Curto período de sono durante o dia, isso mesmo. Nós estamos falando da sesta, mais conhecida como aquela sonequinha gostosa depois do almoço.\n\nFalante 2: Segundo o neurocientista, o sono bifásico não tem uma origem cultural, e sim biológica. Todos os humanos, qualquer que seja a cultura ou a localização geográfica, sofrem uma redução no seu estado de alerta no começo da tarde.\n\nFalante 3: Daí a importância da soneca da tarde. Mas não é qualquer soneca. O cientista diz que uma soneca ideal tem que ser depois do almoço, tem que ser curta e tem que ser no sofá. Esse cochilo e uma alimentação saudável são os ingredientes para uma vida longa, de acordo com o especialista.\n\nFalante 2: Mas você, que está ouvindo o Dedo de Prosa, pode estar pensando aí com seus botões: legal que uma sonequinha no começo da tarde é bem-vinda. Mas como vou falar isso para o meu chefe?\n\nFalante 3: Temos que concordar, não é mesmo? A maior parte das pessoas trabalha o dia inteiro, tem um horário de almoço corrido, dificilmente consegue parar pra fazer um descanso antes de voltar ao batente.\n\nFalante 2: Assim, sempre que possível, tirar um cochilo de no máximo trinta minutos faz um bem danado para o corpo, além de aumentar a produtividade e a capacidade de aprender coisas novas.\n\nFalante 3: Mas cuidado! Um estudo da Universidade de Harvard revela que sonecas com mais de trinta minutos podem estar ligadas a um risco vinte e três por cento maior de obesidade.\n\nFalante 2: É, pessoas que exageram no descanso após o almoço, indo inclusive pra cama, têm risco de desenvolver pressão alta e de ter alteração no cortisol, o hormônio que está associado ao estresse. Portanto, se você conseguir incorporar a sesta à sua rotina, nada de soneca longa.",
    "keyFacts": [
      "na reportagem da Rádio Senado"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail à diretoria",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2023-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2023-1-t1",
    "cycle": "2023/1",
    "number": "Tarefa 1",
    "title": "Geladeiroteca",
    "shortLabel": "2023/1 · T1",
    "genre": "e-mail",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você faz parte da equipe que idealizou o projeto “Geladeiroteca” e quer expandir esta ação para outros bairros da sua cidade. Com base nas informações do vídeo, escreva um e-mail para a Secretaria Municipal de Cultura, apresentando o projeto e solicitando apoio financeiro para a sua ampliação.",
    "sourceKicker": "Insumo · prova 2023/1 · Tarefa 1",
    "sourceTitle": "Geladeiroteca",
    "sourceText": "Falante 1: [som de bipe] [música animada] [aplausos]\n\nFalante 2: Já virou rotina. Dona Dorcelina para os serviços de casa várias vezes por dia para atender a porta. O movimento tem um motivo colorido, que se destaca na região periférica do município de Várzea Grande. O novo visual passa longe da imagem de eletrodoméstico. Isso porque o congelador e as prateleiras deixaram o gelo de lado e deram espaço para diversas histórias.\n\nFalante 3: Amanheceu o dia, já tem menino na porta me chamando pra pegar livros. Sentam aí pra ler, me contam histórias e eu conto pra eles também, né. Sei da história de muitos, então é muito interessante. É o dia todo criança.\n\nFalante 4: Eu não achava que era biblioteca, mas é, era. Depois eles falaram que era biblioteca.\n\nFalante 2: Atender a demanda da comunidade do bairro de acesso à cultura motivou a família toda. O sonho de criar uma biblioteca era dos pais, mas só se tornou realidade com o apoio do filho Lázaro. Os livros foram recolhidos por meio de doações e aos poucos, a geladeiroteca virou a sensação da comunidade.\n\nFalante 5: A vizinhança, em primeiro momento, acharam estranho, né? Viu a gente mon- pintando a geladeira aí na frente, instalando ela, ficaram sem saber mesmo o que que era, né.\n\nFalante 6: Na mesma medida que a gente sentia carência de, de, de saúde, de segurança, a gente sentia uma carência também de educação, de, de uma carência de realmente de ter acesso à cultura, né.\n\nFalante 2: Para quem gosta de atacar a geladeira, essa aí não tem contraindicação. O conteúdo dela não engorda e ainda sacia a fome de conhecimento. Eduardo, de apenas cinco anos, ainda não sabe ler, mas já é cliente da biblioteca do bairro. Você já tinha visto uma geladeira virar uma biblioteca com tanto livro assim?\n\nFalante 7: Não.\n\nFalante 2: O que que você achou dessa geladeira?\n\nFalante 7: Bacana.\n\nFalante 2: A Biblioteca Livre tem livros de vários gêneros, que vão desde os clássicos da literatura brasileira até best-sellers que fazem sucesso entre jovens e adultos. Obras que despertam o gosto pela leitura e abrem caminhos para novos leitores.",
    "keyFacts": [
      "do vídeo",
      "escreva um e-mail para a Secretaria Municipal de Cultura",
      "apresentando o projeto",
      "solicitando apoio financeiro para a sua ampliação"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2023-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2023-1-t2",
    "cycle": "2023/1",
    "number": "Tarefa 2",
    "title": "Mulher e futebol",
    "shortLabel": "2023/1 · T2",
    "genre": "coluna de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você mantém um site para divulgar temas relacionados ao empoderamento feminino. Com o objetivo de incentivar meninas a praticarem esportes comumente associados ao universo masculino, escreva a coluna semanal contando a história de Liliane Mesquita e mostrando como ela foi fonte de inspiração para outras meninas.",
    "sourceKicker": "Insumo · prova 2023/1 · Tarefa 2",
    "sourceTitle": "Mulher e futebol",
    "sourceText": "Falante 1: [som de bipe] Liliane Mesquita escreveu um livro chamado Poesia no Futebol. Ela é escritora e pedagoga e ela ressalta a importância do esporte mais popular do Brasil, que é o futebol, ser um pouco mais ex-- inclusivo. E aí que ele se torna uma pauta feminina, por isso que a gente tá conversando hoje. Tudo bom, Liliane?\n\nFalante 2: Olá, tudo bem, Ana.\n\nFalante 1: Liliane, você é apaixonada por futebol ou você é mais apaixonada por poesia?\n\nFalante 2: Olha, aí são duas paixões muito grandes, né? Porque desde pequena eu gosto muito de poesias, tanto de escrever e ler, também, né, bem como de jogar futebol e assistir futebol. É uma paixão desde criança, tanto a poesia quanto o futebol. E era uma época que foi uma barreira muito grande, o, o futebol como algo assim, símbolo de virilidade. Logo, mulheres não podiam. Então, sempre eu era jogada pra escanteio, né, aproveitando até o, o jargão aí do futebol, pra não participar da atividade. Então eu sempre ficava chateada, até que eu consegui um jeito de começar a participar, jogando mesmo que com os meninos. Então, isso lá nos anos oitenta, ainda era visto com muito estranhamento, né. Hoje a gente vê até o futebol feminino crescendo e diminuindo, né, ainda há muito que se caminhar, rompendo um pouco com essa barreira do preconceito, mas naquela época causou muito espanto. Até que outras meninas começaram a ver que era legal e eu entrei, eu falei assim: \"Não, e eu sou atacante\". Era pior ainda, né?\n\nFalante 1: [risos]\n\nFalante 2: Eles acharam que-- [risos] E eu ainda fiz gol. [risos]\n\nFalante 1: Nossa, eles deviam ficar com muita raiva, né?\n\nFalante 2: Muita raiva.\n\nFalante 1: [risos]\n\nFalante 2: Então, a partir disso, as meninas: \"Poxa, então eu também posso estar ali. Eu não sou-- eu não preciso só jogar queimado ou uma coisa, é, mais delicada, né? Assim, onde, que não tenha contato físico, como por exemplo, o vôlei, que não tem tanto contato físico, eu posso jogar\". E nisso, outras meninas passaram a jogar conosco e até que quando eu cheguei na oitava série, teve um campeonato que as mães participaram.\n\nFalante 1: Olha, que legal.\n\nFalante 2: Então, eu fiquei assim, numa alegria tão grande, porque eu assistia e eu queria estar ali. Porque no-- mesmo que eu, eu não fizesse gol, que eu jogasse mal, era onde eu queria estar: esporte é vida, saúde. Nós, como mulheres, temos o direito, sim, de estar ali jogando. E eu queria mesmo um time feminino, pra mostrar que as mulheres podem, são capazes, mas só tinha menino, então vamo com os meninos mesmo. E foi aos poucos, outras se sentindo inspiradas e levadas pelo esporte também a essa prática.",
    "keyFacts": [
      "Mulher e futebol"
    ],
    "mustDo": [
      "escrever no gênero pedido: coluna de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2023-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2023-1-t3",
    "cycle": "2023/1",
    "number": "Tarefa 3",
    "title": "Ciência cidadã",
    "shortLabel": "2023/1 · T3",
    "genre": "texto de divulgação/convite",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é membro da equipe coordenada pelo biólogo Christofoletti e ficou responsável pelo recrutamento de novos voluntários para a pesquisa. Escreva o texto de introdução ao formulário de recrutamento que será divulgado nas redes sociais. Em seu texto, apresente as características do projeto e convide as pessoas a participarem, destacando os benefícios dessa abordagem colaborativa.",
    "sourceKicker": "Insumo · prova 2023/1 · Tarefa 3",
    "sourceTitle": "Ciência cidadã",
    "sourceText": "PESSOAS SEM EXPERIÊNCIA ACADÊMICA COLABORAM NA COLETA DE DADOS DE PROJETOS DE PESQUISA E NA PRODUÇÃO DE CONHECIMENTO Rodrigo de Oliveira Andrade ILUSTRAÇÕES Ing Lee n EM PARCERIA COM O O biólogo Ronaldo Christofoletti não estava acostumado a dar entrevista em frente a câmeras de T V, mas isso foi an- tes de ele convidar moradores da Baixada Santista, no litoral paulista, para serem seus parceiros de pesquisa. \"A imprensa local queria entender o que estávamos fa- zendo e como era possível indivíduos sem experiência em trabalhos 'de campo pro- duzirem conhecimento científico\", conta o docente do Instituto do Mar da Univer- sidade Federal de São Paulo (Unifesp). Em 2019, ele e sua equipe recrutaram 51 pessoas para ajudar em um mapeamento da distribuição de espécies marinhas em costões rochosos. O grupo era bastante diverso: alunos de graduação, profissio- nais com formação em geografia e biolo- gia, professores primários, aposentados, técnicos ambientais, engenheiros e jor- nalistas, que se cadastraram como volun- tários pela internet. Munidos de quadrí- pequenos quadrados de metal culas — usados para isolar e medir o tamanho de plantas e animais no solo —, formulários e máquinas fotográficas, eles percorriam diferentes pontos da ilha Urubuqueçaba, próxima à orla da praia, em Santos, ano- tando os organismos que encontravam pelo caminho. Os dados eram entregues depois aos responsáveis pela pesquisa, que os comparavam com registros de cientis- tas profissionais para aValiar a precisão dos resultados dos participantes. O projeto coordenado por Christo- foletti busca estudar e fomentar um mo- vimento conhecido como ciência cidadã, que tem como objetivo envolver indiví- duos sem experiência científica na pro- dução de conhecimento e criar metodolo- gias que permitam essa interação. Um dos principais benefícios da co- laboração da sociedade em pesquisas é a produção de informações que talvez não pudessem ser geradas de outra maneira, em parte porque as iniciativas da ciência cidadã têm potencial para mobilizar vo- luntários na coleta de grandes volumes de dados durante longos períodos e em áreas extensas. O envolvimento de pes- soas não especializadas também pode inspirar novas abordagens, permitindo que os cientistas investiguem questões ou problemas específicos da realidade dos participantes, produzindo resulta- dos com impactos diretos ou imediatos na vida deles. Essa abordagem ajudaria, inclusive, a aprimorar o processo de ava- liação de artigos científicos em algumas áreas. Essa forma de interação tem ain- da outras ambições. Em muitos casos, as iniciativas se dão no sentido de promo- ver o letramento científico e formar fu- turos pesquisadores. No estudo em questão, Christofolet- ti e sua equipe promoveram oficinas pre- paratórias, desenhadas para orientar os participantes sobre aspectos do monito- ramento de espécie em costões rochosos e estimular sua consciência ambiental. \"No início, pedimos para que eles compartilhassem suas expectativas em relação à nossa proposta e destacassem suas habilidades e conhecimentos que poderiam ser úteis, explica o biólogo. Em seguida, os voluntários aprendiam como a ciência é feita e qual sua relação com a cidadania e tomada de decisão. \"Só então eles entravam em contato com o protoco- 10 de monitoramento e iam a campo\", diz Christofoletti. A capacitação, segundo ele, teve um impacto positivo no desem- penho dos colaboradores, que produzi- ram dados com qualidade equivalente aos de especialistas. Disponível em: https://revistapesquisa. fapesp.br/o-publico-a-servico-da- ciencia (adaptado).",
    "sourceImage": "/writing/insumos/2023-1-t3.jpg",
    "keyFacts": [
      "as características do projeto",
      "convide as pessoas a participarem",
      "destacando os benefícios dessa abordagem colaborativa"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de divulgação/convite",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2023-1-t4",
    "cycle": "2023/1",
    "number": "Tarefa 4",
    "title": "Chat GPT e IA",
    "shortLabel": "2023/1 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é professor e está preocupado com o uso de ferramentas semelhantes às apresentadas no texto. Escreva uma carta do leitor para ser publicada na mesma revista, retomando o debate, apontando os pontos polêmicos do uso da ferramenta e argumentando a favor de seu ponto de vista sobre o tema.",
    "sourceKicker": "Insumo · prova 2023/1 · Tarefa 4",
    "sourceTitle": "Chat GPT e IA",
    "sourceText": "CHAT GPT: Depois da onda de Inteligências Arti- ficiais (IA) capazes de criar imagens, retratos e reimaginações artísticas apenas com uma sugestão escrita, um novo experimento tem permitido fazer perguntas e obter respostas comple- xas apenas com um comando de tex- to — quase como uma Alexa que res- ponde em texto. Chamado de Chat GPT, a novidade é um chatbot com IA de \"Aprendizado por Reforço com Feedback Humano\", desenvolvida pela Open Al. Para responder as diferentes pergun- tas e simular uma conversa, a IA usa uma vasta quantidade de fontes de dados e textos e espera do usuário a confirmação de que fez o trabalho cor- reto. Assim, diferente das ferramentas tradicionais de buscas — como o Goo- gle —, o Chat GPT precisa que a inte- ração seja em forma de bate-papo. O objetivo, segundo seus criadores, é o de reproduzir cada vez mais os CONHEÇA A INTELIGÊNCIA ARTIFICIAL CAPAZ DE ESCREVER ARTIGOS, ROTEIROS E Ml..jslcAs Preparado para conversas complexas com os usuários, o robô inteligente da Open Al também é capaz de contar piadas, responder dúvidas gerais e dar conselhos sobre a vida humana modelos de interação humana. Os re- sultados das pesquisas são respostas concisas e adaptadas ao interesse de cada usuário. Sendo assim, quanto mais interação com humanos, mais o sistema deve saber trazer respostas que fazem sentido. É por isso que a página do Chat GPT incentiva o diálo- go com a máquina. De acordo com a empresa Open Al, para criar a IA, foi necessário treinar \"um modelo inicial usando um ajuste fino supervisionado\", em outras pala- vras, foram treinadores humanos de inteligência artificial que ensinaram o Chat GPT a conversar. Além de interagir com as pessoas e trazer respostas para perguntas, o sistema é capaz de criar músicas, ro- teiros, artigos e até poemas. Nas re- des sociais, têm viralizado casos de usuários que testaram o potencial de criação da ferramenta, como a possi- bilidade de criar uma \"peça para piano no estilo de Mozart\". Contudo, a própria Open Al admite que o sistema ainda pode ser impre- ciso em relação às informações que traz. Outro problema do Chat GPT é a confiabilidade: ele não revela a fonte de onde veio a informação e, por vezes, acaba misturando ficção com a realidade. É possível pedir que a inteligência arti- ficial crie redações com os últimos te- mas do Enem, por exemplo. Logo vale arriscar qualquer pedido e ir sugerin- do modificações. Tente um texto sim- ples para postar nas redes sociais ou um pequeno código de programação. Disponível em: https://exame.com/ tecnologia/chatgpt-conheca-a- inteligencia-artificial-capaz-de-escrever- artigos-roteiros-e-musicas/ (adaptado).",
    "sourceImage": "/writing/insumos/2023-1-t4.jpg",
    "keyFacts": [
      "no texto"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2022-2-t1",
    "cycle": "2022/2",
    "number": "Tarefa 1",
    "title": "Brasilidade - Mandioca",
    "shortLabel": "2022/2 · T1",
    "genre": "postagem para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é responsável pelo site de uma Associação de Produtores Rurais. Com base no vídeo, elabore uma postagem a ser divulgada no site para promover a mandioca. Em seu texto, aborde a história da mandioca, os pratos que podem ser feitos a partir dela e sua importância para a cultura brasileira.",
    "sourceKicker": "Insumo · prova 2022/2 · Tarefa 1",
    "sourceTitle": "Brasilidade - Mandioca",
    "sourceText": "Falante 1: [som de bipe] [música animada] Quando eu lembro da massa da mandioca, mãe. Da massa. Quando eu lembro da massa da mandioca, mãe. Da massa. Quando eu lembro da massa da mandioca, mãe. Da massa. Quando eu lembro da massa da mandioca, mãe. Da massa.\n\nFalante 2: A mandioca é o único alimento que é nacional por excelência, que você produz, processa e consome em todo território nacional. É o que dá uma identidade. Eu falo que é, é, dá uma identidade pela nossa raiz. A rai-- Nossa raiz é a mandioca. [riso]\n\nFalante 3: Das grandes culturas que hoje nós temos sob cultivo no Brasil, cultivo agrônomico, econômico, de expressão, a mandioca é a única nativa do Brasil, né. E ela foi domesticada pelos índios que aqui viviam na região de transição entre o Cerrado e a Amazônia, né. E a partir dali, a mandioca se espalhou pelo Brasil inteiro. São diversos pratos dentro da nossa culinária, né, tradicional, diversas regiões do Brasil obtidos a partir de mandioca. Você tem o sagu, escondidinho com carne seca, pão de queijo dos mineiros, feito a partir do amido de mandioca. A tapioca, que tá tão em moda agora, é amido de mandioca também, né. Além da nossa grande mandioca de mesa, que é a mandioca cozida, consumida in natura, né.\n\nFalante 1: [música animada] Maria tá peneirando. Maria tá peneirando. Goma e massa de mandioca. Maria tá peneirando. Maria tá peneirando. Goma e massa de mandioca.\n\nFalante 2: A farinha de mandioca, ela é o primeiro alimento processado e o único alimento processado genuinamente brasileiro, né. Ela já era produzida dessa forma que é hoje pelos índios, sabe-se lá há quanto tempo antes dos colonizadores chegarem, né. E quando os colonizadores chegaram, tomaram conhecimento dessa farinha, é, isso, ah, eles começaram a comprar por antecipação. Eles chegavam aqui, iam pra Portugal e já deixavam a farinha do retorno da próxima viagem encomendada, porque chegou uma época que eram muitas expedições. Então, se eles não deixassem encomendada, corria o risco de chegar aqui e não ter a sua farinha pra voltar, garantir a alimentação da tripulação no retorno. Ela foi a primeira commodity brasileira. Era uma compra futura.\n\nFalante 1: [música animada] No quintal tem um pé de macaxeira. A macaxeira é popular, é macaxeira pra lim-- [som de bipe] [música animada] Quando eu lembro da massa da mandioca, mãe. Da massa. Quando eu lembro da massa da mandioca, mãe. Da massa. Quando eu lembro da massa da mandioca, mãe. Da massa. Quando eu lembro da massa da mandioca, mãe. Da massa.\n\nFalante 2: A mandioca é o único alimento que é nacional por excelência, que você produz, processa e consome em todo território nacional. É o que dá uma identidade. Eu falo que é, é, dá uma identidade pela nossa raiz. A rai-- Nossa raiz é a mandioca. [riso]\n\nFalante 3: Das grandes culturas que hoje nós temos sob cultivo no Brasil, cultivo agrônomico, econômico, de expressão, a mandioca é a única nativa do Brasil, né. E ela foi domesticada pelos índios que aqui viviam na região de transição entre o Cerrado e a Amazônia, né. E a partir dali, a mandioca se espalhou pelo Brasil inteiro. São diversos pratos dentro da nossa culinária, né, tradicional, diversas regiões do Brasil obtidos a partir de mandioca. Você tem o sagu, escondidinho com carne seca, pão de queijo dos mineiros, feito a partir do amido de mandioca. A tapioca, que tá tão em moda agora, é amido de mandioca também, né. Além da nossa grande mandioca de mesa, que é a mandioca cozida, consumida in natura, né.\n\nFalante 1: [música animada] Maria tá peneirando. Maria tá peneirando. Goma e massa de mandioca. Maria tá peneirando. Maria tá peneirando. Goma e massa de mandioca.\n\nFalante 2: A farinha de mandioca, ela é o primeiro alimento processado e o único alimento processado genuinamente brasileiro, né. Ela já era produzida dessa forma que é hoje pelos índios, sabe-se lá há quanto tempo antes dos colonizadores chegarem, né. E quando os colonizadores chegaram, tomaram conhecimento dessa farinha, é, isso, ah, eles começaram a comprar por antecipação. Eles chegavam aqui, iam pra Portugal e já deixavam a farinha do retorno da próxima viagem encomendada, porque chegou uma época que eram muitas expedições. Então, se eles não deixassem encomendada, corria o risco de chegar aqui e não ter a sua farinha pra voltar, garantir a alimentação da tripulação no retorno. Ela foi a primeira commodity brasileira. Era uma compra futura.\n\nFalante 1: [música animada] No quintal tem um pé de macaxeira. A macaxeira é popular, é macaxeira pra lim--",
    "keyFacts": [
      "a história da mandioca",
      "os pratos que podem ser feitos a partir dela",
      "sua importância para a cultura brasileira"
    ],
    "mustDo": [
      "escrever no gênero pedido: postagem para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2022-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2022-2-t2",
    "cycle": "2022/2",
    "number": "Tarefa 2",
    "title": "Paraíso na Terra",
    "shortLabel": "2022/2 · T2",
    "genre": "panfleto",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha em uma agência de viagens de Brasília. Escreva um panfleto para divulgar o “Paraíso na Terra” aos clientes da agência, apresentando os principais atrativos do local e incentivando-os a passarem o dia lá.",
    "sourceKicker": "Insumo · prova 2022/2 · Tarefa 2",
    "sourceTitle": "Paraíso na Terra",
    "sourceText": "Falante 1: Olá, bom dia, Bruno. Bom dia, Carol. Bom dia a todos. Bem, minha dica de hoje é o paraíso na Terra. É um refúgio natural em Brazlândia, que tem até um templo de meditação. Bem, olha, esse nome eu juro que faz jus ao nome. Sem dúvida, um dos lugares mais lindos do Distrito Federal. É uma reserva ecológica que fica a 60 quilômetros do centro de Brasília e combina a estrutura de um hotel fazenda com ambientes de meditação e eventos. A paisagem é cinematográfica. São vinte e oito cachoeiras catalogadas. A gente não conhece todas, né, mas boa parte delas a gente conhece percorrendo uma trilha de oito quilômetros. A trilha é de dificuldade média, mas eu vou dizer: tem amigo meu sedentário que eu levei e conseguiu fazer. É lógico que no dia seguinte vai ficar dolorido, mas vale a pena. E ao longo dela você pode se banhar em várias piscinas naturais. Então assim, quem não tiver disposição pra percorrer os oito quilômetros, fica na primeira, na segunda cachoeira. Quem tem dificuldade de locomoção, tá com criança, não tem problema, tem como aproveitar do mesmo jeito. Eu conheci esse espaço em 2012 e desde então eu vou lá pelo menos uma vez a cada três meses. Pra você ter uma ideia, assim, é um espaço em Brasília que une paz, trilha, contato com a natureza e paisagens deslumbrantes sem ir muito longe. É aquele destino mesmo pra recarregar as baterias, sair de corpo e alma lavada. Algumas cachoeiras merecem destaque. Tem a dos namorados, que é uma com duas quedas da água que se juntam num poço delicioso pra banho e fica logo no começo da trilha. Tem também a Cachoeira da Rainha, que tem um poço maior, com uma prainha de pré-- de pedra, onde dá pra estender a toalha, pegar um sol e no mesmo espaço a gente tem uma piscina de borda infinita, uma piscina natural de borda infinita, com uma vista espetacular da reserva, com dezenas daqueles morrinhos verdes. Realmente é pra você entrar nessa piscina e ficar admirando a paisagem um tempão. Bem, eu recomendo fazer essa trilha pela manhã, porque você curte bastante, volta pra almoçar e pode até dormir nas redes que ficam em frente ao refeitório. Pode aproveitar a parte da tarde pra visitar as hortas orgânicas, o pomar, os iglus, que têm uma acústica bem interessante e depois ir no templo de meditação. Funciona de terça a domingo, das nove da manhã até às cinco horas da tarde. Pra passar o dia lá, o visitante paga noventa e cinco reais. O almoço tá incluído, assim como a visitação guiada às cachoeiras e trilhas ecológicas. Então fica aí a minha dica pra quem procura um lugar com tranquilidade em meio à natureza pra aproveitar esse cerrado. Olá, bom dia, Bruno. Bom dia, Carol. Bom dia a todos. Bem, minha dica de hoje é o paraíso na Terra. É um refúgio natural em Brazlândia, que tem até um templo de meditação. Bem, olha, esse nome eu juro que faz jus ao nome. Sem dúvida, um dos lugares mais lindos do Distrito Federal. É uma reserva ecológica que fica a 60 quilômetros do centro de Brasília e combina a estrutura de um hotel fazenda com ambientes de meditação e eventos. A paisagem é cinematográfica. São vinte e oito cachoeiras catalogadas. A gente não conhece todas, né, mas boa parte delas a gente conhece percorrendo uma trilha de oito quilômetros. A trilha é de dificuldade média, mas eu vou dizer: tem amigo meu sedentário que eu levei e conseguiu fazer. É lógico que no dia seguinte vai ficar dolorido, mas vale a pena. E ao longo dela você pode se banhar em várias piscinas naturais. Então assim, quem não tiver disposição pra percorrer os oito quilômetros, fica na primeira, na segunda cachoeira. Quem tem dificuldade de locomoção, tá com criança, não tem problema, tem como aproveitar do mesmo jeito. Eu conheci esse espaço em 2012 e desde então eu vou lá pelo menos uma vez a cada três meses. Pra você ter uma ideia, assim, é um espaço em Brasília que une paz, trilha, contato com a natureza e paisagens deslumbrantes sem ir muito longe. É aquele destino mesmo pra recarregar as baterias, sair de corpo e alma lavada. Algumas cachoeiras merecem destaque. Tem a dos namorados, que é uma com duas quedas da água que se juntam num poço delicioso pra banho e fica logo no começo da trilha. Tem também a Cachoeira da Rainha, que tem um poço maior, com uma prainha de pré-- de pedra, onde dá pra estender a toalha, pegar um sol e no mesmo espaço a gente tem uma piscina de borda infinita, uma piscina natural de borda infinita, com uma vista espetacular da reserva, com dezenas daqueles morrinhos verdes. Realmente é pra você entrar nessa piscina e ficar admirando a paisagem um tempão. Bem, eu recomendo fazer essa trilha pela manhã, porque você curte bastante, volta pra almoçar e pode até dormir nas redes que ficam em frente ao refeitório. Pode aproveitar a parte da tarde pra visitar as hortas orgânicas, o pomar, os iglus, que têm uma acústica bem interessante e depois ir no templo de meditação. Funciona de terça a domingo, das nove da manhã até às cinco horas da tarde. Pra passar o dia lá, o visitante paga noventa e cinco reais. O almoço tá incluído, assim como a visitação guiada às cachoeiras e trilhas ecológicas. Então fica aí a minha dica pra quem procura um lugar com tranquilidade em meio à natureza pra aproveitar esse cerrado.",
    "keyFacts": [
      "os principais atrativos do local",
      "incentivando-os a passarem o dia lá"
    ],
    "mustDo": [
      "escrever no gênero pedido: panfleto",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2022-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2022-2-t3",
    "cycle": "2022/2",
    "number": "Tarefa 3",
    "title": "Boneca Indígena",
    "shortLabel": "2022/2 · T3",
    "genre": "e-mail à diretoria",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é Diretor de Marketing de uma loja de brinquedos. Com base na reportagem sobre as bonecas We’e’ena Tikuna, elabore um e-mail à diretoria de vendas sugerindo a inclusão das bonecas indígenas no catálogo de produtos da loja. Em seu texto, apresente as características das bonecas, o que elas representam, e as vantagens que elas podem trazer para a imagem da empresa.",
    "sourceKicker": "Insumo · prova 2022/2 · Tarefa 3",
    "sourceTitle": "Boneca Indígena",
    "sourceText": "Indígena cria linha de bonecas para promover HISTORIA DO POVO TIKUNA Por Victor Lacerda / Edição: Lenne Ferreira / Imagem: Divulgação/Brasil Eco Fashion Week A empresária relata ainda que \"Até nas visitas que fazia nas escolas, quando pa- ramentada com minhas roupas tradicio- nais, as crianças fugiam, choravam e eu não conseguia compreender as reações. Depois entendi que aquilo era resultado da associação da figura passada pelos livros, uma visão que coloca o indígena Linguagem lúdica para reconstruir a história não contada nos livros e repre- sentar a pluralidade de códigos culturais dos povos indígenas. Esses foram os fa- tores que motivaram a ativista, designer e empresária We'e'ena Tikuna a criar uma linha de bonecas em homenagem à sua aldeia de origem, a Umariaçu, no Amazonas, território da nação Tikuna. Com produção de três a cinco dias, os grafismos, o algodão cru e a fibra vegetal retirada do pé de Tururi - espécie local e milenar - são os materiais que dão vida às pequenas. Em entrevista para a Alma Pre- ta Jornalismo, We'e'ena, que na língua Tikuna significa \"a onça que nada para o outro lado do rio\", conta que o desejo de criar as miniaturas surgiu após um convi- te feito em 2019 para desfilar outros pro- dutos da sua marca no Brasil Eco Fashion Week. Dona da primeira marca de moda contemporânea projetada inteiramente por uma indígena, sem intermediários, We'e'ena conta que seu intuito sempre foi informar sobre a sua origem através das suas expressões artísticas. Com as miniaturas não foi diferente. \"Desde o princípio, trabalhei com grafismos sagra- dos do meu povo, com estamparia colori- da e com materiais que representassem o nosso dia a dia. A intenção sempre foi reafirmar que o consumidor não estava ali levando apenas uma boneca de pano, mas, sim, uma história, que vai contra o preconceito e o não conhecimento da verdadeira história do meu povo\". A preocupação em educar as novas gerações por meio dos brinquedos aces- sa um lugar íntimo da memória da ideali- zadora. \"Foi uma situação difícil quando ainda era jovem. Tive que repetir o cole- gial várias vezes por não entender o por- tuguês. Até os 12 anos, só tinha contato com a língua Tikuna, minha língua-mãe. Isso foi motivo de preconceito na escola\". como alguém que flecha, que mata e que assusta. Um retrato errado de quem so- mos\". We'e'ena traz uma pluralidade de modelos de bonecas em miniatura com seu próprio nome, mas com roupas e for- mas diferentes. A ideia central é não re- produzir o que já existe no mercado, nem na representação do povo de sua origem, nem na estética como um todo. \"As bo- necas We'e'ena Tikuna também chegam como forma de representar o corpo real, sem cintura fina, sem traços lidos como padrões da sociedade. Quis trazer com elas o que é ser nativa e as possibilidades que um corpo brasileiro pode ter. Tudo para gerar identificação e exercitar um olhar de amor a quem somos desde pe- quenos. Uma tentativa de exercício que fala, também, sobre aceitação\", explica. Mais informações podem ser encontradas no Instagram da marca. Disponível em: <http://pinacoteca.org.br/progmmacao/ enciclopedia-negra/>. 26 jun. 2021 (adaptado).",
    "sourceImage": "/writing/insumos/2022-2-t3.jpg",
    "keyFacts": [
      "as características das bonecas",
      "o que elas representam",
      "as vantagens que elas podem trazer para a imagem da empresa"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail à diretoria",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2022-2-t4",
    "cycle": "2022/2",
    "number": "Tarefa 4",
    "title": "O fantasma da varíola",
    "shortLabel": "2022/2 · T4",
    "genre": "mensagem ao autor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como cidadão consciente, e após a leitura do artigo, escreva uma mensagem para o autor a ser divulgada em seu site. Em seu texto, posicione-se sobre a destruição dos estoques do vírus da varíola, defendendo seu ponto de vista.",
    "sourceKicker": "Insumo · prova 2022/2 · Tarefa 4",
    "sourceTitle": "O fantasma da varíola",
    "sourceText": "O FANTASMA DA VARÍOLA Amostras do vírus permaneceram armazenadas em dois laboratórios Por Redação O vírus da varíola conviveu com a humanidade por milênios. Teria surgi- do nos primeiros agrupamentos agrí- colas, no nordeste da África, há 10 mil anos. A múmia de Ramsés 59 —morto em 1.156 a.C.— trazia na pele as cicatri- zes das lesões características da varíola. Há evidências de que a doença já estava presente na China naquele tempo. Introduzido na Europa no tempo dos romanos, o vírus provocou epi- demias que coincidiram com os pri- meiros estágios da decadência do im- pério. A que se disseminou na época de Antonino teria provocado milhões de mortes. Altamente transmissível, a varíola ficou limitada à Euro-Ásia até o século 15, com taxas de mortalidade que chegavam a 90%. As Cruzadas levaram o vírus ao Oriente Médio, e os navegadores às Américas, ao Caribe e à África —por meio do tráfico de escravizados. A doen- ça chegou ao século 18 com índices de mortalidade que variavam de 20% a 60%. As crianças foram mais castigadas: 80% de mortalidade em Londres e 98% em Berlim. Então, em 1776, o inglês Edward Jenner imunizou um menino com uma preparação obtida por escari- ficação das lesões de varíola presentes numa vaca. Estava descoberta a primei- ra vacina com vírus atenuado, que, em dois séculos, erradicaria a doença. O último óbito aconteceu em 1978, na cidade de Birmingham, no Reino Unido. A fotógrafa médica Janet Parker adquiriu a infecção no labora- tório da faculdade em que trabalhava, e faleceu um mês mais tarde. Em 1980, a OMS declarou extinta a doença. Ape- sar da erradicação, amostras do vírus permaneceram armazenadas em dois laboratórios de segurança máxima. Um deles, em Atlanta, no Centers for Disease Control; o outro, no laborató- rio Vector, em Novosibirsk, na Rússia. Há anos, os especialistas discu- tem a conveniência de destruir esses estoques. Os favoráveis argumentam que a preservação traz a possibilida- de de um acidente laboratorial ou de o vírus cair nas mãos de bioterroristas que o disseminariam em populações não imunizadas. Os contrários dizem que as pesquisas devem prosseguir porque não há como ter certeza abso- luta de que a doença jamais retornará. Muitos estão preocupados que o dege- 10 no Ártico traga à tona corpos com o vírus ainda viável. Se partículas virais foram isoladas em múmias egípcias mantidas à temperatura ambiente, a preocupação não seria descabida. Em pleno século 21, apesar de ainda existirem patrulhas de defen- sores de ideologias esdrúxulas con- trárias às vacinações, a vacina desen- volvida por Jenner é considerada a descoberta de maior impacto na his- tória da saúde pública mundial. Em 20 anos, evitou centenas de milhões de mortes, o sofrimento que as prece- de, as desfigurações da face e da alma dos sobreviventes. Disponível em: VARELLA, Drauzio. O fantasma da varíola. Disponível em: http://drauziovarella.uol.combr/drauzio/artigos/o -fantasma- da-vañola-artigo/. Acesso em 13 jun.20211 (adaptado).",
    "sourceImage": "/writing/insumos/2022-2-t4.jpg",
    "keyFacts": [
      "O fantasma da varíola"
    ],
    "mustDo": [
      "escrever no gênero pedido: mensagem ao autor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2021-1-t1",
    "cycle": "2021/1",
    "number": "Tarefa 1",
    "title": "Como montar uma mala",
    "shortLabel": "2021/1 · T1",
    "genre": "e-mail aos clientes",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é um agente de viagens que fechou um pacote de turismo para um grupo de clientes e decidiu alertá-los sobre as regras de bagagem no Brasil. Com base no vídeo, escreva um e-mail, destacando as dimensões e o peso das malas e oferecendo instruções práticas para seus clientes prepararem as bagagens.",
    "sourceKicker": "Insumo · prova 2021/1 · Tarefa 1",
    "sourceTitle": "Como montar uma mala",
    "sourceText": "Falante 1: [som de bipe] Olá, meu nome é Carol Rosa e eu tô aqui a convite da Azul pra informar pra vocês as novas regras da bagagem de mão. Vocês sabiam que a bagagem de mão agora ela deve conter as seguintes medidas: cinquenta e cinco centímetros de altura, trinta e cinco centímetros de largura e vinte e cinco centímetros de profundidade? Não podendo esquecer que o máximo do peso são dez quilos. E eu tô aqui pra dar uma dica pra vocês de como montar uma bagagem de mão pra um casal passar um final de semana. Vem comigo conferir?\n\nFalante 2: [música country]\n\nFalante 1: Bom, eu vou começar dando uma dica pra vocês de uma viagem pra um final de semana, um casal, e levando apenas uma bagagem de mão. Gente, isso é superimportante, o menos possível é o melhor. Primeira dica que eu quero dar pra vocês: pensem no local onde vocês vão e o tipo de roupa que vocês vão utilizar, tá? Se vai tá calor, vai tá frio, terá um evento ou não terá. Então aqui a gente já sabe o nosso tipo de viagem, vai ser uma meia estação. E eu vou levar pra um casal que vai passar um final de semana, uma bermuda, uma calça jeans, uma bermuda, uma calça jeans, pra cada um, tá? Por que que eu escolhi o jeans? Porque é uma peça coringa, é uma peça chave que dá pra você usar com diversas roupas por cima. Então, eu vou colocar primeiro embaixo da minha mala as peças mais pesadas, no caso a jeans. Eu vou deixar a minha perna do lado de fora, porque eu quero deixar ela bem esticada e aproveitar o espaço. Sempre ocupando todos os espaços da mala. Isso é superimportante. Cada cantinho. Tô indo por ordem de peso, vocês tão reparando, né? E agora venho com as minhas camisetas. Eu vou levar um cardigan e uma camisa social, uma camisa mais quentinha. Vou colocar aqui as pernas pra travar bem a minha mala. E agora, eu fiz uma necessaire com as peças íntimas, os chinelos, porque a gente já tá calçado dos sapatos que vamos usar no final de semana e uma necessaire com os itens de higiene. Vou travar aqui a minha mala. Ainda sobrou espaço. Tá vendo como dá pra fazer uma mala prum final de semana pra um casal, uma mala de mão.\n\nFalante 2: [música country]",
    "keyFacts": [
      "as dimensões",
      "o peso das malas",
      "oferecendo instruções práticas para seus clientes prepararem as bagagens"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail aos clientes",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2021-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2021-1-t2",
    "cycle": "2021/1",
    "number": "Tarefa 2",
    "title": "Trabalho voluntário",
    "shortLabel": "2021/1 · T2",
    "genre": "carta-convite aos vizinhos",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Na condição de presidente da Associação de Moradores do seu bairro, escreva uma carta aos seus vizinhos para convidá-los a se tornarem voluntários. Com base no áudio, apresente a situação do voluntariado no Brasil e informe sobre as possibilidades de atividades voluntárias.",
    "sourceKicker": "Insumo · prova 2021/1 · Tarefa 2",
    "sourceTitle": "Trabalho voluntário",
    "sourceText": "Falante 1: [som de bipe] [vinheta] Minuto IBGE.\n\nFalante 2: Levar um vizinho idoso a uma consulta médica, ajudar um amigo a fazer o imposto de renda, participar de iniciativas de uma ONG. Você sabe o que essas atividades têm em comum? Todas são consideradas trabalho voluntário. A moradora de Belém do Pará, Valneide Pedrini, por exemplo, atua no Instituto Alachaster. Ela faz hortas comunitárias em escolas e instituições da cidade. Trabalhar em um projeto socioambiental mudou a vida da paraense de cinquenta e cinco anos. Como ela conta:\n\nFalante 3: Esse voluntariado, eleee realmente ele fez uma diferença na minha vida. Trabalho, assim, muito, muito enriquecedor. E eu sinto que eu faço diferença agora nesse mundo. Tô muito satisfeita por isso.\n\nFalante 2: Segundo o IBGE, 7,4 milhões de pessoas trabalham como voluntárias no Brasil. Proporcionalmente ao tamanho da população, o Pará reúne a maior parte delas. São quatrocentas e oito mil. As mulheres se voluntariam mais que os homens. As que têm ensino superior, como a Valneide, são maioria. Esses dados são da PNAD Contínua 2017. E você, já pensou em como aumentar essa estatística? Do Rio de Janeiro, Pedro Renault.\n\nFalante 1: [jingle] IBGE, informação para a cidadania.\n\nFalante 2: [som de bipe] [vinheta] Minuto IBGE. Levar um vizinho idoso a uma consulta médica, ajudar um amigo a fazer o imposto de renda, participar de iniciativas de uma ONG. Você sabe o que essas atividades têm em comum? Todas são consideradas trabalho voluntário. A moradora de Belém do Pará, Valneide Pedrini, por exemplo, atua no Instituto Alachaster. Ela faz hortas comunitárias em escolas e instituições da cidade. Trabalhar em um projeto socioambiental mudou a vida da paraense de cinquenta e cinco anos. Como ela conta:\n\nFalante 3: Esse voluntariado, eleee realmente ele fez uma diferença na minha vida. Trabalho, assim, muito, muito enriquecedor. E eu sinto que eu faço diferença agora nesse mundo. Tô muito satisfeita por isso.\n\nFalante 2: Segundo o IBGE, 7,4 milhões de pessoas trabalham como voluntárias no Brasil. Proporcionalmente ao tamanho da população, o Pará reúne a maior parte delas. São quatrocentas e oito mil. As mulheres se voluntariam mais que os homens. As que têm ensino superior, como a Valneide, são maioria. Esses dados são da PNAD Contínua 2017. E você, já pensou em como aumentar essa estatística? Do Rio de Janeiro, Pedro Renault.\n\nFalante 1: [jingle] IBGE, informação para a cidadania.",
    "keyFacts": [
      "a situação do voluntariado no Brasil",
      "informe sobre as possibilidades de atividades voluntárias"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta-convite aos vizinhos",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2021-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2021-1-t3",
    "cycle": "2021/1",
    "number": "Tarefa 3",
    "title": "Enciclopédia Negra",
    "shortLabel": "2021/1 · T3",
    "genre": "requerimento",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é professor e, ao ler a apresentação da exposição Enciclopédia Negra, decide enviar um requerimento à direção da escola, solicitando que seja organizada uma excursão ao museu Pinacoteca de São Paulo. Em seu texto, apresente as características da exposição, destacando sua relevância para a formação dos alunos.",
    "sourceKicker": "Insumo · prova 2021/1 · Tarefa 3",
    "sourceTitle": "Enciclopédia Negra",
    "sourceText": "ENCICLOPÉDIA NECRA A Pinacoteca de São Paulo inaugu- ra exposição Enciclopédia negra. Pela primeira vez, a exposição torna públi- ca as 103 obras realizadas por artis- tas contemporâneos para um livro ho- mônimo de autoria dos pesquisadores Flávio Gomes e Lilia M. Schwarcz e do artista Jaime Lauriano, publicado em março de 2021 pela Companhia das Letras. A mostra é um desdobramen- to da publicação e também se conecta com a nova apresentação da coleção do museu que se apoia em questiona- mentos contemporâneos e reverbera narrativas mais inclusivas e diversas. No livro, estão reunidas as bio- grafias de mais de 550 personali- dades negras, em 416 verbetes in- dividuais e coletivos. Muitos desses personagens tiveram as suas ima- gens e histórias de vida apagadas ou nunca registradas. Para interromper essa invisibilidade, 36 artistas con- temporâneos foram convidados a produzir retratos dos biografados. A exposição Enciclopédia negra apresenta todos os 103 trabalhos inéditos, sendo que alguns deles já fizeram parte do caderno de imagens do livro. As obras especialmente pro- duzidas para o projeto foram doadas ao museu pelos artistas e integrarão a coleção da Pinacoteca de São Paulo, criando uma importante intervenção no que diz respeito à busca por maior representatividade. Diferente da organização alfabética da publicação, a mostra está dividida em 6 núcleos temáticos: Rebeldes; Per- sonagens atlânticos; Protagonistas negras; Artes e ofícios; Projetos de liberdade; e Religiosidades e ances- tralidades. Esses núcleos misturam biografias de tempos históricos diver- sos, nas quais ressaltam aspectos em comum. Há registros de quem liderou movimentos de resistência; negociou condições de emprego e de vida; das mulheres que tiveram de ser separadas Exposição Enciclopédia negra Período: De 01.05 a 08.11 Ingressos com horário marcado Edifício Pina Luz Praça da Luz 2, São Paulo, SP. Livro: Enciclopédia negra, de Flávio Go- mes, Jaime Lauriano e Lilia M. Schwarcz OBS: o livro também será vendido na loja do museu. de seus filhos; das que, com seu traba- lho, conseguiram comprar as alforrias; dos mestres curandeiros, dos professo- res, advogados, artistas, entre outros. SINERGIA COM A COLEÇÃO Além dos n úcleos temáticos, Enciclo- pédia negra se integra à nova apresenta- ção da coleção da Pinacoteca. O visitante poderá conferir 10 obras em cartaz na exposição Pinacoteca: Acervo que dialo- gam com as questões abordadas na mos- tra temporária. Isso ocorre em obras de nomes como Arthur Timóteo da Costa e Heitor dos Prazeres, fundamentais para o repertório da Enciclopédia. Revisar narrativas consolidadas na história social e institucional, no que se refere à representatividade de gênero e raça, tem sido uma das princi- pais missões da Pinacoteca atualmen- te. Na nova apresentação do acervo, por exemplo, o número de obras de ar- tistas negros mais do que triplicou se comparado com a exposição anterior. Antes eram 7 e agora são 26. A chegada da Enciclopédia negra gera um grande aporte nesse processo, que passará de 26 para 129 obras. Disponível em: <http://pinacoteca.org.br/pmgmmacao/ enciclopedia-negra/>. em: 26 jun. 2021 (adaptado).",
    "sourceImage": "/writing/insumos/2021-1-t3.jpg",
    "keyFacts": [
      "da exposição Enciclopédia Negra",
      "decide enviar um requerimento à direção da escola",
      "solicitando que seja organizada uma excursão ao museu Pinacoteca de São Paulo"
    ],
    "mustDo": [
      "escrever no gênero pedido: requerimento",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2021-1-t4",
    "cycle": "2021/1",
    "number": "Tarefa 4",
    "title": "Testes em animais",
    "shortLabel": "2021/1 · T4",
    "genre": "carta aberta",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é um ativista engajado na luta em favor dos animais. Com base na leitura da reportagem, escreva uma carta aberta a ser divulgada nas redes sociais, chamando a população para o debate. Em seu texto, apresente argumentos éticos e científicos em defesa dos animais.",
    "sourceKicker": "Insumo · prova 2021/1 · Tarefa 4",
    "sourceTitle": "Testes em animais",
    "sourceText": "TESTES EM ANIMAIS Por Redação Em 18 de outubro de 2013, o Insti- tuto Royal em São Roque (SP), que rea- lizava testes científicos em animais, foi invadido por cerca de 40 ativistas que libertaram cães da raça beagle e alguns coelhos. Menos de um mês depois, o local foi novamente invadido e, dessa vez, ca- mundongos foram retirados. O instituto encerrou suas atividades, e o episódio reascendeu a discussão do uso de ani- mais em testes científicos. O principal objetivo dos testes em animais é encontrar soluções para o tra- tamento efetivo ou preventivo de deter- minadas doenças. No entanto, a situação gera um conflito ético, ponto central da polêmica que divide os ativistas e os cien- tistas: os testes ajudam a prevenir e salvar seres humanos, mas, em alguns a casos, expõem os animais ao sofrimento, sub- metendo-os a procedimentos dolorosos que podem levar até a morte. Será essa a única forma de testar remédios, produtos químicos e cosméticos para humanos? As respostas sobre o tema dividem até mes- mo os cientistas. Para os ativistas do direito animal, os testes com animais, além de submeterem os bichos ao sofrimento, não trazem re- sultados precisos. Um caso famoso é o da talidomida, remédio vendido para grávi- das que causou a deformação de fetos em várias mulheres nos anos 1950. Era usado como sedativo para aliviar as náuseas das mulheres grávidas. Em todo o mundo, es- tima-se que entre 10 mil e 20 mil bebês nasceram sem pedaços dos braços ou per- nas, ou com as mãos ou pés diretamente colados ao tronco. O remédio foi testado antes em animais. Por outro lado, não faltam exemplos bem-sucedidos. Louis Pasteur (1827- 1895) foi um dos que mais contribuiu para a validação de métodos científicos Cães da raça beagle são retirados por manifestantes de laboratório do Instituto Royal com testes em animais; Carlos Chagas (1878-1934) fez experiências com saguis e insetos em seus estudos sobre a malária e na descoberta da doença de Chagas; a vacina contra a poliomielite foi descober- ta por Albert Sabin (1906-1993) após tes- tes feitos em dezenas de macacos. Os debates éticos sobre o uso de ani- mais em testes ganharam força a partir da década de 1970, quando as primeiras comissões de ética para tratar do tema foram criadas. Um pouco antes, em 1959, dois cientistas ingleses tornaram-se pio- neiros em alertar para as condições e os tratamentos dados aos animais em tes- tes científicos e de cosméticos. William Russel e Rex Burch criaram os \"3 Rs da experimentação animal\": redução, refi- namento e replacement (em português, substituição). A ideia da dupla era redu- zir ao máximo o número de testes, ame- nizar a dor e substituir os animais sem- pre que possível. O uso de animais para testes de cos- méticos também incomoda ativistas, e os cientistas também acreditam que tal pro- cedimento não seja mais necessário. Na União Europeia, tanto a realização desses testes quanto a venda de qualquer produ- to que tenha sido testado em um animal são proibidos. Esse tipo de teste também é proibido em países como Israel e Índia. No lugar de animais, para testes de cosméticos, os especialistas recomendam uso de tecido humano descartado em ci- rurgias plásticas. Para testes científicos, uma alternativa para evitar o uso de ani- mais seria substituí-los por células-tronco que, reproduzindo determinados órgãos, podem apresentar resultados muito mais próximos da realidade para os homens. Pesquisadores ainda sugerem que testes com animais poderiam ser subs- tituídos por simulações computacionais e bioinformática, tecnologia de DNA re- combinante e nanotecnologia. No entan- to, cada uma dessas possibilidades exige novos investimentos públicos e dos gran- des laboratórios. Disponível em: https://vestibular.uol.com.br/resumo-das- disciplinas/atualidades/teste-em-animais-a-etica-na-ciencia-e-os- testes-em-animais.htm Acesso em: 10/06/2021 (adaptado).",
    "sourceImage": "/writing/insumos/2021-1-t4.jpg",
    "keyFacts": [
      "argumentos éticos",
      "científicos em defesa dos animais"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aberta",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2020-1-t1",
    "cycle": "2020/1",
    "number": "Tarefa 1",
    "title": "PRATODOMUNDO",
    "shortLabel": "2020/1 · T1",
    "genre": "relatório",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é estudante, e após uma visita da sua escola à exposição PRATODOMUNDO, o professor solicitou uma tarefa. Com base no vídeo, redija um relatório, a ser apresentado à comunidade escolar, sobre a exposição e a importância da temática na cultura alimentar da sociedade.",
    "sourceKicker": "Insumo · prova 2020/1 · Tarefa 1",
    "sourceTitle": "PRATODOMUNDO",
    "sourceText": "Falante 1: [bipe] Como será o cardápio da população mundial daqui a trinta anos? E como a gente vai conseguir alimentar tanta gente? As respostas estão numa exposição no lindo Museu do Amanhã, aqui no Rio de Janeiro.\n\nFalante 2: Quanto mais gente no mundo, maior o tamanho da fome. E também a necessidade de terra pra plantar e de água pra irrigar. Se a alimentação for carnívora, os impactos sobre o meio ambiente são ainda maiores. A população do planeta continua crescendo, já somos mais de sete bilhões e meio de pessoas e as projeções da ONU são de que em 2050 chegaremos a dez bilhões de pessoas. A pergunta fundamental é: haverá alimentação saudável e nutritiva pra essa gente toda? Porque tem que ser para todos, tem que ser pra todo mundo. A gente veio buscar as respostas aqui no Museu do Amanhã, no Rio de Janeiro. Vamo conferir? O desafio é gigantesco. Se não houver mudanças no cardápio, teremos que aumentar em sessenta por cento a produção de alimentos. A exposição é interativa. Você clica na geladeira os alimentos que mais gosta e ela responde.\n\nFalante 3: Tomate, batata, alface, melancia, maçã.\n\nFalante 2: E qual foi o resultado da conversa com a geladeira?\n\nFalante 3: Deu que eu tô me alimentando bem.\n\nFalante 2: Cê gostou do resultado?\n\nFalante 3: Gostei. [risada]\n\nFalante 2: Entre imagens holográficas e outros brinquedinhos tecnológicos, a fome de conhecimento desafia o visitante.\n\nFalante 4: Na questão dos agrotóxicos, bastante interessante, porque a gente acha que só lavando já elimina, mas a gente aprendeu que tem uma diferença. Tem o que tá na casca e tem o que tá dentro da seiva da-- então a gente não tá totalmente livre disso, entendeu?\n\nFalante 2: Dá até pra copiar receitas sustentáveis no celular, como formiga crocante ou nhoque verde.\n\nFalante 5: Tem várias opções que pra mim era bem diferente, que eu nunca vi e que tem ali, tem até receita indicando como fazer, como comer.\n\nFalante 2: Dá pra encarar?\n\nFalante 5: Vamo tentar. [risada]\n\nFalante 2: Quem não pode acompanhar com os olhos, sente com as mãos. É hora da refeição.\n\nFalante 6: Hambúrguer.\n\nFalante 7: Eu não gosto.\n\nFalante 1: Eu quero.\n\nFalante 7: Eu gosto, eu gosto.\n\nFalante 6: Muito bem. E formiguinha?\n\nFalante 7: Eu não, eu não, eu não.\n\nFalante 6: Não?\n\nFalante 2: A mesa revela receitas originais com direito a insetos nutritivos.\n\nFalante 8: Claro que a gente não vai ficar comendo grilo in natura, pegando no jardim, mas eles vão ser processados pra fazer parte de massas de pães, de macarrão, e tudo isso vai tornar esses alimentos, que são ultraprocessados, mais nutritivos. É isso que a gente precisa pro futuro, uma alimentação com sustentabilidade, com nutrição e com menos desigualdade no campo.",
    "keyFacts": [
      "à comunidade escolar",
      "sobre a exposição",
      "a importância da temática na cultura alimentar da sociedade"
    ],
    "mustDo": [
      "escrever no gênero pedido: relatório",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2020-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2020-1-t2",
    "cycle": "2020/1",
    "number": "Tarefa 2",
    "title": "Fake news",
    "shortLabel": "2020/1 · T2",
    "genre": "e-mail aos funcionários",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Na condição de gerente de recursos humanos de uma empresa, você percebeu que notícias falsas vêm sendo compartilhadas por colegas de trabalho. Escreva, com base nas informações do áudio, um e-mail para os funcionários a fim de instruí-los sobre como identificar e evitar a propagação de fake news.",
    "sourceKicker": "Insumo · prova 2020/1 · Tarefa 2",
    "sourceTitle": "Fake news",
    "sourceText": "Falante 1: [som de bip] Bom dia, boa tarde, boa noite. Meu nome é Luciano Pires e este é o seu cafezinho. [som de xícaras] Período de eleições, as fake news, notícias falsas, se transformaram em epidemia. Para reconhecê-las, você tem de verificar se essas notícias estão fundamentadas, escandalizadas e espalhadas. Fundamentadas. Existe algum fundamento, alguma lógica nelas? É o que eu chamo de fenômeno do Saci-Pererê. A gente sabe que não existe, mas sempre tem alguém que conhece alguém que diz que viu. Fragmentos de verdade aqui e ali, construções que aparentam ter lógica e colocam você em dúvida. É isso que basta, plantar a semente da dúvida. \"Pô, meu, se essa informação tem alguma lógica, deve ser verdade. Eu vou compartilhar\". Em seguida, escandalizadas. As fake news têm manchetes escandalosas, com apelo à emoção, chocantes. Manchetes assim desarmam o nosso senso crítico, aguçam a curiosidade e fazem com que saiamos buscando por mais informações, acessando mais posts e dando mais audiência pra elas. E aí vem o: espalhadas. Você começa a ver a notícia por todos os lados, nas mídias sociais, no WhatsApp, enviado pela tia, no e-mail recebido de um amigo. E assim tem a impressão de que todo mundo tá falando naquilo. E pra não ficar de fora, então você fala também, compartilhando e ajudando a aumentar a impressão de que aquele é um tema dominante, logo, verdadeiro. Cê entendeu, hein? Notícias impactantes, com alguma lógica e espalhadas por todos os canais, têm grande potencial para serem fake news. O que fazer? Primeiro: não compartilhe. Quebre a corrente. Segundo: coloque a manchete no Google acompanhada do termo \"boato\" e veja no que dá. Terceiro: devolva a mensagem pra quem enviou, apontando a fonte que mostra que aquilo não é verdade. Fake news são como ervas daninhas, não se combate apenas aparando. Tem de arrancar pela raiz. [som de xícaras] [som de bip] Bom dia, boa tarde, boa noite. Meu nome é Luciano Pires e este é o seu cafezinho. [som de xícaras] Período de eleições, as fake news, notícias falsas, se transformaram em epidemia. Para reconhecê-las, você tem de verificar se essas notícias estão fundamentadas, escandalizadas e espalhadas. Fundamentadas. Existe algum fundamento, alguma lógica nelas? É o que eu chamo de fenômeno do Saci-Pererê. A gente sabe que não existe, mas sempre tem alguém que conhece alguém que diz que viu. Fragmentos de verdade aqui e ali, construções que aparentam ter lógica e colocam você em dúvida. É isso que basta, plantar a semente da dúvida. \"Pô, meu, se essa informação tem alguma lógica, deve ser verdade. Eu vou compartilhar\". Em seguida, escandalizadas. As fake news têm manchetes escandalosas, com apelo à emoção, chocantes. Manchetes assim desarmam o nosso senso crítico, aguçam a curiosidade e fazem com que saiamos buscando por mais informações, acessando mais posts e dando mais audiência pra elas. E aí vem o: espalhadas. Você começa a ver a notícia por todos os lados, nas mídias sociais, no WhatsApp, enviado pela tia, no e-mail recebido de um amigo. E assim tem a impressão de que todo mundo tá falando naquilo. E pra não ficar de fora, então você fala também, compartilhando e ajudando a aumentar a impressão de que aquele é um tema dominante, logo, verdadeiro. Cê entendeu, hein? Notícias impactantes, com alguma lógica e espalhadas por todos os canais, têm grande potencial para serem fake news. O que fazer? Primeiro: não compartilhe. Quebre a corrente. Segundo: coloque a manchete no Google acompanhada do termo \"boato\" e veja no que dá. Terceiro: devolva a mensagem pra quem enviou, apontando a fonte que mostra que aquilo não é verdade. Fake news são como ervas daninhas, não se combate apenas aparando. Tem de arrancar pela raiz. [som de xícaras]",
    "keyFacts": [
      "do áudio",
      "um e-mail para os funcionários a fim de instruí-los sobre como identificar",
      "evitar a propagação de fake news"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail aos funcionários",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2020-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2020-1-t3",
    "cycle": "2020/1",
    "number": "Tarefa 3",
    "title": "Feira de trocas",
    "shortLabel": "2020/1 · T3",
    "genre": "carta aos moradores",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Ao ler a reportagem “Feira de trocas e o incentivo ao consumo consciente”, você decidiu organizar uma feira de trocas na sua localidade, tendo a aprovação da Associação de Moradores do seu bairro. Escreva uma carta aos moradores para divulgar o evento, apresentando a feira, suas vantagens, e as possibilidades de participação.",
    "sourceKicker": "Insumo · prova 2020/1 · Tarefa 3",
    "sourceTitle": "Feira de trocas",
    "sourceText": "FEIRA DE TROCAS e o incentivo ao consumo consciente Você com certeza já deve ter ouvido falar nas feiras de trocas solidá- rias. Estas feiras são espaços que têm o intuito de organizar as trocas de pro- dutos, serviços e conhecimentos para o desenvolvimento das comunidades locais em regiões mais pobres que não são favorecidas pelos atuais modelos de desenvolvimento econômico. O objetivo destas feiras de trocas é construir mercados com- plementares capazes de auxiliar na viabilização do comércio de bens de consumo gerados por pessoas ou grupos, além de facilitar o acesso das pessoas mais pobres ao consumo destes produtos e serviços que são gerados em sua região. Do ponto de vista econômico, a feira de trocas abre espaço para que as pessoas, ao mesmo tempo produ- tores e consumidores, encontrem uma alternativa para o desemprego, além de terem a oportunidade de desenvolverem suas habilidades empreendedoras que poderão ser usadas posteriormente. Com um ambiente de coope- ração, onde normalmente o \"paga- mento\" é feito exclusivamente por meio de trocas, as feiras são espaços propícios para se criar uma cultura de consumo consciente, integrado e sustentável na comunidade local, o que leva os indivíduos a repensa- rem sobre as consequências que o consumo desenfreado pode causar no meio social, ambiental e econômico. Os benefícios gerados através destas iniciativas são imensuráveis, pois o resultado pode ser visto não somente na redução e reedu- cação das pessoas com relação ao consumo consciente, mas também no nível psicológico de cada um, ao verem que o seu trabalho artesanal (quadros, bijuterias, roupas) e seus objetos usados são úteis para outros, sentindo-se realizados e estimu- lados com o que podem oferecer e receber em troca. As feiras de trocas contribuem para o fortalecimento das relações comunitárias, pois nestes espaços as pessoas são convidadas a ajudar na Feira de troca em Brasília-DF. Foto: vilamundo.org.br organização e a fazerem críticas e sugestões para melhoria dos serviços, bem como para a pulverização de ati- vidades pedagógicas ligadas a temas como ecologia e preservação do meio ambiente, consumo consciente mudança dos hábitos negativos, edu- cação alimentar, economia solidária e empreendedorismo popular, entre outros temas relevantes. Por Redação Pesamento Verde (adaptado) Disponível em : https://www.pensamentoverde.com.br/ sustentabilidade/feira-trocas-incentivo-consumo-consciente/ Acesso em: 1 jul. 2019 (adaptado).",
    "sourceImage": "/writing/insumos/2020-1-t3.jpg",
    "keyFacts": [
      "suas vantagens",
      "as possibilidades de participação"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aos moradores",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2020-1-t4",
    "cycle": "2020/1",
    "number": "Tarefa 4",
    "title": "Smartphones e aprendizagem",
    "shortLabel": "2020/1 · T4",
    "genre": "informativo aos pais",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ler o artigo “Smartphones colocam em risco saúde mental de crianças a partir dos 2 anos”, na condição de professor, escreva um informativo a ser enviado aos pais. Seu texto deve chamar a atenção para os resultados do estudo e para a necessidade de uma supervisão no uso de smartphones por crianças.",
    "sourceKicker": "Insumo · prova 2020/1 · Tarefa 4",
    "sourceTitle": "Smartphones e aprendizagem",
    "sourceText": "SMARTPHONES COLOCAM EM msco SAÚDE MENTAL DE CRIANÇAS A PARTIR DOS 2 ANOS Um novo estudo mostrou que crianças que usam dispositivos digitais por muito tempo têm menor estabilidade emocional e são mais impacientes. Crianças de apenas dois anos que passam muito tempo em frente a smartphones, tablets e computadores já correm maior risco de problemas de saúde mental, como ansiedade e depressão. De acordo com um estudo publicado recentemente no periódico científico Preventive Medicine Reports, uma hora por dia em frente a esses dis- positivos já é o suficiente para afetar o comportamento das crianças, incluindo redução no autocontrole, na estabili- dade emocional e na curiosidade. No novo estudo, pesquisadores da Universidade de San Diego e da Universidade da Georgia, ambas nos Estados Unidos, analisaram dados de 40.000 crianças americanas com idade entre 2 e 17 anos. Elas partici- param de uma pesquisa nacional de saúde realizada em 2016 que continha informações sobre dados médicos, questões emocionais, de desenvol- vimento, comportamento e hábitos, como o uso diário de mídias digitais. Os resultados mostraram que os ado- lescentes que passam mais de sete horas por dia em frente às telas eram duas vezes mais propensos a serem diagnos- ticados com ansiedade ou depressão do que aqueles que passavam uma hora por dia. O uso moderado de telas, correspon- dente a cerca de quatro horas por dia, também estava mais associado a uma redução no bem-estar psicológico do que o uso de uma hora por dia. Crianças em idade pré-escolar (até cinco anos) que usam esses acessó- rios com frequência correm o dobro do risco de se tornarem impacientes. Elas também têm mais dificuldade de se acalmarem depois de ficarem muito empolgadas com alguma coisa, em comparação com as crianças que passam menos tempo em frente a esses dispositivos. Os pesquisadores concluíram também que 9% dos participantes com idade entre 11 e 13 anos que passavam uma hora por dia mexendo no celular tendiam a perder a curio- sidade por aprender coisas novas. A taxa subiu para 22,6% entre os ado- lescentes que passam pelo menos sete horas por dia em frente às telas. Entre os jovens de 14 a 17 anos, 42,2% dos participantes cujo tempo de tela excedia sete horas diárias não concluíam tarefas, como dever de casa ou atividades domésticas. Por outro lado, esse número caiu para 27,7% quando o uso era de quatro horas e 16,6% quando o tempo foi limitado a uma hora por dia. Limite Diante desses resultados, os autores alertam para a necessidade de limitar em duas horas por dia o uso de tablets, smartphones e com- putadores para todas as crianças e adolescentes em idade escolar. Estar conectado à Internet por muito tempo interfere em comportamentos fun- damentais para a vida em sociedade. Eles se tornam menos rebeldes (o que pode ser um fator importante para o desenvolvimento da personalidade), mais resignados, mais infelizes e menos preparados para a vida adulta. Em crianças pequenas, o uso constante desses dispositivos pode afetar desenvolvimento do cérebro, que está mais suscetível a interferên- cias externas. Saúde física De acordo com o Instituto Nacional de Saúde, nos Estados Unidos, os jovens geralmente gastam uma média de cinco a sete horas por dia no celular. Esse hábito aumenta o risco de seden- tarismo, e consequentemente, a proba- bilidade de obesidade, doenças cardio- vasculares e diabetes. Para reduzir os riscos, a Associação Americana do Coração recomenda que os pais limitem o tempo de uso desses dispositivos para que as crianças possam aproveitar o tempo livre para praticar brincadeiras mais saudáveis. Outros especialistas ainda aconse- lham que os adultos evitem utilizar os aparelhos perto das crianças e deem mais atenção a elas quando estiverem juntos. Isso porque as crianças agem de acordo com o que veem em casa. \"Quando você está com seus filhos, é preciso desligar o telefone ou tablet e conversar com eles, se engajar, porque eles captam exatamente o que você está fazendo\", disse a cardiologista Tara Narula. Por Da Redação (adaptado) Di spo nível em: https://vejaabril.com.br/saude/smartphones- colocam-em-risco•sa ude-mental-d e -criancas-a -partir- dos-2-anos/ Acesso em: 31 jul. 2019 (adaptado).",
    "sourceImage": "/writing/insumos/2020-1-t4.jpg",
    "keyFacts": [
      "Smartphones e aprendizagem"
    ],
    "mustDo": [
      "escrever no gênero pedido: informativo aos pais",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2019-2-t1",
    "cycle": "2019/2",
    "number": "Tarefa 1",
    "title": "Línguas indígenas",
    "shortLabel": "2019/2 · T1",
    "genre": "matéria para site da escola",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Na condição de professor(a), você assistiu ao vídeo sobre a comemoração do ano internacional das línguas indígenas e resolveu escrever uma matéria para publicação no site da escola. Seu texto, além de informar sobre a comemoração, deverá abordar a situação das línguas indígenas no Brasil e apresentar as iniciativas que têm sido propostas para preservá-las.",
    "sourceKicker": "Insumo · prova 2019/2 · Tarefa 1",
    "sourceTitle": "Línguas indígenas",
    "sourceText": "Falante 1: [bipe] A Unesco escolheu 2019 como o Ano Internacional das Línguas Indígenas. Quase quinhentas mil pessoas se comunicam por idiomas regionalizados no Brasil, mas a tendência é que eles desapareçam em cinquenta anos.\n\nFalante 2: Muito se engana quem pensa que o Brasil é um país de idioma único. Além da língua portuguesa, ainda resistem cento e setenta das mais de mil línguas indígenas que existiam aqui antes da colonização.\n\nFalante 3: Sujeito da frase é uma-\n\nFalante 2: Trabalhos como o do grupo Indiomas, liderado pelo professor Vilmar da Rocha D'Angelis, ajudam nessa preservação. Nos últimos dez anos, pesquisadores vêm atuando no registro de idiomas com etnias de várias regiões do país, na formação de educadores dentro das aldeias e em universidades, além de colaborar na produção de materiais didáticos para os povos indígenas. Por considerar a tecnologia uma ferramenta fundamental neste processo, o Indiomas também ajudou na criação do primeiro site do Brasil totalmente em língua indígena.\n\nFalante 3: Existe, é, a internet, os computadores que eles acessam hoje em boa parte das aldeias. Então, uma parte do trabalho hoje de fortalecimento das línguas se dá abrindo espaço pras línguas na internet.\n\nFalante 2: 2019 foi escolhido pela Unesco como Ano Internacional das Línguas Indígenas. E pra marcar a data, o grupo de estudos da Universidade Estadual de Campinas vai lançar alguns trabalhos importantes. Entre eles, um dicionário do Kaingang Paulista.\n\nFalante 3: Que é um dialeto que tá em, em franco desaparecimento, estava em franco desaparecimento, e hoje os professores tão se, é, retomando e trabalhando na escola e precisavam de uma ferramenta.\n\nFalante 2: A população indígena do país conta hoje com cerca de novecentos mil representantes, mas menos da metade está apta a usar os idiomas indígenas. Sem iniciativas como a do professor Vilmar, a estimativa de que essas línguas desapareçam em cinquenta ou cem anos, pode se confirmar. Perder esse legado é enfraquecer a diversidade do país de que os brasileiros tanto se orgulham.\n\nFalante 3: E os povos indígenas têm coisas pra nos informar, têm coisas pra nos contar sobre alternativas possíveis, sobre conhecimentos medicinais, sobre formas de, de lidar com as crianças.",
    "keyFacts": [
      "a situação das línguas indígenas no Brasil",
      "as iniciativas que têm sido propostas para preservá-las"
    ],
    "mustDo": [
      "escrever no gênero pedido: matéria para site da escola",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2019-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2019-2-t2",
    "cycle": "2019/2",
    "number": "Tarefa 2",
    "title": "Redes de apoio à amamentação",
    "shortLabel": "2019/2 · T2",
    "genre": "panfleto",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é membro de uma organização não governamental (ONG) que incentiva a amamentação. Com base no áudio, escreva um panfleto, a ser distribuído em postos de saúde, em maternidades e em outros locais públicos, explicando as vantagens da amamentação, o que são redes de apoio e qual sua importância.",
    "sourceKicker": "Insumo · prova 2019/2 · Tarefa 2",
    "sourceTitle": "Redes de apoio à amamentação",
    "sourceText": "Falante 1: Seis meses de aleitamento materno exclusivo e dois anos em conjunto com outros alimentos. Essa é a recomendação da Organização Mundial da Saúde, que assegura que o leite materno supre todas as necessidades nutricionais do bebê. Os benefícios são inúmeros e a pediatra Vanessa Macedo garante que eles vão muito além da primeira infância.\n\nFalante 2: Tem menores chances de infecções, de uma maneira geral, infecções gastrointestinais, diarreias, infecções das vias aéreas, como resfriados, bronquiolites, pneumonias. As crianças que foram amamentadas têm uma chance menor de apresentar essas infecções. E outros estudos têm mostrado que, a longo prazo, as crianças que foram amamentadas, na vida adulta, elas têm menor chance de obesidade, de hipertensão, de doenças crônicas, de alergias.\n\nFalante 1: Além de todas as vantagens para a saúde, o ato de amamentar cria um vínculo inigualável entre mãe e bebê. Mas para dar certo, a amamentação requer uma rede de apoio. Este é o tema central deste ano da campanha do Agosto Dourado, o mês de incentivo ao aleitamento materno, que envolve mais de cento e setenta países, como explicou o representante do Ministério da Saúde, Maximiliano Marques.\n\nFalante 3: Envolve o trabalho, envolve a sociedade, envolve a gente ter um ambiente acolhedor pra fazer a lactação do seu bebê, que envolva a possibilidade delas fazer a retirada do excesso de leite, armazenar num lugar pra dar depois. Que possa, inclusive, o pai ser envolvido nesse processo de lactação pra compartilhar o esforço, compartilhar a rotina. As mulheres precisam também dormir. E sem desmamar, né?\n\nFalante 1: No Senado, foi aprovada em março uma proposta que torna conduta ilícita constranger ou proibir uma mãe de amamentar em público, sujeito à multa. Para a senadora Rose de Freitas, do Podemos do Espírito Santo, mesmo que o estabelecimento possua um lugar destinado à amamentação, cabe à mulher a decisão de utilizá-lo ou não.\n\nFalante 4: Essas mulheres precisam publicamente serem respeitadas. Não é fazer um cantinho dentro da empresa e falar que ela leve o filho dela lá pro canto do depósito pra amamentar. Respeito. Respeito à vida, respeito às mulheres, respeito às crianças.\n\nFalante 1: A proposta aguarda votação na Câmara dos Deputados. Da Rádio Senado, Marcela Cunha. Seis meses de aleitamento materno exclusivo e dois anos em conjunto com outros alimentos. Essa é a recomendação da Organização Mundial da Saúde, que assegura que o leite materno supre todas as necessidades nutricionais do bebê. Os benefícios são inúmeros e a pediatra Vanessa Macedo garante que eles vão muito além da primeira infância.\n\nFalante 2: Tem menores chances de infecções, de uma maneira geral, infecções gastrointestinais, diarreias, infecções das vias aéreas, como resfriados, bronquiolites, pneumonias. As crianças que foram amamentadas têm uma chance menor de apresentar essas infecções. E outros estudos têm mostrado que, a longo prazo, as crianças que foram amamentadas, na vida adulta, elas têm menor chance de obesidade, de hipertensão, de doenças crônicas, de alergias.\n\nFalante 1: Além de todas as vantagens para a saúde, o ato de amamentar cria um vínculo inigualável entre mãe e bebê. Mas para dar certo, a amamentação requer uma rede de apoio. Este é o tema central deste ano da campanha do Agosto Dourado, o mês de incentivo ao aleitamento materno, que envolve mais de cento e setenta países, como explicou o representante do Ministério da Saúde, Maximiliano Marques.\n\nFalante 3: Envolve o trabalho, envolve a sociedade, envolve a gente ter um ambiente acolhedor pra fazer a lactação do seu bebê, que envolva a possibilidade delas fazer a retirada do excesso de leite, armazenar num lugar pra dar depois. Que possa, inclusive, o pai ser envolvido nesse processo de lactação pra compartilhar o esforço, compartilhar a rotina. As mulheres precisam também dormir. E sem desmamar, né?\n\nFalante 1: No Senado, foi aprovada em março uma proposta que torna conduta ilícita constranger ou proibir uma mãe de amamentar em público, sujeito à multa. Para a senadora Rose de Freitas, do Podemos do Espírito Santo, mesmo que o estabelecimento possua um lugar destinado à amamentação, cabe à mulher a decisão de utilizá-lo ou não.\n\nFalante 4: Essas mulheres precisam publicamente serem respeitadas. Não é fazer um cantinho dentro da empresa e falar que ela leve o filho dela lá pro canto do depósito pra amamentar. Respeito. Respeito à vida, respeito às mulheres, respeito às crianças.\n\nFalante 1: A proposta aguarda votação na Câmara dos Deputados. Da Rádio Senado, Marcela Cunha.",
    "keyFacts": [
      "as vantagens da amamentação",
      "o que são redes de apoio",
      "qual sua importância"
    ],
    "mustDo": [
      "escrever no gênero pedido: panfleto",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2019-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2019-2-t3",
    "cycle": "2019/2",
    "number": "Tarefa 3",
    "title": "Sustentabilidade",
    "shortLabel": "2019/2 · T3",
    "genre": "e-mail de pedido de apoio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é biólogo(a) e, após ler sobre o projeto de João Campos-Silva, decidiu propor um projeto semelhante em sua cidade. Escreva um e-mail para empresas privadas solicitando apoio financeiro. Em seu texto, destaque os pontos positivos do projeto que inspiraram você e apresente a sua proposta.",
    "sourceKicker": "Insumo · prova 2019/2 · Tarefa 3",
    "sourceTitle": "Sustentabilidade",
    "sourceText": "UM PROJETO PARA SALVAR O MAIOR PEIXE DA AMAZÔNIA Com um projeto de manejo susten- tável que protege o pirarucu, João Campos-Silva ganhou o prêmio de empreendedorismo da Rolex. O pirarucu é um dos maiores peixes de água doce do mundo e o maior do Brasil. Ele pode chegar a mais de dois metros de comprimento e pesar cerca de 200 quilos. Na Amazônia, é fonte de orgulho e de renda para comunidades ribeiri- nhas. Mas a pesca ilegal coloca a espécie e o sustento dessas pessoas em risco. Foi para ajudar a resolver esse pro- blema que o biólogo João Campos- Silva, 36 anos, desenvolveu um projeto que leva o manejo sustentável do peixe a regiões que ainda não são protegi- das. Em junho, Campos-Silva foi um dos cinco laureados com o prêmio de empreendedorismo da Rolex. Os ganhadores recebem cerca de R$ 780 mil para financiar seus projetos, além de ter acesso a uma rede formada por 140 premiados de edições ante- riores e participar de uma campanha publicitária internacional. Paulista, Campos-Silva se mudou para o Amazonas há II anos. A princípio, tra- balhava na área de conservação ambien- tal do governo do estado. Mas, aos poucos, decidiu que queria lidar com o problema de outra forma, levando em conta também as questões sociais. Por isso, acabou deixando o governo para se dedicar ao novo projeto. \"Percebi que o manejo do pirarucu era uma oportunidade de pensar um modelo conjunto de conservação e desenvolvimento local\", afirma. Para colocar suas ideias em prática, entrou em contato com associações regionais e comunidades rurais. Uma de suas principais ações foi a constru- ção de casas nos lagos que se conec- tam aos rios: ali, os moradores podiam se revezar semanalmente para vigiar as águas. A ideia é que essa vigilância diminua a presença de pescadores clandestinos. Depois de atuar no projeto durante três anos, os moradores podem pedir autorização para pescar o pirarucu durante um certo período do ano, quando a prática não atrapalha a reprodução. Cada comunidade tem uma cota determinada, para não afetar o ecossistema. Com os resulta- dos da pesca, eles podem se alimentar e garantir o sustento financeiro. Hoje, na região do rio Juruá, 40 comu- nidades participam do projeto, de maneira direta ou indireta. Segundo Campos-Silva, a população de pirarucu na região cresceu 425% na última década. \"Além disso, o manejo protege outras espécies ameaçadas de extinção, como peixe-boi, tartaruga-da-amazônia e jacaré-açu\", diz. No ano passado, o biólogo fundou uma ONG para tocar o projeto, o Instituto Juruá. Agora, quer populari- zar o consumo do pirarucu em outros estados, reforçando sua importância cultural. Dessa maneira, Campos-Silva espera aumentar a renda da população local, ao mesmo tempo que ajuda a preservar a espécie. Em agosto, o \"Gosto da Amazônia\", um dos projetos da ONG, levará o pirarucu para um evento no Rio. Quando se fala em projetos de impacto social, a visibilidade é um ativo impor- tante. \"Mais que um apoio financeiro, a premiação da Rolex funciona como uma chancela e uma forma de divulgar o trabalho no exterior\", diz Campos- Silva. \"É importante que esses projetos sejam conhecidos em escala global. Só assim podemos recuperar o otimismo coletivo e acreditar que é possível melhorar a realidade das pessoas.\" Disponível em: https://revistapegn.globo.com/ Banco-de-ideias/Agronegocios/amazonia.html. Imagem disponível em: https://www.giovanipapa. com/pescaria-de-pirarucu",
    "sourceImage": "/writing/insumos/2019-2-t3.jpg",
    "keyFacts": [
      "a sua proposta"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de pedido de apoio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2019-2-t4",
    "cycle": "2019/2",
    "number": "Tarefa 4",
    "title": "Caixinha de som",
    "shortLabel": "2019/2 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ler o texto Caixinha de som: hit e polêmica do verão, você decidiu escrever para a seção Cartas do Leitor do jornal Estadão, defendendo seu ponto de vista em relação às questões levantadas por Felipe Mortara.",
    "sourceKicker": "Insumo · prova 2019/2 · Tarefa 4",
    "sourceTitle": "Caixinha de som",
    "sourceText": "Caixinhas de som: hit e polêmica do verão praia. Embora pouca gente saiba da lei, várias caixas foram apreen- didas já neste verão. Em Balneário Camboriú (SC), as caixinhas têm causado queixas e reclamações na polícia, e vereadores da cidade estão se mobilizando para criar uma legis- lação própria. Conflito de gerações Como é tradição na minha vida, na última semana do ano estava na praia. Na companhia de gente querida encarei por vários dias as areias de Ipanema, do Leme e de Grumari, no Rio de Janeiro. Esperava ouvir as ondas, as gaivotas e os já famosos gritos de \"alô mate, alô Biscoito Globo!\". Mas acabei escu- tando algo um pouco diferente e, digamos, pouco natural e pouco condizente com aqueles ambientes. Música, muita música. As caixinhas de som bluetooth inva- diram de vez as praias e trouxeram mais animação para grupos de amigos e famílias. A tecnologia não é nenhuma novidade. Mas o que essa evolução trouxe nos últimos anos - e chegou a volumes exponenciais neste verão — é a liberdade de cada pessoa produzir uma pequena festa particular ao seu redor. Cabos, iPods e imensas caixas de som são coisa do passado e hoje basta um celular e um pequeno artefato que cabe na palma da mão para espalhar o prazer (ou o terror) auditivo ao redor. O problema é que cada guarda-sol ostenta seu ritmo, suas batidas e acaba tentando impor seu volume. Acho que a discussão sobre estilos pouco importa, gosto é gosto, faz parte da liberdade de cada um. Mas se, por um lado, a praia é pública - e, portanto, cada um tem o direito de se divertir como lhe der na telha -, por outro lado, até que ponto a liberdade de quem quer ouvir música fere a liberdade de quem não quer? Há cerca de 20 anos o município do Guarujá, no litoral sul de São Paulo, proibiu o uso de caixas de som na Existe algo geracional no uso das caixinhas. É o que acredita Marcelo Gonçalves, gerente de marketing e comunicação da Sony Brasil, um dos principais fabricantes do produto. \"Em geral, os millennials são o prin- cipal público desta categoria. Nossas pesquisas apontam que, a cada 100 pessoas que utilizam uma caixa de som portátil para ouvir música, 31 possuem até vinte anos e, 39, até trinta\", revela. André do Val conta que é importante manter uma distância razoável das outras pessoas e que som muito alto pode até mach ucar os tímpanos. Mas o que fazer quando se está numa situação incômoda? \"É essencial começar com uma conversa amigável e, na pior das hipóteses, se afastar um pouco\", sugere do Val. Esse é o principal mandamento. \"'Oi, será que poderia baixar o som?' Diga que está com criança. Peça sempre 'por favor', .com licença'. Não peça para desligar, mas para abaixar. Tudo é negociável\", conclui do Val. Disponível em: https://viagem.estadao.com. br/blogs/viagem/caixinhas-de-som-hit-e-po- lemica-do-verao/.",
    "sourceImage": "/writing/insumos/2019-2-t4.jpg",
    "keyFacts": [
      "Caixinha de som"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2019-1-t1",
    "cycle": "2019/1",
    "number": "Tarefa 1",
    "title": "História da Arte",
    "shortLabel": "2019/1 · T1",
    "genre": "texto de apresentação para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha na UFRGS e é o responsável por escrever a apresentação dos cursos para o site da universidade. Com base no vídeo que você assistiu, escreva a apresentação do curso de História da Arte, mencionando a história do curso, o que é estudado durante a graduação e as perspectivas de atuação profissional dos formados em História da Arte.",
    "sourceKicker": "Insumo · prova 2019/1 · Tarefa 1",
    "sourceTitle": "História da Arte",
    "sourceText": "Falante 1: [som de bipe] [trilha sonora] Desde os primórdios da civilização, o homem tem buscado criar e representar o mundo e suas vivências. De pinturas rupestres a estátuas gregas, de hieróglifos à Monalisa, até mesmo de Shakespeare a Harry Potter, a arte evolui e continua evoluindo com a civilização. E como a civilização, ela tem a sua história. E se a arte tem história, vale a pena ser estudada. Mais que isso, ela precisa ser estudada, porque estudando as artes, também estudamos a nós mesmos. E é isso que se propõem os alunos e professores do curso de História da Arte da UFRGS. Um curso no qual se aprende e se reflete sobre a importância da arte na nossa sociedade e no nosso desenvolvimento.\n\nFalante 2: A História da Arte é uma disciplina que estuda a produção artística ao longo da história. Ela estuda dentro do contexto sociocultural, econômico, político e também do próprio desenvolvimento da área das artes, na, das artes visuais e das artes plásticas. O curso surgiu em 2010, a partir de uma necessidade detectada no país inteiro. Na verdade, a área de História da Arte é uma área de longa tradição no Brasil, mas que não tinha formação específica, com exceção das áreas de pós-graduação.\n\nFalante 3: Nós tínhamos muitos alunos nas artes visuais que faziam o bacharelado ou a licenciatura em Artes Visuais pra chegar mais perto, sem contudo, poder estudar História da Arte.\n\nFalante 2: Com o projeto Reuni, do Governo Federal, foi pensado então vários cursos e dentro desse projeto surgiu a necessidade de criar os cursos de História da Arte. É uma disciplina muito ampla, que envolve muitos conhecimentos, que exige muita, hã, disponibilidade, interesse e principalmente paixão pela área.\n\nFalante 3: Apesar do curso ser, digamos, sediado, lotado né, no, no departamento de Artes Visuais, ele tem a colaboração de professores do departamento de música, de professores do departamento de arte dramática, de professores da história. É um curso que ele conversa com muitos outros departamentos dentro da universidade.\n\nFalante 1: O bacharelado em História da Arte da UFRGS forma profissionais com capacitação acadêmica e técnica, através da interação direta com as várias abordagens da arte, com destaque para as artes visuais, mas também envolvendo outras áreas, como a música e as artes dramáticas. Os alunos formados no curso são pesquisadores em história, teoria e crítica artística e podem atuar em museus, galerias, centros culturais, universidades e em diversos outros lugares. [som de bipe] [trilha sonora] Desde os primórdios da civilização, o homem tem buscado criar e representar o mundo e suas vivências. De pinturas rupestres a estátuas gregas, de hieróglifos à Monalisa, até mesmo de Shakespeare a Harry Potter, a arte evolui e continua evoluindo com a civilização. E como a civilização, ela tem a sua história. E se a arte tem história, vale a pena ser estudada. Mais que isso, ela precisa ser estudada, porque estudando as artes, também estudamos a nós mesmos. E é isso que se propõem os alunos e professores do curso de História da Arte da UFRGS. Um curso no qual se aprende e se reflete sobre a importância da arte na nossa sociedade e no nosso desenvolvimento.\n\nFalante 2: A História da Arte é uma disciplina que estuda a produção artística ao longo da história. Ela estuda dentro do contexto sociocultural, econômico, político e também do próprio desenvolvimento da área das artes, na, das artes visuais e das artes plásticas. O curso surgiu em 2010, a partir de uma necessidade detectada no país inteiro. Na verdade, a área de História da Arte é uma área de longa tradição no Brasil, mas que não tinha formação específica, com exceção das áreas de pós-graduação.\n\nFalante 3: Nós tínhamos muitos alunos nas artes visuais que faziam o bacharelado ou a licenciatura em Artes Visuais pra chegar mais perto, sem contudo, poder estudar História da Arte.\n\nFalante 2: Com o projeto Reuni, do Governo Federal, foi pensado então vários cursos e dentro desse projeto surgiu a necessidade de criar os cursos de História da Arte. É uma disciplina muito ampla, que envolve muitos conhecimentos, que exige muita, hã, disponibilidade, interesse e principalmente paixão pela área.\n\nFalante 3: Apesar do curso ser, digamos, sediado, lotado né, no, no departamento de Artes Visuais, ele tem a colaboração de professores do departamento de música, de professores do departamento de arte dramática, de professores da história. É um curso que ele conversa com muitos outros departamentos dentro da universidade.\n\nFalante 1: O bacharelado em História da Arte da UFRGS forma profissionais com capacitação acadêmica e técnica, através da interação direta com as várias abordagens da arte, com destaque para as artes visuais, mas também envolvendo outras áreas, como a música e as artes dramáticas. Os alunos formados no curso são pesquisadores em história, teoria e crítica artística e podem atuar em museus, galerias, centros culturais, universidades e em diversos outros lugares.",
    "keyFacts": [
      "dos cursos para o site da universidade"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de apresentação para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2019-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2019-1-t2",
    "cycle": "2019/1",
    "number": "Tarefa 2",
    "title": "Passeios virtuais",
    "shortLabel": "2019/1 · T2",
    "genre": "texto de divulgação para redes sociais",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é o funcionário do Jardim Botânico do Rio de Janeiro responsável pela divulgação do projeto Transformação Digital e Educação Ambiental nas redes sociais. Sendo assim, redija o texto que será divulgado na Internet sobre o lançamento do aplicativo que vai permitir a realização de passeios virtuais. Explique o que é essa tecnologia, apresente quais vantagens a nova ferramenta pode oferecer para os visitantes do Jardim Botânico e informe como o aplicativo será desenvolvido.",
    "sourceKicker": "Insumo · prova 2019/1 · Tarefa 2",
    "sourceTitle": "Passeios virtuais",
    "sourceText": "Falante 1: [som de bipe] Um projeto lançado nesta quinta-feira vai permitir aos visitantes do Jardim Botânico do Rio passeios por trilhas virtuais interativas, com realidade aumentada e geolocalização dos principais pontos do parque. A novidade será possível através do desenvolvimento de um aplicativo que deverá ficar pronto até junho do ano que vem. A iniciativa é resultado de uma parceria entre o Jardim Botânico, a Fundação Banco do Brasil e o Ministério do Meio Ambiente. O objetivo da inovação digital é permitir uma experiência que vá além da caminhada por lazer e contemplação, envolvendo os interessados por caminhos virtuais, que abrangem não só o conhecimento botânico, mas toda a diversidade cultural e as diferentes utilizações das plantas, como por exemplo, na culinária e nos rituais religiosos. O presidente do Jardim Botânico, Sérgio Besserman, afirmou que o público será presenteado com o aplicativo, que vai ampliar a visitação e a experiência dentro do parque.\n\nFalante 2: Essa possibilidade de dar acesso ao conhecimento, mas não de uma forma cartilhes, didática, e sim pelo próprio interesse individual, é um presente maravilhoso. Cê imagina a criançada passeando e se divertindo e se emocionando com a beleza do jardim e ao mesmo tempo com seu celular ou seu professor, aprendendo.\n\nFalante 1: Durante o lançamento do projeto Transformação Digital e Educação Ambiental do Rio, foi assinado um termo de intenção para o convênio entre as instituições parceiras. Ainda de acordo com Besserman, a parte tecnológica do aplicativo será desenvolvida por uma empresa que ainda será contratada por meio de licitação. O Jardim Botânico, um dos principais pontos turísticos da capital fluminense, recebe cerca de setecentas mil pessoas por ano. Da Rádio Nacional, no Rio de Janeiro, Ligia Souto. [som de bipe] Um projeto lançado nesta quinta-feira vai permitir aos visitantes do Jardim Botânico do Rio passeios por trilhas virtuais interativas, com realidade aumentada e geolocalização dos principais pontos do parque. A novidade será possível através do desenvolvimento de um aplicativo que deverá ficar pronto até junho do ano que vem. A iniciativa é resultado de uma parceria entre o Jardim Botânico, a Fundação Banco do Brasil e o Ministério do Meio Ambiente. O objetivo da inovação digital é permitir uma experiência que vá além da caminhada por lazer e contemplação, envolvendo os interessados por caminhos virtuais, que abrangem não só o conhecimento botânico, mas toda a diversidade cultural e as diferentes utilizações das plantas, como por exemplo, na culinária e nos rituais religiosos. O presidente do Jardim Botânico, Sérgio Besserman, afirmou que o público será presenteado com o aplicativo, que vai ampliar a visitação e a experiência dentro do parque.\n\nFalante 2: Essa possibilidade de dar acesso ao conhecimento, mas não de uma forma cartilhes, didática, e sim pelo próprio interesse individual, é um presente maravilhoso. Cê imagina a criançada passeando e se divertindo e se emocionando com a beleza do jardim e ao mesmo tempo com seu celular ou seu professor, aprendendo.\n\nFalante 1: Durante o lançamento do projeto Transformação Digital e Educação Ambiental do Rio, foi assinado um termo de intenção para o convênio entre as instituições parceiras. Ainda de acordo com Besserman, a parte tecnológica do aplicativo será desenvolvida por uma empresa que ainda será contratada por meio de licitação. O Jardim Botânico, um dos principais pontos turísticos da capital fluminense, recebe cerca de setecentas mil pessoas por ano. Da Rádio Nacional, no Rio de Janeiro, Ligia Souto.",
    "keyFacts": [
      "quais vantagens a nova ferramenta pode oferecer para os visitantes do Jardim Botânico",
      "informe como o aplicativo será desenvolvido"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de divulgação para redes sociais",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2019-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2019-1-t3",
    "cycle": "2019/1",
    "number": "Tarefa 3",
    "title": "Parklets",
    "shortLabel": "2019/1 · T3",
    "genre": "carta aos associados",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é o presidente da Associação de Comerciantes de uma cidade onde ainda não há parklets. Após ler a reportagem, decidiu sugerir que os associados invistam na instalação dessas estruturas. Escreva a eles uma carta, explicando o que são os parklets e justificando a importância do investimento.",
    "sourceKicker": "Insumo · prova 2019/1 · Tarefa 3",
    "sourceTitle": "Parklets",
    "sourceText": "Parklets ganham espaço e caem no gosto de Belo Horizonte FOTO: Jair Amaral/EM/D.A Press. Em meio ao movimento ace- lerado de carros e ao vaivém de pedestres em áreas agitadas da capital, o belo-horizontino passou a ter novos espaços para relaxar, bater papo, ouvir música, ler, encontrar amigos, se divertir ou apreciar a pai- sagem. As varandas urbanas, como vêm sendo chamadas as minipraças do projeto BH Parklets - espaços de convivência rentes à calçada, em vagas de estacionamento -, já estão montadas em três pontos da capital, com previsão de novo endereço já na semana que vem. Um dos responsáveis pela implantação da unidade é o empre- sário Alexandre Horta, sócio-pro- prietário do Deck Bar, em frente à varanda com estrutura de madeira, jardim, wi-fi e ponto de energia. A aposta no projeto, segundo ele, está atrelada à ideia de aumentar o uso público dos espaços urbanos. \"Nos interessamos já na época do lançamento do edital, porque vimos que poderíamos ajudar a arejar esta região\", afirma. Segundo ele, o inves- timento para instalação da estrutura foi de R$ 20 mil. \"Nosso objetivo não é ter retorno financeiro, mas contri- buir para o bem comum da cidade\", disse. Na prática, o projeto BH Parklets funciona assim: a prefeitura licencia a estrutura a pedido de represen- tantes da iniciativa privada, que são responsáveis pelo custeio da insta- lação. De acordo com o idealizador do projeto, Luamã Lacerda, mesmo com o financiamento e a divulgação da marca, não há vínculo comer- cial, ou seja, as pessoas que usam o espaço não têm obrigatoriedade de consumir no estabelecimento. \"Não há restrição de atendimento a quem estiver sentado e queira consumir. Mas qualquer pessoa pode usufruir do espaço, a qualquer hora, porque Segundo ele, as varandas urbanas já existem em São Paulo, Fortaleza e Porto Alegre. No centro da cidade, onde a varanda foi montada em uma rua de grande circulação de veículos e pessoas, o projeto já ganhou adeptos fiéis. Moradores da via há 15 anos, o casal de aposentados Lúcia Sartori Sena e José Sena Reis comemora a implantação do espaço em um ponto tão movimentado da cidade. \"Em todo esse tempo, vimos algumas mudanças positivas, como a reti- rada dos camelôs e a redução dos assaltos. Mas esse projeto é uma das melhores iniciativas, pois oferece entretenimento para quem mora na região\", afirma José. Dono da loja Ortobom, que banca a instalação, o empresário e vice-presidente de Educação da Câmara de Dirigentes Lojistas de Belo Horizonte (CDL-BH), Marcos Ineco, fala do sucesso do projeto. \"As pessoas entram na loja para elogiar e agradecer. O resultado tem sido muito positivo\", disse. Disponível em: <http://www.em.com.br/ app/noticia/gerais/2015/07/26/ 68 /parklets-ganham-espaco-e- caem-no-gosto-de-belo-horizonte.shtml>. Acesso em: 7 jul. 2016 (adaptado).",
    "sourceImage": "/writing/insumos/2019-1-t3.jpg",
    "keyFacts": [
      "o que são os parklets",
      "justificando a importância do investimento"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aos associados",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2019-1-t4",
    "cycle": "2019/1",
    "number": "Tarefa 4",
    "title": "Sofrimentos inevitáveis",
    "shortLabel": "2019/1 · T4",
    "genre": "carta à autora",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Após ler o artigo, você decidiu escrever uma carta para a autora com a finalidade de discutir a tese defendida por ela, apresentando a sua opinião sobre o ponto de vista de Rosely Sayão.",
    "sourceKicker": "Insumo · prova 2019/1 · Tarefa 4",
    "sourceTitle": "Sofrimentos inevitáveis",
    "sourceText": "Sofrimentos inevitáveis Rosely Sayão Costumo ouvir que os pais da atu- alidade querem poupar seus filhos de sofrimento. Por isso, sentem uma enorme dificuldade para dizer \"não\" a eles, para permitir que enfrentem as suas frustrações e para deixar que atravessem as situações difíceis que a vida lhes apresenta. À primeira vista, esse discurso soa como uma verdade, não é mesmo? Afinal, temos visto crianças e ado- lescentes agirem sem se importar com as normas sociais porque eles se sentem protegidos pelos pais em todas as circunstâncias. Entretanto, podemos pensar um pouco além dessa linha para tentar compreender melhor o relacionamento atual entre pais e filhos no que diz respeito à chamada \"felicidade\" das crianças. Na realidade, pode ser que os pais façam mesmo de tudo para que os filhos não sofram. Mas é preciso con- siderar que, em geral, eles desejam proteger seus filhos apenas de deter- minadas experiências dolorosas — não de qualquer uma. Os pais não querem, por exemplo, que os filhos se sintam excluídos de qualquer situação, de qualquer grupo e de qualquer atividade. É em nome do desejo adulto de elimi- nar esse tipo de sofrimento que as crianças fazem as mesmas atividades que os colegas em seus dias de lazer, ganham os mesmos jogos e todo tipo de parafernália tecnológica, frequen- tam os mesmos lugares, usam roupas e calçados parecidos (quando não são iguais) e vão a mil festas de ani- versários, muitas vezes de crianças que nem são as amigas próximas. Os pais também não querem, de maneira alguma, que seus filhos sofram por causa da escola. É por isso que vira e mexe eles vão falar com coordenadores, professores e diretores, reclamam de alguns pro- fissionais, colocam os seus filhos em aulas particulares, fazem a lição de casa com eles — ou no lugar deles - e estão sempre prontos para defender suas crianças e seus adolescentes de qualquer sanção que tenha sido apli- cada pela escola. E é assim, entre tentativas de evitar um e outro tipo de sofrimento, que os pais vivem a ilusão de cons- truir para seus filhos um mundo que só pode existir em outra dimensão: um mundo onde ninguém os rejei- tará, onde não serão excluídos de nada e onde participarão de todos os grupos pelo simples fato de consumi- rem as mesmas coisas que a maioria. Doce e amarga ilusão... Porém, há alguns sofrimentos que os pais da atualidade não evitam que seus filhos experimentem. Ao escon- der de crianças e jovens verdades da vida que os envolvem, esses pais fazem com que os filhos sofram se debatendo entre mentiras ou silên- cios. Quando o tema é doença ou morte na família, por exemplo, isso acontece bastante. O que os pais talvez não saibam é que, ao tentarem evitar que os filhos sofram a dor da perda, eles acabam provocando nos mais novos um sofri- mento ainda maior que é a dor de não saber, de não entender, de não conse- guir simbolizar a angústia que sentem. Outra dor que os pais provocam e à qual não dão muita importância é a dor do abandono. Buscar o filho na escola bem depois do término da aula; deixar o filho sem parâmetros; permitir que a criança atue como se já fosse responsável por sua vida e colocar em suas mãos escolhas que deveriam ser de adultos são alguns exemplos de atitudes que fazem crianças e adolescentes se sentirem abandonados pelos pais. E isso dói neles. Uma garota de nove anos disse uma frase reveladora sobre essa sen- sação de abandono à sua amiga, que estava triste e constrangida por ter sido impedida pelos pais de acom- panhá-la em um passeio: \"Não chore por causa disso, não. Eu adoraria que os meus pais se importassem assim comigo\". Os filhos são supostamente pro- tegidos de sofrimentos muitas vezes inevitáveis e, ao mesmo tempo, são colocados em situações nas quais experimentam sofrimentos inúteis. Qual será o resultado desse tipo de equação? Disponível em: https://wwwl.folha.uol.com. br/colunas/roselysayao/2013/04/1262869- sofrimentos-inevitaveis.shtml. Acesso em: 15 abr. 2019 (adaptado).",
    "sourceImage": "/writing/insumos/2019-1-t4.jpg",
    "keyFacts": [
      "a sua opinião sobre o ponto de vista de Rosely Sayão"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta à autora",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2018-1-t1",
    "cycle": "2018/1",
    "number": "Tarefa 1",
    "title": "A urna eletrônica",
    "shortLabel": "2018/1 · T1",
    "genre": "artigo de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Um jornal de circulação nacional no Brasil está organizando um debate sobre a segurança do sistema eletrônico de votação. Como representante do Tribunal Superior Eleitoral (TSE), escreva um artigo defendendo a segurança da urna eletrônica.",
    "sourceKicker": "Insumo · prova 2018/1 · Tarefa 1",
    "sourceTitle": "A urna eletrônica",
    "sourceText": "Falante 1: [som de bipe] Em muitos países, os computadores são cada vez mais utilizados no processo eleitoral.\n\nFalante 2: Se você vota em um município com mais de duzentos mil eleitores, a partir de três de outubro, você vai entrar na era da informática. A urna eletrônica entrou em cena em 1996, resultado do trabalho de um grupo criado exclusivamente para pensar nos mínimos detalhes, o equipamento de votação.\n\nFalante 3: Chegou o momento em que se devia atingir o eleitor, ou seja, fazer com que o eleitor registrasse eletronicamente seu voto, evitando qualquer fraude, qualquer substituição da sua vontade. E, por consequência, também a totalização mais rápida do resultado, evitando a contagem manual dos votos.\n\nFalante 1: Urnas que não conferiam com o número de eleitores.\n\nFalante 2: O TRE anulou as eleições de outubro de 94.\n\nFalante 1: Depois da prisão de uma quadrilha que fraudava os votos.\n\nFalante 2: [música de news] A urna eletrônica veio com a missão de pôr fim às fraudes, mas também tornou o processo de votação e apuração mais simples e rápido. Quando a Justiça Eleitoral afirma que ela é segura e que ninguém consegue alterar o resultado de uma eleição, os testes comprovam. Até o dia da eleição, a urna passa por muitas verificações. Os testes públicos de segurança são abertos. Qualquer pessoa pode entrar e invadir o sistema. Basta participar. Em 2016, o evento aconteceu em março. Foram três dias intensos. Os especialistas em segurança quebraram a cabeça para colocar as estratégias em prática.\n\nFalante 4: Somos o único país do mundo que faz isso. Abrir os seus sistemas informatizados para que os hackers venham tentar testar os dispositivos de segurança e apontar as fragilidades para que a gente possa fazer os devidos ajustes.\n\nFalante 1: Outra vantagem é que, por este sistema, as fraudes se tornam praticamente impossíveis.\n\nFalante 2: [música news] Foi a terceira edição do teste público de segurança e, mais uma vez, ninguém conseguiu alterar, de fato, o resultado de uma eleição. As fragilidades encontradas só serviram para aperfeiçoar ainda mais o sistema.\n\nFalante 4: Além de abrir os programas, os códigos para ele analisar tudo que for necessário, ainda nós desativamos todos os lacres físicos e até mesmo abrimos fisicamente a urna para que ele chegue àquele ponto da memória e possa atuar a partir do seu plano de ataque. Ou seja, são condições bastante facilitadas, digamos assim, diferentes da realidade, para que o investigador tenha realmente profundidade no seu teste e objetividade.\n\nFalante 2: A Justiça Eleitoral também investe em outros métodos de segurança, como por exemplo, a assinatura digital e a lacração de sistemas eleitorais. Integrantes de partidos, OAB e Ministério Público podem acompanhar tudo de perto.\n\nFalante 5: A gente usa assinatura digital em praticamente tudo no sistema eleitoral brasileiro. Não só na urna eletrônica, como em todos os sistemas. É muito, muito, muito seguro.\n\nFalante 6: Tá, mas como é que eu posso ter certeza de que um hacker não pode invadir a urna?\n\nFalante 2: Gente, a urna eletrônica não tem acesso à internet. Os hackers não conseguem invadir o sistema e nem alterar os votos registrados, porque ela não é ligada a nenhuma rede. Assim que o processo de votação começa, os mesários têm uma tarefa muito importante: emitir a zeresma. Esse documento comprova que não há nenhum voto registrado na urna, nenhum mesmo. Os eleitores só podem começar a votar depois que esse procedimento acontece.",
    "keyFacts": [
      "A urna eletrônica"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2018-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2018-1-t2",
    "cycle": "2018/1",
    "number": "Tarefa 2",
    "title": "Motociclistas profissionais",
    "shortLabel": "2018/1 · T2",
    "genre": "artigo para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como diretor da Associação Brasileira de Motociclistas Profissionais, escreva um artigo para ser publicado no site da associação, com o objetivo de informar os direitos garantidos pela lei sancionada em 2011 e de conscientizar os profissionais dessa categoria sobre os riscos a que estão expostos em seu dia a dia.",
    "sourceKicker": "Insumo · prova 2018/1 · Tarefa 2",
    "sourceTitle": "Motociclistas profissionais",
    "sourceText": "Falante 1: [som de bip] Série especial: Globo da Morte. Os perigos do trânsito para os motociclistas.\n\nFalante 2: [som de telefone] Telepizza Expressa, bom dia.\n\nFalante 3: Bom dia, eu queria pedir uma pizza grande e um refrigerante, dois litros.\n\nFalante 2: Pois não, são vinte reais mais cinco da taxa de entrega. O pedido vai chegar em trinta minutos ou você não precisa pagar. Ô Maicon, tem uma entrega pra você.\n\nFalante 4: Outra vez? Eu já dobrei hoje. Tô na entrega desde ontem à noite.\n\nFalante 2: Não, só mais essa, depois cê pode ir pra casa, tá?\n\nFalante 4: Ah, tá bom, acredito.\n\nFalante 1: [som de moto]\n\nFalante 5: O trânsito está congestionado na Segunda Avenida porque houve um acidente fatal entre uma moto e um carro. Mais informações ao longo da programação.\n\nFalante 6: Há pouco mais de um ano, em julho de 2011, foi sancionada uma lei que partiu do Senado, proibindo empresas de adotarem práticas que estimulem o aumento da velocidade dos motociclistas profissionais, entre elas dispensar o pagamento pelo consumidor, caso o produto ou serviço não fosse entregue dentro do prazo. Muitas vezes o valor era descontado do salário do motoboy, o que pressionava os entregadores a correr. A jornada de trabalho dos motociclistas profissionais, no entanto, continua penosa, o que os expõe a um risco maior de acidentes. O diretor de comunicação da Abramet, a Associação Brasileira de Medicina do Tráfego, Dirceu Rodrigues Alves Júnior, lista os principais problemas a que os motofretistas e mototaxistas estão sujeitos.\n\nFalante 7: Está submetido aos riscos físico, onde abrange aí o ruído, a vibração, as variações térmicas que vão causar problemas à saúde do indivíduo. Além disso, o risco químico, por ele estar submetido aí às poeiras, à fuligem, os gases, também causadores de doenças. E além disso, o risco de acidentes. Então esse indivíduo, ele é submetido a uma condição insalubre, penosa.\n\nFalante 6: Entre os problemas está ainda a necessidade de agilidade. Mesmo com a proibição de ter descontado de seu salário o valor do pedido, os motociclistas muitas vezes aceleram para fazer mais corridas para aumentar o salário, que tem nas taxas de entrega uma parcela significativa. E muitos deles, incluindo mototaxistas, dobram a jornada, conduzindo em condições de cansaço e estresse. Outro agravante é a disputa com os carros. Os profissionais carregam, além dos pedidos e dos passageiros, a imagem da culpa por toda a imprudência de motociclistas no trânsito.",
    "keyFacts": [
      "Motociclistas profissionais"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2018-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2018-1-t3",
    "cycle": "2018/1",
    "number": "Tarefa 3",
    "title": "Guia de Rodas",
    "shortLabel": "2018/1 · T3",
    "genre": "e-mail de elogio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Imagine que você tem um filho com dificuldades de locomoção e que, recentemente, vocês passaram a utilizar o aplicativo para celular Guiaderodas. Escreva um e-mail para Bruno Mahfuz elogiando esse aplicativo e descrevendo os benefícios que ele tem trazido para a vida de seu filho.",
    "sourceKicker": "Insumo · prova 2018/1 · Tarefa 3",
    "sourceTitle": "Guia de Rodas",
    "sourceText": "APLICATIVO GUIADERODAS FUNCIONA COMO MAPA DA ACESSIBILIDADE \"Não há nada pior do que você ir a um compromisso e ter que voltar para casa porque o local, seja um restaurante, um cinema, ou qualquer outro, nác está apto a te receber, comenta Bruno Mahfuz, cofundador do guiaderodas, um aplicativo para avaliar o nível de acessibilidade de diferentes estabelecimentos. que saia de casa alimentavam nele a vontade de fazer algo para melhoraras coisas. Foi em 2015 que resolveu se juntara mais dois sócios e lançar o quiaderodff \"Sempre quis trabalhar com alguma coisa vinculada a acessibilidade porque padeço muito pela falta dela\", conta. \"Apesar de ver os vários avanços 0 serviço, que é gratuito, está disponível para Android e iOS. Ele funciona como uma espécie de Foursquare para acessibilidade. Basta fazer o login, escolher um estabelecimento prüimo de onde você estiver e contar para os outros usuários se a acessibilidade lá é boa, ruim ou mediana. Bruno conta que dos usuários do aplicativo não são deficientes físicos. A ideia, segundo ele, é que qualquer um possa e queira colaborar para avisar aos outros o quão acessível éaquele lugar. Ele diz: — Queremos desconstruir essa iúia de que acessibilidade é só questão de não diz respeito só a quem usa cadeira de Qualquer pessoa, em algum momento da pode se beneficiar de instalações acessíveis —poderá ser quando ela ficar idosa, grávida, com uma criança de colo ou mesmo quando quebrar o pé. A participação de uqúrios que não são portadores de necessidades especiais se deve à Eruno, fundador do quade rodas, Foto: divulgação que aconteceram nesses 15 anos, ainda falta muito. E, tão grande quanto a falta de acesso é a falta de informação. As pessoas saem de casa e não sabem oque encontrar pela frente\", diz. Ele lembra que, na época do vestibular, por exempb deixou de fazer várias provas porque chegava na faculdadeeela não tinha estrutura para ele entrar. Bruno conta que muitas vezes o lugar até tem estrutura como rampas e devadores para receber o cadeirante, mas peca em detalhes essenciais, como os corredores entre as mesas de um restaurante. \"As vezes até tem um banheiro especial, mas não há como chegar até lá\", diz. A acessibilidade coma negócio O guiaderodas foi lançado em fevereiro. Segundo Bruno, já tem mais de 7 mil downloads e 6 mil estabelecimentos avaliados. Como eles trabalham com simpliddade da interface. 0 questionário para avaliar a acessibilidade do lugar é simples e intuitvo. Os responsáveis pelo aplicÚ,'0 afirmam que responder as perguntas não dura mais do que 30 segundos. \"Não perguntamos coisas muito espedficas, como a inclinação da rampa ou a dimensão da porta. Apenas gerais. Além disso, não tratamos a questão da acessibilidade com dó, mas como qualquer outro desafio da diz Bruno. A necessidade de criar um serviço de acessibilidade Bruno é administrador, com pósyaduaçáo em brandng, e também cadeirante Há 15 anos, quando tinha 17, sofreu um acidente de carro e, desde então, não consegue mover suas pemas. Os desafios que enfrentava todos os dias a base de dados do Foursquare, fincionam em qualquer lugar. Pensando na internacionalização, o serviçojá está disponível em inglês eespanhol. 0 serviço é gratuito. A monetização vem com o \"Sdo guiaderodas\", um serviço oferecido pela empresa e feito por arquitetos especializados para melhorar a especialidade de um determinado ambiente. Eles avaliam o local, sugerem melhorias e divulgam e premiam as edificações mais acessíveis. No momento, estão focando em grandes estabelecimentos como teatros, hotéis e condomínios, Disponível em: <https:J!Www.freetheessence.wm.br>. Acesso em: 07 jun. 2017.",
    "sourceImage": "/writing/insumos/2018-1-t3.jpg",
    "keyFacts": [
      "Guia de Rodas"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de elogio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2018-1-t4",
    "cycle": "2018/1",
    "number": "Tarefa 4",
    "title": "Gênero e comida",
    "shortLabel": "2018/1 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ler o texto Gênero e Comida, você decidiu escrever uma carta do leitor para o site A Escotilha, retomando a questão apresentada por Isadora Rupp. Em seu texto, exponha o seu ponto de vista sobre o assunto e sugira atitudes que possam provocar mudanças desse paradigma na sociedade.",
    "sourceKicker": "Insumo · prova 2018/1 · Tarefa 4",
    "sourceTitle": "Gênero e comida",
    "sourceText": "GÊNERO E COMIDA Vivemos cm uma era em que dieta é obftgaçào. E mulheres as mais prejudicadas. estteiada coluna \"Alimetitar\". Antes de tudo, quero me apresentar: já era colaboradora de A Escotilha e sou jornalista cultural há cinco anos. Escrevo sobre artes visuais e cinema, mas a alimentação e nutrição é um tema de interesse e pesquisa. Que fique claro: sou jornalista, não nutricionista! Sou apenas uma entusiasta e, neste espaço, vamos refletir sobre o assunto. Também vou trazer textos de livros e filmes que tratam do tema. Sejam bem-vindos! Quero convidar o leitor homem a se colocar no lugar de uma mulher nas situações que vou descrever abaixo. Ou, caso você, leitora, não tenha tido essa percepção, me acompanhe (e também discotde se quiser). Nós passamos por essas situações diariamente, o que explica, e muito, o fato de sofrermos mais com transtornos alimentares do que os homens (segundo a Organização Mundial da Saúde). Vamos lá: Uma mulher faz um trajeto em que cruza com várias bancas de jornais e revistas. Montes são sobre Dietas. Montes mesmo, uma boa parte das revistas da banca, aliás. Estampando a capa, sempre uma outra mulher, geralmente pessoa pública, com um corpo dentro do padrão estético vigente, servindo como um exemplo a ser seguido. Dia desses, comprei uma delas — na capa, a cantora Anitta, que perdeu peso com um cardápio equilibrado e exercício. Só um detalhe: uma cozinheira viaja com ela. Mas você, pobre mortal, pode atingir o mesmo seguindo o regime, e tendo a tal da \"força de vontade\" (só deixando claro: gosto da Anitta. Minha intenção foi reforçar que este é um privilégio que poucas de nós temos). Entre em uma livraria: a mesma coisa. Fileiras de livros sobre as na televisão e, o pior de todos, últimas promessas de emagrecimento nas redes sociais: é só abrir o feed do Instagram para ver blogueiras e suas refeições \"exemplares\" te convidando a fazer o mesmo, sempre seguidas por fotos despretensiosas de biquínis num corpo perfeito. Te acusando, sempre: \"quem quer, faz\", parece o mantra. E você morta de culpa porque no dia não deu mesmo pra ir à academia. Algumas organizações de saúde falam que estamos em um ambiente obesogênico (abordarei o tema mais adiante aqui neste espaço), que contribui para o problema considerado, hoje, de saúde pública. Há publicidade de produtos alimentícios em todos os cantos. Em paralelo, nós, mulheres, vivemos também em um ambiente \"dietogênico\" (inventei o termo agora e, muito provavelmente, ele não existe). 0 fato é que parece que somos, o tempo todo, obrigadas a fazer dietas e restrições. Claro que os homens também sofrem pressões com padrões de beleza e com distúrbios alimentares. Mas tenho impressão que o diet talk é bem mais comum nas rodinhas femininas. O prato — e o peso — feminino também é objeto de vigilância de maneira mais constante: fulana come pouco/fulana come muito/ fulana come muito açúcar/minha tia me acha gorda!minha vó disse que eu engordei/nâo pode comer muito em festa/não pode comer muito na frente do boy]seja delicada coma pouco/primeiro encontro pede só uma salada/ nossa, sua irmã engordou/vou parar de dar exemplo porque são infinitos. Como diz a nutricionista Sophie Deram em seu excelente livro O Peso das Dietas, o cumprimento não é mais: \"bom dia, tudo bem?\" e Sim, \"bom dia, você engordou;emagreceu?\" Precisamos, urgentemente, parar de fiscalizar a aparência e os pratos alheios, principalmente, o das mulheres. 0 problema é que estamos inseridas nesse ambiente \"dietogênico\" onde não fazer alguma restrição alimentar e estar em paz com a sua alimentação parece motivo de vergonha. Por isso, quando li em Mulheres Francesas Não Engordam, da executiva Mireille Giuliano, que, por lá, a lógica é inversa, fiquei surpresa. Isso não significa que elas comem sem limites o dia todo, é claro. A questão é que precisamos, urgentemente, pensar em um ambiente mais propício para que possamos ir a um almoço ou café sem se punir publicamente. Celebrar o ato de comer, e não entendê-lo como uma vergonha ou culpa. Até quinta-feira que vem e bom apetite pra todo mundo! http.•iiwww.aescoli\\ha.com.br.Acesso em: 14J06,'2Ci7.",
    "sourceImage": "/writing/insumos/2018-1-t4.jpg",
    "keyFacts": [
      "por Isadora Rupp"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2017-2-t1",
    "cycle": "2017/2",
    "number": "Tarefa 1",
    "title": "Funcionário da Prefeitura de Florianópolis-SC",
    "shortLabel": "2017/2 · T1",
    "genre": "texto de divulgação para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha no setor de comunicação da prefeitura de Florianópolis e ficou responsável por escrever um texto para divulgar Florianópolis como uma cidade inteligente. A partir das informações do vídeo, escreva o texto, a ser publicado no site da prefeitura, explicando o que são cidades inteligentes, apresentando suas vantagens e destacando o que torna Florianópolis uma dessas cidades.",
    "sourceKicker": "Insumo · prova 2017/2 · Tarefa 1",
    "sourceTitle": "Funcionário da Prefeitura de Florianópolis-SC",
    "sourceText": "Falante 1: [som de bipe] [vinheta sonora] Florianópolis é a sétima cidade inteligente do Brasil. Mas o que faz dela uma cidade inteligente? Ou melhor, o que é uma cidade inteligente? Grupos da universidade partem desse conceito pra pensar em uma cidade que une inovação, tecnologia e criatividade.\n\nFalante 2: [vinheta sonora]\n\nFalante 1: Cidades inteligentes são aquelas que usam a tecnologia para monitorar e integrar a infraestrutura do espaço, tornando o planejamento e o desenvolvimento urbano mais conectado e eficiente. Isso inclui áreas da administração, educação, assistência à saúde, segurança pública, edifícios e transporte. Sempre buscando melhorar a qualidade de vida dos moradores e as condições de sustentabilidade.\n\nFalante 3: Não só a tecnologia, ela é muito importante, ela não vai ser importante só na gestão. Ela também vai ser uma facilitadora pra que as pessoas consigam se informar sobre a sua cidade, sobre o que que tá acontecendo, como elas podem contribuir, e também pra dizer aquilo que elas acham que é importante e aquilo que elas gostariam que acontecesse ou de que forma elas gostariam que acontecesse.\n\nFalante 1: As cidades consideradas mais inteligentes em 2016 foram São Paulo em primeiro lugar, Rio de Janeiro em segundo, Curitiba em terceiro, Brasília em quarto lugar e Belo Horizonte em quinto. O grupo de pesquisa Via Estação Conhecimento, vinculado à universidade, desenvolve trabalhos nas áreas de empreendedorismo e habitats de inovação, com o seguinte propósito.\n\nFalante 4: Transformar o conhecimento que é desenvolvido dentro da academia, tudo que é feito, né, em âmbito universitário pra sociedade, pra que esses atores que de alguma forma estão conectados com o grupo, consigam entender o que a gente faz e que isso gere uma agregação de valor maior, né, tanto pra governo, quanto pra outras universidades, é, quanto pras empresas e a própria sociedade.\n\nFalante 1: Um exemplo é o aplicativo PMSC Mobile, utilizado pela Polícia Militar de Santa Catarina. A ferramenta gerencia em tempo real todas as atividades operacionais, agilizando desde o recebimento das ocorrências até o término das operações.\n\nFalante 5: O aplicativo permite que ele faça o seu relatório, que ele registre aquele atendimento, o que antes era feito efetivamente em formulários de papel. Eram até onze formulários poderiam ser utilizados pra esse registro de ocorrência. E agora tudo isso é feito no tablet.\n\nFalante 3: Então é claro que a cidade ela é forte em inovação tecnológica. Agora o desafio é como trazer isso também pra inovação social.",
    "keyFacts": [
      "o que são cidades inteligentes",
      "apresentando suas vantagens",
      "o que torna Florianópolis uma dessas cidades"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de divulgação para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2017-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2017-2-t2",
    "cycle": "2017/2",
    "number": "Tarefa 2",
    "title": "Uma mulher de luz",
    "shortLabel": "2017/2 · T2",
    "genre": "convite",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é diretor da Associação de Deficientes Visuais e Amigos (ADEVA) e vai promover uma palestra motivacional com Leila Alexandrino Batista. Com base nas informações do áudio, escreva um convite aos associados, apresentando a palestrante e sua trajetória de superação.",
    "sourceKicker": "Insumo · prova 2017/2 · Tarefa 2",
    "sourceTitle": "Uma mulher de luz",
    "sourceText": "Falante 1: Rádio Bandeirantes.\n\nFalante 2: [música suave] Eu acordo bem cedo, levanto, arrumo lancheira, uniforme, verifico o material, dou café pro meu filho. Aí eu começo em casa, né, arrumar a cozinha, arrumar os quartos, enfim, dar uma ajeitada na casa. Já adianto alguma coisa pro almoço. Daí eu vou buscar meu filho na escola por volta de onze horas, onze e meia.\n\nFalante 3: É uma rotina de uma dona de casa, como a maioria das donas de casa paulistanas.\n\nFalante 2: Sim.\n\nFalante 3: Exceto por um detalhe, né?\n\nFalante 2: Eu sou deficiente visual total. Não tenho percepção nenhuma de luz.\n\nFalante 3: [música suave] Leila Alexandrino Batista, dona de casa há quinze anos, se casou com Carlos, que também é deficiente visual. Há doze anos, nasceu Gabriel.\n\nFalante 2: [música suave] Quando ele ainda não falava e eu tinha um armarinho de vidro na cozinha e dentro eu tinha um pote com balas, e ele começou a apontar, e eu olhei pro rostinho dele e falei assim: \"Não adianta apontar que eu não tô vendo. O que que você quer?\" Ele pegou a minha mão e bateu no vidro. [riso] Já perguntaram pra ele na escola: \"Como é a sua casa? Como é ser filhos de deficiente visual?\" Ele falou: \"É normal.\"\n\nFalante 3: [música suave] Ainda na infância, por causa de um glaucoma, a dona de casa ficou quase cega. Quando adulta, um acidente fez com que perdesse o pouco de visão que ainda tinha. Agora, mesmo sem enxergar nada, Leila continua sendo uma mulher independente.\n\nFalante 2: Vou pra rua sozinha, vou à Quitanda, vou ao mercado, vou ao açougue, vou à farmácia, lojas, onde for preciso. Eu não deixo de, de ir ao cinema porque eu não vejo. Eu não vejo, mas eu ouço. Eu não vejo, mas meu filho vê.\n\nFalante 3: Ele descreve o filme pra vocês?\n\nFalante 2: Sim. E aí cê tem que ficar falando pra ele: \"No cinema não pode falar alto.\" \"Mas se eu não te contar, você não tá vendo.\" [riso]\n\nFalante 3: Na casa dela tem algumas pequenas adaptações pra facilitar a vida.\n\nFalante 2: O micro-ondas que, que veio todo naquela placa única, eu tive que colar braile pra, pra eu poder usar, né? Saber direitinho como que faz, onde tá o número um, o desliga, o liga.\n\nFalante 3: Ela tem um jeito tão peculiar de entender o mundo, que acabou se tornando palestrante motivacional.\n\nFalante 2: O medo paralisa, não te deixa seguir adiante, sabe? \"Ai, não vou fazer isso porque eu vou me arriscar.\" Não, saia da zona de conforto, tente coisas novas.\n\nFalante 3: Leila Alexandrino Batista, dona de casa, quarenta e quatro anos, brasileira, esposa, mãe, mulher. Uma mulher de luz.\n\nFalante 2: Eu nasci com essa dificuldade pra aprender com ela. Se eu não aproveito a oportunidade, num, não valeu a lição.\n\nFalante 1: Rádio Bandeirantes.\n\nFalante 2: [música suave] Eu acordo bem cedo, levanto, arrumo lancheira, uniforme, verifico o material, dou café pro meu filho. Aí eu começo em casa, né, arrumar a cozinha, arrumar os quartos, enfim, dar uma ajeitada na casa. Já adianto alguma coisa pro almoço. Daí eu vou buscar meu filho na escola por volta de onze horas, onze e meia.\n\nFalante 3: É uma rotina de uma dona de casa, como a maioria das donas de casa paulistanas.\n\nFalante 2: Sim.\n\nFalante 3: Exceto por um detalhe, né?\n\nFalante 2: Eu sou deficiente visual total. Não tenho percepção nenhuma de luz.\n\nFalante 3: [música suave] Leila Alexandrino Batista, dona de casa há quinze anos, se casou com Carlos, que também é deficiente visual. Há doze anos, nasceu Gabriel.\n\nFalante 2: [música suave] Quando ele ainda não falava e eu tinha um armarinho de vidro na cozinha e dentro eu tinha um pote com balas, e ele começou a apontar, e eu olhei pro rostinho dele e falei assim: \"Não adianta apontar que eu não tô vendo. O que que você quer?\" Ele pegou a minha mão e bateu no vidro. [riso] Já perguntaram pra ele na escola: \"Como é a sua casa? Como é ser filhos de deficiente visual?\" Ele falou: \"É normal.\"\n\nFalante 3: [música suave] Ainda na infância, por causa de um glaucoma, a dona de casa ficou quase cega. Quando adulta, um acidente fez com que perdesse o pouco de visão que ainda tinha. Agora, mesmo sem enxergar nada, Leila continua sendo uma mulher independente.\n\nFalante 2: Vou pra rua sozinha, vou à Quitanda, vou ao mercado, vou ao açougue, vou à farmácia, lojas, onde for preciso. Eu não deixo de, de ir ao cinema porque eu não vejo. Eu não vejo, mas eu ouço. Eu não vejo, mas meu filho vê.\n\nFalante 3: Ele descreve o filme pra vocês?\n\nFalante 2: Sim. E aí cê tem que ficar falando pra ele: \"No cinema não pode falar alto.\" \"Mas se eu não te contar, você não tá vendo.\" [riso]\n\nFalante 3: Na casa dela tem algumas pequenas adaptações pra facilitar a vida.\n\nFalante 2: O micro-ondas que, que veio todo naquela placa única, eu tive que colar braile pra, pra eu poder usar, né? Saber direitinho como que faz, onde tá o número um, o desliga, o liga.\n\nFalante 3: Ela tem um jeito tão peculiar de entender o mundo, que acabou se tornando palestrante motivacional.\n\nFalante 2: O medo paralisa, não te deixa seguir adiante, sabe? \"Ai, não vou fazer isso porque eu vou me arriscar.\" Não, saia da zona de conforto, tente coisas novas.\n\nFalante 3: Leila Alexandrino Batista, dona de casa, quarenta e quatro anos, brasileira, esposa, mãe, mulher. Uma mulher de luz.\n\nFalante 2: Eu nasci com essa dificuldade pra aprender com ela. Se eu não aproveito a oportunidade, num, não valeu a lição.\n\nFalante 1: [música suave]",
    "keyFacts": [
      "do áudio",
      "escreva um convite aos associados",
      "apresentando a palestrante",
      "sua trajetória de superação"
    ],
    "mustDo": [
      "escrever no gênero pedido: convite",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2017-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2017-2-t3",
    "cycle": "2017/2",
    "number": "Tarefa 3",
    "title": "Serra da Capivara",
    "shortLabel": "2017/2 · T3",
    "genre": "texto de apresentação de campanha",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como voluntário do Parque Nacional da Serra da Capivara, você ficou responsável por escrever um texto de apresentação para uma campanha de arrecadação de fundos para essa instituição. Em seu texto, que estará disponível no site do Parque, apresente o histórico e os trabalhos ali desenvolvidos, mostrando a importância das doações para a manutenção desse patrimônio histórico mundial.",
    "sourceKicker": "Insumo · prova 2017/2 · Tarefa 3",
    "sourceTitle": "Serra da Capivara",
    "sourceText": "NIÊDE GUIDON: A SAGA DA SERRA DA CAPIVARA Serra da Capivara. Piauí, nordeste brasileiro. Capital da pré-história do Brasil. Uma das zonas arqueológicas mais importantes do mundo. Em 1979, foi criado o Parque Nacional da Serrada Capivara, que possui mais de 1 000 sítios arqueológicos com pinturas rupestres de até 35 mil anos, dos quais 170 são abertos à visitação pública. Único parque americano incluído na lista da UNESCO como patrimônio histórico mundial, desde 1991. 0 Parque Nacional da Serra da Capivara está prestes a fechar. Mas vamos à narração histórica. Por que \"Saga da Serra da Capivara\"? Tudo começou em 1970, quando o primeiro sítio arqueológico do Piauí foi descoberto pela paulista Niéde Guidon (1933), fonada em História Natural pela USP e com doutoramento em Arqueologia Pré-Histórica na Sorbonne, em Paris. Tendo morado na França de 1964a 1992, o governo francês patrocinou suas primeiras excursões para pesquisas no local denominado São Raimundo Nonato, a região piauiense por onde ela começou a desbravar a origem do homem americano. Nesta região, Niàde Guidon descobriu o esqueleto mais antigo do Brasil pertencente a uma mulher morta há 9800 anos. Os achados arqueológicos no Parque Nacional da Serra da Capivara mudam a história do homem no continente americano. Isso porque a teoria conhecida até então apontava que os primeiros humanos chegaram ao continente por volta de 15 mil anos, vindos do Estreito de Bering. As pesquisas de Niéde identificam a presença humana no local há 100 mil anos, o que muda a perspectiva da pré-história americana. Pela técnica do carbono 14, a pesquisa chegou à data de 58 mil anos. Abaixo desse período, 05 vestígios encontrados foram datados pela técnica da termoluminescência, quando se chegou à idade de 100 mil anos. A partirde 1991, as pesquisasda Dra. Niêde na Serra da Capivara apresentam evidências irrefutáveis de que os vestígios encontrados estavam ligados ao Homo sapiens. Desde 1973, a professora Niêde coordena pesquisas na Serra da Capivara. Em 1979, o governo brasileiro criou o Parque Nacional da Serra da Capivara, sem prever sua manutenção. Não havia funcionários, nenhuma estrutura para viabilizar o seu funcionamento. Para tomar conta do Parque, foi criada então a Fundação Museu do Homem Americano (Fundham), inaugurada em 1986. Como não era especialidade de nenhum dos pesquisadores tomar conta de um parque, Niàde entrou em contato com o BID (Banco Interamericano de Desenvolvimento) que mandou técnicos fazerem um estudo para organizar o local e torná-lo autossuficiente. A ideia era que fosse um exemplo de como a proteção da natureza e a cultura poderiam desenvolver uma região, que era miserável. Um imenso trabalho foi feito, com o financiamento do BID, da França e de instituições brasileiras, através da Lei Rouanet, como a Vale e a Petrobrás. Atualmente, o número de visitantes anual gira em torno de 25 mil, que poderia estar em 5 ou 6 milhões, caso já existisse 0 aeroporto de São Raimundo Nonato, planejadodesde 1987. Com a criação do Fundo de Compensação Ambiental em 2006, os recursos para a manutenção do Parque começaram a diminuir, até chegar à situação crítica atual: de 270 funcionários, o parque dispõe hoje de 40. Os 400km de estradas para a visitação do Parque estão totalmente esburacados, sem manutenção. 0 Parque Nacional da Serra da Capivara não pode fechar. O Brasil não pode perder esse patrimônio histórico mundial. Não houve terremoto por aqui. Nem tsunami. Ou será que está havendo alguma coisa mais devastadora do que terremotos e tsunamis? Por que nossas imensas riquezas estão sendo desvalorizadas? Para quê? Alguma coisa precisa serfeita, Pelo Brasil. Por nós, brasileiros. Os verdadeiros, Disponível http:/!artenarede.com.br, Acesso em: 12. lun. 20}/ {adaptado).",
    "sourceImage": "/writing/insumos/2017-2-t3.jpg",
    "keyFacts": [
      "para uma campanha de arrecadação de fundos para essa instituição"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de apresentação de campanha",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2017-2-t4",
    "cycle": "2017/2",
    "number": "Tarefa 4",
    "title": "Alunos ricos deveriam pagar pela universidade pública?",
    "shortLabel": "2017/2 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ler o artigo intitulado “Alunos mais ricos deveriam pagar pela universidade pública?”, você resolveu escrever uma carta para o painel de leitores da revista Época manifestando-se sobre a questão. Em sua carta, retome a discussão do artigo e argumente a favor do seu ponto de vista, comparando a realidade brasileira com a do seu país.",
    "sourceKicker": "Insumo · prova 2017/2 · Tarefa 4",
    "sourceTitle": "Alunos ricos deveriam pagar pela universidade pública?",
    "sourceText": "ALUNOS MAIS RICOS DEVERIAM PAGAR PELA UNIVERSIDADE PÚBLICA? Cobrar dos alunos de famílias mais ricas ajudaria a criar mais vagas para os estudantes de famílias mais pobres? Na educação brasileira, é bem conhecida uma acrobacia no meio da vida dos estudantes: quem começou em escola particular vai para a faculdade pública e quem cresceu em escola pública vai para a faculdade privada. A razão para essas duas trajetórias é bem conhecida. Com uma educação básica deficitária, os estudantes da rede pública dificilmente conseguem passar pelo funil apertado do vestibular de universidades estatais. Essa dinâmica perpetua uma distorção histórica na trajetória do ensino superior no país: em geral, quem tem maior acesso à oferta gratuita é quem pode pagar. Quem precisaria do subsídio integral do Estado não chega lá e tem de pagar a mensalidade de uma instituição privada. A diferença no nível de qualidade entre as universidades públicas e privadas faz com que a maioria dos alunos das famílias mais pobres ingresse num círculo vicioso — eles são sempre relegados ao ensino de pior qualidade e começam a vida adulta com mais dívidas e pior preparo. Uma discussáo que se arrasta na política pública de ensino superior no Brasil trata da criação de um mecanismo de cobrança dos alunos de famílias mais ricas das universidades públicas. A gratuidade seria mantida para os mais pobres. Dois pressupostos principais embasam a cobrança. 0 primeiro é que o aluno que termina o ensino superior tende a obter ganho pessoal, na forma de maior renda, por ter concluído essa etapa dos estudos. Dado o tamanho do benefício, seria justo ele arcar com parte do custo de sua formação. A segunda razão é a possibilidade de ampliação de vagas para os mais vulneráveis. A universidade pública enfrenta problemas financeiros crônicos, principalmente por causa da folhá de pagamentos de professores e servidores. \"Novas fontes de receita seriam bem-vindas, principal mente num cenário de crise como o atual\", diz o economista Paulo Meyer Nascimento, do Instituto de Pesquisa Econômica Aplicada (Ipea). Tirar a gratuidade da universidade pública, no entanto, podeacarretar riscos. Um deles é econômico. A cobrança dos alunos deixaria de ser uma fonte de receita extra se o governo simplesmente usasse esses pagamentos para cobrir gastos já existentes e diminuísse seus investimentos. \"Num cenário de briga por recursos, esse é um risco real\", diz Fábio Waltenberg, economista da Universidade Federal Fluminense. Do ponto de vista pedagógico, discute- se se a relação mercantil da universidade com o aluno não traria prejuízos pedagógicos para a relação do professor e do aluno, para a pedagogia e para a qualidade da pesquisa. A gratuidade mantém a vantagem de conservar uma certa autoridade que independe de quanto a pessoa pagou. Para o economista, '(ontrariamente ao que se acredita, o ensino público gratuito náo beneficia somente pessoas mais favorecidas\", afirma Fábio. \"Além disso, o sistema atual já é custeado em grande parte por aqueles que dele se beneficiam - alunos das classes mais altas, que pagam o maior volume de impostos. Concluindo, ainda acredito que o melhor é manter a gratuidade do ensino público, como temos hoje, com uma mudança: cobrarmos mais impostos de quem tem mais dinheiro. A gente paga muito imposto no Brasil sobre consumo e sobre a renda, mas nas faixas mais elevadas o imposto ainda é muito baixo. A alíquota efetiva para quem está lá entre os 5% dos maiores rendimentos não chega aos 7%. É muito pouco. Aumentar os impostos dos mais ricos beneficiaria diversos setores sociais, a começar pela educação. Disponível eni: http:i}epoa.globo.ccm. Jun. 2017.",
    "sourceImage": "/writing/insumos/2017-2-t4.jpg",
    "keyFacts": [
      "Alunos ricos deveriam pagar pela universidade pública?"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2017-1-t1",
    "cycle": "2017/1",
    "number": "Tarefa 1",
    "title": "Festival Gastronômico de Tiradentes",
    "shortLabel": "2017/1 · T1",
    "genre": "notícia",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é jornalista e, após ter assistido ao vídeo sobre o Festival Gastronômico de Tiradentes, decidiu divulgar o evento. Escreva uma notícia para publicar no caderno de turismo de um jornal brasileiro, apresentando as características e as atrações desse festival.",
    "sourceKicker": "Insumo · prova 2017/1 · Tarefa 1",
    "sourceTitle": "Festival Gastronômico de Tiradentes",
    "sourceText": "Falante 1: [bipe] O Festival Gastronômico de Tiradentes, em Minas Gerais, recebe cinquenta mil visitantes apenas nos fins de semana. A festa é uma tradição da cidade, uma das mais charmosas do país.\n\nFalante 2: [música animada] Nas praças da histórica Tiradentes, é possível degustar o melhor da culinária mineira, com padrão internacional.\n\nFalante 3: É fantástico. É uma tradição brasile-- muito brasileira e que tem-- a gente tem que conhecer e preservar.\n\nFalante 2: Cheffes de cozinha capricham na criatividade dos pratos, que agregam sabor, muita história e tradição.\n\nFalante 4: E uma mistura de, de queijos especiais, queijos, ééé, fantásticos, é, como o capim-canastra, que, que acabou de ser premiado com a medalha de prata na França.\n\nFalante 2: Além de experimentar pratos deliciosos, o visitante também pode levar para casa conservas como a carne na lata, uma tradição em Divinópolis, no centro do Estado.\n\nFalante 5: A carne vem assim, ó.\n\nFalante 2: Ela, ela vem conservada aí?\n\nFalante 5: Vem conservada na, na própria banha que foi frita a carne, tá? Então, a carne vem com esses pedaços. É só você tirar a carne da lata, esquentá-la, tá pronta.\n\nFalante 2: O festival também conta com palestras dos renomados cheffes, que dão dicas e revelam alguns segredos. Esse espaço interativo aqui é um dos mais concorridos do festival. Aqui todos podem colocar literalmente a mão na massa, preparar e criar deliciosas receitas. E tudo na companhia do chefe de cozinha, que não para um minuto.\n\nFalante 6: Sentir o cheiro das preparações, e tal, e vocês vão ver que isso vai instigar alguma coisa.\n\nFalante 2: A aula promovida pelo Senac é gratuita.\n\nFalante 7: Que ele vai fazer uma trouxinha de couve com esse recheio dentro, de quiabo, com frango, com tomate. Mineiro sofisticado, né?\n\nFalante 4: Pô, só de tá em Tiradentes, num festival de, que hoje remete Minas pro mundo, né, que é a coisa, é de uma importância muito grande pra nós, os profissionais, e me sinto muito honrado de tá aqui.\n\nFalante 2: Nos oito fogões, gente que já cozinha ou interessada em aprender e que em tempos de crise pensa em investir ou apenas incrementar o almoço de domingo em casa.\n\nFalante 8: Muito bom reunir a família e saborear novas experiências.\n\nFalante 2: O festival, que termina no próximo domingo, é um deleite de cores e sabores e que deixa Tiradentes ainda mais charmosa nesta época do ano.",
    "keyFacts": [
      "as características",
      "as atrações desse festival"
    ],
    "mustDo": [
      "escrever no gênero pedido: notícia",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2017-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2017-1-t2",
    "cycle": "2017/1",
    "number": "Tarefa 2",
    "title": "Wattpad",
    "shortLabel": "2017/1 · T2",
    "genre": "e-mail ao professor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você está fazendo um curso de escrita criativa e, depois de ouvir a matéria sobre o Wattpad, resolveu sugerir uma discussão a respeito dessa ferramenta em sala de aula. Escreva uma mensagem por e-mail a seu professor, explicando o que é o Wattpad e como ele funciona.",
    "sourceKicker": "Insumo · prova 2017/1 · Tarefa 2",
    "sourceTitle": "Wattpad",
    "sourceText": "Falante 1: [som de bipe] [música alegre]\n\nFalante 2: Escritores iniciantes que antes enfrentavam um longo percurso até verem os seus livros publicados, ganharam com a web um novo canal de edição e divulgação. Este foi o meio escolhido por Felipe Salli, com seu livro \"Mais leve que o ar\", que chega agora à versão em papel. O autor utiliza o aplicativo Wattpad e nos conta sobre as mudanças no processo de produção de uma obra no ambiente virtual.\n\nFalante 3: Entre os escritores, antigamente, nós tínhamos um ditado que era que escrever é como contar uma piada e esperar quatro anos para alguém dar uma risada. Porque cê escrevia, depois você mandava pra editora, editava, cê publicava, fazia distribuição em todas as livrarias, alguém comprava e depois tinha um feedback se o seu livro foi interessante ou não. Com essa plataforma, você tem o feedback instantâneo. Em questão de dez minutos eu recebo cinquenta comentários num texto recém-colocado lá.\n\nFalante 2: No Brasil, a rede social de leitura já alcança mais de um milhão de usuários.\n\nFalante 3: É, o Wattpad é uma plataforma canadense, nós costumamos chamar de YouTube dos textos, né. YouTube, cê produz conteúdo em vídeo e disponibiliza pra qualquer pessoa assistir. O Wattpad, cê disponibiliza o seu texto pra qualquer um ler, que é uma tendência na internet, né, do usuário produzir o conteúdo para o usuário consumir.\n\nFalante 2: Tanto para quem escreve quanto para quem lê, é muito simples fazer uso do Wattpad.\n\nFalante 3: Bom, o Wattpad cê faz a sua conta e cê baixa o aplicativo e cê tem duas opções: cê pode simplesmente começar a ler os livros que tem lá. É super didático, super instintivo pra você ler, você salva a página que cê parou, ou você pode começar a produzir o conteúdo, publicar o seu próprio livro. Então cê simplesmente clica lá, Criar livro e joga seu texto e você pode separar por capítulos, pode colocar imagem, pode colocar vídeo. E o interessante dela é que ela tem a aba de comentários. Em todo capítulo, os leitores que leram podem comentar e interagir diretamente com o autor e podem grifar que eles acharam interessante comentar naquela frase.\n\nFalante 2: Com a web, os clubes de leitura, em que os leitores compartilham ideias e impressões sobre uma obra, inclusive com o seu autor, ganharam uma nova força, sobretudo entre os mais jovens.\n\nFalante 3: Sempre que surge uma to-- nova tecnologia, não apenas a tecnologia muda a, a forma como a pessoa consome algo, mas muda a forma como ela se comporta na vida, né? A tecnologia interfere na nossa sociedade.",
    "keyFacts": [
      "o que é o Wattpad",
      "como ele funciona"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail ao professor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2017-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2017-1-t3",
    "cycle": "2017/1",
    "number": "Tarefa 3",
    "title": "ONG Areia",
    "shortLabel": "2017/1 · T3",
    "genre": "carta de solicitação de apoio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ler a notícia sobre a ONG Areia, você decidiu escrever uma carta a empresas da região, solicitando apoio para a instituição. Em seu texto, apresente o fundador da ONG Areia, o trabalho que ele realiza e explique de que maneiras as empresas podem colaborar com esse trabalho voluntário.",
    "sourceKicker": "Insumo · prova 2017/1 · Tarefa 3",
    "sourceTitle": "ONG Areia",
    "sourceText": "ONG Areia pede ajuda para continuar trabalho voluntário em Araraquara DESAPÀkEClDA ONO AREIA \"ROC RENATINHA 016 3010106' DESAPARECI Zinho faz trabalho voluntário há quase 30 anos e ajuda a encontrar desaparecidos (Amanda Rocha/Tribuna) A ONG Areia (Agrupamento de Rádio Emissão Independente Araraquara) é reconhecida não só no Brasil, como também no exterior, principalmente por sua eficiência para encontrar pessoas desapa- recidas. De 1988 para cá, quando tudo começou, estima-se que oito mil famílias já reencontraram seus entes queridos. Isso só é possível graças ao vigi- lante José Aparecido Pessetti, de 55 anos, mais conhecido como Zinho Uirapuru, apelido que ganhou entre os amigos do rádio amador por \"falar demais\". E foi assim, falando demais, que ele dedicou grande parte da sua vida para ajudar os outros. Tudo começou em 1988, quando virou febre na cidade usarem o rádio amador para brincar de encontrar alguém. Com informações transmi- tidas das residências ou veículos, as pessoas disputavam para ver quem achava o \"tesouro\" primeiro para ganhar o troféu. Zinho, porém, viu que a ferramenta poderia ser mais útil. Desde então, Zinho se dedica dia e noite para ajudar famílias não só de Araraquara, mas de todo o Brasil. Ele nunca deixou de trabalhar e nem recebe por prestar esse serviço de utilidade pública, muito pelo contrá- rio, usa o que tem e o que não tem para ajudar o próximo. Para conti- nuar, porém, ele precisa de ajuda. Hoje, o trabalho de Zinho con- siste em ajudar a encontrar pessoas desaparecidas. Como ele faz isso? Divulgando no máximo de locais possíveis. Além de postar vídeos e fotos na internet, com depoimentos da família, ele também imprime centenas de fotos e cola em postes, espaços públicos e estabelecimen- tos. O problema é que Zinho não recebe nenhum tipo de verba muni- cipal, estadual ou federal para reali- zar esse serviço, então tira dinheiro do bolso para bancar tudo, com exceção de doações que recebe esporadicamente de cidadãos. Com a demanda crescendo e as contas também, no mês passado ele precisou vender seu rádio, aquele mesmo, comprado em 1988 e que já ajudou a encontrar 8 mil pessoas. \"Uso muito o telefone para ligar para outros estados, buscar pistas, procurar. Foram 800 reais de conta, cortaram minha linha, não tinha mais jeito\", conta. Agora, sem computador, impressora, câmera e rádio amador, fica cada vez mais difícil continuar sozinho. Se quiser ajudar a ONG Areia, entre em contato pelo telefone 3010-1067. Qualquer ajuda será bem-vinda para apoiar o trabalho voluntário. Disponível em: wwwararaquara.com/noticias!cidades/ cidades_ 1 75€*7. Acesso em: 6 ago 2016 (adaptado).",
    "sourceImage": "/writing/insumos/2017-1-t3.jpg",
    "keyFacts": [
      "o fundador da ONG Areia",
      "o trabalho que ele realiza",
      "explique de que maneiras as empresas podem colaborar com esse trabalho voluntário"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta de solicitação de apoio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2017-1-t4",
    "cycle": "2017/1",
    "number": "Tarefa 4",
    "title": "Bibliotecas",
    "shortLabel": "2017/1 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você leu o artigo de opinião abaixo apresentado, e resolveu escrever uma carta para a seção “Leitor”, respondendo à pergunta “Bibliotecas: metamorfose ou morte?”. Em seu texto, você deverá posicionar-se sobre o assunto, concordando ou discordando dos argumentos apresentados pelo autor.",
    "sourceKicker": "Insumo · prova 2017/1 · Tarefa 4",
    "sourceTitle": "Bibliotecas",
    "sourceText": "Bibliotecas: metamorfose ou morte? Quando buscávamos um livro, a solução era óbvia: bastava ir à biblioteca. Mas rondam tempesta- des ameaçando essa respeitável Em poucos anos, instituição. caberão em um notebook todos os livros produzidos na história da humanidade (as estimativas flutuam entre 42 milhões e 130 milhões). Um pouco adiante, e enfia-se tudo em um celulac Para que biblioteca? Periódicos científicos e muitas Outras publi- cações migram para a sua versão digital, o mesmo acontecendo com os jornais. Diante do www, é risível o tamanho das bibliotecas em papel. A Wikipedia esmaga a mais ambiciosa enciclopédia tradicional. E para quê bibliotecário se o \"Santo Google\" acha tudo rapidinho? Por 10 dólares ou pouco mais, a versão digital de praticamente todos os livros em inglês pode ser comprada na Amazon. Um minuto depois de um só clique, o livro está em nosso poder. É inevitável que o Brasil vá pelo mesmo caminho — apesar do atraso presente. E não há como impedir a digitalização pirata de livros populares. Diante disso tudo, o que será das bibliotecas? São caras, e seu acervo no Brasil é inferior ao de muitos países. Pior, falta-nos o hábito de frequentá-las. Portanto, se definharem, sua falta não será notada. As notícias sobre a morte das bibliotecas podem ser exageradas. De fato, seu lugar no futuro pode estar assegurado, desde que elas se transformem. Biblioteca careta e chata não sobreviverá. Como depó- sito de livros, está condenada. É sintomático que algumas bibliotecas americanas tenham levado seus livros para depósitos, pois havia muitos usos mais nobres para o espaço. Eis a pista para a salvação: a biblioteca do futuro será um canivete suíço, fará tudo. Se bem concebida, ela será um lugar aonde vamos sem pensar muito no que faremos lá. Vamos porque nos atrai, porque é bom estar nela. Para inicio de conversa, precisa ser supremamente formosa, tura externa tem de dar vontade de entrar. A interna, de ficar. Seu ambiente será agradável como as Starbucks e os restau- rantes chineses do Vale do Silício. Haverá abundância de jornais, revistas e livros de interesse geral. E, cada vez mais, vídeos. Livros desinteressantes, porém, doados por alguma viúva (três quartos dos nossos acervos são dessa origem), não trazem ninguém às bibliotecas. De depósitos de livros, passam a oferecer quase tudo. Alguns espaços são silenciosos. para ler. Em outros, conversamos ou nos reunimos .com projetor de Powerpoint). Algumas poucas estão voltadas para a pesquisa, uma função essencial e cara. Mas, se a Amazon consegue entregar no dia seguinte os livros comprados, as bibliotecas também poderão. Títulos pouco procurados não pre- cisam de mais de um exemplar, talvez no país inteiro. Basta um sistema para tomar emprestado, rapidamente, do acervo de outras bibliotecas. Na nova biblioteca, salas e audi- tórios promovem conferências, con- certos e exposições. Por que não jardins lindos, para os criativos filó- sofos? Ou espaços para meditar? No fundo, a biblioteca deve tornar- se um lugar de leitura, troca de ideias e interação criativa entre os frequentadores. Enfim, uma usina intelectual, contribuindo para o avanço do país. Naturalmente, quando bate a fome, lá comemos. E, afinal, um lugar onde se leem e se tomam livros emprestados por que não os vende também? Assunto e clientela são os mesmos das livrarias. A fórmula salvadora já existe e é resumida pela celebrada arquiteta Maya Lin. Para ela, bibliotecas são os templos de hoje, espaços para reflexão, exploração intelectual e discussão de ideias. Mas engana- se quem pensa ser revolucionária tal visão. De fato, a primeira grande biblioteca que o mundo conheceu, a de Alexandria, tinha como ponto de partida uma arquitetura memo- rável, e sua concepção antecipa essa linha. Além dos livros, tinha jardins, exposições de arte, concer- tos e outras atividades culturais. No dizer de um contemporâneo, \"era um lugar para curar a alma\". Ou seja, eis a receita para salvar nossas bibliotecas. Não é preciso inventar nada. CASTRO. Cláudio de M. Bibliotecas: metamorfose ou morte? Irr. Revista Veja, 26 ago. 2015, p. 24 (adaptado).",
    "sourceImage": "/writing/insumos/2017-1-t4.jpg",
    "keyFacts": [
      "apresentado",
      "resolveu escrever uma carta para a seção “Leitor”",
      "respondendo à pergunta “Bibliotecas: metamorfose ou morte?”"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2016-2-t1",
    "cycle": "2016/2",
    "number": "Tarefa 1",
    "title": "Museu da Imigração",
    "shortLabel": "2016/2 · T1",
    "genre": "matéria para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é o responsável pelo site do Setor de Relações Internacionais de sua universidade. Depois de assistir à reportagem sobre o Museu da Imigração, decidiu publicar no site uma matéria para incentivar a visita dos alunos estrangeiros ao local. Em seu texto, apresente o museu e os espaços disponíveis para visitação.",
    "sourceKicker": "Insumo · prova 2016/2 · Tarefa 1",
    "sourceTitle": "Museu da Imigração",
    "sourceText": "Falante 1: [bipe] Olha que legal! Fim de semana tá aí, tem um programão pra família toda, é o Museu da Imigração. Tava fechado faz mais de dois anos pra uma reforma e vai reabrir amanhã. E agora tá mais bonito, todo tecnológico. A nossa repórter Ananda Apple foi lá conferir e mostra pra gente em primeira mão.\n\nFalante 2: Saiu o rosa salmão e entrou a cor original do prédio. Aqui era uma antiga hospedaria, por onde passaram mais de dois milhões e meio de pessoas de setenta nacionalidades. E o que ficou do passado revela a vida difícil de quem chegou praticamente só com a roupa do corpo. Painéis de LED mostram como foi a imigração no Brasil, desde o deslocamento dos índios, passando pela colonização portuguesa e a vinda forçada dos escravos. Há também imagens de hospedarias de outros países, como Alemanha e Itália. Ao tocar na tela, você escolhe o que quer conhecer. Móveis e equipamentos usados na hospedaria do Brás dão uma ideia de como era a enfermaria, onde os imigrantes doentes eram tratados. Em toda hospedaria tem um refeitório, como recriado nesse ambiente. Esse barulhinho que se ouve de fundo é gente conversando, batendo prato, talher, como durante um almoço. E nas mesas da cantina, a gente vê a projeção de fotos da rotina desse refeitório e da hospedaria. E aqui também tem um grande gaveteiro, quinhentas gavetas desse e do outro lado, em que a gente pode abrir alguns e descobrir réplicas de documentos, como essa carta da Itália, que é de 1912. E assim a gente se sente como que descobrindo os segredos das famílias.\n\nFalante 3: E a gente também aqui tem, em vários momentos da exposição, depoimentos das pessoas que ficaram aqui na hospedaria, nos noventa e um anos da história da hospedaria de imigrantes do Brás.\n\nFalante 2: A nova exposição registra o cotidiano de quatro bairros paulistanos marcados pela imigração: Brás, Bom Retiro, Mooca e Santo Amaro. Com o tempo, haverá outros. Na saída, um grande painel em madeira tem gravado seis mil nomes estrangeiros que fizeram a riqueza dessa história. Certamente, você vai achar um pouco da sua família ou de seus amigos por aqui.\n\nFalante 1: Que bacana, né, gente? O Museu da Imigração fica na Rua Visconde de Parnaíba, mil trezentos e dezesseis, na Mooca. Vai funcionar de terça a sábado, das nove da manhã às cinco da tarde, e aos domingos, das dez às cinco. Em junho e julho, olha aí, ó, a entrada é de graça. [bipe] Olha que legal! Fim de semana tá aí, tem um programão pra família toda, é o Museu da Imigração. Tava fechado faz mais de dois anos pra uma reforma e vai reabrir amanhã. E agora tá mais bonito, todo tecnológico. A nossa repórter Ananda Apple foi lá conferir e mostra pra gente em primeira mão.\n\nFalante 2: Saiu o rosa salmão e entrou a cor original do prédio. Aqui era uma antiga hospedaria, por onde passaram mais de dois milhões e meio de pessoas de setenta nacionalidades. E o que ficou do passado revela a vida difícil de quem chegou praticamente só com a roupa do corpo. Painéis de LED mostram como foi a imigração no Brasil, desde o deslocamento dos índios, passando pela colonização portuguesa e a vinda forçada dos escravos. Há também imagens de hospedarias de outros países, como Alemanha e Itália. Ao tocar na tela, você escolhe o que quer conhecer. Móveis e equipamentos usados na hospedaria do Brás dão uma ideia de como era a enfermaria, onde os imigrantes doentes eram tratados. Em toda hospedaria tem um refeitório, como recriado nesse ambiente. Esse barulhinho que se ouve de fundo é gente conversando, batendo prato, talher, como durante um almoço. E nas mesas da cantina, a gente vê a projeção de fotos da rotina desse refeitório e da hospedaria. E aqui também tem um grande gaveteiro, quinhentas gavetas desse e do outro lado, em que a gente pode abrir alguns e descobrir réplicas de documentos, como essa carta da Itália, que é de 1912. E assim a gente se sente como que descobrindo os segredos das famílias.\n\nFalante 3: E a gente também aqui tem, em vários momentos da exposição, depoimentos das pessoas que ficaram aqui na hospedaria, nos noventa e um anos da história da hospedaria de imigrantes do Brás.\n\nFalante 2: A nova exposição registra o cotidiano de quatro bairros paulistanos marcados pela imigração: Brás, Bom Retiro, Mooca e Santo Amaro. Com o tempo, haverá outros. Na saída, um grande painel em madeira tem gravado seis mil nomes estrangeiros que fizeram a riqueza dessa história. Certamente, você vai achar um pouco da sua família ou de seus amigos por aqui.\n\nFalante 1: Que bacana, né, gente? O Museu da Imigração fica na Rua Visconde de Parnaíba, mil trezentos e dezesseis, na Mooca. Vai funcionar de terça a sábado, das nove da manhã às cinco da tarde, e aos domingos, das dez às cinco. Em junho e julho, olha aí, ó, a entrada é de graça.",
    "keyFacts": [
      "os espaços disponíveis para visitação"
    ],
    "mustDo": [
      "escrever no gênero pedido: matéria para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2016-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2016-2-t2",
    "cycle": "2016/2",
    "number": "Tarefa 2",
    "title": "Como lidar com a ansiedade no trabalho",
    "shortLabel": "2016/2 · T2",
    "genre": "e-mail à equipe",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é gerente de uma empresa e, após ter ouvido a entrevista, decidiu escrever uma mensagem por e-mail para a sua equipe, expondo as recomendações para lidar com a ansiedade coorporativa e melhorar a qualidade de vida no trabalho.",
    "sourceKicker": "Insumo · prova 2016/2 · Tarefa 2",
    "sourceTitle": "Como lidar com a ansiedade no trabalho",
    "sourceText": "Falante 1: [bipe] Muito bom dia pra você, Adriano Silva.\n\nFalante 2: Bom dia, Milton. Bom dia, amigos.\n\nFalante 1: Desde a semana passada, nós estamos falando aqui sobre ansiedade corporativa. E a regra número um do combate a esta ansiedade, você nos ensinou, é se ater ao presente. Qual é o próximo passo?\n\nFalante 2: Milton, uma outra regra bacana, quer dizer, quem sou eu aqui pra falar de, de regras, mas assim, eu tô compartilhando aqui comportamentos que eu enfrento e soluções que eu encontrei pra mim mesmo.\n\nFalante 1: Até porque você já disse no último comentário, de forma sincera, que você também é um ansioso.\n\nFalante 2: É isso aí. Além de ser um executivo sincero, eu sou um executivo ansioso.\n\nFalante 1: [risos]\n\nFalante 2: E eu tenho, obviamente, tentado lidar com essa situação, é, ao longo da minha carreira, da minha vida. E uma outra regra, uma outra dica, é a gente manter o foco em fazer uma coisa de cada vez. Você manter o foco pro ansioso é, é um exercício difícil e ao mesmo tempo muito útil, muito útil. Quer dizer, não estabeleça pra você mais metas do que você realmente pode cumprir naquele espaço de tempo e foque em estabelecer uma meta, um objetivo por vez. Só passe para o segundo objetivo quando você tiver cumprido o primeiro. Isso é importantíssimo pro ansioso organizar não apenas o seu dia a dia, a sua agenda, mas organizar a sua cabeça. Você só pode resolver coisas que estão à sua frente. O pior momento pra você pensar na vida e pra você querer controlar as coisas, é de madrugada na cama, rolando de um lado pro outro. Aí é quando você não vai conseguir resolver nada mesmo.\n\nFalante 1: Pois eu fico pensando a dificuldade que é fazer isso, principalmente porque nós somos cobrados cada vez mais e muitos de nós acreditamos que somos multitarefa. Como fazer uma coisa de cada vez dentro desse cenário?\n\nFalante 2: A gente sempre vai ter uma agenda cheia, mas a gente tem que atacar um ponto dessa agenda de cada vez. É o melhor, a melhor forma de você zerar essa agenda, você atacar uma página dessa agenda de cada vez e aí descer com foco, fazer bem feito, fazer com atenção. O multitarefa não pode representar pra gente fazer com pouca atenção, com pouca paixão, com pouca inteligência depositada naquela tarefa específica. Então, a recomendação é: ok, você tem dez coisas pra fazer. Faça uma de cada vez, com o mesmo capricho e com a mesma atenção. E só se preocupe com a próxima, quando você tiver realizado a anterior. Ou seja, quem se ocupa de alguma coisa, não precisa se preocupar com nada.",
    "keyFacts": [
      "Como lidar com a ansiedade no trabalho"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail à equipe",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2016-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2016-2-t3",
    "cycle": "2016/2",
    "number": "Tarefa 3",
    "title": "Cadastro de hortas",
    "shortLabel": "2016/2 · T3",
    "genre": "post de blog",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você tem um blog sobre alimentação saudável e, depois de ler a notícia sobre o cadastro de hortas em São Paulo, decidiu implementar essa iniciativa em sua cidade. Escreva um texto em seu blog para pedir a participação dos leitores no cadastramento, explicando o funcionamento e a utilidade das informações coletadas.",
    "sourceKicker": "Insumo · prova 2016/2 · Tarefa 3",
    "sourceTitle": "Cadastro de hortas",
    "sourceText": "À procura de hortas em plena São Paulo permita a inclusão de cultivos urbanos em todo o país — já era antiga, conta ao blog Regiane Nigro. E foi finalmente posta em prática há cerca de 15 dias, para servir como base de uma reunião que Claudia Visoni teria com pessoas de outros países interessadas no tema hoflas urbanas. \"Foi este o motivador para o projeto começar a andar\", conta Regiane. Se inicialmente, há cerca de cinco anos, quando a \"onda\" do resgate urbano da natureza começou aqui em São Paulo, as hortas cultivadas em plena metrópole eram raras, agora pode-se dizer que elas já têm animado bastante gente disposta a inserir mais verde na selva de pedra. Na maioria dessas hortas, dá-se preferência ao cultivo orgânico. Regiane conta que a plataforma é importante também para estimular os produtores comerciais orgânicos a incluírem suas hortas ali e se tornarem mais conhecidos — afinal, muitos deles fornecem, em sistema de Até esta manhã, eram 25 hortas cadastradas, sendo 20 de caráter \"educativo\" — ou seja, comunitárias e escolares — e 5 \"comerciais\" quer dizer, voltadas à produção e venda de alimentos. O que elas têm em comum? Estão todas dentro do município de São Paulo. Várias — olhem só! — em densas áreas urbanas, como nos bairros de Vila Madalena, Vila Mariana, Pompeia, Mooca, Cambuci, Casa Verde, Sapopemba, Vila Nova Esperança, Jardim Ângela... Já as \"comerciais\" inserem-se sobretudo na zona rural paulistana. Desde 2014 a cidade de São Paulo \"ganhou\" uma área rural, ou melhor, porções do território paulistano situadas principalmente nos extremos sul e leste da capital passaram a ser reconhecidas como \"rurais\". Esses dados vêm de uma pesquisa colaborativa em pleno andamento. Quem souber da existência de alguma horta urbana e orgânica sendo cultivada em algum \"rincão\" da metrópole pode entrar na plataforma Wikiversidade e inserir os dados ali. Tem de preencher o nome da horta; se ela é educativa ou comercial; a região em que está; o bairro; o endereço e, por fim, o link para contato. O cadastramento dessas hortas urbanas foi iniciado pela dupla Regiane Nigro, que trabalha no Instituto Kairós, em São Paulo, e ajornalista e uma das fundadoras do grupo Hortelões Urbanos, Claudia Visoni. Ambas têm forte atuação em duas dessas h01tas comunitárias, a da Praça das Corujas, na Vila Madalena, e também a Horta do Ciclista, na Praça do Ciclista, região da Avenida Paulista. Regiane atua também, pelo Kairós, com os produtores da Associação de Agricultores da Zona Leste, que contempla bainos do extremo leste paulistano, como São Mateus, Guaianases, Cidade Tiradentes e São Miguel Paulista. A ideia de cadastrar todas as hortas paulistanas — embora a plataforma também compra coletiva, alimentos para a metrópole, entre outras formas de comercialização. Atualmente, nos 'ñcões\" paulista- nos, um dos grupos mais organizados de agricultores — e que já estão lá no cadastro — é o da Cooperapas, no extremo sul da capital, região de Parelheiros. Outra grande utilidade deste cadastro é atrair mais pessoas interessa- das em se tornarem voluntárias no cultivo orgânico em plena cidade. Claudia Visoni, ao chamar, num grupo do Facebook, as pessoas a colaborarem com o cadastramento das hortas, comenta que o registro é \"importante para estudos acadêmicos, para os voluntários acharem uma horta perto de casa, para possíveis apoiadores (dos agricultores profissionais) e também para quem não está no Facebook\". E continua: \"Quem puder, ajude a incluir as hoflas que ainda não estão na tabela. Quem quiser criar tabelas para outras cidades, é só fazer. A plataforma Wiki é totalmente colaborativa e fácil de editar\". Disponivel em: http://vida-estilo.estadao.com.brfblogs/alimentos-organicos/a-procura-de-hortas-em-plena-sao-paulo/. Acesso em: 5 ago. 2016 (adaptado).",
    "sourceImage": "/writing/insumos/2016-2-t3.jpg",
    "keyFacts": [
      "o funcionamento",
      "a utilidade das informações coletadas"
    ],
    "mustDo": [
      "escrever no gênero pedido: post de blog",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2016-2-t4",
    "cycle": "2016/2",
    "number": "Tarefa 4",
    "title": "Shopping em casa",
    "shortLabel": "2016/2 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ler o texto “Shopping em casa”, você decidiu escrever para a seção Cartas do Leitor do jornal O Estado de São Paulo, defendendo seu ponto de vista em relação às questões levantadas por Denise Fraga.",
    "sourceKicker": "Insumo · prova 2016/2 · Tarefa 4",
    "sourceTitle": "Shopping em casa",
    "sourceText": "Shopping em casa —Que bonita esta saia! — Pois é, estava perdida — ela me respondeu. — Você perdeu uma saia? — Sim, dentro do meu armário. Arrumando as coisas pra mudança, eu achei. Esta conversinha banal com minha amiga aumentou a minha angústia. Será que preciso de uma mudança pra conseguir achar o que anda perdido diante dos meus olhos? Muitas vezes, tenho a sensação de não ter o que vestir diante do meu guarda- roupa lotado e fico doida cobiçando um novo vestido na vitrine do shopping. No outro dia, comprei uma blusa que tinha amado e, quando fui pendurá-la no armário, vi que sua vizinha de cabide era sua prima. O curioso é que, se fosse a blusa antiga que estivesse na loja, eu a compraria de novo. Mais curioso: ela estava lá, eu sabia que tinha e pouco a usava. A blusa nova me devolvera a velha, que passei a usar com prazer. Mas por que comprei uma nova se havia uma quase igual pendurada? Que fenômeno é esse de precisar do que já se tem? Que cegueira é esta para o que está ao seu lado? Será a galinha do vizinho sempre mais gorda? Adquirir é melhor do que ter? Não sou exatamente consumis- ta, mas olho a minha casa e, apesar de morrer de amores por meus objetos, sinto que há uma infinidade de coisas que eu realmente poderia viver sem. O curioso é que, se descuidar, se me forem oferecidas, estou arriscada a comprá-las de novo. E realmente muito violento o impulso consumista a que fomos doutrinados. Nem precisamos ir ao shopping. Vivemos em uma feira constante. Meu e-mail está lotado de propostas de vendas que nem desconfio como chegaram ali. A internet virou, como previsto, um mar de publicidade que, a um clique, desfalca nossa conta bancária. Tudo pela estrela maior: o dinheiro, o circular da moeda. Cada vez mais produtos, cada vez mais necessi- dades desnecessárias. Não entendo nada de economia, mas gostaria de viver num mundo com menos coisas. Gostaria de morar numa casa com menos coisas, ter um armário com menos roupas. Resolvi fazer um exercício: promover as vitrines a uma exposição de arte. A arte de um artista poderoso e midiático que se chama Mercado e de quem estou longe de poder adquirir uma obra. Mesmo sem ter que mudar de apartamento, vou tirar as coisas de meu armário, colocar sobre a cama para comprar com meu novo olhar os meus velhos vestidos. Liberdade é viver com pouco. Disponível em: w•.vwl.folha.uol.com.br/colunas/denisefraga/2016/02/1739053-shopping-em-casa.shtml. Acesso em: 5 ago. 2016 (adaptado).",
    "sourceImage": "/writing/insumos/2016-2-t4.jpg",
    "keyFacts": [
      "Shopping em casa"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2016-1.2-t1",
    "cycle": "2016/1.2",
    "number": "Tarefa 1",
    "title": "Exporta Fácil Correios",
    "shortLabel": "2016/1.2 · T1",
    "genre": "depoimento para revista",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Pelo fato de sua empresa ter tido uma experiência bem sucedida no Programa Exporta Fácil, você foi convidado pela Associação Comercial de sua cidade a dar um depoimento para a revista da Associação. Para incentivar a participação de outras pequenas empresas no mercado internacional, faça um relato de sua experiência, apresentando informações sobre o Programa.",
    "sourceKicker": "Insumo · prova 2016/1.2 · Tarefa 1",
    "sourceTitle": "Exporta Fácil Correios",
    "sourceText": "Falante 1: Fios de algodão entrelaçados em cores do cerrado. Estas duas irmãs transformaram uma ideia simples em projeto avançado: produzir roupas que tenham a cara do Brasil para ser artigos de exportação, itens dignos de passarela.\n\nFalante 2: [música animada]\n\nFalante 1: Sônia e Sandra decidiram montar a própria empresa. O negócio deu certo e começou a ultrapassar as fronteiras do Brasil. Elas já vendem para a América do Sul e querem chegar à Europa.\n\nFalante 3: A empresa já nasceu com essa ideia de globalização, né? Porque nós, é, já tínhamos, assim, uma ideia pra onde nós gostaríamos de ir.\n\nFalante 4: Então, quando nós levamos o nosso produto lá pra fora, nós tamos levando o brasileiro.\n\nFalante 1: Foi com o Exporta Fácil que elas atingiram o mercado internacional. O Exporta Fácil reduziu a papelada a um formulário encontrado na internet. Com o documento preenchido, basta ir a uma agência dos Correios, entregar a mercadoria e a nota fiscal. Depois disso, o caminho burocrático fica por conta do governo, até a hora do embarque. O programa foi criado há onze anos para ajudar micro e pequenos empresários. É operado pelos Correios sob a orientação do Ministério das Comunicações. Os números comprovam o crescimento do programa. Nesses onze anos, doze mil empresários mandaram para fora do país cerca de oito mil tipos de produtos. O destino: cento e sessenta nações diferentes. Além de fortalecer a cultura exportadora entre micro e pequenos empresários, o programa atingiu também um outro objetivo.\n\nFalante 5: No momento que você ajuda o mi-micro e pequeno empresário a exportar, tá ajudando o país a receber divisas e com isso também ajuda o, o mercado interno, que isso vai gerar mais emprego dentro do, do mercado, porque vai ser necessário uma produção maior pra tá enviando pro exterior.\n\nFalante 1: Agora, a experiência brasileira com as exportações por envios postais vai se transformar em modelo para o mundo todo. É que em maio, o Brasil e a União Postal Universal, agência das Nações Unidas para o assunto, vão assinar um documento que transforma o Exporta Fácil em referência. Técnicos do Ministério das Comunicações vão produzir um guia, um passo a passo completo com indicações técnicas sobre o Exporta Fácil, para implantar o programa em qualquer outro lugar do mundo.\n\nFalante 6: A ideia é usar a cadeia de operadores postais públicos pra montar uma logística que facilite a inserção das pequenas empresas no comércio internacional. O Brasil, por meio desse projeto, dá um excelente exemplo de como atuar no cenário internacional de forma solidária, de forma exitosa, apoiando setores produtivos de outros países e promovendo uma política pública de inclusão.\n\nFalante 2: [ruído de motor] [bipe]",
    "keyFacts": [
      "informações sobre o Programa"
    ],
    "mustDo": [
      "escrever no gênero pedido: depoimento para revista",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2016-1.2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2016-1.2-t2",
    "cycle": "2016/1.2",
    "number": "Tarefa 2",
    "title": "Calendário indígena",
    "shortLabel": "2016/1.2 · T2",
    "genre": "texto de abertura de site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é pesquisador do grupo que analisa as mudanças climáticas da região do Alto Rio Negro, no Amazonas, e ficou responsável por escrever o texto de abertura do site-calendário interativo (ciclostiquie.socioambiental.org) apresentando os resultados desse trabalho. Em seu texto, descreva a pesquisa e seus participantes, ressaltando a relevância da investigação que está sendo feita.",
    "sourceKicker": "Insumo · prova 2016/1.2 · Tarefa 2",
    "sourceTitle": "Calendário indígena",
    "sourceText": "Falante 1: [som de bip] Um calendário desenvolvido por grupos indígenas do Alto Rio Negro, no Amazonas, tem revelado de que forma as mudanças climáticas afetam os ciclos anuais da natureza na região. O trabalho, apresentado na última conferência do clima em Paris, se baseia nos conhecimentos tradicionais dos índios que moram nas redondezas do rio Tiquie. O estudo tem como referência etapas hidrológicas e biológicas, fases da Lua e constelações astronômicas. Com um projeto intercultural realizado por pesquisadores indígenas e estudiosos do Instituto Socioambiental, os povos tradicionais no noroeste do Amazonas buscam entender os ciclos para conservar territórios e recursos naturais. O antropólogo e coordenador da pesquisa, Aloisio Cabalzar, explica como é feito o trabalho.\n\nFalante 2: Essa pesquisa tem esse foco, né, na questão do tempo, né? Como que eles percebem, é, esses ciclos. A partir desse conhecimento deles, a gente começou a introduzir algumas metodologias, assim, de, de observação e registro mais sistemático, né. E a gente faz algumas oficinas com eles todos os anos pra organizar e sistematizar um pouco essa informação. Então a gente tá conseguindo fazer um-uma descrição de cada ciclo anual. A partir disso, a gente tá começando a comparar um ano com o outro.\n\nFalante 1: O objetivo das comparações anuais, segundo Aloisio, é observar de que forma as mudanças climáticas afetam localmente essas populações. André Banua é liderança indígena na região e destaca algumas alterações observadas nos processos naturais.\n\nFalante 2: Acho que esse trabalho foi muito importante pra que as comunidades possam entender o que tá acontecendo, é, e conhecer, é, que isso é influência de mudanças climáticas e que afeta a vida das comunidades e que é difícil de resolver, é, localmente. Por exemplo, é, é, início de, de inverno, a primeira chuva que traz piracema, não tem mais acontecido obedecendo o calendário tradicional, né? Porque às vezes a chuva adianta ou atrasa demais. E os velhos têm se questionado em relação a isso, né? O que que tá acontecendo?\n\nFalante 1: O trabalho intercultural já existe há aproximadamente dez anos, mas agora as informações estão reunidas num site calendário interativo: ciclostiquie.socioambiental.org e já podem ser facilmente acessadas. O site apresenta vídeo, mapa e textos explicativos sobre a pesquisa, a metodologia, comunidades e territórios envolvidos no trabalho. De Brasília, Maíra Rainen. [som de bip] Um calendário desenvolvido por grupos indígenas do Alto Rio Negro, no Amazonas, tem revelado de que forma as mudanças climáticas afetam os ciclos anuais da natureza na região. O trabalho, apresentado na última conferência do clima em Paris, se baseia nos conhecimentos tradicionais dos índios que moram nas redondezas do rio Tiquie. O estudo tem como referência etapas hidrológicas e biológicas, fases da Lua e constelações astronômicas. Com um projeto intercultural realizado por pesquisadores indígenas e estudiosos do Instituto Socioambiental, os povos tradicionais no noroeste do Amazonas buscam entender os ciclos para conservar territórios e recursos naturais. O antropólogo e coordenador da pesquisa, Aloisio Cabalzar, explica como é feito o trabalho.\n\nFalante 2: Essa pesquisa tem esse foco, né, na questão do tempo, né? Como que eles percebem, é, esses ciclos. A partir desse conhecimento deles, a gente começou a introduzir algumas metodologias, assim, de, de observação e registro mais sistemático, né. E a gente faz algumas oficinas com eles todos os anos pra organizar e sistematizar um pouco essa informação. Então a gente tá conseguindo fazer um-uma descrição de cada ciclo anual. A partir disso, a gente tá começando a comparar um ano com o outro.\n\nFalante 1: O objetivo das comparações anuais, segundo Aloisio, é observar de que forma as mudanças climáticas afetam localmente essas populações. André Banua é liderança indígena na região e destaca algumas alterações observadas nos processos naturais.\n\nFalante 2: Acho que esse trabalho foi muito importante pra que as comunidades possam entender o que tá acontecendo, é, e conhecer, é, que isso é influência de mudanças climáticas e que afeta a vida das comunidades e que é difícil de resolver, é, localmente. Por exemplo, é, é, início de, de inverno, a primeira chuva que traz piracema, não tem mais acontecido obedecendo o calendário tradicional, né? Porque às vezes a chuva adianta ou atrasa demais. E os velhos têm se questionado em relação a isso, né? O que que tá acontecendo?\n\nFalante 1: O trabalho intercultural já existe há aproximadamente dez anos, mas agora as informações estão reunidas num site calendário interativo: ciclostiquie.socioambiental.org e já podem ser facilmente acessadas. O site apresenta vídeo, mapa e textos explicativos sobre a pesquisa, a metodologia, comunidades e territórios envolvidos no trabalho. De Brasília, Maíra Rainen.",
    "keyFacts": [
      "os resultados desse trabalho"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de abertura de site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2016-1.2/tarefa2-audio.mp3"
    }
  },
  {
    "id": "2016-1.2-t3",
    "cycle": "2016/1.2",
    "number": "Tarefa 3",
    "title": "Uso da madeira",
    "shortLabel": "2016/1.2 · T3",
    "genre": "texto de apresentação de projeto",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "O governo de Brasília vai lançar um projeto para incentivar o uso de madeira em novas construções. Você trabalha na Secretaria de Obras e ficou responsável por escrever o texto de apresentação desse projeto para ser enviado às empresas de arquitetura e engenharia da cidade. Em seu texto, apresente os benefícios do uso da madeira e ressalte as possibilidades desse uso.",
    "sourceKicker": "Insumo · prova 2016/1.2 · Tarefa 3",
    "sourceTitle": "Uso da madeira",
    "sourceText": "USO da madeira Amantes da arquitetura e interessados no uso sustentável da madeira na construção não podem perder a mostra em cartaz até 13 de dezembro no Espaço Angatu, sede do WWF-BrasiI, no Lago Sul. Arquitetura da Madeira no Século XXI apresenta a reprodução de construções sustentáveis feitas com madeira espalhadas pelo mundo inteiro. São II maquetes de residências, ateliês, capelas, pavilhões, bibliotecas, passarelas, museus, pontes, vinícolas, edificios e casas de árvore de diversos locais do Brasil e do mundo, feitas, em sua maioria, por estudantes de arquitetura. A exposição celebra o potencial da madeira na construção civil, que tem baixa poluição e durabilidade maior. Segundo especialistas, a madeira é um dos poucos materiais que reúne qualidade, duração e contemporaneidade para a construção de estruturas. Em terremotos, abalos sísmicos e, até mesmo, durante incêndios, ao contrário do que muitos pensam, as estruturas de madeira são muito mais resistentes e demoram mais para serem abaladas. Além das maquetes, o público pode conferir 24 painéis com textos e fotografias que mostram como utilizar a madeira para construir diversos tipos de estruturas. No cenário mundial e contemporâneo, a construção de madeira é largamente utilizada. Entre as obras que podem ser observadas na exposição, há reprodução de edificações no Chile, Japão, Estados Unidos, Austria, Nova Zelândia, Suíça e Inglaterra. Cultura do Concreto De acordo com o especialista de conservação do WWF-BrasiI, Ricardo Russo, o concreto ainda é o material mais utilizado no País. \"No Brasil, existe a cultura do concreto. Em locais como a Europa, por exemplo, temos cidades inteiras de madeira. A região está 20 anos à frente da gente em relação ao uso do material\", disse. Além disso, ao utilizar madeira certificada na arquitetura, o público contribui com a conservação das florestas brasileiras, a geraçào de renda das comunidades e o amadurecimento do mercado de construção sustentável. A madeira, inclusive, se bem explorada, pode vir a ser um grande fator para promover o emprego apropriado dos recursos naturais. WWF entrou no projeto para fortalecer o uso da madeira com qualidade e responsabilidade. A utilização desse tipo de madeira garante a permanência da floresta\", acrescentou. O arquiteto e curador da exposição, Marcelo Aflalo, explica que o Brasil tem o maior estoque de madeira na construção civil do mundo, mas não usa direito. Segundo ele, em países em que o concreto não se firmou como material dominante, a madeira adquiriu contornos mais diversificados e conquistou pranchetas e computadores em pé de igualdade com o metal, plástico e concreto. \"No mundo todo, a indústria da construção civil é uma das mais poluentes. O impacto ambiental do concreto e aço é enorme. Durante a Rio 92, o painel climático da Organização das Nações Unidas (ONU) passou a recomendar a madeira para diminuir o impacto ambiental da construção civil, ou seja, quanto mais madeira você utilizar, melhor, desde que ela não seja fruto de desmatamento e, sim, de uma exploração racional. Quando você constrói casas ou mobiliários de madeira, o gás carbônico fica retido nela, por exemplo\", disse. Segundo Marcelo, atualmente, a região Sudeste é a que mais produz obras de madeira de qualidade, principalmente, a cidade de São Paulo. Mas, como muitos brasilienses lembram, a primeira construção oficial de Brasília foi o Palácio do Catetinho, feito de madeira — obra que dura até hoje. \"Brasília é o berço da arquitetura do concreto. Existe essa cultura na Capital, há uma população que nunca viu madeira antes\", explicou. Ricardo Russo também complementa que o baixo uso na Capital é realmente uma questão cultural. Disp€mívcl em: Acesso env 25 nov. 201 S (adaptado),",
    "sourceImage": "/writing/insumos/2016-1.2-t3.jpg",
    "keyFacts": [
      "desse projeto para ser enviado às empresas de arquitetura",
      "engenharia da cidade"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de apresentação de projeto",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2016-1.2-t4",
    "cycle": "2016/1.2",
    "number": "Tarefa 4",
    "title": "O Movimento dos sem-calça",
    "shortLabel": "2016/1.2 · T4",
    "genre": "e-mail de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "A empresa em que você trabalha está considerando a possibilidade de liberar o uso da bermuda no ambiente de trabalho e solicitou que os funcionários dessem sua opinião sobre o assunto. Para embasar a discussão, a empresa disponibilizou a matéria “O movimento dos sem-calça”. Com base nessa matéria, escreva um email para o setor de recursos humanos, posicionando-se e argumentando a favor ou contra a adoção dessa nova tendência na empresa.",
    "sourceKicker": "Insumo · prova 2016/1.2 · Tarefa 4",
    "sourceTitle": "O Movimento dos sem-calça",
    "sourceText": "O Movimento dos sem-calça Depois do conjunto safári, a bermuda é a nova tentativa de roupa leve no ambiente de trabalho. Será que vai pegar? Trabalhar no verão não é fácil, mas nossos costumes tornam isso ainda mais dificil. Como se não bastasse o desejo constante de estar na praia, e não numa sala fechada, as roupas formais usadas com tranquilidade no resto do ano se transformam num suplício. Por mais que os ambientes de trabalho tenham ar- condicionado, os meios de transporte se tornam saunas coletivas. Mesmo quem vai ao trabalho dentro de um carro refrigerado não consegue escapar do calor — e do suor — na hora do almoço. Os publicitários cariocas Ricardo Ruliere, Guilherme Anchieta e Vitor Damasceno querem acabar com esse sofrimento. Os três trabalham em agências que liberam o uso de bermudas no verão. Para ajudar quem não tem esse privilégio, criaram a campanha: #Bermudasim. O objetivo é convencer chefes de que a bermuda torna o funcionário mais feliz e produtivo. \"Vivemos num país onde a sensação térmica no verão chega a 50 graus\", diz Ricardo. \"Usar calças ou terno e gravata não faz sentido\". Em pouco mais de um mês de existência, o #Bermudasim é um sucesso. A página no Facebook acumula mais de 10 mil curtidas. No site, há um formulário em que funcionários podem cadastrar o email do chefe para que ele receba uma mensagem pedindo a liberação da bermuda. São, em média, 2 mil solicitações por dia. E elas funcionam: mais de 100 empresas atenderam ao pedido e liberaram as canelas de fora. Em algumas empresas, a informalidade já é rotina. O Peixe Urbano, uma empresa de comércio eletrônico no Rio de Janeiro, permite que seus funcionários usem bermuda desde sua fundação, em 2010. Do estagiário ao presidente, todos circulam com as pernas de fora. Alguns funcionários, como o jornalista Pedro Kranz, de 26 anos, chegam a usar chinelos de dedo. \"Para uma pessoa profissionalmente segura, a roupa não faz diferença\", diz Pedro. Usar roupas confortáveis no verão é também ecologicamente correto. A lógica é que, se os funcionários usarem roupas mais frescas, as empresas podem diminuir a potência do ar-condicionado, o que resulta numa economia de energia. Chile, Japão e Espanha seguiram o conselho e já fizeram campanhas para eliminar o temo e a gravata durante o verão. Usar bermudas é confortável e pode ser bom para o meio ambiente, mas ainda assim há quem ache o visual inadequado para o trabalho. \"A bermuda passa um ar de casualidade e descompromisso, que pode comprometer a imagem da empresa\", diz Daniela Romani, professora do núcleo de cultura e beleza da Fundação Armando Alvares Penteado (Faap). O motivo do estranhamento é cultural. A calça comprida foi adotada como traje de trabalho ainda na revolução industrial. Mudar um hábito tão antigo não é uma tarefa fácil. Já houve tentativas parecidas. Em 1956, o artista plástico Flávio de Carvalho propôs que os homens usassem saias, para enfrentar o calor. Chegou a desfilar pelo centro de São Paulo usando uma. Ninguém aderiu. O Presidente Jânio Quadros também defendia roupas mais adequadas ao verão. Em 1961, sugeriu que os homens usassem conjuntos de sarja com mangas curtas, inspirados nas roupas de caçadores na Africa. A proposta de usar bermuda parece ter mais chance de sucesso. Mas, mesmo se a moda pegar, isso nào significa que tudo estará liberado. Os criadores do #Bermudasim desaconselham bermuda de surfe ou de time de futebol. Bermudas de alfaiataria são mais elegantes. Também é preciso ficar atento ao cumprimento: short não é bermuda. Roupas muito curtas nunca são adequadas para um ambiente de trabalho, por mais moderno que ele seja. Podemos abrir mãos até das calças, mas jamais do bom gosto. D—nivel em: Revista Épca. jan. 2014 '*laptado),",
    "sourceImage": "/writing/insumos/2016-1.2-t4.jpg",
    "keyFacts": [
      "O Movimento dos sem-calça"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2016-1-t1",
    "cycle": "2016/1",
    "number": "Tarefa 1",
    "title": "Ciências sem Fronteiras",
    "shortLabel": "2016/1 · T1",
    "genre": "depoimento para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como participante do Programa Ciências sem Fronteiras no ano passado, você foi convidado pelo Ministério da Educação a dar um depoimento para o site do Programa. Para incentivar a participação de outros colegas, relate sua experiência e apresente informações sobre o programa.",
    "sourceKicker": "Insumo · prova 2016/1 · Tarefa 1",
    "sourceTitle": "Ciências sem Fronteiras",
    "sourceText": "Falante 1: [som de monitor cardíaco]\n\nFalante 2: Eu decidi participar do Ciência sem Fronteiras, porque eu sempre quis, é, fazer um esta-- é, fazer um intercâmbio, pra saber como que é o, esse ambiente que, que é tão frutífero assim, e o que que os professores e os alunos fazem de diferente do que a gente faz aqui no Brasil.\n\nFalante 3: O programa Ciência sem Fronteiras permite que alunos de graduação e pós-graduação façam estágio no exterior. Ele tem a finalidade de manter contato com sistemas educacionais competitivos em relação à tecnologia e inovação brasileira. E foi no ano de 2012, que o estudante de Engenharia Elétrica, Pedro Nemi, teve a oportunidade de encarar o primeiro grande desafio da vida acadêmica.\n\nFalante 2: A experiência em si foi muito, é, foi muito enriquecedora. Eu voltei bastante diferente do que, do que eu fui.\n\nFalante 3: Pedro voltou para o Brasil e hoje atua na Agência Espacial Brasileira. Dessa forma, ele pôde contribuir com o Brasil, a partir de todo o aprendizado adquirido fora. Além disso, toda essa experiência o fez levar vantagem em um concurso de uma companhia aérea. O prêmio? Uma viagem ao espaço no fim deste ano.\n\nFalante 2: Foi uma surpresa muito grande pra mim. Eu não esperava, é, conseguir isso.\n\nFalante 3: Para atrair conhecimento tecnológico para o Brasil, o programa traz pesquisadores do exterior que queiram se estabelecer aqui ou formar parcerias com o Brasil. E assim como Pedro teve o futuro modificado, a meta do Ciência sem Fronteiras é beneficiar cento e um mil estudantes até o final deste ano. Do total, setenta e cinco mil bolsas são financiadas com recursos do governo federal e vinte e seis mil com recursos da iniciativa privada.\n\nFalante 2: É, é uma oportunidade extremamente valiosa. Eu, eu realmente encorajo todas as pessoas que quiserem fazer, a participar do Ciência sem Fronteiras. É, na graduação, ela é um pouco diferente, assim, a experiência do que você ir fazer um mestrado ou doutorado fora, apesar de também ser valioso. Mas quanto mais experiência você adquire de mais cedo, eu acho que isso te dá novas perspectivas e novos horizontes.\n\nFalante 1: [jingle] [som de monitor cardíaco]\n\nFalante 2: Eu decidi participar do Ciência sem Fronteiras, porque eu sempre quis, é, fazer um esta-- é, fazer um intercâmbio, pra saber como que é o, esse ambiente que, que é tão frutífero assim, e o que que os professores e os alunos fazem de diferente do que a gente faz aqui no Brasil.\n\nFalante 3: O programa Ciência sem Fronteiras permite que alunos de graduação e pós-graduação façam estágio no exterior. Ele tem a finalidade de manter contato com sistemas educacionais competitivos em relação à tecnologia e inovação brasileira. E foi no ano de 2012, que o estudante de Engenharia Elétrica, Pedro Nemi, teve a oportunidade de encarar o primeiro grande desafio da vida acadêmica.\n\nFalante 2: A experiência em si foi muito, é, foi muito enriquecedora. Eu voltei bastante diferente do que, do que eu fui.\n\nFalante 3: Pedro voltou para o Brasil e hoje atua na Agência Espacial Brasileira. Dessa forma, ele pôde contribuir com o Brasil, a partir de todo o aprendizado adquirido fora. Além disso, toda essa experiência o fez levar vantagem em um concurso de uma companhia aérea. O prêmio? Uma viagem ao espaço no fim deste ano.\n\nFalante 2: Foi uma surpresa muito grande pra mim. Eu não esperava, é, conseguir isso.\n\nFalante 3: Para atrair conhecimento tecnológico para o Brasil, o programa traz pesquisadores do exterior que queiram se estabelecer aqui ou formar parcerias com o Brasil. E assim como Pedro teve o futuro modificado, a meta do Ciência sem Fronteiras é beneficiar cento e um mil estudantes até o final deste ano. Do total, setenta e cinco mil bolsas são financiadas com recursos do governo federal e vinte e seis mil com recursos da iniciativa privada.\n\nFalante 2: É, é uma oportunidade extremamente valiosa. Eu, eu realmente encorajo todas as pessoas que quiserem fazer, a participar do Ciência sem Fronteiras. É, na graduação, ela é um pouco diferente, assim, a experiência do que você ir fazer um mestrado ou doutorado fora, apesar de também ser valioso. Mas quanto mais experiência você adquire de mais cedo, eu acho que isso te dá novas perspectivas e novos horizontes.\n\nFalante 1: [jingle]",
    "keyFacts": [
      "informações sobre o programa"
    ],
    "mustDo": [
      "escrever no gênero pedido: depoimento para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2016-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2016-1-t2",
    "cycle": "2016/1",
    "number": "Tarefa 2",
    "title": "Tecnoboné",
    "shortLabel": "2016/1 · T2",
    "genre": "e-mail ao gerente",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você atua na área de apoio a projetos inovadores de uma grande empresa e tem como função selecionar instituições que receberão financiamentos. Com base na notícia que ouviu, escreva um email para seu gerente a fim de indicar o Centro Federal de Educação Tecnológica Celso Sucove da Fonseca, Cefet-RJ. Para justificar sua indicação, descreva as características e o funcionamento dos protótipos (modelos) feitos pelos alunos, ressaltando a importância social do projeto Turin.",
    "sourceKicker": "Insumo · prova 2016/1 · Tarefa 2",
    "sourceTitle": "Tecnoboné",
    "sourceText": "Falante 1: [som de bip] Alunos do Centro Federal de Educação Tecnológica Celso Suckow da Fonseca, CEFET/RJ, na capital fluminense, desenvolveram dois protótipos para facilitar a acessibilidade de pessoas com deficiência. O TecnoBoné ajuda no desvio de obstáculos não identificados com o uso da bengala. Já a cadeira de rodas, acionada por comando de voz, possibilita o deslocamento autônomo. Uma das idealizadoras do boné, Juliette de Freitas, do sexto ano, explicou que a ideia surgiu de uma reportagem televisiva sobre as dificuldades de deficientes visuais ao se locomoverem na rua.\n\nFalante 2: Os problemas que os deficientes visuais passavam, né, no dia a dia com relação ao orelhão, placa de sinalização e tal. Aí daí que a gente tirou essa ideia de criar algum, alguma coisa que pudesse, assim, facilitar e, é, e minimizar os problemas que os deficientes visuais sofrem no dia a dia.\n\nFalante 1: A estudante explicou que o protótipo consiste em quatro sensores no boné para identificar os obstáculos e um motor acoplado em um cinto que vibra e indica a direção dos objetos identificados. A aluna Raiane Borges, de dezenove anos, também do sexto ano, foi uma das criadoras da cadeira de rodas, em parceria com mais dois colegas de turma. Ela explicou que a maior dificuldade foi encontrar os equipamentos utilizados no protótipo.\n\nFalante 2: A gente não utilizou, é, é, materiais comprados. A maioria dos materiais foram reutilizados, como por exemplo, a mobilete. A gente pegou um modelo antigo pra fazer a adaptação. Essa foi uma das dificuldades.\n\nFalante 1: Os dispositivos são acionados por meio dos comandos para, frente e volta. Ambos os protótipos foram desenvolvidos com o apoio do projeto Turing, atividade de extensão criada em 2012. Professor de informática do CEFET/RJ e representante do projeto no campus Maria da Graça, o professor Carlos Eduardo Pantoja explicou que o projeto estimula criações com caráter social.\n\nFalante 3: Ele tem o cunho, primeiro de divulgação da ciência e tecnologia, estimular os alunos a participar de feiras e congressos, e um cunho social, de auxiliar a comunidade como um todo. A ideia é que se possa, em algum momento, que esses protótipos estejam, é, auxiliando alguém efetivamente, mas sem fins lucrativos.\n\nFalante 1: Pantoja enfatizou que alguns equipamentos são comprados com o dinheiro dos próprios professores e alunos, já que não há financiamento para as criações. Do Rio de Janeiro, Flávia Vilela. [som de bip] Alunos do Centro Federal de Educação Tecnológica Celso Suckow da Fonseca, CEFET/RJ, na capital fluminense, desenvolveram dois protótipos para facilitar a acessibilidade de pessoas com deficiência. O TecnoBoné ajuda no desvio de obstáculos não identificados com o uso da bengala. Já a cadeira de rodas, acionada por comando de voz, possibilita o deslocamento autônomo. Uma das idealizadoras do boné, Juliette de Freitas, do sexto ano, explicou que a ideia surgiu de uma reportagem televisiva sobre as dificuldades de deficientes visuais ao se locomoverem na rua.\n\nFalante 2: Os problemas que os deficientes visuais passavam, né, no dia a dia com relação ao orelhão, placa de sinalização e tal. Aí daí que a gente tirou essa ideia de criar algum, alguma coisa que pudesse, assim, facilitar e, é, e minimizar os problemas que os deficientes visuais sofrem no dia a dia.\n\nFalante 1: A estudante explicou que o protótipo consiste em quatro sensores no boné para identificar os obstáculos e um motor acoplado em um cinto que vibra e indica a direção dos objetos identificados. A aluna Raiane Borges, de dezenove anos, também do sexto ano, foi uma das criadoras da cadeira de rodas, em parceria com mais dois colegas de turma. Ela explicou que a maior dificuldade foi encontrar os equipamentos utilizados no protótipo.\n\nFalante 2: A gente não utilizou, é, é, materiais comprados. A maioria dos materiais foram reutilizados, como por exemplo, a mobilete. A gente pegou um modelo antigo pra fazer a adaptação. Essa foi uma das dificuldades.\n\nFalante 1: Os dispositivos são acionados por meio dos comandos para, frente e volta. Ambos os protótipos foram desenvolvidos com o apoio do projeto Turing, atividade de extensão criada em 2012. Professor de informática do CEFET/RJ e representante do projeto no campus Maria da Graça, o professor Carlos Eduardo Pantoja explicou que o projeto estimula criações com caráter social.\n\nFalante 3: Ele tem o cunho, primeiro de divulgação da ciência e tecnologia, estimular os alunos a participar de feiras e congressos, e um cunho social, de auxiliar a comunidade como um todo. A ideia é que se possa, em algum momento, que esses protótipos estejam, é, auxiliando alguém efetivamente, mas sem fins lucrativos.\n\nFalante 1: Pantoja enfatizou que alguns equipamentos são comprados com o dinheiro dos próprios professores e alunos, já que não há financiamento para as criações. Do Rio de Janeiro, Flávia Vilela.",
    "keyFacts": [
      "Tecnoboné"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail ao gerente",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2016-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2016-1-t3",
    "cycle": "2016/1",
    "number": "Tarefa 3",
    "title": "Meu escritório é em casa",
    "shortLabel": "2016/1 · T3",
    "genre": "texto de proposta ao diretor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é gerente de recursos humanos e leu a reportagem “Meu escritório é em casa” sobre o modelo de home office. Escreva um texto ao seu diretor para convencê-lo de que a ideia poderia ser implementada em sua empresa. Em seu texto, explique essa modalidade de trabalho, as vantagens para o funcionário e para a empresa, assim como os aspectos legais envolvidos.",
    "sourceKicker": "Insumo · prova 2016/1 · Tarefa 3",
    "sourceTitle": "Meu escritório é em casa",
    "sourceText": "Meu escritório é em casa Auditor federal de controle externo do Tribunal de Contas da União (TCU) desde 2008, Felipe Tavares, 32 anos, não precisa sair de casa para trabalhar todos os dias. Ele aderiu à possibilidade de realizar a análise de processos a partir de um computador pessoal na própria residência no ano passado. Para cada demanda atribuída ao servidor, um prazo de entrega é estipulado. Quando termina o serviço, recebe nova quantidade de processos. \"É uma opção minha. Eu costumava trabalhar no prédio do TCU, mas tenho muita dificuldade de concentra- çao. Em uma sala com outras pessoas e telefone tocando, eu começava a render somente no fim da tarde e estendia o horário para dar conta de todo o trabalho. Em casa, tenho disciplina para não ceder a nenhuma Felipe. O tempo de expediente a distância é de até oito horas diárias, com intervalo para o almoço. \"Não estar no departamento não significa que estou no bem-bom, na beira da piscina. Estou trabalhando do mesmo jeito. As principais vantagens são a flexibilidade de poder trabalhar de onde eu estiver e o tempo que economizo no deslocamento\", afirma. O TCU contabiliza que cerca de 480 funcionários realizaram serviços de casa durante pelo menos um dia em 2014. Prazos e tarefas são definidos pelo gestor de cada área em acordo com o servidor. Quem trabalha de casa também precisa apresentar aumento na produtividade. \"No departamento há uma série de outras atividades que demandam tempo, como atender o telefone, participar de reuniões... Por isso, quem trabalha de casa tem esse acréscimo na produtividade\", explica o secretário de Gestão de Pessoas do órgão, Adriano Cesar Amorim. \"Os processos são eletrônicos, então o mesmo controle que a chefia teria presencialmente, tem remotamente. É um sucesso, e não temos discursos internos contrários.\" Segundo estimativa da Sociedade Brasileira de Teletrabalho e Tele- atividades (Sobratt), o home office é mais comum do que se pensa: cerca de 12 milhões de brasileiros trabalham a distância. \"As pessoas trabalham de vários lugares: enquanto esperam um voo, de um café. O home office é predominantemente feito em casa, mas não é caracterizado somente por isso. A tecnologia permite que serviços sejam realizados de quase qualquer lugar\", explica o presidente da Sobratt, Álvaro Mello. \"Funciona para operações que não dependem de um lugar fisico, como atendimento por telefone e atividades na Internet\", explica o consultor de carreira e sócio da Life Coaching, Sílvio Celestino. Segundo ele, o trabalho remoto é ainda uma alternativa para reduzir custos, já que a companhia economiza com a manutenção de um espaço fisico. \"O empregador que passa por um momento de retração econômica pode começar a ver uma possibilidade nesse sistema. No entanto, antes de visar somente a redução de gastos, é preciso avaliar os recursos disponibilizados aos funcionários. Uma mesa ou uma cadeira que alguém utiliza para passar um tempo com os amigos na sala pode não ser adequada para executar um trabalho durante cinco horas consecutivas, o que pode gerar problemas de saúde e processos trabalhistas\", afirma. Papel da firma O funcionário que trabalha de casa não deixa de ser responsabilidade do empregador. \"Quando uma pessoa é contratada no modelo home office, deve ter um contrato específico. Como ainda não temos legislação muito específica para isso, o documento não pode deixar brechas na área trabalhista\", explica a engenheira de segurança do trabalho Márcia Ramazzini. \"Todos os cuidados que a corporação tem com um funcionário comum, deve ter com um em home ofice. Por segurança, é necessário fiscalizar o local onde a pessoa vai trabalhar. O empregado deve ter um lugar exclusivo para isso, como um escritório. Se ele for fazer um trabalho administrativo, é preciso verificar o mobiliário para saber se há risco ergonômico. Além disso, o colaborador deve passar por exames admissionais periódicos\" atesta a engenheira. A quantidade de horas na função também deve ser fiscalizada. \"Há programas que controlam o número de digitações feitas por minuto e forçam que a pessoa faça uma pausa depois de determinado período\", exemplifica. em: Correio BradEense. 22 nov. 2015",
    "sourceImage": "/writing/insumos/2016-1-t3.jpg",
    "keyFacts": [
      "Meu escritório é em casa"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de proposta ao diretor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2016-1-t4",
    "cycle": "2016/1",
    "number": "Tarefa 4",
    "title": "A era da solidão acompanhada",
    "shortLabel": "2016/1 · T4",
    "genre": "artigo de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é um jornalista adepto a novas tecnologias e foi convidado a redigir um artigo de opinião para uma revista brasileira de circulação nacional em resposta ao texto “A era da solidão acompanhada”. Discuta os fatos apresentados na reportagem e posicione-se favoravelmente aos relacionamentos virtuais e ao uso da tecnologia no dia a dia das pessoas, negando a ideia de que há uma solidão acompanhada.",
    "sourceKicker": "Insumo · prova 2016/1 · Tarefa 4",
    "sourceTitle": "A era da solidão acompanhada",
    "sourceText": "A ERA DA SOLIDÃO ACOMPANHADA As inúmeras possibilidades de conexão digital representam uma estupenda conquista para a sociedade atual. Mas a ânsia de estar on-line com tudo e, principalmente, com todos, o tempo inteiro, fez nascer um personagem: o cibersolitário. Você já viu esta cena. Agora mesmo ela pode estar ocorrendo ao seu lado. Um casal, dois adolescentes, talvez uma criança dividem uma mesa num restaurante. É razoável supor que a ideia de comer fora tenha surgido como com o perdão da um programa — redundância — familiar. E, no entanto, o que se vê é cada um entretido com o seu smartphone, alheio aos vizinhos de os dedos dos mais novos cadeira — movimentando-se com destreza de pianista, os dos mais velhos sem tanta agilidade, é fato, e nem por isso menos ansiosos. Na tela do celular, um desfile infindável de fotos, vídeos, WhatsApp, Facebook, Twitter e Instagram. Ainda que os personagens e o ambiente sejam — namorados na fila da outros bilheteria do cinema, um grupo de amigos em um show, pais à espera dos filhos na saída da escola —, tal tipo de comportamento é cada vez mais frequente. Eles estão juntos, mas separados. Estão próximos, porém distantes. Estão acompanhados — mas sozinhos. São os cibersolitários. Seria absolutamente descabido demonizar os avanços tecnológicos, sobretudo com o advento da Internet, e a revolução trazida por eles, em especial no quesito comunicação. Ao mesmo tempo, parece inegável haver um ponto a partir do qual as relações virtuais passam a andar na mão oposta à de suas principais conquistas — minando os relacionamentos pessoais \"reais\". Até pouco tempo atrás, a psicóloga e socióloga Sherry Turkle era uma inconteste entusiasta do mundo digital. Durante seus estudos sobre o tema, porém, passou a identificar alguns incômodos exageros no mergulho no universo virtual. Isso a levou a rever sua posição, sem deixar de reconhecer os beneficios de viver na Idade da Web. De acordo com a especialista, o argumento mais usado por aqueles que preferem se comunicar quase que exclusivamente por meio de ferramentas digitais é a possibilidade de controlar cada palavra da conversa e, dessa forma, eliminar qualquer perspectiva de ser surpreendi- do —para o bem e para o mal. \"É inegável que as pessoas estão deixando as relações reais de lado\", diz Christian Gebara, vice-presidente executivo de marketing e vendas da Telefônica Vivo. Em discussões dentro da própria empresa, Gebara e sua equipe comentavam sobre o desconfor- to ao ver alguém dirigindo e teclando ao mesmo tempo ou andando pela rua sem desgrudar o olhar da tela. Para o sociólogo e advogado Stefan Larsson, diretor do Instituto da Internet da Universidade de Lund, na Suécia, é normal que a sociedade leve tempo para se adaptar e definir bem as regras que vão orientar o novo comportamento tecnológico-conectivo. \"A maneira como nos socializamos e nos comunica- mos muda; no entanto, o que ocon•e agora é mais uma alteração de formato, da voz para o texto\", diz Larsson. \"Tendemos a acreditar que a voz seja algo mais natural porque estamos acostumados a esse tipo de comunica- ção. Nosso desafio é encontrar um balanço entre a conexão das telas e o ambiente externo\", complementa, Se não há sujeito sem o outro, solidarizar-se com o próximo deveria ser algo incontornável para o homem. Para o psicólogo americano Stanley Milgram, a população urbana está constantemente sendo exposta a uma quantidade enorme de estímulos. E eles são tantos que é impossível ao ser humano processá-los de uma vez. Com isso, experimentamos a sobrecarga, e nos adaptamos a ela escolhendo a qual estímulo atender. Passamos a ignorar as pessoas ao redor simplesmente pela impossibilidade de dar atenção a todas elas. Exatamente como agimos no mundo conectado. Disponivel etn: Revista Veja, 9 Set. 2015 (adapto).",
    "sourceImage": "/writing/insumos/2016-1-t4.jpg",
    "keyFacts": [
      "na reportagem",
      "posicione-se favoravelmente aos relacionamentos virtuais",
      "ao uso da tecnologia no dia a dia das pessoas",
      "negando a ideia de que há uma solidão acompanhada"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2015-2-t1",
    "cycle": "2015/2",
    "number": "Tarefa 1",
    "title": "Uso do cinto de segurança",
    "shortLabel": "2015/2 · T1",
    "genre": "texto para guia de prevenção",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "O Ministério da Saúde está promovendo ações de conscientização relacionadas à segurança no trânsito, entre as quais está a elaboração de um guia de prevenção de acidentes a ser distribuído a todos os taxistas brasileiros. Como funcionário desse ministério, você ficou responsável por escrever o texto sobre o uso do cinto de segurança para incentivar os motoristas de táxi a solicitar que os passageiros usem o cinto no banco traseiro. Com base nas informações do vídeo, apresente os dados relativos ao uso do cinto de segurança no Brasil e justifique a necessidade desse uso.",
    "sourceKicker": "Insumo · prova 2015/2 · Tarefa 1",
    "sourceTitle": "Uso do cinto de segurança",
    "sourceText": "Falante 1: [som de bipe] [vinheta musical de abertura]\n\nFalante 2: Desde 1997, o uso do cinto de segurança passou a ser obrigatório em todo o Brasil. Graças a essa lei, milhares de vidas foram salvas. Isso porque o cinto de segurança reduz o risco de morte, já que, em caso de acidente, o corpo do passageiro é impedido de ser lançado para fora do carro. Márcio sabe bem disso.\n\nFalante 3: Tava sentado no banco de trás, atrás do, do passageiro, e tava com cinto, conversando com eles, enquanto um outro carro em alta velocidade bateu na gente, arremessando num carro em baixa velocidade que tava na, na nossa frente. Eu não fui arremessado por conta do cinto. É, só bati o nariz, tive um sangramento, o nariz nem quebrou, graças a Deus, e nada aconteceu com os demais, porque todos os outros tavam com cinto.\n\nFalante 2: É aqui no banco de trás que o uso do cinto de segurança é ainda mais importante. Isso porque, no caso de uma batida, o passageiro que estiver na parte traseira, pode ter o corpo projetado para frente, esmagando o motorista ou a outra pessoa que estiver sentada ao lado. O taxista Johnny só liga a chave do carro se o passageiro estiver com cinto de segurança.\n\nFalante 4: Boa tarde.\n\nFalante 5: Boa tarde. Coloca o cinto, por favor. Pra preservação da vida do passageiro, né, é mais seguro pra ele, qualquer impacto, qualquer acidente.\n\nFalante 2: De acordo com a pesquisa feita pelo Ministério da Saúde, em parceria com o IBGE, tem muita gente no país que não está seguindo os exemplos de Márcio e Johnny.\n\nFalante 6: O uso do cinto de segurança no banco da frente, ele pode evitar em até quarenta e cinco por cento o risco de morte. O uso do cinto de segurança nos banco de trás, ele pode evitar em até setenta e cinco por cento o risco de morte.\n\nFalante 2: O Ministério da Saúde vem desenvolvendo novas estratégias para conter acidentes e reduzir o número de mortes no trânsito.\n\nFalante 1: [vinheta musical]\n\nFalante 2: Desde 1997, o uso do cinto de segurança passou a ser obrigatório em todo o Brasil. Graças a essa lei, milhares de vidas foram salvas. Isso porque o cinto de segurança reduz o risco de morte, já que, em caso de acidente, o corpo do passageiro é impedido de ser lançado para fora do carro. Márcio sabe bem disso.\n\nFalante 3: Tava sentado no banco de trás, atrás do, do passageiro, e tava com cinto, conversando com eles, enquanto um outro carro em alta velocidade bateu na gente, arremessando num carro em baixa velocidade que tava na, na nossa frente. Eu não fui arremessado por conta do cinto. É, só bati o nariz, tive um sangramento, o nariz nem quebrou, graças a Deus, e nada aconteceu com os demais, porque todos os outros tavam com cinto.\n\nFalante 2: É aqui no banco de trás que o uso do cinto de segurança é ainda mais importante. Isso porque, no caso de uma batida, o passageiro que estiver na parte traseira, pode ter o corpo projetado para frente, esmagando o motorista ou a outra pessoa que estiver sentada ao lado. O taxista Johnny só liga a chave do carro se o passageiro estiver com cinto de segurança.\n\nFalante 4: Boa tarde.\n\nFalante 5: Boa tarde. Coloca o cinto, por favor. Pra preservação da vida do passageiro, né, é mais seguro pra ele, qualquer impacto, qualquer acidente.\n\nFalante 2: De acordo com a pesquisa feita pelo Ministério da Saúde, em parceria com o IBGE, tem muita gente no país que não está seguindo os exemplos de Márcio e Johnny.\n\nFalante 6: O uso do cinto de segurança no banco da frente, ele pode evitar em até quarenta e cinco por cento o risco de morte. O uso do cinto de segurança nos banco de trás, ele pode evitar em até setenta e cinco por cento o risco de morte.\n\nFalante 2: O Ministério da Saúde vem desenvolvendo novas estratégias para conter acidentes e reduzir o número de mortes no trânsito. [vinheta musical de encerramento]",
    "keyFacts": [
      "do vídeo",
      "apresente os dados relativos ao uso do cinto de segurança no Brasil",
      "justifique a necessidade desse uso"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para guia de prevenção",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2015-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2015-2-t2",
    "cycle": "2015/2",
    "number": "Tarefa 2",
    "title": "Professores do Brasil",
    "shortLabel": "2015/2 · T2",
    "genre": "texto informativo para mural",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é diretor de uma escola pública brasileira e decidiu divulgar o Prêmio Professores do Brasil entre os professores da sua escola. Para incentivá-los a inscrever os projetos que tenham desenvolvido com os alunos, escreva um texto informativo a ser afixado no mural da sala dos professores para divulgar o Prêmio. Com base nas informações sobre o projeto vencedor de 2012, destaque a importância de experiências como essa para os alunos e a comunidade escolar.",
    "sourceKicker": "Insumo · prova 2015/2 · Tarefa 2",
    "sourceTitle": "Professores do Brasil",
    "sourceText": "Falante 1: [som de bipe] Reconhecer experiências bem-sucedidas desenvolvidas por professores da educação básica. Essa é a ideia do Prêmio Professores do Brasil, que encerra as inscrições para a edição deste ano, na próxima segunda, dia 22.\n\nFalante 2: Na reportagem de João Pedro Neto, vamos conhecer uma iniciativa vencedora do prêmio em 2012, daqui de Brasília.\n\nFalante 3: Uma sala construída com materiais recicláveis, como garrafas pet e restos de construção, e que se tornou um espaço de convivência para estudantes do ensino integral. Esse é o projeto executado em uma escola pública de Planaltina, no Distrito Federal, que foi selecionado no Prêmio Professores do Brasil em 2012. Para o professor Gilvan França, que coordenou a iniciativa, a atividade aliou a conscientização sustentável e o espírito de colaboração dos alunos.\n\nFalante 4: A partir do momento que você inicia um projeto que envolve os alunos, isso, é, favorece pra que eles desenvolvam em outros locais, né? E a família também, porque, assim, eles levam pra casa a experiência que eles tiveram na escola.\n\nFalante 3: A estudante Aurélia Vitória, de quinze anos, sentiu orgulho de participar de uma iniciativa como essa.\n\nFalante 5: Pra gente aqui, como a gente não tinha mu-muitas coisas pra fazer durante a tarde, aí a es-- maioria das crianças ficava na rua. Aí com a construção disso aqui, ajudou muito as pessoas, as criança, em vez de ficar na rua, vieram pra cá. Você ajudou a construir uma coisa que não vai ser só pra você, vai ser pro futuro também.\n\nFalante 3: Experiências inovadoras e de sucesso conduzidas por educadores da rede pública de ensino e que fazem a diferença na vida dos alunos também vão ser selecionadas na edição do Prêmio Professores do Brasil deste ano. Serão selecionados até quarenta trabalhos, sendo oito por região do país. E de acordo com a secretária do Ministério da Educação, Maria Beatriz Luce, já foram registradas mais de cinco mil inscrições. Mais informações estão no site premioprofessoresdobrasil.mec.gov.br. Reportagem João Pedro Neto.",
    "keyFacts": [
      "sobre o projeto vencedor de 2012",
      "destaque a importância de experiências como essa para os alunos",
      "a comunidade escolar"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto informativo para mural",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2015-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2015-2-t3",
    "cycle": "2015/2",
    "number": "Tarefa 3",
    "title": "Projeto Favela Orgânica",
    "shortLabel": "2015/2 · T3",
    "genre": "e-mail de pedido de patrocínio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é membro da Associação de Moradores da Comunidade da Babilônia e acompanha o projeto Favela Orgânica. Com base nas informações da reportagem “Cozinheira faz iguarias com o que ia pro lixo”, escreva um e-mail dirigido a empresas que possam patrocinar o Favela Orgânica e possibilitar o aluguel de um espaço adequado para as atividades do projeto. Em seu texto, solicite o patrocínio, descrevendo o projeto e justificando sua relevância.",
    "sourceKicker": "Insumo · prova 2015/2 · Tarefa 3",
    "sourceTitle": "Projeto Favela Orgânica",
    "sourceText": "Cozinheira faz iguarias com o que ia pro lixo Cascas, talos e folhas. Os alimentos podem e devem ser aproveitados de forma integral. E o que ensina a cozinheira Regina Tchelly, 32 anos, ex- empregada doméstica que criou o projeto Favela Orgânica nas comunidades da Babilônia e do Chapéu Mangueira, na zona sul do Rio. Nascida na Paraíba, ela cresceu vendo a mãe aproveitar integralmente tudo o que ia para a cozinha. Já no Rio, a partir de 2001, revoltou-se ao se deparar com o desperdício nas feiras livres. Passou a encher a sacola com o que era considerado resto e soltou a imaginação para dar fins para toda aquela comida. Assim surgiram brigadeiros com casca de banana, pão de casca de abóbora, pastas de talo de agrião. Todos deliciosos, baratos e de alto valor nutricional. Em 2011, Regina juntou 140 reais e criou o Favela Orgânica. Sua disposição, talento e carisma fizeram o projeto decolar. Ensinou as vizinhas, depois a comunidade inteira, outras favelas do Rio e, quando se deu conta, estava dando oficinas em outros estados e até em outros países. \"No total, já dei oficinas para mais de duas mil pessoas\" , conta, com alegria. A paraibana criou mais de 450 pratos — todos sem nenhum tipo de carne. Hoje, a maior dificuldade que enfrenta é não ter um espaço mais adequado para tocar o projeto, que também oferece bufê de gastrono- mia alternativa para eventos e promove capacitação para profissionais da alimentação. Tudo é feito a partir de sua casa, na Babilônia. Mesmo assim, Regina segue confiante, com sorriso fácil e disposição para trabalhar. \"Tudo o que é feito com amor dá certo\", garante. SAIBA MAIS Site do projeto: www.favelaorganica.com. Almanaque Brasil de Cultura Popular, dez. 2013 (adaptado).",
    "sourceImage": "/writing/insumos/2015-2-t3.jpg",
    "keyFacts": [
      "da reportagem “Cozinheira faz iguarias com o que ia pro lixo”",
      "escreva um e-mail dirigido a empresas que possam patrocinar o Favela Orgânica",
      "possibilitar o aluguel de um espaço"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de pedido de patrocínio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2015-2-t4",
    "cycle": "2015/2",
    "number": "Tarefa 4",
    "title": "Azulejos valiosos",
    "shortLabel": "2015/2 · T4",
    "genre": "carta aberta",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é morador de Belém e está inconformado com a situação dos casarões históricos da cidade. Com base na matéria “Azulejos valiosos”, escreva uma carta aberta endereçada à prefeitura municipal, para ser publicada em jornais locais. Seu texto deverá explicar o problema e argumentar sobre a necessidade de se tomarem medidas imediatas para solucioná-lo.",
    "sourceKicker": "Insumo · prova 2015/2 · Tarefa 4",
    "sourceTitle": "Azulejos valiosos",
    "sourceText": "Azulejos valiosos Quatro casarões do século XIX são alvo de roubos e depredações em Belém. A capital paraense já foi considerada uma das cidades brasileiras com maior variedade de azulejos, que coloriam as fachadas e o interior de residências. Boa parte deles foi importada da Europa, principalmente na virada do século XIX para o XX, auge da produção de borracha. Da década de 1970 para cá, no entanto, mais de 50% dos azulejos se perderam. Este ano, a situação parece ter se agravado. Desde fevereiro, pelo menos quatro casarões foram alvo de vandalismo. O assunto vem se espalhando pela capital parense, e há quem suspeite de encomenda de roubos. Uma das construções depredadas é o Palacete Vitor Maria da Silva, batizado com o nome de seu antigo dono, inspetor de obras do estado do Pará no governo Augusto montenegro (1901-1909). Os azulejos foram encontrados dias depois, em cacos, e estão no Laboratório de Conservação e Restauração da UFPA (Lacore): \"Recebemos aqui no laboratório mais de 1.000 fragmentos de azulejos e estamos montando o quebra-cabeça para ver a que painéis pertencem. Vamos limpar e organizar o material até o fim de junho. Só depois será decidido o que pode ser restaurado ou refeito\", explica Thaís Sanjad, coordenadora do Lacore. Há cerca de um ano, o Departamento do Patrimônio Histórico, Artístico e Cultural (Dphac) iniciou o processo de tombamento do casarão. Segundo a diretora Thaís Toscado, o procedimento é demorado, por ser necessário documentar detalhes arquitetônicos e históricos da construção. \"No caso deste imóvel, os detalhes se tornam mais elaborados, dado o nível artístico dos painéis de azulejo. Mas o local já foi interditado\". A proteção do palacete parece encaminhada, mas a situação na cidade causa preocupação, já que outros três casarões tiveram azulejos do século XIX furtados. \"Foram roubos pontuais muito estranhos. O Palacete Vitor Maria da Silva tem um dos interiores mais bonitos da cidade, mas por fora é muito simples, não chama atenção. As pessoas que invadiram devem ter sido encarregadas de roubar azulejos. Ou então foi uma tentativa de desqualificação da propriedade, para que se possa fazer o que quiser com o patrimônio\", suspeita a arquiteta e urbanista Cláudia Nascimento. A superindentende do Iphan no Pará, Maria Dorotéia Lima, concorda: \"Tudo indica que há um mercado de azulejos na cidade, até porque os exemplares fora das áreas tombadas não têm qualquer proteção, o que pretendemos fazer em breve\", disse. Enquanto as investigações não forem concluídas, os poucos exemplares de azulejos que ainda restam aumentam cada vez mais de valor. Jornal Em Dia, jun. 2012 (adaptado).",
    "sourceImage": "/writing/insumos/2015-2-t4.jpg",
    "keyFacts": [
      "o problema",
      "argumentar sobre a necessidade de se tomarem medidas imediatas para solucioná-lo"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aberta",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2015-1-t1",
    "cycle": "2015/1",
    "number": "Tarefa 1",
    "title": "Café na Vila Madalena",
    "shortLabel": "2015/1 · T1",
    "genre": "artigo para jornal de bairro",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você escreve para o jornal de bairro “Vila Madalena em Foco” e achou interessante a proposta da Cafeteria Ekoa. Escreva um artigo explicando a prática inovadora que ocorre na cafeteria, a fim de incentivar as pessoas a frequentarem esse estabelecimento comercial e a participarem da iniciativa adotada no local.",
    "sourceKicker": "Insumo · prova 2015/1 · Tarefa 1",
    "sourceTitle": "Café na Vila Madalena",
    "sourceText": "Falante 1: [bipe] Fala, galerinha SW. Tô aqui no Ecoa Café, aqui na Vila Madalena, que tem um diferencial. É uma coisinha que chama café compartilhado. Cê pode vir aqui tomar um café de graça ou presentear um café prum desconhecido. Dá até pra fazer amizade. Quer entender isso melhor? Vem ver.\n\nFalante 2: [música de rock]\n\nFalante 1: Bom, aqui do meu lado tá a Marisa Bussacos, ela é proprietária do café Ecoa, que é um café diferente. Por que que é um café diferente, Marisa?\n\nFalante 3: Desde o começo, a Ecoa foi criada pra ser um espaço pra nutrir relações, né? É, na verdade, ser um ponto de encontro de pessoas que querem, pensam num mundo melhor, que têm atitudes sustentáveis, que consomem orgânicos. E aqui a construção a gente já fez com eco materiais, então a gente tem uma cisterna que capta água de chuva e é reaproveitada. A gente tem madeira de demolição, madeira de reflorestamento.\n\nFalante 1: Explica pra gente como é que funciona o café compartilhado.\n\nFalante 3: A ideia do café é a pessoa deixar um café pago pra uma pessoa que não conhece, então é fazer uma gentileza pra um desconhecido e deixa uma mensagenzinha junto. Geralmente essa mensagem, assim, tem poesia, música, são sempre mensagens positivas. E aí a pessoa que vem aqui pode tomar esse café e ganha essa mensagenzinha junto.\n\nFalante 1: Bom, eu tô aqui com o Celso, que é um cliente aqui do Ecoa e que tá provando aqui um café compartilhado. O que que você achou dessa ideia, Celso?\n\nFalante 4: Não, então o, o Ecoa tem muito essa tradição de nutrir relações, então é uma coisa que tem desde o começo, uma ideia que já caiu na cultura do Ecoa, então acho bem legal.\n\nFalante 1: Você mais tomou os cafés compartilhado ou mais deixou pago os cafés compartilhado?\n\nFalante 4: Como eu frequento aqui muito, então eu mais pego do que eu deixo, isso com certeza.\n\nFalante 1: E quando você deixa o café compartilhado, cê deixa algum bilhetinho escrito ou não é muito a tua?\n\nFalante 4: Não, é uma obrigação cê deixar, senão cê não deixa o café compartilhado.\n\nFalante 2: [música animada]\n\nFalante 3: Então logo na entrada a gente tem uma lousa que tem os cafés que tão cedidos. Então a gente vai anotando os créditos ali e tendo um crédito a pessoa pode pedir.\n\nFalante 1: Quer dizer, a pessoa que tiver passando aqui na Frei de Coutinho, tiver sem nenhuma moedinha no bolso, morrendo de vontade de tomar um café, ela pode tentar a sorte aqui no Ecoa?\n\nFalante 3: Pode sim. Já aconteceu um caso até de uma senhora que veio aqui, ela tinha um dinheiro só pro bolo, né, e ela queria tomar um cafezinho junto. Aí eu vi que tinha na lousa um compartilhado. Aí eu falei se ela quisesse tomar, não teria problema, ela tomou o cafezinho e comeu o bolo.\n\nFalante 2: [música de rock]\n\nFalante 1: Fala, galerinha SW. Tô aqui no Ecoa Café, aqui na Vila Madalena, que tem um diferencial. É uma coisinha que chama café compartilhado. Cê pode vir aqui tomar um café de graça ou presentear um café prum desconhecido. Dá até pra fazer amizade. Quer entender isso melhor? Vem ver.\n\nFalante 2: [música de rock]\n\nFalante 1: Bom, aqui do meu lado tá a Marisa Bussacos, ela é proprietária do café Ecoa, que é um café diferente. Por que que é um café diferente, Marisa?\n\nFalante 3: Desde o começo, a Ecoa foi criada pra ser um espaço pra nutrir relações, né? É, na verdade, ser um ponto de encontro de pessoas que querem, pensam num mundo melhor, que têm atitudes sustentáveis, que consomem orgânicos. E aqui a construção a gente já fez com eco materiais, então a gente tem uma cisterna que capta água de chuva e é reaproveitada. A gente tem madeira de demolição, madeira de reflorestamento.\n\nFalante 1: Explica pra gente como é que funciona o café compartilhado.\n\nFalante 3: A ideia do café é a pessoa deixar um café pago pra uma pessoa que não conhece, então é fazer uma gentileza pra um desconhecido e deixa uma mensagenzinha junto. Geralmente essa mensagem, assim, tem poesia, música, são sempre mensagens positivas. E aí a pessoa que vem aqui pode tomar esse café e ganha essa mensagenzinha junto.\n\nFalante 1: Bom, eu tô aqui com o Celso, que é um cliente aqui do Ecoa e que tá provando aqui um café compartilhado. O que que você achou dessa ideia, Celso?\n\nFalante 4: Não, então o, o Ecoa tem muito essa tradição de nutrir relações, então é uma coisa que tem desde o começo, uma ideia que já caiu na cultura do Ecoa, então acho bem legal.\n\nFalante 1: Você mais tomou os cafés compartilhado ou mais deixou pago os cafés compartilhado?\n\nFalante 4: Como eu frequento aqui muito, então eu mais pego do que eu deixo, isso com certeza.\n\nFalante 1: E quando você deixa o café compartilhado, cê deixa algum bilhetinho escrito ou não é muito a tua?\n\nFalante 4: Não, é uma obrigação cê deixar, senão cê não deixa o café compartilhado.\n\nFalante 2: [música animada]\n\nFalante 3: Então logo na entrada a gente tem uma lousa que tem os cafés que tão cedidos. Então a gente vai anotando os créditos ali e tendo um crédito a pessoa pode pedir.\n\nFalante 1: Quer dizer, a pessoa que tiver passando aqui na Frei de Coutinho, tiver sem nenhuma moedinha no bolso, morrendo de vontade de tomar um café, ela pode tentar a sorte aqui no Ecoa?\n\nFalante 3: Pode sim. Já aconteceu um caso até de uma senhora que veio aqui, ela tinha um dinheiro só pro bolo, né, e ela queria tomar um cafezinho junto. Aí eu vi que tinha na lousa um compartilhado. Aí eu falei se ela quisesse tomar, não teria problema, ela tomou o cafezinho e comeu o bolo.\n\nFalante 2: [música de rock]",
    "keyFacts": [
      "a prática inovadora que ocorre na cafeteria",
      "a fim de incentivar as pessoas a frequentarem esse estabelecimento comercial",
      "a participarem da iniciativa adotada no local"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo para jornal de bairro",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2015-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2015-1-t2",
    "cycle": "2015/1",
    "number": "Tarefa 2",
    "title": "Cães-guia",
    "shortLabel": "2015/1 · T2",
    "genre": "texto para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "A União dos Cegos no Brasil vai divulgar em seu site o Cadastro Nacional de Candidatos a Utilização de Cães-Guia. Com base nas informações do áudio, escreva o texto a ser publicado no site, apresentando a iniciativa do governo brasileiro. Em seu texto, saliente a função dos cães-guia para os cegos ou pessoas com deficiências visuais graves e informe os procedimentos necessários para a inscrição no Cadastro.",
    "sourceKicker": "Insumo · prova 2015/1 · Tarefa 2",
    "sourceTitle": "Cães-guia",
    "sourceText": "Falante 1: [som de bip] [latido]\n\nFalante 2: Um cão-guia, Kátia, é um animal adestrado para guiar pessoas cegas ou com deficiência visual grave e ajudá-las em tarefas dentro de casa, na rua, no trabalho, por exemplo.\n\nFalante 3: Para isso, Roberto, o cão deve ter a capacidade de discernir eventuais perigos, como obstáculos suspensos, buracos, degraus, rampas. Isso requer dos animais treinamento avançado.\n\nFalante 2: E hoje foi lançado o Cadastro Nacional de Candidatos à Utilização de Cães-Guia. As inscrições para os interessados começam amanhã e quem for aprovado recebe de graça o cão.\n\nFalante 3: Vamos saber mais sobre o que é esse cadastro com o jornalista Aldiley Ribeiro, que está aqui no estúdio com a gente, na Voz do Brasil. Boa noite, Aldiley.\n\nFalante 4: Boa noite, Kátia. Boa noite, Roberto.\n\nFalante 3: Aldiley, por que que o governo criou esse cadastro e qual é o objetivo dele?\n\nFalante 4: Kátia, a ideia da Secretaria de Direitos Humanos da Presidência da República é organizar a espera dos candidatos a terem um cão-guia, além de fazer com que todos que precisam também conheçam essa política pública. Vai funcionar assim, viu, Kátia, a pessoa com deficiência visual vai se ins-- se inscrever no cadastro. Daí, os centros de formação de treinadores e instrutores de cães-guia vão acessar esse cadastro e começar o processo de seleção sempre que houver a disponibilidade de cães.\n\nFalante 2: E quem pode participar dessa seleção, Aldiley?\n\nFalante 4: Roberto, o candidato deve comprovar a cegueira ou limitações de visão de acordo com a lei. É preciso ainda ter mais de dezoito anos. Também precisam ter condições físicas, psicológicas e financeiras pra manter um cão-guia, como por exemplo, pra pagar as vacinas e a alimentação do animal. Vale ressaltar, viu, Roberto, que a lista no cadastro pode não seguir uma ordem. Isso porque é preciso haver uma compatibilidade entre o cão e o cego.\n\nFalante 3: E onde os interessados podem se inscrever, Aldiley?\n\nFalante 4: Olha, a inscrição só é feita pela internet, Kátia. As informações e o link para o formulário de inscrição estão na página www.sdh.gov.br.",
    "keyFacts": [
      "do áudio",
      "escreva o texto a ser publicado no site",
      "apresentando a iniciativa do governo brasileiro"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2015-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2015-1-t3",
    "cycle": "2015/1",
    "number": "Tarefa 3",
    "title": "Os eletrossensíveis",
    "shortLabel": "2015/1 · T3",
    "genre": "carta ao prefeito",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é um eletrossensível e, como membro da associação dos portadores de eletrossensibilidade, ficou responsável por escrever uma carta para o prefeito de sua cidade solicitando a criação de uma zona especial para pessoas com essa doença. Em seu texto, explique o que é a eletrossensibilidade e quais sintomas ela pode causar, descreva as características que a zona solicitada deve ter e argumente sobre a necessidade de haver uma área como essa na sua cidade.",
    "sourceKicker": "Insumo · prova 2015/1 · Tarefa 3",
    "sourceTitle": "Os eletrossensíveis",
    "sourceText": "OS ELETROSSENSíVElS Conheça os eletrossensíveis, pessoas que adoecem quando expostas à radiação eletromagnética. 30 de Agosto de 2014 Mônica Tarantino As informações que você lerá a seguir tratam da condição de pessoas eletrossensíveis (EHS é a sigla em inglês para designá-los) aos efeitos das ondas eletromagnéticas emitidas por torres de transmis- são elétrica, antenas de televisão, celulares e Wi-Fi. Há diversas organizações voltadas para o reconhe- cimento dessa condição como uma doença e para garahtir a criação de locais limpos de ondas eletro- magnéticas, as chamadas zonas brancas, para abri- gar quem se descobre atingido pela EHS. Em geral, as pessoas afetadas precisam deixar suas casas e recolher-se por algum tempo em áreas preservadas de ondas eletromagnéticas para se \"de- sintoxicarem\" dos efeitos da exposição. Você pode imaginar professores de tecnologia da informação, neurologistas, sociólogos e crianças deixando as ci- dades para viver em cavernas ou em vilas e abrigos projetados para bloquear ondas eletromagnéticas? Pois eles são cada vez mais numerosos. Quando ex- postos a campos de radiação eletromagnética, apre- sentam sintomas como dores de cabeça e no corpo, fadiga, estresse, distúrbios do sono. Seja qual for a sua causa, os sintomas de EHS são reais e, por ve- zes, incapacitantes. No mundo, portadores de EHS se mobilizam para que a condição seja declarada uma doença. Na se- mana passada, muitos se reuniram em uma zona criada para eles na região de Saint-Julien-En-Beu- chene, nos Alpes franceses. É uma área livre de antenas de telefonia e distante de linhas de trans- missão de energia elétrica. Até aparelhos eletrodo- mésticos são evitados e as pessoas deixam o celular na entrada. Na Suécia, a hipersensibilidade elétrica é reconhe- cida como um comprometimento funcional. \"Exis- tem cerca de 250 mil suecos com essa deficiência\", disse à ISTOÉ o cientista 011e Johansson, do Ins- tituto Karolinska, em Estocolmo. \"Essas pessoas merecem respeito e tratamento. Jamais discrimina- çáo\", diz. Lá, a associação para hipersensíveis recebe subsídio governamental. Na Espanha, Alemanha e EUA o problema é classificado como deficiência. No Brasil, pesquisas são feitas na Universidade Fe- deral de Minas Gerais. Na América Latina, um caso grave é o do psiquiatra e neurologista colombiano Carlos Sosa. \"Fui diag- nosticado em 2006 e precisei mudar radicalmente de vida\", disse à ISTOÉ. Aos 47 anos, vive sozinho nos arredores de Medellín em uma casa na qual possui algo que chama de gaiola de Faraday, para se proteger das ondas eletromagnéticas. Sosa suporta cerca de 20 minutos de conversa pelo telefone ou computador até que apareçam sintomas como do- res de cabeça e náusea. Em 2006, saiu de sua casa porque percebeu que a origem do mal-estar intenso que sentia havia três anos era a proximidade com uma antena de micro-ondas/lnternet e Wi-Fi (sem fios). \"Precisei me mudar quando a cidade em que vivia foi inundada por cerca de quatro mil ante- nas\", contou. O agravamento dos sintomas o levou a parar de trabalhar, lançando-o em uma vida de dificuldades financeiras. Ele não tem ajuda alguma. \"Mas os estudos provarão que essas ondas são tão perigosas para a saúde como o tabaco e o amianto\", acredita. Para o cientista sueco Johansson, as ondas eletromagnéticas não são inócuas como muitos de- fendem. \"Precisamos investigar em profundidade os efeitos desse novo fenômeno que se expande tão rapidamente pelo mundo por meio de dispositivos móveis.\" Disponivel em: www.istoezom.br.Acesso em: 10 nov. 2014.",
    "sourceImage": "/writing/insumos/2015-1-t3.jpg",
    "keyFacts": [
      "Os eletrossensíveis"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta ao prefeito",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2015-1-t4",
    "cycle": "2015/1",
    "number": "Tarefa 4",
    "title": "Pais do lar",
    "shortLabel": "2015/1 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você terá um filho em breve e, motivado pela reportagem “Pais do Lar”, decidiu escrever para a seção Cartas do Leitor da revista IstoÉ para manifestar sua opinião sobre o assunto da matéria. Em seu texto, você deverá se posicionar em relação à ampliação da Licença Paternidade no Brasil, utilizando, para isso, argumentos da reportagem.",
    "sourceKicker": "Insumo · prova 2015/1 · Tarefa 4",
    "sourceTitle": "Pais do lar",
    "sourceText": "Comportamento Pais do LAR Aos poucos, os parques infantis, os reuniões escolares e os consultórios pediátricos conhecem um novo frequentador: 0 homem que fico em casa para criar os filhos odo dia ele faz tudo igual: prepara o café da manhã, leva e busca na escola a filha Alice, 3 anos, dá banho na menina e, enquanto a mulher, Lúcia Farias, 32 anos, está no traba- lho, prepara o jantar. Pilotar fogão, trocar fralda, contar história para a filha dormir, nada disso parece estranho ou incômodo ao fotógrafo gaúcho Ricardo Toscani, 32 anos, que cumpre sem fazer cara feia todas essas ativida- des, que no passado eram delegadas à mãe. \"Não existe barato melhor que buscar seu filho depois da aula\", diz. Na casa dele e da mulher é assim: papai fica em casa en- quanto mamãe vai trabalhar. \"Quando ele falou: 'depois dos quatro meses de licença maternidade, eu assumo', eu fiquei mais tranquila e topei a gravidez\", conta Lúcia, que não pensava em ser mae. Configurações como essa ainda são pouco comuns no Brasil e causam certo estranhamento. Expressóes como \"mas homem não sabe trocar fralda\" ou questio- namentos como \"seu marido não vai trabalhar nunca mais?\" não raro são ouvidos pelas famílias onde existe \"dono\" de casa. Mas não se engane: esses homens são apenas os primeiros de um novo modelo de pai que está em gestação, resultado direto da busca por igual- dade entre os sexos. E se aqui ainda são raros, o mesmo não ocorre em outras partes do mundo. Na Suécia, por exemplo, ficar em casa é um direito adquirido pelo pai, que pode dividir, do modo como quiser, os 480 dias de licença dados ao casal — desde que no mínimo 60 dias DEDICAÇÃO EXCLUSIVA Ricardo Toscani cuida da filha, Atice, 3 anos. enquanto a mulher \"Para o meu avó, o mais importante era ganhar dinheiro para sustentar a família\", disse à ISTOÉ o jornalista americano Jeremy Smith, que trocou o emprego pelo filho Liko quando ele tinha um ano de vida. \"Dos pais do século XXI, é esperado que eles ajudem com as tarefas domésticas e no cuidado emocional e psicológico dos filhos, não ficando mais só por conta de sustentar financeiramente a casa\", diz. Escolado na arte de cuidar do rebento, Smith garante que, embora não sejam muitos os homens como ele, nunca se sentiu solitário nos Estados Unidos. co- mum encontrar outros pais com seus filhos pelos parquinhos aqui na cidade de São Francisco. Somos uma minoria, mas estamos aí\", declara. Mesma constatação é feita nas clínicas pediátricas. \"Cada vez mais vejo homens sozinhos com a criança no meu consultório\", diz o pediatra Marcelo Reibscheid, do Hospital São Luiz, em São Paulo, que garante que os pais são tão bons cuida- dores quanto as mães. Defensores dos pais do lar também têm se proliferado entre os cientistas. Um deles, o psiquiatra americano Kyle Pruett, da Universidade de Yale, defende que a tendência masculina de desenvolver brincadeiras físicas com as crianças ajuda em muito no desenvolvimento e a presença paterna na infância forma adolescentes mais seguros sobre sua sexualidade. Basta, portanto, encarar o desafio de peito aberto para o papai descobrir que é um grande mito aquele papo de que homem não \"leva jeito\" com criança. \"Claro que sejam para o homem. NORUEGA: 46 semanas a serem dividas entre pai e mae. sendo que peb menos dez Seman as devem ser ocupadas pai SUÉCIA: 480„que podem ser div ididos aleatoriamente entre pai e mae. e tirados do nascimento até o oitavo ano de vida do filho ISLÂNDIA: 90dias eEluslvos para 0 pai e mitros 90 dias que pa•m ser dlvidos da maneira como o casal desejar FINLANDIA: 18dias HOMEM EM CASA Prazos de no Brasll e FRANÇA: BRASIL: 5 dias e, em alguns Estados. IS COLÔMBIA: dias CHILE: 5 dias tem umas coisas que dão muito desespero\", admite o jornalista paulista Ricardo Brandt, 36 anos, pai das bebês gêmeas Beatriz e Helena. Ele não se esquece das primeiras cólicas das filhas e das crises de cho- ro noturnas sem nenhuma razão aparente. \"Cansa a gente muito, mas não existe coisa mais gratificante que ver o sorriso delas\", diz o pai, autor do blog O Papai, as Gêmeas e a Mamãe. Ter de inventar uma soluçao para ficar com os filhos, como fizeram Brandt e Toscani, é comum no Brasil, uma vez que a licença-paternidade prevista em lei é de apenas cin- co dias. \"Ainda estamos bem atrasados, vai demorar para a Constituição absorver essa mudança que.já está acontecendo na sociedade\", considera o asses- sor legislativo da Sociedade Brasileira de Pediatria, Dioclécio Campos Júnior. Mas, tudo indica, é uma questão de tempo. Revista ISTOÉ. Ed. Três: sao Paulo, 15 ago. 2012",
    "sourceImage": "/writing/insumos/2015-1-t4.jpg",
    "keyFacts": [
      "Pais do lar"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2014-2-t1",
    "cycle": "2014/2",
    "number": "Tarefa 1",
    "title": "Turismo para a terceira idade",
    "shortLabel": "2014/2 · T1",
    "genre": "e-mail de resposta a cliente",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha em uma agência de turismo e precisa responder a um e-mail de um cliente idoso que pediu uma sugestão de lugar para passar suas próximas férias de verão. Em sua resposta, com base nas informações do vídeo, indique a cidade de Balneário Camboriú, informando as características do local e destacando os cuidados oferecidos pela rede hoteleira, voltados para o público da terceira idade.",
    "sourceKicker": "Insumo · prova 2014/2 · Tarefa 1",
    "sourceTitle": "Turismo para a terceira idade",
    "sourceText": "Falante 1: A roupa de banho é mais comportada e no bate-papo nas rodinhas, nada de assuntos como balada, vida noturna. Sai de cena aquela turma jovem, de estudantes, entra a terceira idade. A praia mais movimentada do sul do país agora é deles. E eles se divertem relaxando nas cadeiras ou mesmo no mar. São, na maioria, turistas do Mercosul que viajam quilômetros para aproveitar a infraestrutura da cidade e, é claro, o finalzinho do verão. Os jubilados, como preferem ser chamados, fazem a festa do setor de turismo nessa época do ano que as férias dos brasileiros já terminaram.\n\nFalante 2: Balneário Camboriú é uma praia muito tranquila, né? Ela não tem repuxos, ela não tem ondas muito grandes. Ela, né, é uma praia de areia dura, boa de caminhar. Então, as pessoas de terceira idade que têm, às vezes, problema de caminhar e que precisam de sombra, de tudo, eles se encontram com essa parte do calçadão também, né, onde tem o-- quando-- onde a gente chama que é o turismo de sombra.\n\nFalante 1: Só nesse hotel, eles garantem noventa por cento da ocupação.\n\nFalante 3: Garante trabalho pra todo mundo, alimenta a hotelaria, restaurantes, passeios e tudo que é o, o meio turístico da, da cidade, com certeza.\n\nFalante 1: E vocês têm um serviço diferenciado pra eles?\n\nFalante 3: Claro, todo atendimento é voltado pra ele, um atendimento mais específico, a alimentação é, é mais balanceada, servido pratos mais leves, toda uma estrutura voltada pra esse público.\n\nFalante 4: É importante também a oferta de bastante líquido pro idoso. É uma das coisas que eu tenho percebido que os hotéis não se preocupam muito, né? Servirem um suco durante a, as refeições, servir água à vontade pra que estimulasse a hidratação desses idosos. É bastante interessante ter é, e-esse olhar humano para o turismo.\n\nFalante 1: Um cardápio adaptado, com menos condimentos e sódio, foi elaborado para atender esse público que lota o restaurante.\n\nFalante 5: A nossa cozinheira já trabalha conosco há mais de dez anos e ela tem por característica, e também por nossa recomendação, de condimentar pouco a comida, quer dizer, de ser, é, é ser bastante controlada no tempero. E nessa época do ano, é claro que ela, digamos assim, segue à risca essa recomendação, porque setenta, oitenta por cento da clientela é de, é terceira idade.",
    "keyFacts": [
      "do vídeo",
      "indique a cidade de Balneário Camboriú",
      "informando as características do local",
      "os cuidados oferecidos pela rede hoteleira"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de resposta a cliente",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2014-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2014-2-t2",
    "cycle": "2014/2",
    "number": "Tarefa 2",
    "title": "Hot Spot",
    "shortLabel": "2014/2 · T2",
    "genre": "texto de divulgação para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é diretor de uma escola de artes e foi convidado para fazer um texto de divulgação do Movimento Hot Spot no site da escola. Com base no áudio, inclua em seu texto informações sobre a origem do movimento, seus objetivos e suas características, incentivando a participação de alunos e professores.",
    "sourceKicker": "Insumo · prova 2014/2 · Tarefa 2",
    "sourceTitle": "Hot Spot",
    "sourceText": "Falante 1: [bipe] Inovar, motivar, transformar e divulgar a produção criativa em uma grande exposição multimídia de artes integradas. Esse é o objetivo do movimento HotSpot. É um dos maiores festivais de incentivo a talentos criativos de todo o país. Paulo Borges, que é o idealizador do movimento, conta que no início, há treze anos, o HotSpot era ligado somente à moda, mas depois ganhou outras atividades.\n\nFalante 2: Bom, esse projeto nasceu, na verdade, em 2001, como uma incubadora de moda, só pra designers de moda. Nós trabalhamos durante sete anos dentro desse projeto. Depois, a partir de 2007, a gente percebeu que a, essa geração trabalhava com criatividade de maneira muito diversa e muito transversal. Quer dizer, quem era de moda trabalhava com música, com fotografia, com ilustração. A-as misturas criativas eram muito presentes. E aí nós transformamos o que era o, o projeto HotSpot no movimento HotSpot, um prêmio nacional, é, em onze áreas criativas, a moda tá incluída.\n\nFalante 1: Como o movimento passa por todo o Brasil, a diversidade cultural é percebida. Para Paulo Borges, em cada cidade há um formato diferente e isso permite uma troca de informação e costumes.\n\nFalante 2: O mais bacana do projeto é que a gente, é, potencializa essa diversidade. Por exemplo, em cada cidade que o festival passa, ele acaba tendo um formato diferente, porque tem um local diferente, tem uma relação com a cidade diferente, tem uma troca. É um projeto muito feito de troca, né? Então, aqui mesmo em Salvador, que vai ser no Teatro Vila Velha, aí no Passeio Público, é, você vai ter, é, performances de artistas locais, de música, de artes visuais, é, troca de bate-papo.\n\nFalante 1: Até este sábado, o movimento HotSpot leva até o Teatro Vila Velha uma programação extensiva no Passeio Público com trabalhos de música, fotografia, filme, arquitetura, design gráfico, beleza, moda, além de oficinas, palestras e shows. O idealizador do movimento, Paulo Borges, chama a todos para interagir e apreciar uma mistura cultural brasileira.\n\nFalante 2: É um projeto gratuito, você não paga pra ver nada, pra participar de nada, então é aberto ao público no Teatro Vila Velha, com exposição, com bate-papo, com, com shows musicais, que acontece ali no Passeio Público até às vinte e duas horas.\n\nFalante 1: [bipe] Inovar, motivar, transformar e divulgar a produção criativa em uma grande exposição multimídia de artes integradas. Esse é o objetivo do movimento HotSpot. É um dos maiores festivais de incentivo a talentos criativos de todo o país. Paulo Borges, que é o idealizador do movimento, conta que no início, há treze anos, o HotSpot era ligado somente à moda, mas depois ganhou outras atividades.\n\nFalante 2: Bom, esse projeto nasceu, na verdade, em 2001, como uma incubadora de moda, só pra designers de moda. Nós trabalhamos durante sete anos dentro desse projeto. Depois, a partir de 2007, a gente percebeu que a, essa geração trabalhava com criatividade de maneira muito diversa e muito transversal. Quer dizer, quem era de moda trabalhava com música, com fotografia, com ilustração. A-as misturas criativas eram muito presentes. E aí nós transformamos o que era o, o projeto HotSpot no movimento HotSpot, um prêmio nacional, é, em onze áreas criativas, a moda tá incluída.\n\nFalante 1: Como o movimento passa por todo o Brasil, a diversidade cultural é percebida. Para Paulo Borges, em cada cidade há um formato diferente e isso permite uma troca de informação e costumes.\n\nFalante 2: O mais bacana do projeto é que a gente, é, potencializa essa diversidade. Por exemplo, em cada cidade que o festival passa, ele acaba tendo um formato diferente, porque tem um local diferente, tem uma relação com a cidade diferente, tem uma troca. É um projeto muito feito de troca, né? Então, aqui mesmo em Salvador, que vai ser no Teatro Vila Velha, aí no Passeio Público, é, você vai ter, é, performances de artistas locais, de música, de artes visuais, é, troca de bate-papo.\n\nFalante 1: Até este sábado, o movimento HotSpot leva até o Teatro Vila Velha uma programação extensiva no Passeio Público com trabalhos de música, fotografia, filme, arquitetura, design gráfico, beleza, moda, além de oficinas, palestras e shows. O idealizador do movimento, Paulo Borges, chama a todos para interagir e apreciar uma mistura cultural brasileira.\n\nFalante 2: É um projeto gratuito, você não paga pra ver nada, pra participar de nada, então é aberto ao público no Teatro Vila Velha, com exposição, com bate-papo, com, com shows musicais, que acontece ali no Passeio Público até às vinte e duas horas.\n\nFalante 1: [bipe]",
    "keyFacts": [
      "Hot Spot"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de divulgação para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2014-2/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2014-2-t3",
    "cycle": "2014/2",
    "number": "Tarefa 3",
    "title": "Conheça o mundo e ajude a mudá-lo",
    "shortLabel": "2014/2 · T3",
    "genre": "carta de candidatura",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Uma organização que oferece programas de voluntariado está recrutando novos “volunturistas”. Interessado em participar dessa iniciativa, escreva uma carta à instituição, candidatando-se a uma vaga. Você deve apresentar-se, expor suas motivações para participar do programa e apontar possíveis locais de atuação de acordo com o seu perfil.",
    "sourceKicker": "Insumo · prova 2014/2 · Tarefa 3",
    "sourceTitle": "Conheça o mundo e ajude a mudá-lo",
    "sourceText": "Conheça o mundo e ajude a mudá-lo Para ser um \"volunturista\" e viajar pelo mundo prestando serviços sociais, é preciso coragem, adequação financeira e tempo disponível. Texto e fotos por Carolina Bergier Em 1980, o pesquisador, mergu- lhador e documentarista francês Jacques Cousteau precisava de aju- dantes para expedições em alto-mar. Não dispunha de verba para contra- tações e abriu vagas para voluntários acompanharem suas viagens subma- rinas. Em troca, oferecia aventuras a bordo do Calypso. Trinta anos de- pois, a prática se profissionalizou e ganhou nome: \"volunturismo\". Nessa forma especial de turismo, os princípios básicos são participação ativa do viajante, trabalho voluntá- rio por causas sociais, humanitárias ou ambientais e ausência de mo- tivaçâo financeira. Quem decidir viajar nesses moldes, dependendo do esquema, paga não só pela pas- sagem, mas também pela acomoda- çâo — que passa longe de mordomias de hoteis estrelados. O custo varia de acordo com o tempo de estadia, 1 o país visitado e o lugar de trabalho. Mas quem já se engajou na causa diz que cada centavo é válido. \"Quando você sente que está trans- formando não só a si mesmo, mas também impactando positivamente uma comunidade, esquece que hou- ve troca monetária envolvida. No meu caso, quanto mais pobre o lu- gar, mais prazer eu tinha em pagar\", diz a ex-empresária americana Della Meyers, de 56 anos, que, depois de trabalhar com animais como volun- tária na Tailândia, África do Sul e Bali, vendeu uma livraria na França e se mudou para uma comunidade agrícola em Israel. Para ser um \"volunturista\", além de coragem e adequação financeira, é necessário ter tempo suficiente para gastar na viagem. O período de per- manência pode variar de duas sema- nas a um ano e meio, porém a esta- dia mínima e a máxima dependem do acordo com a organização hospedeira. O perfil ide- al de um volunturista requer proatividade, disposição, flexibilidade, responsabilidade e vontade de se envolver com atividades que não somam somente para o próprio prazer. Em média, são cinco horas de trabalho por dia em cinco dias por semana. Antes de pegar o avião, é essencial saber exatamente a quantidade de tempo e a atividade para a qual o voluntário está se propondo. É impor- tante também ler não só os guias de viagens do local de destino, mas se informar sobre a situação política e econômica e a cultura do lugar, para evitar gafes e não sofrer muito com o inevitável choque cultural. Foi por meio da organização Help Exchange que Samantha Levy, arquiteta sul-africana radicada na Austrália, 27 anos, rodou o mundo. \"O melhor e o pior de uma viagem como volunturista é a volta para casa. Per- cebi que há diversas maneiras de viver e ex- pressar a existência e aquilo me mudou pra sempre. Não dava pra continuar vivendo do mesmo jeito\", conta ela, que saiu de casa em março de 2011, para estudar design susten- tável no deserto israelense, por cinco meses, e só voltou para Melbourne um ano depois, após passar por Portugal, Itália e França tra- balhando como voluntária em comunidades agrícolas e ecovilas. Já em casa, Samantha recusou a proposta de emprego no maior escritório de arquitetura da Austrália e voltou para a faculdade, des- sa vez para estudar bioarquitetura, enquanto lança um site que \"revela as verdades sobre nossos atuais sistemas urbanos e promove projetos que fornecem às pessoas novas al- ternativas para felicidade, saúde e riqueza social\". REVISTA Planeta. Ed. 480. set. 2012.",
    "sourceImage": "/writing/insumos/2014-2-t3.jpg",
    "keyFacts": [
      "apresentar-se",
      "expor suas motivações para participar do programa",
      "apontar possíveis locais de atuação de acordo com o seu perfil"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta de candidatura",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2014-2-t4",
    "cycle": "2014/2",
    "number": "Tarefa 4",
    "title": "Leitura e tecnologia",
    "shortLabel": "2014/2 · T4",
    "genre": "artigo de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é escritor e foi convidado a redigir um artigo de opinião sobre o tema “leitura e tecnologia” para uma revista de circulação nacional. Em seu texto, discuta as perspectivas de Philip Roth e de Robert Darnton e posicione-se a respeito do tema.",
    "sourceKicker": "Insumo · prova 2014/2 · Tarefa 4",
    "sourceTitle": "Leitura e tecnologia",
    "sourceText": "Philip Roth: \"A cultura literária vai acabar em 20 anos\" O escritor americano afirma que a tec- nologia deve acabar com o livro em papel e que a literatura tende a perder a influência na formação dos jovens Por Luis António Giron, de Nova York O autor Philip Roth em Nova York. ern 2010. Após 52 arws de CarreÊa. ele continua um favorito na lista dos cotados para 0 Literatura (Fotty Steve Pyke,'Contm1rPbotos/Getty Images) os 78 anos, 52 de carreira, ele é tido por críticos respeitados como o maior escritor vivo e figura há décadas na lista de possíveis ganhadores do Prémio Nobel. É o único autor vivo a merecer a edição de suas obras na editora The Library of Ame- rica, dedicada a escritores consagrados. Sob sua supervisão, o nono e último volume com os romances curtos deverá sair em 2013. Dele fará parte Nêmesis, seu 220 romance, recém-lançado no Brasil. ÉPOCA — Não há nenhum computador nesta sala. O que o senhor pensa sobre os avanços tecnológicos como tablets e e-readers? Eles melhoram a compreensão do mundo? O Futuro do Livro: Robert Darnton Por Daniel Kossmann Ferraz \"Mas as pessoas dizem que o futuro é digital. Claro que é digital. O presente também é digital.\" uando o assunto é a especulação a respeito do futuro do livro, é difícil não ouvir aquela já batida pergunta: \"o livro digital vai matar o livro físico?\". Mas por que um deve ne- cessariamente aniquilar o outro? Não seria possível haver uma coexistência? Robert Darnton, historiador e diretor da bibliote- ca de Harvard, a maior biblioteca universitária do mundo, não só defende a ideia de que os dois podem coexistir, mas que são complementares, que um reforça o outro. Darnton não é só conhecido como um grande historiador norte- -americano, mas também como um dos pioneiros na área da história do livro. Um de seus livros, A Questão dos Livros — pas- sado, presente e futuro (The Case for Books, 2010), traduzido por Daniel Pellizzari e lançado pela Companhia da Letras, aborda justamente este questionamento a respeito do futuro dos livros. Mesmo com o barulho em torno dos livros digitais, sabemos que eles vão conviver um bom tempo com os livros em papel. Quais as principais questões que ainda não mereceram a devida aten- çáo quando se fala nisso? Philip Roth — Não sou fanático por tecnologia. Tenho o mes- mo telefone celular há anos e não pretendo trocá-lo. Escrevo em computador, como fiz antes com a máquina de escrever. É óbvio que as máquinas facilitam a finalização de um texto. Só que as coisas estão se transformando muito rapidamente para meu gosto. Não consigo achar graça em ler livros em formato eletrônico em e-reader. Outro dia passei em uma loja Apple com a forte disposição de comprar um iPad. Cheguei lá, vi tanta gente se acotovelando para ver como funcionava o aparelho e cheguei a testá-lo. Acabei desistindo. Não sei por que, mas o iPad não me convenceu, talvez porque pareça chato escrever nele, e ler nele é dispersivo. Quem vai conseguir ler um livro inteiro meu naque- le tablet? É mais um totem do culto à tecnologia. Hoje, toda a cultura se encontra a nossa disposição. E isso me preocupa. A cultura literária como conhecemos vai acabar em 20 anos. Ela já está agonizando. Obras de ficção não despertam mais interesse dos jovens, e tenho a impressão de que não sáo mais lidas. Hoje, a atenção é voltada para o mais novo celular, o mais novo tablet. Daqui a poucas décadas, a relação do público e do escritor com a cultura será muito diferente. Não sei como será, mas os livros em papel vão acabar. Surgirá outro tipo de literatura, com recursos audiovisuais e o que mais inventarem. (ispnivel http•lfrevistaetxxa.glcbo.corn.Acesso em: 30 set. Darnton - Tenho sido convidado para tantas conferências sobre a morte do livro que acredito que o livro está muito mais vivo. Te- nho algumas estatísticas sobre a produção de livros: a produção de livros impressos aumenta a cada ano e, em breve, teremos 1 milhão de títulos novos a cada ano. Sei que no Brasil o mercado editorial está florescendo. Portanto, a ideia de que o livro morreu me parece absurda. Contudo, levo a sério o fato de que livros eletrônicos são a onda do futuro. E como conduzir essa transi- çáo de um mundo onde o livro impresso é dominante para um futuro onde os livros digitais dominarão? Estamos passando por um tipo de fase de transição onde ambos vão conviver. E isso, para mim, é o momento mais excitante e interessante, porque podemos trabalhar em novos tipos de livros, depois de repensar a noção do que é um livro. Como escritor, acho que eles são com- plementares, e não contraditórios. Se você analisar a História da Comunicação, descobrirá que uma mídia não toma o lugar de outra, elas vivem num tipo de co- -habitação, que é mutuamente benéfica. Aprendemos que, no tempo de Gutenberg, apesar de sabermos que a impressão foi uma tremenda nova força, os livros manuscritos, que tinham uma tradição de 100, 200 cópias, permaneceram. Ambos refor- çaram um ao outro, por serem incomparáveis. E agora temos isso novamente, com o livro impresso e eletrônico a se reforçarem. Disponivel em: http•flinterrogacao.com.br. Acesso em: 7 jul 2013.",
    "sourceImage": "/writing/insumos/2014-2-t4.jpg",
    "keyFacts": [
      "Leitura e tecnologia"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2014-1-t1",
    "cycle": "2014/1",
    "number": "Tarefa 1",
    "title": "Café",
    "shortLabel": "2014/1 · T1",
    "genre": "texto de apresentação de cardápio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é publicitário e foi contratado para produzir o texto de apresentação do cardápio de uma cafeteria. Com base nas informações do vídeo, escreva o texto de apresentação desse cardápio, inserindo curiosidades sobre o café e destacando as características de um café especial.",
    "sourceKicker": "Insumo · prova 2014/1 · Tarefa 1",
    "sourceTitle": "Café",
    "sourceText": "Falante 1: [bipe] [música animada]\n\nFalante 2: Minha avó era, morava em fazenda e, e fazenda sempre tem muita fartura, né? Então, sempre que chegava uma visita, colocava aquela mesa cheia de, de quitandas, né? E o café não podia faltar. Café de fazenda é sempre torrado no torrador. De longe a gente percebe quando tá torrando café. Pra moer, eles tinham um moinho, que moía o café na hora. O sabor é muito diferente.\n\nFalante 1: [som de máquina] Só que antes de chegar ao Brasil, o café percorreu um longo trajeto. A planta é originária da Etiópia, mas foram os árabes os primeiros a cultivar o café. No século dezoito, Holanda e França levam o cultivo do café para suas colônias, entre elas a Guiana Francesa, vizinha do antigo estado Grão-Pará. A partir do Pará, o café foi levado para o Rio de Janeiro e depois para São Paulo. Hoje, o Brasil é o segundo maior consumidor de café e continua líder na produção e na exportação do produto. Quase trinta por cento da produção do país é de café especial, de qualidade superior.\n\nFalante 3: O que se procura, na realidade, é uma uniformidade cada vez maior nessa, né, na, na maturação desses frutos, porque isso favorece um processamento muito mais adequado à obtenção de produtos de boa qualidade. Um café de boa qualidade, ele deve ser colhido maduro e processado nesse estágio de maturação.\n\nFalante 1: [som de máquina] Na indústria, o café especial também precisa passar por um processo mais rigoroso. O café produzido aqui é avaliado e certificado. O primeiro passo é selecionar os melhores grãos. Nessa indústria, a triagem é feita em três etapas. A torrefação tem controle digital de tempo e temperatura. Essa é uma parte crucial do processo de industrialização do café. A temperatura não pode ser superior a cento e noventa graus, para evitar a queima do grão. Em seguida, o café é resfriado e pode ser vendido em grão ou moído. A embalagem tem que proteger o café da luminosidade, para preservar o sabor e o aroma.\n\nFalante 3: É possível se encontrar na gôndola de um supermercado cafés diferenciados por região, diferenciados por sabores, cafés gourmets, cafés orgânicos, ou seja, o mercado interno tem se beneficiado também pela busca de produtos para o mercado externo.",
    "keyFacts": [
      "do cardápio de uma cafeteria"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de apresentação de cardápio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2014-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2014-1-t2",
    "cycle": "2014/1",
    "number": "Tarefa 2",
    "title": "Cinematerna",
    "shortLabel": "2014/1 · T2",
    "genre": "coluna de revista",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é colunista de uma revista voltada para mães de crianças pequenas. Com base nas informações do áudio, escreva o texto para ser publicado na próxima edição da revista, explicando o que é o Cinematerna, como ele surgiu, e encorajando as leitoras a participarem dessa iniciativa.",
    "sourceKicker": "Insumo · prova 2014/1 · Tarefa 2",
    "sourceTitle": "Cinematerna",
    "sourceText": "Falante 1: [bipe] O Cine Materna começou em São Paulo há cinco anos atrás e hoje está em vinte e seis cidades do Brasil com cinquenta sessões por mês. Num grupo de discussão pela internet sobre parto humanizado e maternidade, Irene Nagashima contou da saudade que sentia de frequentar o cinema depois do nascimento do primeiro filho. As mães se organizaram e dez delas, com seus bebês, ocuparam uma sala de cinema em fevereiro de 2008, na capital paulista. Em agosto do mesmo ano, nasce oficialmente o Cine Materna.\n\nFalante 2: Bom, ó, o Cine Materna começou com uma necessidade pessoal. Eu sou supercinéfila, então eu tava com um bebê de cinco meses, desesperada pra ir ao cinema, porque era o meu momento de lazer. Eu ia duas a três vezes por semana pro cinema e aí fazia cinco meses que eu não ia e tava realmente desesperada. Desabei com um grupo de mães na, na internet assim, e elas falaram: \"Ah, por que que a gente não tenta ir ao cinema com os bebês?\" E aí mobilizei aquele grupo, a gente escolheu um filme, uma sessão tranquila assim, no meio da tarde, é, de um dia de semana. E aí a gente foi. Foi maravilhoso, assim, entrar no cinema de novo. E aí a gente foi tomar um café e ficou conversando por quatro horas. E aí a gente viu que aquele programa pra gente dava muito certo. Era uma coisa que a gente precisava conversar, desabafar, trocar ideias. E aí resolvemos fazer aquilo por todas as semanas. Fizemos por seis meses, até que a gente percebeu. O negócio foi crescendo, crescendo, cada vez mais gente descobrindo o grupo. Só que a gente não tinha nada, assim, nenhum site, nada. E a, o som, luz, essas coisas não eram ajustadas. Então a gente foi, é, negociou com uma rede de cinemas e ajustou tudo isso. Então os parâmetros que hoje a gente tem, né, então uma sala um pouco mais clara, o som mais baixo, o ar-condicionado que a gente monitora, trocador, isso a gente negociou e aí fundou o Cinema Terna mesmo, que é uma ONG. E a gente faz essas sessões, é, pelo Brasil afora. São vinte e seis cidades e mais de cinquenta sessões por mês, né. E aí a nossa dedicação é toda voltada pra essas mulheres que tiveram um filho recentemente e assim, acabam deixando sua vida de lado pra se dedicar ao bebê.\n\nFalante 1: Como que as pessoas podem, as mães podem participar? O que que elas têm que fazer pra participar?\n\nFalante 2: É, as mães, elas não precisam tá cadastradas no site, mas elas podem se cadastrar no site pra poder votar nos filmes.\n\nFalante 1: Qual que é o site mesmo?\n\nFalante 2: É cinematerna.org.br. E ao se cadastrar, elas podem votar nos filmes, né, da próxima sessão, hã, dez dias antes da sessão acontecer. Então ela, ela faz a programação da própria cidade. Isso é bacana. Ela não precisa tá cadastrada pra vir ao cinema. Ela pode simplesmente aparecer, comprar o ingresso. O ingresso é o preço normal de bilheteria, hã, com as promoções, meia-entrada, enfim, tudo normal. É, e aí ela, ela vem pro, pro cinema com o seu bebê.\n\nFalante 1: O Cine Materna começou em São Paulo há cinco anos atrás e hoje está em vinte e seis cidades do Brasil, com cinquenta sessões por mês. Num grupo de discussão pela internet sobre parto humanizado e maternidade, Irene Nagashima contou da saudade que sentia de frequentar o cinema depois do nascimento do primeiro filho. As mães se organizaram e dez delas, com seus bebês, ocuparam uma sala de cinema em fevereiro de 2008, na capital paulista. Em agosto do mesmo ano, nasce oficialmente o Cine Materna.\n\nFalante 2: Bom, ó, o Cine Materna começou com uma necessidade pessoal. Eu sou supercinéfila, então eu tava com um bebê de cinco meses, desesperada pra ir ao cinema, porque era o meu momento de lazer. Eu ia duas a três vezes por semana pro cinema, e aí fazia cinco meses que eu não ia e tava realmente desesperada. Desabei com um grupo de mães na, na internet assim, e elas falaram: \"Ah, por que que a gente não tenta ir ao cinema com os bebês?\" E aí mobilizei aquele grupo, a gente escolheu um filme, uma sessão tranquila assim, no meio da tarde, é, de um dia de semana. E aí a gente foi. Foi maravilhoso, assim, entrar no cinema de novo. E aí a gente foi tomar um café e ficou conversando por quatro horas. E aí a gente viu que aquele programa pra gente dava muito certo. Era uma coisa que a gente precisava conversar, desabafar, trocar ideias. E aí resolvemos fazer aquilo por todas as semanas. Fizemos por seis meses, até que a gente percebeu. O negócio foi crescendo, crescendo, cada vez mais gente descobrindo o grupo. Só que a gente não tinha nada, assim, nenhum site, nada. E a, o som, luz, essas coisas não eram ajustadas. Então a gente foi, é, negociou com uma rede de cinemas e ajustou tudo isso. Então os parâmetros que hoje a gente tem, né, então uma sala um pouco mais clara, o som mais baixo, o ar-condicionado que a gente monitora, trocador, isso a gente negociou e aí fundou o Cinema Terna mesmo, que é uma ONG. E a gente faz essas sessões, é, pelo Brasil afora. São vinte e seis cidades e mais de cinquenta sessões por mês, né. E aí a nossa dedicação é toda voltada pra essas mulheres que tiveram um filho recentemente e assim, acabam deixando sua vida de lado pra se dedicar ao bebê.\n\nFalante 1: Como que as pessoas podem, as mães podem participar? O que que elas têm que fazer pra participar?\n\nFalante 2: É, as mães, elas não precisam tá cadastradas no site, mas elas podem se cadastrar no site pra poder votar nos filmes.\n\nFalante 1: Qual que é o site mesmo?\n\nFalante 2: É cinematerna.org.br. E ao se cadastrar, elas podem votar nos filmes, né, da próxima sessão, hã, dez dias antes da sessão acontecer. Então ela, ela faz a programação da própria cidade. Isso é bacana. Ela não precisa tá cadastrada pra vir ao cinema. Ela pode simplesmente aparecer, comprar o ingresso. O ingresso é o preço normal de bilheteria, hã, com as promoções, meia-entrada, enfim, tudo normal. É, e aí ela, ela vem pro, pro cinema com o seu bebê.",
    "keyFacts": [
      "do áudio",
      "escreva o texto para ser publicado na próxima edição da revista",
      "explicando o que é o Cinematerna",
      "como ele surgiu"
    ],
    "mustDo": [
      "escrever no gênero pedido: coluna de revista",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2014-1/tarefa2-audio.m4a"
    }
  },
  {
    "id": "2014-1-t3",
    "cycle": "2014/1",
    "number": "Tarefa 3",
    "title": "Biblioteca Comunitária Ilê Ará",
    "shortLabel": "2014/1 · T3",
    "genre": "carta de apresentação",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "A Secretaria Municipal da Cultura de Porto Alegre está premiando ações bem-sucedidas na área social. Como chefe da Biblioteca Comunitária Ilê Ará, você acredita que a iniciativa de levar livros a sua comunidade merece ser premiada. Assim, escreva uma carta de apresentação do trabalho realizado por vocês, no Morro da Cruz, direcionada à comissão julgadora do prêmio. Em seu texto, descreva a iniciativa e explique por que ela merece ser premiada.",
    "sourceKicker": "Insumo · prova 2014/1 · Tarefa 3",
    "sourceTitle": "Biblioteca Comunitária Ilê Ará",
    "sourceText": "BAGAGEM VALIOSA No sobe e desce do bairro de Porto Alegre, Alves semeia cultura O morro e as malas Se os leitores não visitam as bibliotecas, que tal levar os livros até a casa deles? BEATRIZ VICHESSI, de Porto Alegre, RS bvichessi@abril.com.br Encontrar um morador do Morro Eda Cruz, em Porto Alegre, com destino ao aeroporto e à rodoviária não é, definitivamente, algo comum. A região é um dos pontos carentes da capital gaúcha, o que faz com que boa parte de seus habitantes nunca viaje — e conheça apenas as redondezas e, ainda por cima, a pé. Apesar disso, ver pessoas puxando malas para cima e para baixo é corri- queiro. Em vez de roupas, calçados e outros objetos essenciais para viajan- tes, elas carregam livros, levados de casa em casa pelos funcionários da biblioteca comunitária Ilê Ará. \"Visi- tar as residências foi o melhor tipo de comunicação para conquistar leitores e divulgar os eventos que realizamos, como os cafés literários. Dá mui- to mais resultado do que distribuir panfletos\", explica Maurício Alves, 22 anos, funcionário da biblioteca. A ideia faz todo sentido: além de os moradores não terem o hábito da leitura, a geografia da área não faci- lita. Para chegar à biblioteca Ilê Ará, expressão da língua africana iorubá que significa \"casa do povo\", é preciso fôlego. Ela fica no ponto mais alto do Morro da Cruz - que tem 120 me- tros de altura — e a subida é bastante íngreme. Debaixo do sol escaldante do meio-dia, percorrer o caminho desconexo, cheio de becos e ruas es- treitas, é um grande desafio, que os funcionários tiram de letra — afinal, nasceram e cresceram no local. No início, eles iam até a casa de co- nhecidos para facilitar a abordagem. Com o passar do tempo, ampliaram a visitação para outros moradores. \"O segredo é fazer mais que uma apresentação do traba- lho que realizamos. É conhecer as pessoas e não ter a vergonha de conversar sobre a vida, perguntar o que gostamos de fazer. Um bom papo sempre cativa e abre portas\", fala Paulo Centurion, 22 anos, companheiro de Alves nas andanças pelo morro. Ele conta que até uem diz que não é muito fã de leitura acaba cando com alguns livros. \"Por isso, é impor- tante rechear as malas com muita variedade e não se deixar vencer pelo primeiro 'não\"', diz o rapaz. Com livros de receitas culinárias, ele já conquistou várias donas de casa, que agora também saboreiam as histórias escritas por autores consagrados, como Jorge Amado. E quando a visita não rende empréstimo de jeito algum? Por que nada agrada? \"A gen- te anota o pedido ou volta outro dia com no- vas ofertas\". Hoje, muitos moradores sobem até o alto do morro para escolher o que querem ler, movimentando 1,2 mil empréstimos por mês. Cinco malas circulam na área, com parte dos 5 mil títulos de acervo. Às vezes, inclusive, saem da biblioteca carregadas por gente miúda como Gabriela Souza da Rosa, II anos. Durante minha estada na cidade, lá esta- va ela, montando por conta própria uma das bagagens para sua família. \"Já sei que meus pais e minha irmã gostam mais de romances, poesia, contos de fada e gibis. Então, venho aqui, monto uma mala e levo para casa\", diz. A garota é filha de uma auxiliar de limpe- za e de um varredor de rua. Por passarem o dia todo fora, os pais dela não conseguem ir à biblioteca. Olhando as estantes, Gabriela se- leciona alguns volumes e vai organizando a mala. Enquanto alcanço uma das prateleiras mais altas para ajudá-la, tento — ainda que mentalmente — me livrar do clichê \"ler é via- jar sem sair do lugar\". Mas é inevitável. Na Ilê Ará, essa máxima é levada à risca. QUER SABER MAIS? Contato Biblioteca Comunitária Ilê Ará, R. Santo Alfredo, 1249, 91520-550 Porto Alegre, RS, tel. (51) 3318-3125 Disponível em: www.revistaescola.abril.com.br. Acesso em: 25 fev. 2014.",
    "sourceImage": "/writing/insumos/2014-1-t3.jpg",
    "keyFacts": [
      "do trabalho realizado por vocês",
      "no Morro da Cruz",
      "direcionada à comissão julgadora do prêmio"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta de apresentação",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2014-1-t4",
    "cycle": "2014/1",
    "number": "Tarefa 4",
    "title": "GPS",
    "shortLabel": "2014/1 · T4",
    "genre": "crônica",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como colunista da seção “Última Palavra” da Revista IstoÉ, você decidiu escrever um texto colocando-se na posição do taxista mencionado na crônica “GPS”, de Zeca Baleiro. No texto, narre a sua versão dos fatos, posicionando-se em relação ao uso da tecnologia na sociedade atual.",
    "sourceKicker": "Insumo · prova 2014/1 · Tarefa 4",
    "sourceTitle": "GPS",
    "sourceText": "ZecaBaIeiro cantor e compositor Última palavra GPS Entrei no taxi e falei o meu destino. — Rua Araribóia, por favor. — Araribóia? Espera um minuto!... — rebateu o homem. Programou então o GPS e arrancou. — Não precisa de GPS, amigo. Sei mais ou menos onde fica. Posso lhe orientar. — Ah, não. Não saio mais de casa sem isto — declarou. Resmunguei em silêncio. E lá se foi o taxista seguindo seu brin- quedinho falante — \"vire à esquerda\"; \"a 50 metros você vai virar à direita\"; \"daqui a 300 metros faça o retorno à esquerda\"... De repente, entre uma e outra prosa, vi ele se afastando da dire- ção que eu julgava ser a correta. — Amigo, acho que você está na direção contrária. Tinha que ter entrado naquela rua à direita, melhor fazer o re- torno na frente. — Não, não, olha aqui — apontou pra geringonça, orgulhoso como ele só. É esse mesmo o caminho. Cocei a cabeça irritado. Embora eu não soubesse exatamente qual trajeto a seguir, sabia que aquele caminho que ele fazia era estupida- mente mais longo e complexo. Argumentei mais uma vez, já na iminência de explodir. — Moço, desculpe, mas tenho quase certeza que você está fazendo um caminho muito mais longo do que devia. — Não esquenta a cabeça não, companheiro. Tá aqui no GPS, ó. Não vou discutir com a tecnologia\". Sim, eu havia ouvido aquilo. E mais que uma frase de efeito de Conheço pessoas que não se deslocam mais à esquina para comprar pão sem que façam uso de GPS, Google Maps e o escambau um chofer de praça, aquilo era uma senha que explicava muita coi- sa, talvez explicasse até toda uma época. O sujeito deixava de lado sua inteligência (se é que a tinha), a experiência de anos perambu- lando a bordo do seu táxi pelas quebradas da cidade e o próprio poder de dedução para seguir uma engenhoca surda e cega — mas \"tecnológica\" — sem questioná-la, e sem que eu também pudesse fazê-lo. Não quero parecer um dinossauro (embora por vezes eu inevita- velmente pareça), mas sempre defendi um uso inteligente, comedi- do e crítico dos apetrechos eletrônicos. Conheço pessoas que, por comodidade, condicionamento ou deslumbramento com o novo mundo cibernético, não se deslocam mais à esquina para comprar pão sem que façam uso de GPS, Google Maps e o escambau. Tenho um sobrinho, um pensador irreverente de botequim, que gosta de dizer o seguinte: — As rodas de bar ficaram muito chatas depois do iPhone. Nin- guém mais pode ter dúvida alguma. Se alguém perguntar: \"como é o nome daquele cantor que cantava aquela música? \"; ou então: \"quem era o centro-avante da seleção de 86?\", logo algum bobo alegre vai acessar a internet e buscar a resposta. E aí acabar com a graça, a má- gica e o mistério... Não sobra assunto pro próximo encontro. Outro amigo filósofo de padaria, tem uma tese/profecia tenebro- sa sobre o uso sem critério dos tecnobreguetes: Diz ele: — Num futuro próximo, as pessoas deixarão de ter memória. Para que lembrar, se tudo caberá num HD externo? É. Faz bastante sentido a tese do meu amigo. Aliás, há tempos não o vejo, o... o... Como é mesmo o nome dele, gente? Aníbal, não. Átila, não... É um nome assim meio histórico... Desculpem aí, vou ter que espiar na agenda do meu celular. Disponível em: www.istoe.com.br. Acesso em: 24 fev. 2014.",
    "sourceImage": "/writing/insumos/2014-1-t4.jpg",
    "keyFacts": [
      "GPS"
    ],
    "mustDo": [
      "escrever no gênero pedido: crônica",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2013-2-t1",
    "cycle": "2013/2",
    "number": "Tarefa 1",
    "title": "O Céu de Brasília",
    "shortLabel": "2013/2 · T1",
    "genre": "introdução de processo (ofício",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como funcionário do Instituto do Patrimônio Histórico e Artístico Nacional (Iphan) que recebeu a solicitação do arquiteto Carlos F. M. Delphim, você precisa montar um processo a fim de dar encaminhamento ao pedido. Escreva a introdução desse processo a ser enviado à presidência do Iphan para solicitar o reconhecimento do céu de Brasília como Patrimônio Natural da Humanidade, apresentando os objetivos da solicitação e justificando a sua importância.",
    "sourceKicker": "Insumo · prova 2013/2 · Tarefa 1",
    "sourceTitle": "O Céu de Brasília",
    "sourceText": "Falante 1: Brasília, que já é patrimônio mundial da humanidade, pode ganhar mais um título: o céu da capital pode ser considerado um monumento natural por sua beleza e encanto.\n\nFalante 2: [música] Passa mais além do céu de Brasília, traço do arquiteto. Gosto tanto dela assim.\n\nFalante 1: Crepúsculos coloridos e luminosos com faixos de luz em diferentes direções. Azuis profundos de várias tonalidades emoldurando a beleza arquitetônica da capital. De onde quer que se olhe, é possível contemplar o espetáculo. Em pontos estratégicos, como na Esplanada ou às margens do Lago Paranoá, o horizonte se mostra em ângulos de quase trezentos e sessenta graus. Parece banal, mas é uma visão que não se tem em nenhuma outra capital do país. \"No início, havia unicamente o céu. Era o horizonte e um céu imenso, aquele céu imenso de Brasília, onde as nuvens têm uma presença enorme\". Com essas palavras, o arquiteto Lúcio Costa descreveu sua primeira impressão ao contemplar o céu de Brasília. Ao projetar o plano piloto, ele determinou que as superquadras residenciais não tivessem mais do que seis andares, preservando, assim, a visão dos moradores. Agora, este arquiteto quer manter vivo o ideal de Lúcio Costa e transformar o céu de Brasília em patrimônio natural da humanidade. O objetivo é evitar que novas construções atrapalhem essa visão ampla do horizonte, que ele considera o maior monumento da cidade.\n\nFalante 3: Eu achei que era uma forma de reconhecimento considerar que é uma paisagem cultural brasileira, porque só a cultura sabe ver e reconhecer esse valor.\n\nFalante 1: A solicitação ainda está sendo analisada pelo Instituto do Patrimônio Histórico e Artístico Nacional, o IPHAN. Para o superintendente do órgão no Distrito Federal, o pedido, além de único, faz todo sentido.\n\nFalante 4: O céu de Brasília é como um hino nacional. Hã, nós nos reconhecemos nele. Então nós só temos que fazer um discurso, montar um processo bem feitinho, com, com bastante imagem, naturalmente. Quer dizer, a moldura que faz com que a gente enxergue esse patrimônio, ela já existe, já é protegida, inclusive em plano mundial. E nós temos um fetiche com o nosso céu azul, né? E por que não reconhecer isso registrando esse, esse fato? Eu acho que vale a pena, sim.\n\nFalante 2: [música] Esse imenso, desperdício, amor vai além de seja o que for. Vai além de onde eu vou, do que sou, minha dor, minha linha do horizonte.",
    "keyFacts": [
      "os objetivos da solicitação",
      "justificando a sua importância"
    ],
    "mustDo": [
      "escrever no gênero pedido: introdução de processo (ofício",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2013-2/tarefa1-video.m4v"
    }
  },
  {
    "id": "2013-2-t2",
    "cycle": "2013/2",
    "number": "Tarefa 2",
    "title": "Escola Aberta",
    "shortLabel": "2013/2 · T2",
    "genre": "carta aos diretores",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você coordena o programa Escola Aberta e, com o propósito de ampliá-lo, escreverá uma carta para diretores de escolas situadas em comunidades carentes, incentivando-as a participarem do programa. Em seu texto, apresente o Escola Aberta e argumente sobre os benefícios do programa para a escola e a sua comunidade.",
    "sourceKicker": "Insumo · prova 2013/2 · Tarefa 2",
    "sourceTitle": "Escola Aberta",
    "sourceText": "Falante 1: O Centro Educacional Zilda Arns fica no Itapuã, cidade a mais ou menos trinta quilômetros do centro de Brasília. Desde que começou a funcionar, quatro anos atrás, a instituição aderiu ao programa Escola Aberta. Alunos, pais e outros moradores da região vão todo sábado participar de atividades como aulas de montagem e configuração de microcomputadores, oficinas de skate e aulas de inglês. A estudante Evelyn Keise Paixão Pessoa, de onze anos, escolheu artesanato.\n\nFalante 2: É bom que todo mundo, ao invés de ficar na rua, vem na escola aprender coisas novas, porque, tipo, você não tem nada pra fazer na rua, porque você não quer ficar em casa, aí você quer ir prum lugar, você não pode, aí vem pra escola pra aprender coisas novas.\n\nFalante 1: O Escola Aberta destina recursos para permitir a abertura, nos fins de semana, de centros educacionais que ficam em áreas mais pobres. As atividades financiadas pelo programa oferecem às comunidades uma opção de lazer e a possibilidade de aprender um ofício, como explica a diretora do Centro Zilda Arns, Fátima Bispo dos Santos.\n\nFalante 3: A nossa ideia, dentro em breve, a gente tá montando uma cooperativa com essas mães e pessoas da comunidade. Inclusive, a gente tá aqui com a proposta de trabalho, de criar aqui no Centro Zilda Arns uma feira de artesanato mensal pra atrair pessoas de fora que venham conhecer os trabalhos e a, e atrair também os artesãos da cidade. Com isso, a gente criar, através do movimento popular, uma cooperativa de geração de renda pra essas famílias.\n\nFalante 1: De acordo com a diretora de currículos e educação integral do Ministério da Educação, Jaqueline Moll, o programa pode transformar as comunidades onde está implantado.\n\nFalante 4: Alguns dados de pesquisa demonstraram, inclusive, a diminuição da violência naquelas comunidades e da própria violência intraescolar. Há um elemento subjetivo importante, quer dizer, na medida em que a família não vem pra escola só pra reunião de pais, em que, em geral, ouve coisas que não gostaria de ouvir em relação a seus filhos, mas ela vem pra escola pra essa, pra conviver, pra aprender, pra estar, pra estar bem, estar com os outros, a comunidade passa a se sentir parte daquela escola e sentir aquela escola como parte da sua comunidade.\n\nFalante 1: O Escola Aberta foi criado há nove anos. Em 2012, três mil e oitocentas escolas aderiram ao programa e receberam mais de quarenta e seis milhões de totais em investimentos. Para este ano, a meta é que a iniciativa chegue a oito mil centros de ensino em todo o país. De Brasília, Ricardo Carandina. O Centro Educacional Zilda Arns fica no Itapuã, cidade a mais ou menos trinta quilômetros do centro de Brasília. Desde que começou a funcionar, quatro anos atrás, a instituição aderiu ao programa Escola Aberta. Alunos, pais e outros moradores da região vão todo sábado participar de atividades como aulas de montagem e configuração de microcomputadores, oficinas de skate e aulas de inglês. A estudante Evelyn Keise Paixão Pessoa, de onze anos, escolheu artesanato.\n\nFalante 2: É bom que todo mundo, ao invés de ficar na rua, vem na escola aprender coisas novas, porque, tipo, você não tem nada pra fazer na rua, porque você não quer ficar em casa, aí você quer ir prum lugar, você não pode, aí vem pra escola pra aprender coisas novas.\n\nFalante 1: O Escola Aberta destina recursos para permitir a abertura, nos fins de semana, de centros educacionais que ficam em áreas mais pobres. As atividades financiadas pelo programa oferecem às comunidades uma opção de lazer e a possibilidade de aprender um ofício, como explica a diretora do Centro Zilda Arns, Fátima Bispo dos Santos.\n\nFalante 3: A nossa ideia, dentro em breve, a gente tá montando uma cooperativa com essas mães e pessoas da comunidade. Inclusive, a gente tá aqui com a proposta de trabalho, de criar aqui no Centro Zilda Arns uma feira de artesanato mensal pra atrair pessoas de fora que venham conhecer os trabalhos e a, e atrair também os artesãos da cidade. Com isso, a gente criar, através do movimento popular, uma cooperativa de geração de renda pra essas famílias.\n\nFalante 1: De acordo com a diretora de currículos e educação integral do Ministério da Educação, Jaqueline Moll, o programa pode transformar as comunidades onde está implantado.\n\nFalante 4: Alguns dados de pesquisa demonstraram, inclusive, a diminuição da violência naquelas comunidades e da própria violência intraescolar. Há um elemento subjetivo importante, quer dizer, na medida em que a família não vem pra escola só pra reunião de pais, em que, em geral, ouve coisas que não gostaria de ouvir em relação a seus filhos, mas ela vem pra escola pra essa, pra conviver, pra aprender, pra estar, pra estar bem, estar com os outros, a comunidade passa a se sentir parte daquela escola e sentir aquela escola como parte da sua comunidade.\n\nFalante 1: O Escola Aberta foi criado há nove anos. Em 2012, três mil e oitocentas escolas aderiram ao programa e receberam mais de quarenta e seis milhões de totais em investimentos. Para este ano, a meta é que a iniciativa chegue a oito mil centros de ensino em todo o país. De Brasília, Ricardo Carandina.",
    "keyFacts": [
      "o Escola Aberta",
      "argumente sobre os benefícios do programa para a escola",
      "a sua comunidade"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta aos diretores",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2013-2/tarefa2-audio.m4v"
    }
  },
  {
    "id": "2013-2-t3",
    "cycle": "2013/2",
    "number": "Tarefa 3",
    "title": "Turismo de Inclusão",
    "shortLabel": "2013/2 · T3",
    "genre": "texto de propaganda",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é o dono de uma agência de viagens e, após ler o texto Turismo de Inclusão, decidiu oferecer programas de turismo de aventura destinados a pessoas com deficiência física. A fim de divulgar esses programas, elabore o texto que fará parte da propaganda de divulgação da agência a ser publicada em uma revista de turismo, descrevendo os serviços de apoio oferecidos pela sua agência aos deficientes físicos e estimulando esse público a viajar mais.",
    "sourceKicker": "Insumo · prova 2013/2 · Tarefa 3",
    "sourceTitle": "Turismo de Inclusão",
    "sourceText": "TURISMO DE INCLUSÃO Agências investem em viagens para deficientes fisicos que incluem rafting e rapel e até guias preparados para carregá-los no colo Claudia Jordao icardo Shimosakai sempre foi do tipo que adorava fazer as malas e se aventurar pelo mundo. Mas, aos 24 anos, ficou paraplégico. Preso numa cadeira de rodas, encontrou forças para superar as suas limita- çôes físicas exatamente no prazer de viajar. Hoje, quase 20 anos depois do acidente, é o nome brasileiro à fren- te de um movimento internacional para inclusão de deficientes fisicos no turismo. Cada vez mais, gover- nos, organizações não governamen- tais e órgãos do setor se preocupam em tornar hotéis, restaurantes, meios de transportes, guias locais e cidades inteiras mais bem preparados para receber esse público. Shimosakai é o diretor da Turismo Adaptado, uma empresa que monta e vende pacotes de viagem para deficientes, que vão desde passeios convencio- nais até experiências de ecoturismo e esportes de aventura, além de ofe- recer consultoria e treinamento para profissionais da área. \"Ao montar as minhas viagens, depois de ser recu- sado numa agência convencional por causa da minha deficiência, notei um interesse de pessoas nessa situação, e percebi que isso poderia ser uma oportunidade de trabalho\", diz o empresário, que desde o acidente já visitou dez países e se aventurou em atividades como salto de paraque- das, rafting e rapel. Parte DESBRAVADORES Shimosakai em canoa em Itacaré 'BA). e Adriana, carregada de liteira, na Chapada Diamantina (BA) dos deficientes não quer dade, mas desejam melhores condições para alcançar esses locais. \"Não podemos desca- racterizar a região, ainda mais quando é um destino ecoturistico\", diz Adriana Braun, 34 anos, cadeirante desde os 15, autora do guia virtual para deficientes físicos \"O Viajante Especial\", que agora começa a organizar via- gens para o público. Quando trabalhava numa agência de eco- turismo, Adriana treinou guias para lidar com os cadeirantes. \"Muitas vezes o defi- ciente precisa ser carregado por que não há como a cadeira de rodas passar\", diz ela, que já foi levada no colo, de cavalinho e de liteira. \"É importante que guias locais estejam trei- nados para transferi-lo de sua cadeira para barcos ou canoas, ou para transportá-lo num terreno cheio de obstáculos.\" Shimosakai e Adriana chegaram a locais como Machu Pic- chu e Chapada Diamantina (BA), respecti- vamente, com ajuda humana, por exemplo. \"Pode-se dizer que, no ecoturismo, o homem tem de se adaptar ao meio, inclusive a pes- soa com deficiência\", diz o empresário. A adaptação também é necessária na prática de esportes radicais. Ao saltar de paraquedas, por exemplo, Shimosakai precisou que suas pernas fossem amarradas para evitar disten- sões musculares. São pequenos ajustes que tornam sonhos realidade. Viagens Possíveis apenas conhecer destinos conven- cionais com hospedagem, transpor- te e atrações preparados para rece- bê-los. Desejam também alcançar lugares de dificil acesso e pouca in- fraestrutura. até mesmo para quem possui plenos movimentos corpo- rais. Isso quer dizer que, além de visitar cidades como Paris, Londres e Nova York — as mais adaptadas do mundo — a ideia é que este viajante possa conhecer lugares mais selva- gens, como Fernando de Noronha, no Brasil, ou sítios arqueológicos, como Machu Picchu, no Peru. En- tusiastas do movimento do turismo adaptado explicam que não sonham com rampas de acesso em trilhas sel- vagens ou patrimónios da humani- Quando a geografia e a arquitetura local facilitam a viagem de deficientes. Ex: Bonito CMS), por causa de suas trilhas largas, e praia do forte «BA), onde a vila é toda plana. Sáo as grandes cidades, como Nova York e Paris, que têm arquitetura. hospedagem e trans- porte pensados para esse público. E destinos turals tombados, que náo podem ser descaracterizados, mas têm gunas treinados para transportar o deficiente. como Machu Picchu, no Peru. Revista IstoÉ. 15 jun. 201 1 (adaptado).",
    "sourceImage": "/writing/insumos/2013-2-t3.jpg",
    "keyFacts": [
      "Turismo de Inclusão"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de propaganda",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2013-2-t4",
    "cycle": "2013/2",
    "number": "Tarefa 4",
    "title": "Morar Sozinho",
    "shortLabel": "2013/2 · T4",
    "genre": "artigo de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Um jornal de grande circulação está preparando uma edição especial sobre tendências contemporâneas de comportamento. Como colunista desse jornal, você ficou responsável por escrever um artigo de opinião sobre o fenômeno morar sozinho. Em seu artigo, discuta as visões apresentadas nos textos “Morar Sozinho” e “Solidão pode causar mais males à saúde que obesidade e tabagismo”, exponha o seu ponto de vista e aponte as possíveis consequências do fenômeno morar sozinho para a vida em sociedade.",
    "sourceKicker": "Insumo · prova 2013/2 · Tarefa 4",
    "sourceTitle": "Morar Sozinho",
    "sourceText": "Morar Sozinho Revista IstoÉ.com ozinho em um apartamento. Assim vi- s verá grande parcela da população mun- dial nas próximas décadas, de acordo com os analistas de tendências. A largada foi dada pelos países mais ricos, em especial os localizados na peninsula escandina- va. Ali estão os três com mais moradores avulsos do mundo: Noruega, Finlândia e Dinamarca em todos, mais de um terço das casas tem um só habitante. No Brasil, o fenómeno ainda desponta, mas com bas- tante vigor. Entre o censo de 2000 e o de 2010, o número total de moradias com um só habitante subiu 41%. Hoje são cerca de sete milhões de casas de sozinhos. A equa- ção que explica 0 fenômeno, seja aqui, seja na Noruega, tem em sua base três fatores comuns. \"São eles a estabilidade económi- ca, a independência feminina e a revolu- çâo da comunicaçào\", disse à ISTOÉ Eric Klinenberg, pesquisador da Universidade de Nova York e autor do livro \"Vivendo Sozinho\" (tradução livre, Editora Penguin, 2012). Nesse somatório, explica Klinen- berg, cada elemento influencia a seu modo. O dinheiro é fundamental para pagar os custos, que são maiores. A independência feminina permitiu às mulheres bancar um estilo de vida independente, tornando-as parcela significativa dessa população. E os meios de comunicação facilitam a con- vivência, evitando que os sozinhos se tor- nem solitários. Solidão, inclusive, não é boa palavra para definir essa nova geração de quem mora só. O que se vé nesses lares nem de longe lembra a imagem estigmatizada da excêntrica tia solteirona sem amigos e cheia de gatos. \"Moro só por opção e nem bicho de estimação tenho, pois passo quase o dia todo fora\". diz o engenheiro Frederico Lainer, 30 anos, que vive em um espaçoso quarto e sala na Cidade Baixa, bairro tradi- cional de Porto Alegre. Lainer resolveu as- sumir a casa por sua conta e risco após um periodo de vida em comum com uma na- morada. Hoje engrossa a lista dos sozinhos de Porto Alegre, capital brasileira lider no ranking de gente que vive só. Por lá, 21,4% das residências abriga um único morador, índice bem acima da média do País, que é de Mas quem imagina que morar só é coisa de jovem, se engana. Os maio- res de 60 anos representam 42% das casas de um único habitante no Brasil. \"O fenô- meno ocorre atrelado ao envelhecimento da população\", afirma a pesquisadora do Instituto Brasileiro de Geografia e Estatís- tica (IBGE) Ana Lúcia Sabóia. Mais velhos, com boa saúde e estabilidade financeira, os idosos têm optado por seguir a vida em suas próprias casas, bancando as despesas. Enquanto cada vez mais gente opta por um estilo de vida sozinho (apenas nos Es- tados Unidos, 36% de sua população estará morando só até 2020), teóricos começam a discutir outra faceta desse fenômeno: sua sustentabilidade. \"A quantidade de alimen- to que se compra é grande, então se perde muito, sem contar os gastos fixos, como eletricidade, que não sào divididos\", afirma o professor Samy Dana, da Escola de Eco- nomia da Fundação Getulio Vargas de São Paulo. Todo esse consumo concentrado em uma só pessoa tem feito vários pesqui- sadores rotularem esse estilo de vida como insustentável em larga escala. O próprio Dana, porém, faz a defesa de quem mora só e diz que há necessidade de se estudar melhor o tema. \"Se por um lado se gasta mais eletricidade. de outro se economi- za combustível, porque a maior parte das residências dos sozinhos está nas regiões centrais, então se gasta menos com deslo- camento.\" Disponível em: www.istoezom.br. Acesso em: 8 jul. 2013. Jornal O Globo Solidão pode causar mais males à saúde que obesidade e tabagismo Roberta Jansen Publicado: 26/03/11 - Oh00. RIO - A solidão, aquela sensação ruim de ser incompreendido, de não poder contar com ninguém, de estar sozinho no mun- do, pode causar mais males à saúde do que a obesidade e 0 tabagismo, tradicio- nalmente ligados a problemas cardíacos e canceres, entre diversos outros proble- mas. Mas, enquanto os dois últimos sáo fatores de risco muito bem estabelecidos do ponto de vista médico e aceitos pela sociedade, o isolamento social raramen- te é analisado, num contexto mais amplo, como potencial detonador de doenças. Disponível em: www.oqlobo.globacom. Acesso em: 8 jul. 2013.",
    "sourceImage": "/writing/insumos/2013-2-t4.jpg",
    "keyFacts": [
      "nos textos “Morar Sozinho”",
      "“Solidão pode causar mais males à saúde que obesidade",
      "tabagismo”",
      "exponha o seu ponto de vista"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2013-1-t1",
    "cycle": "2013/1",
    "number": "Tarefa 1",
    "title": "Projeto Horta Ecológica",
    "shortLabel": "2013/1 · T1",
    "genre": "e-mail ao diretor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é professor e assistiu à reportagem sobre o Projeto Horta Ecológica. Motivado por essa iniciativa, escreva um e-mail ao diretor da escola em que você trabalha, sugerindo a implementação de um projeto semelhante na sua instituição. Com base na reportagem, fundamente sua sugestão, explicando como o projeto pode ser desenvolvido e destacando as vantagens para a comunidade escolar.",
    "sourceKicker": "Insumo · prova 2013/1 · Tarefa 1",
    "sourceTitle": "Projeto Horta Ecológica",
    "sourceText": "Falante 1: Uma escola do Rio Grande do Sul dá um exemplo que deveria ser seguido Brasil afora. O cultivo de produtos sem agrotóxicos virou disciplina escolar e a horta ecológica mudou os hábitos alimentares dos alunos.\n\nFalante 2: O alto índice de obesidade registrado no estado provocou a criação do projeto da horta ecológica na Escola Estadual Coronel Massudo, em Porto Alegre. Professores e direção começaram a observar os tipos de alimentos consumidos pelos estudantes e perceberam que a maioria era industrializado e cheio de conservantes.\n\nFalante 3: Começamos a ver o tipo de alimentação, o que que esse jovem trazia da sua casa pra comer na merenda, ou que tipo de alimentação que ele mais procurava.\n\nFalante 2: Os alunos começam o trabalho em sala de aula. Na teoria, aprendem com os professores de biologia, matemática, física e química como construir o canteiro, quais os tipos de solo mais adequados para o plantio das sementes, como fazer a compostagem e quais os nutrientes de cada alimento. Depois, vão para a prática. A cada trimestre, sessenta alunos trabalham na horta, mas todos se beneficiam com o plantio dos alimentos, que são consumidos na merenda escolar. Na cozinha da escola, a merendeira prepara os alimentos cultivados na horta. No começo, os alunos resistiram a mexer na terra e na areia, mas depois adquiriram o gosto pelo plantio dos alimentos. Hoje, eles têm orgulho do próprio esforço.\n\nFalante 4: O padrão de qualidade é bem acima das outras escolas, bem diferente, bem nutritiva e bem gostosa também.\n\nFalante 5: A gente fez uma tabela, eu olhei o que eu comia, daí eu percebi também que, que eu tenho que comer bem mais salada do que eu comia antes.\n\nFalante 1: Uma escola do Rio Grande do Sul dá um exemplo que deveria ser seguido Brasil afora. O cultivo de produtos sem agrotóxicos virou disciplina escolar e a horta ecológica mudou os hábitos alimentares dos alunos.\n\nFalante 2: O alto índice de obesidade registrado no estado provocou a criação do projeto da horta ecológica na Escola Estadual Coronel Massudo, em Porto Alegre. Professores e direção começaram a observar os tipos de alimentos consumidos pelos estudantes e perceberam que a maioria era industrializado e cheio de conservantes.\n\nFalante 3: Começamos a ver o tipo de alimentação, o que que esse jovem trazia da sua casa pra comer na merenda, ou que tipo de alimentação que ele mais procurava.\n\nFalante 2: Os alunos começam o trabalho em sala de aula. Na teoria, aprendem com os professores de biologia, matemática, física e química, como construir o canteiro, quais os tipos de solo mais adequados para o plantio das sementes, como fazer a compostagem e quais os nutrientes de cada alimento. Depois, vão para a prática. A cada trimestre, sessenta alunos trabalham na horta, mas todos se beneficiam com o plantio dos alimentos, que são consumidos na merenda escolar. Na cozinha da escola, a merendeira prepara os alimentos cultivados na horta. No começo, os alunos resistiram a mexer na terra e na areia, mas depois adquiriram o gosto pelo plantio dos alimentos. Hoje, eles têm orgulho do próprio esforço.\n\nFalante 4: O padrão de qualidade é bem acima das outras escolas, bem diferente, bem nutritiva e bem gostosa também.\n\nFalante 5: A gente fez uma tabela, eu olhei o que eu comia, daí eu percebi também que, que eu tenho que comer bem mais salada do que eu comia antes",
    "keyFacts": [
      "como o projeto pode ser desenvolvido",
      "as vantagens para a comunidade escolar"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail ao diretor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2013-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2013-1-t2",
    "cycle": "2013/1",
    "number": "Tarefa 2",
    "title": "Cultivando Água Boa",
    "shortLabel": "2013/1 · T2",
    "genre": "texto para pôster",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como um dos responsáveis pela execução do programa Cultivando Água Boa, você foi convidado para representar a usina hidrelétrica Itaipu Binacional em um evento científico sobre desenvolvimento sustentável. Escreva o texto que fará parte do pôster a ser exibido neste evento, caracterizando o programa, apresentando seus resultados e explicando as razões do seu sucesso.",
    "sourceKicker": "Insumo · prova 2013/1 · Tarefa 2",
    "sourceTitle": "Cultivando Água Boa",
    "sourceText": "Falante 1: Mais de mil e duzentos quilômetros de mata ciliar recuperados, cento e quatro mil hectares de reservas preservadas e dezenove mil educadores ambientais em atividade no extremo oeste do Paraná. Esses são alguns dos resultados do programa Cultivando Água Boa, desenvolvido desde 2003 pela Usina Hidrelétrica Itaipu Binacional, em parceria com o poder público, organizações não governamentais e comunidades locais. A iniciativa abrange cerca de cem ações relacionadas à preservação do meio ambiente e à promoção da qualidade de vida das comunidades, que tiveram parte de suas terras inundadas pelo reservatório da usina. Para o diretor de coordenação ambiental da Itaipu, Nelton Friedrich, o sucesso do programa está no envolvimento de diversos segmentos da população no planejamento e na implementação das ações.\n\nFalante 2: O grande elemento, eu diria assim, que fermenta e facilita o Cultivando Água Boa está na participação comunitária, que é preciso que todos os atores compreendam a responsabilidade compartilhada. Nenhum governo só resolverá o problema socioambiental.\n\nFalante 1: Esta também é a opinião do presidente do Instituto Superior de Administração e Economia da Fundação Getúlio Vargas, Norman Jahuda Filho, responsável por um estudo sobre o Cultivando Água Boa.\n\nFalante 3: O sucesso desse programa foi obtido justamente por ter conseguido ter o engajamento dos participantes.\n\nFalante 1: Em cada município, há um comitê gestor que discute os problemas e as soluções que devem ser implementadas. O senador Sérgio Souza, do PMDB paranaense, elogiou o programa e destacou a importância de ações que combinam crescimento econômico, social e preservação dos recursos naturais.\n\nFalante 4: Se nós não, realmente não cuidarmos do nosso planeta de maneira sustentável na produção de energia, na produção de alimentos e na, na questão social, é claro, mas também, principalmente, na questão ambiental, de forma que haja um equilíbrio entre esses pilares, realmente nós não conseguiremos os nossos objetivos.\n\nFalante 1: O programa Cultivando Água Boa é desenvolvido em vinte e nove municípios paranaenses, atingindo cerca de um milhão de habitantes. Da Rádio Senado, Renina Valejo.",
    "keyFacts": [
      "seus resultados",
      "as razões do seu sucesso"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para pôster",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2013-1/tarefa2-audio.mp3"
    }
  },
  {
    "id": "2013-1-t3",
    "cycle": "2013/1",
    "number": "Tarefa 3",
    "title": "Bolinhos dos Sonhos",
    "shortLabel": "2013/1 · T3",
    "genre": "texto para catálogo",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é o responsável pela divulgação dos lançamentos da editora MonteCastelo Ideias. Escreva o texto de apresentação do livro de Alaíde Carneiro para compor o catálogo da editora, apresentando a nova publicação, as curiosidades da cozinheira e o diferencial das suas receitas.",
    "sourceKicker": "Insumo · prova 2013/1 · Tarefa 3",
    "sourceTitle": "Bolinhos dos Sonhos",
    "sourceText": "BARES Bolinhos dos sonhos Dona do botequim Chico & Alaíde prepara livro com suas receitas de quitutes RR)õ 4SS'Po Ecs eteu Alaíde, em seu boteco: \"Uma voz conta como fazeros salgadinhos enquanto durmo\" uitos escritores, publicitários e poetas costumam manter um bloquinho na mesa de cabeceira para anotar ideias que surgem em meio aos sonhos. Alaíde Carneiro não é nenhuma das três coisas, mas cultiva o mesmo hábito. Cozinheira e proprietária do botequim Chico & Alaíde, no Leblon, ela costuma rabiscar combinações de ingredientes que lhe vêm à cabeça enquanto dorme. Ela jura que foi assim que criou todos os quitutes servidos no seu bar, aberto em sociedade com o ex-garçom Francisco das Chagas Gomes Filho, o Chico, em 2009. \"Vejo o salgado pronto e uma voz me fala como devo fazer. Quando acordo, anoto de olho fechado. Se abrir, esqueço tudo\", conta. Recentemente, Alaíde começou a revolver as cadernetas que manteve ao lado da cama. A ideia é lançar um livro de receitas, a ser publicado pela editora MonteCasteIo Ideias, em que promete revelar os segredos de suas iguarias, psicografadas. \"Penso nisso há tempos. Os 'entes vivem me perguntando sobre meus salgados\", explica. À parte seus métodos pouco ortodoxos, Alaíde tornou-se uma celebridade entre os boêmios cariocas. Sua fama começou quando ainda trabalhava no Bracarense, tradicionalíssimo boteco do Leblon, frequentado por artistas e políticos. Por 24 anos, pilotou as frigideiras da casa, até decidir abrir seu próprio negócio, em parceria com Chico, que era arçom no mesmo bar. Hoje, comanda uma equipe he dez pessoas e supervisiona pessoalmente o preparo de mais de quarenta tipos de salgado servidos no botequim. Todos os dias é a primeira a chegar. Antes das 7 horas já está na cozinha, e só sai de lá quando o bar fecha, perto da meia-noite. Ela faz questão de preparar sozinha a massa e o recheio dos bolinhos. Só a irmã, Patrícia, está autorizada a substituí-la, e, mesmo assim, apenas em situações de emergência. \"Sempre deixo tudo pronto. Afinal, só eu sei fazer meu tempero\", diz, sem falsa modéstia. Nascida em Minas Gerais, Alaíde chegou ao Rio aos 13 anos — hoje tem 49, mas não gosta de falar no assunto. Um de seus primeiros empregos foi como arrumadeira na casa de uma professora de gastronomia que, para incrementar o orçamento doméstico, vendia tortas para restaurantes. Um mês depois, passou a ajudar a patroa no preparo dos doces. Sua vida mudou quando começou a sonhar com comidas. O primeiro bolinho sonhado ganhou seu próprio nome e leva aipim, camarão e queijo catupiry. De lá para cá, não parou mais de cozinhar e sonhar, reunindo hoje mais de dez cadernos com anotações. Quem provou sabe: são mesmo receitas de outro mundo. ALESSANDRA MEDINA VEJA, 24 ago. 2011.",
    "sourceImage": "/writing/insumos/2013-1-t3.jpg",
    "keyFacts": [
      "do livro de Alaíde Carneiro para compor o catálogo da editora",
      "apresentando a nova publicação",
      "as curiosidades da cozinheira",
      "o diferencial das suas receitas"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para catálogo",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2013-1-t4",
    "cycle": "2013/1",
    "number": "Tarefa 4",
    "title": "Viagem a Dois",
    "shortLabel": "2013/1 · T4",
    "genre": "e-mail aos funcionários",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é gerente de Recursos Humanos de uma empresa que acabou de se cadastrar no site Caronetas. Escreva um e-mail para os funcionários da empresa, incentivando-os a participar do programa de caronas. Seu texto deverá: apresentar o funcionamento da plataforma; explicitar os benefícios do sistema; e incentivar a abertura de contas no site.",
    "sourceKicker": "Insumo · prova 2013/1 · Tarefa 4",
    "sourceTitle": "Viagem a Dois",
    "sourceText": "URBANIDADE VIAGEM A DOIS SITE PREMIADO AJUDA A ORGANIZAR CARONAS ENTRE COLEGAS NO TRAJETO CASA-TRABALHO Boa parte dos automóveis que circulam em grandes cen- tros urbanos brasileiros carre- ga poucos passageiros. Em São Paulo, por exemplo, 64% dos carros só levam o próprio mo- torista. Além de congestionar o trânsito, ainda polui o ar. Foi diante disso que o engenheiro especialista em logística Már- cio Nigro, de São Paulo, criou o site Caronetas, eleito em junho pela Universidade de Michigan e pela Rockeffeler Foundation como a melhor solução mun- dial de mobilidade urbana. A plataforma, voltada para em- presas, ajuda a organizar caro- nas entre funcionários. Lança- da em 2011 e atualmente com 293 mil usuários, é responsável por mais de 5 mil caronas diá- rias em 19 estados brasileiros. 20 AGOSTO •2012 A grande sacada é solucio- nar a questão da segurança, um dos maiores temores das pessoas ao oferecer ou aceitar caronas. Como o circulo é restrito à empre- sa, essa insegurança diminui. Hoje já são quase 2 mil corporações usando o sistema„que é gratuito. Primeiro, a companhia se cadastra e, então, seus funcionários fazem suas contas individuais no site. Ao preencher seu trajeto diário, a pla- taforma indica pessoas que fazem caminhos parecidos e as coloca em contato. Outro atrativo é financeiro. A carona é cobrada, levando em conta gasto de combustível, pedá- gios e estacionamento. \"O ideal é que motorista e passageiro defi- nam um valor por viagem\", afir- ma Márcio. O pagamento pode ser feito diretamente a quem aEnçAo I Priscilla Santos oferece a carona. Mas uma das novidades da plataforma é um sistema de créditos pré-pagos, que facilita a falta de troco, por exemplo. Quem pega carona pode transferir parte de seus créditos virtualmente para quem dirige. Ao compartilhar o custo dos trajetos, o motoris- ta pode economizar entre R$ 3.500 e R$ 7 mil ao ano. Além de se economizar di- nheiro e a natureza, as caronas podem ser uma maneira de voltarmos a respirar aliviados, como já fizemos um dia. \"Se os proprietários dos 5 milhões de carros de São Paulo transpor- tarem mais uma pessoa, tiraría- mos 2,5 milhões de veículos das ruas, um cenário parecido ao de 20 anos atrás\". a Vanessa Vieira Revista Galileu, ago. 2012.",
    "sourceImage": "/writing/insumos/2013-1-t4.jpg",
    "keyFacts": [
      "o funcionamento da plataforma; explicitar os benefícios do sistema",
      "incentivar a abertura de contas no site"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail aos funcionários",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2012-2-t1",
    "cycle": "2012/2",
    "number": "Tarefa 1",
    "title": "Copacabana comemora 120 anos",
    "shortLabel": "2012/2 · T1",
    "genre": "post de blog",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como agente de viagens, você tem um blog para divulgar lugares interessantes do Brasil. Após ter assistido ao vídeo, escreva um texto para postar em seu blog, contando a história de Copacabana e destacando seus contrastes.",
    "sourceKicker": "Insumo · prova 2012/2 · Tarefa 1",
    "sourceTitle": "Copacabana comemora 120 anos",
    "sourceText": "Falante 1: [ruído estático] [música animada]\n\nFalante 2: Uma princesinha com cento e vinte anos, mas que se mantém bela e cheia de contrastes. Folclórica no início das manhãs e agitada com seu trânsito caótico. Suntuosa com seus hotéis e prédios de luxo, que dividem espaço com as favelas do bairro. Local que tem a maior concentração de idosos do Rio e também é passarela para os jovens que desfilam no calçadão de pedras portuguesas, com os desenhos das ondas do mar. Assim é Copacabana. Famosa internacionalmente, ela já foi uma grande fazenda de pouco valor. Esse documento mostra que toda a área do bairro atual foi vendida em 1854, por dois milhões de réis, que valeriam alguns centavos de real atualmente. Até o final do século dezenove, o local onde hoje fica Copacabana, era um grande areal. Praticamente ninguém morava aqui. Só existiam pequenas casas, uma igreja e um forte. Tudo mudou em 1892, com a inauguração de um túnel, que facilitou o acesso à região. Surgiu então, o bairro de Copacabana. A inspiração para batizar o bairro veio desta imagem de Nossa Senhora de Copacabana, que até hoje está em uma igreja do bairro. Ela chegou ao Brasil em 1580.\n\nFalante 3: Trouxeram uma imagem de Nossa Senhora de Copacabana, da Bolívia pro Rio de Janeiro. E aqui, essa imagem, ela perambulou por várias igrejas, até que no início do século dezoito, numa data incerta, foi construída onde hoje é aquele terrapleno do Forte Copacabana, o Campo de Marte, como é chamado, foi construída uma capela dedicada à Nossa Senhora de Copacabana, e ela acabou batizando essa região.\n\nFalante 2: A primeira grande construção que surgiu no meio do areal, foi o Hotel Copacabana Palace, inaugurado em 1923. O mundo começava a conhecer Copacabana, que atraiu diversos moradores ilustres, que hoje são homenageados com estátuas, como o poeta Carlos Drummond de Andrade e o compositor Dorival Caymmi.",
    "keyFacts": [
      "seus contrastes"
    ],
    "mustDo": [
      "escrever no gênero pedido: post de blog",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2012-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2012-2-t2",
    "cycle": "2012/2",
    "number": "Tarefa 2",
    "title": "Sua carreira",
    "shortLabel": "2012/2 · T2",
    "genre": "artigo de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você escreve a coluna Sua carreira em uma revista da área de negócios. Após ter ouvido a entrevista com Vicky Bloch, escreva um artigo de opinião para sua coluna, discutindo o uso de redes sociais e defendendo o ponto de vista apresentado por Vicky.",
    "sourceKicker": "Insumo · prova 2012/2 · Tarefa 2",
    "sourceTitle": "Sua carreira",
    "sourceText": "Falante 1: [som de interferência] [vinheta musical alegre]\n\nFalante 2: Sua Carreira, com Vick Bloch e Sheila Magalhães. Vick, mesmo sendo consideradas vilãs da produtividade em várias organizações, o estudo mostra que as redes sociais como o Facebook, o LinkedIn, Twitter, podem ajudar no crescimento na carreira. Segundo o levantamento do Google, oitenta e seis por cento dos entrevistados usuários frequentes dessas redes foram promovidos recentemente. E entre os que raramente usam as mídias, sessenta e um por cento tiveram promoção no trabalho. Quem é mais usuário também é mais otimista com relação ao trabalho do que quem não usa tanto. Segundo os dados do Google, trinta e oito por cento dos entrevistados que acessam redes sociais pro trabalho estão satisfeitos e entre os demais o índice é de dezoito por cento. Vick, a gente já falou aqui sobre a moderação no uso das redes sociais, como fazer um bom uso dessa mídia no ambiente corporativo. Cê acha que essa ferramenta pode fazer alguma diferença mesmo na hora de um profissional evoluir no mercado ou isso está mais associado mesmo ao perfil desse usuário, normalmente mais dinâmico, talvez um pouco mais conectado com as tendências, também às vezes fica mais conectado com as bobagens, né, que rolam nas redes sociais, mas também fica mais atento às tendências. É perfil ou é, né, faz sentido mesmo na hora de um profissional evoluir no mercado estar ali conectado com as redes sociais?\n\nFalante 3: Quando que a gente fala dessas redes sociais, se cê pegar cada uma delas, cada uma delas tem uma contribuição diferente pra vida do indivíduo, né? O Facebook tem uma, o LinkedIn tem outra, Google Plus tem outra, Twitter tem outra. Nós tamo falando do seguinte: as pessoas que estão mais conectadas no mundo, têm uma possibilidade de ter informações ou de se desenvolver mais do que os outros. Mas não só pelas redes sociais. Cê pode se desenvolver e pode ficar sabendo de coisas almoçando com alguém. Pode ir a um curso onde tem trinta pessoas e ouvir uma dica da qual cê não tinha se dado conta. Então, o fato de você ter feito uma pesquisa que diz que sessenta e um por cento das pessoas entrevistadas tiveram uma promoção no trabalho, usavam mídia, tiveram uma promoção no trabalho, não quer dizer que esta promoção foi por causa da mídia. O fato de você usar algumas mídias pode te conectar a algumas informações que você também pode obter por outro, por outra forma. Visibilidade, é, esse é o maior desafio do profissional hoje. Ele se fazer visível para que quem esteja precisando de uma pessoa daquele tipo, com aquelas competências ou com aquela experiência naquele momento, lembre-se de você.\n\nFalante 2: Se você tem alguma dúvida, pode enviar pra cá também. O nosso e-mail é carreiras@bandnewsfm.com.br.",
    "keyFacts": [
      "por Vicky"
    ],
    "mustDo": [
      "escrever no gênero pedido: artigo de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2012-2/tarefa2-audio.mp3"
    }
  },
  {
    "id": "2012-2-t3",
    "cycle": "2012/2",
    "number": "Tarefa 3",
    "title": "Empreguetes",
    "shortLabel": "2012/2 · T3",
    "genre": "texto para site",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Devido à grande procura por trabalhadores domésticos, a agência de emprego Casa&Café está cadastrando profissionais. Como diretor da agência, escreva um texto para ser publicado no site da empresa, com o objetivo de estimular novos cadastramentos. Seu texto deverá apresentar a atual situação desse mercado e destacar as vantagens de se atuar nesse setor.",
    "sourceKicker": "Insumo · prova 2012/2 · Tarefa 3",
    "sourceTitle": "Empreguetes",
    "sourceText": "Chegou a hora das empreguetes As trabalhadoras domésticas estão mais instruídas, bem remuneradas e seletivas quanto aos patrões. Ê o que dizem agências de empregos que atendem a categoria. O perfil dos trabalhadores domésticos no Brasil está mudando. Segundo o Instituto Brasileiro de Geografia e Estatística (IBGE), esses profissionais somam 6,9 milhões, entre 16 e 64 anos, dos quais cerca de 93% são mulheres. Mais instruídas — 24,5% têm pelo menos o Ensino Médio completo — e bem remuneradas, as atuais empregadas veem a ocupação com outros olhos. As domésticas também estão mais seletivas quanto aos patrões. Hoje, na Casa&Café, agência de São Paulo dirigida por Daniele Kuipers, o mais frequente é o seguinte: a trabalhadora analisa se a residência fica muito longe de onde mora, se o perfil dos patrões se encaixa com o dela e se existem fatores complicadores na rotina da casa, como animais de estimação. Há 10 anos, quase ninguém acreditaria na cena acima. \"Há uma escassez dessas profissionais nas grandes cidades, isso não é só uma impressão\", afirma Daniele. Quanto mais raras, mais bem pagas. \"As pessoas procuram e não encontram. Por isso, a remuneração fica mais alta.\" Segundo Daniele, na Casa&Café, os salários anunciados giram em torno de R$ 800 a R$ 1,8 mil. Questão social Quando o motivo da falta de trabalhadoras não é salarial, o que pesa é o lado social. Mestre em Sociologia pela Universidade de São Paulo (USP), Jefferson Belarmino conduziu um estudo com 10 empregadas domésticas na Grande São Paulo, além de duas empregadoras. Belarmino acredita em uma mudança de cenário. \"Essa mulher, que sempre Bruno Peres/CB/D.A Press contribuiu para a economia, mas era esquecida, sai do papel de figurante e caminha para ser considerada profissional.\" A presidente do Sindicato das Empregadas e Trabalhadores Domésticos da Grande São Paulo (Sindoméstica), Eliana Gomes, acredita que a valorização da profissional começou. \"Quando entrei para o sindicato, era muito comum que as trabalhadoras não quisessem o nome 'empregada doméstica' escrito na Carteira de Trabalho. Hoje não é mais assim.\" Eliana garante que a mudança no perfil é perceptível. \"Elas estudam e têm conhecimentos de informática. Além disso, se mostram bem informadas e sabem que estão em falta no mercado.\" A administradora Marília Atti Verdejo sabe como o mercado do trabalho doméstico está aquecido. Após seis anos seguidos com a mesma funcionária em casa, ela se viu em uma verdadeira maratona para conseguir uma substituta. Foram sete mulheres em seis meses. \"Como a oferta de profissionais diminuiu, o mercado está inflacionado. Quando encontro uma empregada muito boa, logo ela recebe uma proposta melhor\", diz Marília. Mãe de duas crianças, ela precisa contar com o apoio de duas funcionárias e não consegue bancar salários mais altos do que os R$ 900 que paga atualmente. Contratou a atual empregada doméstica sob condição de flexibilizar o horário — ela trabalha de segunda a sexta, das 8h às 15h30. CORREIO BRAZILIENSE. Disponível em: http://noticias.admite-se.com.br. Acesso em: 6 jul. 2012 (adaptado).",
    "sourceImage": "/writing/insumos/2012-2-t3.jpg",
    "keyFacts": [
      "a atual situação desse mercado",
      "as vantagens de se atuar nesse setor"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para site",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2012-2-t4",
    "cycle": "2012/2",
    "number": "Tarefa 4",
    "title": "A morte do automóvel",
    "shortLabel": "2012/2 · T4",
    "genre": "carta do leitor",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Após ler a crônica abaixo, escreva uma carta para ser publicada na seção “Cartas do Leitor” do mesmo jornal, posicionando-se em relação ao ponto de vista do autor e avaliando a sobrevivência do automóvel no século 21.",
    "sourceKicker": "Insumo · prova 2012/2 · Tarefa 4",
    "sourceTitle": "A morte do automóvel",
    "sourceText": "O ESTADO DE MINAS • DOMINGO, 17 DE JUNHO DE 2012. \"Esse veículo tão maravilhoso AFFONSO R DE quanto desastroso vaz morrer no século 21!\" QOl.'iLñ A morte do automóvel Eu poderia começar narrando que outro dia peguei meu carro para ir a um evento e fui rodando, rodan- do, até que no meio do caminho me dei conta de que havia cometido um erro fatal: não deveria ter ido no meu carro, deveria ter pegado um táxi, pois não ia achar estacionamento. Já que estava a caminho, conti- nuei, cheguei ao lugar do compro- misso, e, como previa, não havia jeito de estacionar. Fui olhando as ruas em torno, e nada. Acabei vol- tando para minha casa, botei o carro na garagem, peguei um táxi e fui ao compromisso. Mas posso começar esta crôni- ca de outro modo, dizendo: minhas amadas irmãs, meus amados irmãos! Tive uma visão! Como São João na Ilha de Patmos, vi o Apocalipse! Eu vi a morte do automóvel! Esse veícu- 10 tão maravilhoso quanto desastro- so vai morrer no século 21! Quando Henry Ford descobriu a linha de montagem e começou a pro- duzir carros em série, foi uma revo- Iução. O indivíduo se afirmava, cada um poderia ter a sua máquina. Isso foi (perversamente) estupendo. O que veio depois é que se trans- formou num beco sem saída: qual- quer cidade de tamanho médio conhece os desesperadores conges- tionamentos. Ficamos duas, três, quatro horas presos dentro dos car- ros. Aí a engenharia de trânsito entra em cena: mudam a mão das ruas, criam pistas só para ônibus e táxis, inventam metrôs subterrâneos e de superfície. Lamento informar que não adiantará. A quantidade de carros jogados nas ruas é maior do que nos- sa capacidade de abrir ruas, metrôs, etc. O que fazer, já que a indústria automobilística gera (e degenera) centenas de produtos e move a socie- dade de consumo? Na verdade, lhes digo: tudo é pro- visório. Nossas cidades ainda estão cheias de estátuas de generais a cava- 10. Mas os generais não andam mais a cavalo como antigamente, não são eles que comandam o mundo, são os industriais que comandam e estão a cavaleiro dos generais. Outro dia, vi o engenheiro ita- liano que inventou o carro que vira helicóptero: cria asas, mas precisa de uma pista de 50 metros para decolar. Portanto, no engarrafamento não funciona. E as ambulâncias conti- nuam buzinando atrás da gente para poderem passar. Pois lhe afianço: o automóvel chegou ao fim da própria estrada. O desenvolvimento o liquidou. A solu- ção será criada. Qual, não sei! Trans- porte coletivo? Qual? Redesenho das cidades? Não sei. Mas o automóvel está morto e não sabe. É um veículo individualista, poluidor e se prolife- ra como barata. Poderia propor aqui, como na- quele filme Um dia de fúria, que todos colocassem fogo nos seus car- ros ou os deixassem apodrecer nas garagens. Mas não devo fazer isso. Temo que um dia haverá engarrafa- mento tão amplo e total que todos os habitantes das cidades, encurra- lados, sem poder sair para frente ou para trás, sem poder se alimentar ou beber água, apodrecerão com seus veículos nas artérias enfartadas de nossas imensas e macabras cidades. ESTADO DE MINAS, 17 jun. 2012 (adaptado).",
    "sourceImage": "/writing/insumos/2012-2-t4.jpg",
    "keyFacts": [
      "A morte do automóvel"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta do leitor",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2012-1-t1",
    "cycle": "2012/1",
    "number": "Tarefa 1",
    "title": "Pescando Letras",
    "shortLabel": "2012/1 · T1",
    "genre": "texto aos prefeitos",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha no Ministério da Educação e é o responsável pela implantação do programa Pescando Letras. Com base nas informações do vídeo, escreva um texto para os prefeitos das 853 cidades selecionadas, com o objetivo de incentivar a implementação do programa. Explicite os critérios de seleção das cidades e forneça informações sobre o curso e o período em que ele é realizado.",
    "sourceKicker": "Insumo · prova 2012/1 · Tarefa 1",
    "sourceTitle": "Pescando Letras",
    "sourceText": "Falante 1: Em cinco anos, o projeto Pescando Letras alfabetizou cerca de cento e vinte mil jovens e adultos. A iniciativa é uma parceria entre o Ministério da Educação e a Secretaria Especial de Pesca e faz parte do programa Brasil Alfabetizado.\n\nFalante 2: O desafio, primeiro, é aumentar essa escala, né, do Pescando Letras e depois encaminhar todo esse pessoal pra educação de jovens e adultos.\n\nFalante 1: A metodologia de ensino e o calendário foram adaptados para atender os pescadores de oitocentas e cinquenta e três cidades brasileiras. O programa foi modificado para ser aplicado nos quatro meses do período de defeso, quando a pesca é proibida por causa da procriação dos peixes. A carga horária do curso varia de acordo com as características específicas de cada região.\n\nFalante 3: Os critérios de seleção que foram utilizados pra levar esse projeto piloto pros Estados foram: o número de pescadores que têm o registro geral da pesca em cada um dos Estados, o percentual de pescadores registrados e que não são alfabetizados e o índice de desenvolvimento humano da região.\n\nFalante 1: O curso foi planejado com base no método cubano Sim, Eu Posso, premiado pela UNESCO e adotado em vários países. Recursos audiovisuais com letras e números do cotidiano são utilizados durante a aula. Segundo o último levantamento do Ministério do Trabalho, quarenta e oito por cento dos setenta mil pescadores cadastrados no seguro emprego são analfabetos e setenta e nove por cento são analfabetos funcionais. Para os coordenadores do Pescando Letras, o programa pode reduzir esses indicadores.\n\nFalante 4: Em dois meses, quase cem por cento dos nossos alunos já leem frases curtas e já sabem escrever e já sabe perfeitamente assinar os seus nomes.\n\nFalante 5: A gente acredita que até o término do, do, dos quatro meses, com certeza eles vão tá lendo e escreven.",
    "keyFacts": [
      "do vídeo",
      "escreva um texto para os prefeitos das 853 cidades selecionadas",
      "com o objetivo de incentivar a implementação do programa"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto aos prefeitos",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2012-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2012-1-t2",
    "cycle": "2012/1",
    "number": "Tarefa 2",
    "title": "Ecomoda",
    "shortLabel": "2012/1 · T2",
    "genre": "texto informativo (catálogo",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você foi contratado para fazer o material de divulgação de um estande de ecomoda participante de uma importante semana de moda brasileira. Com base nas informações do áudio, escreva um texto informativo para compor o catálogo do evento, apresentando a ideia da ecomoda e salientando as vantagens de se investir em roupas e acessórios ecologicamente sustentáveis.",
    "sourceKicker": "Insumo · prova 2012/1 · Tarefa 2",
    "sourceTitle": "Ecomoda",
    "sourceText": "Falante 1: [vinheta eletrônica] Tendências.\n\nFalante 2: Tendências.\n\nFalante 3: [música animada]\n\nFalante 2: Pensar verde está mais do que na moda. A preocupação com o meio-ambiente fez surgir a moda ecológica, que parece ter vindo para ficar. São roupas e acessórios orgânicos, feitos com fibras, tintas e tecidos naturais, produzidos sem produtos químicos ou quaisquer outros produtos que possam prejudicar a natureza. Moderna e alternativa, a chamada eco moda, utiliza também material reciclado na fabricação de peças fashion, não só para proteger o meio-ambiente, mas visando também a economia na produção destes produtos. E não pense em roupas e acessórios sem graça. A moda ecologicamente correta tem tudo a ver com as últimas tendências. As tão conhecidas garrafas pet podem ser usadas na fabricação de camisetas e até de jeans. A combinação das fibras pet com algodão orgânico resulta em tecidos que não perdem nada para os tecidos convencionais em conforto, caimento e beleza. Outros tecidos em sintonia com a causa ambiental são os feitos com bambu, de polpa de madeira e os de lã e seda orgânicos. Pneus velhos podem se tornar sandálias e chinelos. Lonas de caminhão ou de banners são reaproveitadas na fabricação de bolsas ecológicas, as famosas ecobags. Bambu, sobras de matéria-prima das indústrias também se transformam em roupas e acessórios. A vantagem de unir os conceitos de moda e sustentabilidade é que as peças acabam ganhando um visual personalizado. São bonitas, charmosas e ajudam a diminuir os danos ao meio-ambiente e a preservar os recursos naturais. Para aderir à eco moda, é só procurar roupas e acessórios que possuam um selo de sustentável na etiqueta. Você fica cheia de estilo e o meio-ambiente agradece. Carla Menezes, para a Rádio Metrópole.\n\nFalante 1: [vinheta eletrônica] Tendências.\n\nFalante 2: Tendências.\n\nFalante 3: [música animada]\n\nFalante 2: Pensar verde está mais do que na moda. A preocupação com o meio-ambiente fez surgir a moda ecológica, que parece ter vindo para ficar. São roupas e acessórios orgânicos, feitos com fibras, tintas e tecidos naturais, produzidos sem produtos químicos ou quaisquer outros produtos que possam prejudicar a natureza. Moderna e alternativa, a chamada eco moda, utiliza também material reciclado na fabricação de peças fashion, não só para proteger o meio-ambiente, mas visando também a economia na produção destes produtos. E não pense em roupas e acessórios sem graça. A moda ecologicamente correta tem tudo a ver com as últimas tendências. As tão conhecidas garrafas pet podem ser usadas na fabricação de camisetas e até de jeans. A combinação das fibras pet com algodão orgânico resulta em tecidos que não perdem nada para os tecidos convencionais em conforto, caimento e beleza. Outros tecidos em sintonia com a causa ambiental são os feitos com bambu, de polpa de madeira e os de lã e seda orgânicos. Pneus velhos podem se tornar sandálias e chinelos. Lonas de caminhão ou de banners são reaproveitadas na fabricação de bolsas ecológicas, as famosas ecobags. Bambu, sobras de matéria-prima das indústrias também se transformam em roupas e acessórios. A vantagem de unir os conceitos de moda e sustentabilidade é que as peças acabam ganhando um visual personalizado. São bonitas, charmosas e ajudam a diminuir os danos ao meio-ambiente e a preservar os recursos naturais. Para aderir a eco moda, é só procurar roupas e acessórios que possuam um selo de sustentável na etiqueta. Você fica cheia de estilo e o meio-ambiente agradece. Carla Menezes, para a Rádio Metrópole.\n\nFalante 1: [música animada]",
    "keyFacts": [
      "do áudio",
      "escreva um texto informativo para compor o catálogo do evento",
      "apresentando a ideia da ecomoda",
      "as vantagens de se investir em roupas"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto informativo (catálogo",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2012-1/tarefa2-audio.mp3"
    }
  },
  {
    "id": "2012-1-t3",
    "cycle": "2012/1",
    "number": "Tarefa 3",
    "title": "Faxina no Céu",
    "shortLabel": "2012/1 · T3",
    "genre": "carta (reivindicação",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Preocupado com a situação do lixo abandonado na órbita da Terra, você decidiu escrever para o Greenpeace, solicitando que a instituição inclua essa discussão em sua agenda de reivindicações. No seu texto, você deverá apresentar a origem do problema e seus possíveis desdobramentos, bem como sugerir algumas soluções.",
    "sourceKicker": "Insumo · prova 2012/1 · Tarefa 3",
    "sourceTitle": "Faxina no Céu",
    "sourceText": "Faxina no céu O espaço está cheio de veículos descartados e fragmentos metálicos girando em alta velocidade. Como eliminar esses detritos? OUTROS CIENTISTAS DA NASA estão empenhados em levar astronautas ao espaço ou enviar sondas interplanetárias a Plutão, mas o que preocupa Nicholas Johnson é um cenário de pesadelo chamado \"síndrome de Kessler\", em homenagem a seu colega Donald Kessler, o cientista que a descreveu pela primeira vez, na década de 1970. O cenário básico é uma órbita atulhada de objetos. Duas peças de equipamentos enormes — como satélites ou foguetes de lançamento — colidem a uma velocidade superior a 32 mil quilômetros por hora, e ambas se transformam em centenas de fragmentos. Um desses fragmentos em seguida choca-se com outro objeto volumoso, que por sua vez se desfaz em centenas de pedaços — e assim por diante, em uma reação em cadeia que culmina na formação de um anel de detritos espaciais densos demais para ser atravessado em segurança. Até o ano passado, diz Johnson, o responsável pelo Departamento do Programa de Detritos Orbitais da Nasa, \"tal perigo era apenas uma questão acadêmica\". Mas, em 10 de fevereiro de 2009, foi registrado o primeiro choque direto entre objetos em hipervelocidade, acima de 10 mil quilômetros por hora. Um satélite da Iridium colidiu com um satélite russo obsoleto à altitude de 800 quilômetros sobre a Sibéria. Esse único acidente acrescentou cerca de 2 mil grandes fragmentos à nuvem de detritos que gira em torno da Terra. IRIDIUM 1 Cerca de 11,5 mil Objetos maiores que 10 centimetros flutuam em órbitas próximas à Terra, Outros 10 mil estáo em órbitas mais distantes. Agências espaciais de todo o mundo monitoram os fragmentos maiores, evitando que haja colisões entre eles e os veículos espaciais, sobretudo os tripulados. E, em 2007, a ONU pediu a adoção de medidas preventivas, como o esgotamento do combustível dos foguetes utilizados para que não explodam, e a recomendação de que não se usem satélites desativados como alvos para testes de mísseis — o que a China havia feito no ano anterior. Tais regras básicas, contudo, não vão impedir colisões acidentais. \"Nos próximos 50 anos\", diz Johnson, \"é razoável que haja uma colisão de dois grandes objetos a cada cinco anos.\" É provável que isso não seja suficiente para desencadear o pesadelo de Kessler. Por outro lado, tampouco se vê no horizonte algum esquema de faxina viável. Estão sendo discutidas várias maneiras de lidar com o lixo espacial. Um cabo comprido e capaz de conduzir eletricidade poderia ser fixado aos satélites obsoletos, colocando- os sob a influência do campo magnético do planeta, que acabaria por arrastá-los para a atmosfera, onde seriam consumidos. Outra solução: um satélite coletor, uma espécie de caminhão de lixo espacial, recolheria os detritos para jogá-los fora perto da atmosfera para que se desintegrassem ao cair. No caso de fragmentos menores, um satélite dotado de um laser poderoso daria conta de destrui-los. Outra abordagem seria menos violenta: uma gigantesca bola de espuma imóvel no espaço. Os detritos não seriam capturados na espuma, que apenas absorveria deles quantidade de energia suficiente para que caíssem na atmosfera. Mas é evidente que, como reconhece Johnson, \"talvez seja difícil lançar ao espaço uma bola com 1,6 mil metros de diâmetro\". — Por Michael D. Lemonick ILUSTRAÇÃO DE SEAN MCNAUGHTON FONTE: DEPARTAMENTO DO PROGRAMA DE DETRITOS ORBITAIS DA NASA National Geographic, jul. 2010.",
    "sourceImage": "/writing/insumos/2012-1-t3.jpg",
    "keyFacts": [
      "a origem do problema",
      "seus possíveis desdobramentos",
      "bem como sugerir algumas soluções"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta (reivindicação",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2012-1-t4",
    "cycle": "2012/1",
    "number": "Tarefa 4",
    "title": "Anuncie no samba-enredo e salve o Carnaval",
    "shortLabel": "2012/1 · T4",
    "genre": "carta de patrocínio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é o gerente financeiro de uma escola de samba do Rio de Janeiro. Com base em informações do texto “Anuncie no samba-enredo e salve o Carnaval”, redija uma carta a empresas brasileiras ou estrangeiras, solicitando patrocínio para sua escola. Explicite as vantagens que o patrocínio poderá trazer para a empresa, relacionando-as ao valor cultural e social do investimento no Carnaval.",
    "sourceKicker": "Insumo · prova 2012/1 · Tarefa 4",
    "sourceTitle": "Anuncie no samba-enredo e salve o Carnaval",
    "sourceText": "POLÊMICA Anuncie no samba-enredo e salve o Carnaval Incluir publicidade no samba é o jeito que as escolas encontraram para fugir do financiamento ilegal. E de manter o espetáculo vivo por muitos Carnavais. — TEXTO CARLOS PERRONE* Disputar 0 val carioca exige um investimento e tanto. Em di- nheiro, mais de RS 5 milhões. Em pessoas, mais de 3 mil. E, mal acaba um Carnaval, já começa a prepa- ração para outro. Quem banca tudo? Para começar, a Rede Globo, que paga milhões para a liga das esco- Ias de samba pelo direito de transmitir os desfiles ao vivo para mais de 150 países. Há também uma verba repassada às escolas pela prefeitura do Rio, pelo cs- tado do Rio e pelo governo federal, além da bilhete ria - nos 3 dias de desfile de 2010, as escolas de sam- ba do Grupo Especial conseguiram arrecadar R$ 42 milhões com os ingressos. Tudo isso é dividido entre as 12 escolas do grupo. Mesmo assim falta dinheiro. É aí que entra o marketing. Ou, como chamo, o \"Carnaval corpora- tivo\". Em 2002, propus à escola de samba Salgueiro o primeiro enredo patrocinado por uma marca pri vada. A ideia era falar da história da aviação, do so- nho de voar, desde Ícaro até hoje. Virou o enredo Asas de um Sonho, Viajando com o Salgueiro, o Or- gulho de Ser Brasileiro... Não era esse o tema do marketing da TAM? Sim, era. O Carnaval da escola, patrocinado pela companhia aérea, teve um resul- tado sensacional: o Salgueiro ficou em 30 lugar. Em 2010, a Portela também aceitou a ideia. Levou à pas- sarela um Carnaval que mostrava como a inclusão social passa pela inclusão digital. A Positivo Infor- mática foi a empresa que investiu na escola. Não sc trata de vender o samba, e sim de viabilizá- 10. Comecei a trabalhar com marketing no Carnaval há mais de 20 anos. Naquela época, o espetáculo era quase 100% pago com recursos \"não declarados\" Digo \"quase\" 1000/0 porque as escolas de samba recebiam verba da prefeitura do Rio. Mas depen- diam principalmente do \"patrono\", uma espécie de mecenas que investia no Carnaval dinheiro de atividades não oficiais, como o jogo do bicho. De lá para cá, o Carnaval deixou de ser só Cartola, Noel e Candeia. Virou uma indústria, ficou profissional. E •Carlos Perrone é presidente da agência de publicidade Pepperz \"Atrás do patrocínio/ Só não vai quem já morreu.\" Os artigos aqui publicados não rep resentam necessariamente a opinião da SUPER. Ilustração Fellipe Gonza \"Há 20 anos precisa dos recursos vindos de patrocínio para que o Carnaval sua cultura não desapareça. Sem isso, corremos o risco de voltar ao financiamento duvidoso. era quase É um grande negócio para todos os envolvidos. As 100% pago escolas de samba não precisam mais buscar dinhei- com recursos não declarados'. ro \"frio\". O patrocinador associa sua marca à mais De lá para cá, pura manifestação cultural brasileira, com direito a o espetáculo se convidar contatos de empresas parceiras para assis- rotissionalizou. tir aos desfiles. Em geral, a expectativa é de que o em patrocínio, retorno conseguido pelas companhias seja o dobro do valor investido no Carnaval. corremos o risco de voltar A questão está em como aliar patrocínio e samba. ao dinheiro de Cantar \"Salve o Bombril aí, gente! \" seria ridículo. O fonte duvidosa.\" que vale é bom senso: é preciso trabalhar com um contexto. Lata de leite, sabão em pó, o que não tiver uma história por trás não vira enredo. Com criativi- dade e pertinência, o Carnaval continuará um espe- táculo saudável, sem perder a sua essência. O SUPERNOVAS— FEVEREIRO 2011 SUPER 29 Revista Superinteressante. ed. 288, 2011.",
    "sourceImage": "/writing/insumos/2012-1-t4.jpg",
    "keyFacts": [
      "as vantagens que o patrocínio poderá trazer para a empresa",
      "relacionando-as ao valor cultural",
      "social do investimento no Carnaval"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta de patrocínio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2011-2-t1",
    "cycle": "2011/2",
    "number": "Tarefa 1",
    "title": "Festa Popular",
    "shortLabel": "2011/2 · T1",
    "genre": "texto para jornal escolar",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Como estudante de português, você foi convidado para escrever um texto sobre um aspecto da cultura brasileira no jornal de sua escola. Com base nas informações do vídeo, escreva um texto apresentando as festas juninas no Brasil, sua origem, suas características e as comidas típicas servidas nessas festas.",
    "sourceKicker": "Insumo · prova 2011/2 · Tarefa 1",
    "sourceTitle": "Festa Popular",
    "sourceText": "Falante 1: [música junina]\n\nFalante 2: As festas juninas estão entre as celebrações mais animadas do Brasil. E a história delas vem lá de trás, dos povos primitivos da Europa.\n\nFalante 3: Na longa duração da história destas festas, que pra nós são as festas juninas, existem mesmo, assim, raízes muito antigas, que devem vir desde o Neolítico, lá no velho mundo.\n\nFalante 2: Eram as festas do solstício de verão, o dia mais longo do ano. Elas serviam para pedir e agradecer pela fertilidade da terra e pelo sucesso das colheitas. No início da Idade Média, a Igreja Católica transformou a festa pagã em data religiosa: a do nascimento de São João Batista.\n\nFalante 3: Os ritos dessa época, de certa forma, se prolongaram nesse modelo de festa cristianizada, que são as festas de São João.\n\nFalante 1: [música junina]\n\nFalante 4: Viva São João! [música junina] Os santos que são, é, tradicionalmente festejados, começando por Santo Antônio, que é o santo casamenteiro, São João e São Pedro. São Pedro, porque é o, o que recebe as chaves, através de Jesus: \"Sobre esta pedra edificarei a minha igreja\". São João, que foi o precursor, é aquele que anuncia a vinda de Jesus, né, e o batismo de conversão. E a pre-- a figura de Santo Antônio, que é o santo casamenteiro, que é a tradição popular, né, mostrando assim a, a tradição de um povo.\n\nFalante 3: A época das festas juninas era a grande oportunidade pra que os padres, que visitavam essas regiões, oficializassem as, a, alianças, não é, as relações, hã, entre homens e mulheres, como legitimar os casamentos. Santo Antônio tá muito bem inserido aí nesse contexto dessa época de festas juninas por ser o santo casamenteiro.\n\nFalante 2: A fogueira era o centro dos festejos do solstício de verão.\n\nFalante 3: A fogueira, muito antes do cristianismo, ela tinha uma, alguma clara relação com o calor, o poder do sol, no dia em que o sol é realmente o astro-rei. A nossa fogueira, embora seja na época do inverno, ela conserva muito daquela relação que a festa original tinha com o sol.\n\nFalante 2: Mas até a fogueira adquiriu um jeito cristão e se transformou na fogueira de São João.\n\nFalante 3: Tudo que era associado ao fogo, às fogueiras, passam a ser então associadas a uma suposta fogueira feita, acesa pela mãe de, de João Batista, pra avisar a Maria, a mãe de Jesus, né, de que o João tinha nascido.\n\nFalante 2: Bandeirinhas de papel, balões de ar quente e fogos de artifício já eram usados pelos portugueses nas festas juninas quando o Brasil foi descoberto.\n\nFalante 3: As quadrilhas são praticamente obrigatórias nas nossas festas juninas contemporâneas, mas elas são uma criação relativamente recente. Elas apareceram aqui no Brasil, nos salões do Rio de Janeiro, quando o Rio era corte, no momento em que a França tava exportando essa nova coqueluche, essa nova moda, que era um estilo camponês de dança de salão.\n\nFalante 1: [música junina]\n\nFalante 4: Vamos pro passeio, tropa!\n\nFalante 2: A comida servida nas festas juninas é típica do meio rural brasileiro: pamonha, bolo de fubá, curau, canjica, mungunzá.\n\nFalante 3: Embora as festas johaninas e hoje juninas tenham chegado aqui com os portugueses, o fato é que os ingredientes culinários, hã, da festa brasileira são tipicamente nativos. É o, é o milho.\n\nFalante 1: [música junina]",
    "keyFacts": [
      "do vídeo",
      "escreva um texto apresentando as festas juninas no Brasil",
      "sua origem",
      "suas características"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para jornal escolar",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2011-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2011-2-t2",
    "cycle": "2011/2",
    "number": "Tarefa 2",
    "title": "Acessibilidade",
    "shortLabel": "2011/2 · T2",
    "genre": "texto para boletim informativo",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Na condição de presidente do Centro de Políticas Públicas para Deficientes Visuais – CPPDV, escreva um texto para o boletim informativo dessa organização. Seu texto deverá divulgar o novo serviço disponibilizado pela prefeitura para o desfile das escolas de samba do grupo especial do Rio de Janeiro, ressaltando a relevância dessa iniciativa e o que é necessário para garantir o seu sucesso.",
    "sourceKicker": "Insumo · prova 2011/2 · Tarefa 2",
    "sourceTitle": "Acessibilidade",
    "sourceText": "Falante 1: O desfile das escolas de samba do grupo especial do Rio de Janeiro terá uma novidade este ano. Pela primeira vez, os deficientes visuais poderão ouvir uma narração detalhada dos desfiles dentro do Sambódromo. O serviço, que é gratuito, estará disponível durante os desfiles de domingo e segunda-feira, além do desfile das campeãs. De acordo com a Secretaria Municipal de Turismo, um funcionário descreverá detalhadamente ao vivo as alegorias, alas, fantasias, enredos e evolução da escola que estiver se apresentando, através de um fone de ouvido. Os deficientes visuais poderão retirar os fones de ouvido em cabines da prefeitura instaladas na entrada do setor treze, setor exclusivo de portadores de deficiência. Ao todo, sessenta fones de ouvidos poderão ser utilizados por dia. O novo sistema é considerado um avanço para a vice-diretora do Instituto Benjamin Constant, Maria da Glória Almeida. Segundo ela, a iniciativa é interessante e boa, mas também cumpre um aspecto legal: a lei da acessibilidade. Almeida ressaltou que é preciso preparo do responsável pela narração.\n\nFalante 2: Há uma lacuna muito grande no que você escuta e do que você não vê. Então eu acho que é uma medida boa. Agora, é preciso também que quem faça essa audiodescrição tenha, assim, preparo suficiente, tenha bom senso. Por quê? Porque quando você vai e pega um enredo de uma escola de samba, né, e os carros alegóricos, eles justamente contam esse enredo, os adereços, as próprias fantasias, é preciso que a pessoa tenha um poder de síntese, objetividade e fale do principal.\n\nFalante 1: No setor treze, trezentos ingressos para pessoas com deficiência já foram disponibilizados pela Riotur. Do Rio de Janeiro, Fábio Alvarenga.",
    "keyFacts": [
      "Acessibilidade"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para boletim informativo",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2011-2/tarefa2-audio.mp3"
    }
  },
  {
    "id": "2011-2-t3",
    "cycle": "2011/2",
    "number": "Tarefa 3",
    "title": "Mercado de Trabalho",
    "shortLabel": "2011/2 · T3",
    "genre": "texto de subsídio (reunião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "A empresa na qual você trabalha quer incentivar a contratação de pessoas com mais de 60 anos. Seu chefe lhe solicitou um texto para subsidiar as discussões sobre a contratação de idosos, tema na pauta de uma próxima reunião. A partir da matéria da Revista Istoé de 11/11/2009, seu texto deverá mostrar a situação do Brasil em relação ao assunto e destacar as implicações dessa iniciativa para os idosos, as empresas e o país.",
    "sourceKicker": "Insumo · prova 2011/2 · Tarefa 3",
    "sourceTitle": "Mercado de Trabalho",
    "sourceText": "Economia A VEZ DOS = IDOSOS Trabalhadores com mais de InstitutoBrasiIeiro dg 60 anos são beneficiados pela retomada do emprego e ampliam sua participação no mercado Essa elevação coloca o crescimento do número de Larissa Domingos trabalhadores idosos 25% agima do total de maior desafio do envelhe- pçssoas que ingressaram no merc cimento da população é de trabalho manter o trabalhador por passado, apenas quatro entre I WO maior tempo possível no mercado de trabalho. O número de idosos brasileiros alcançou do total da população e deve se aproximar dos 14% quando uma sociedade é considerada envelhecida — nos pró. IBGE confirma os dados positivos. ximos 20 anos. Esse fenômeno impõe entraves econômicos, sobretudo na sustentação dos sistemas de saúde e previdénçi4. Mas a boa noticia éque o Brasil está conseguindo ampliar o número degrabalbadores idosos._Na recuperação econômica - verificada sobretudo no segundo semestre, com ampliação do emprego na indústria, setor mais atingido pela crise, o grupo que vem aproveitando melhor essa retomada é a chamada terceira idade. década, a Pnpulaçào anos ou mais avançou 56 % e chegou tv770tniIpessaasgQê008 em clpgo Na ativa, Arlete, 66 anos, na lanchonete onde trabalha: \"Não quero parar enquanto tiver saúde\". De 2001 a 2007, mento número de empregados dessa faixa etária no Pais; enquanto a população idosa cresceu ao todo 30%. Os fatores queuvama populaçãodaterceimidade a procurar dá Igmpo atéacomplcmentaçào da rendá fami Em 53% dos lares brasileiros, os idosos contribuem com pelo menos metade da despesa da família. Segundo a Pesquisa Nacional por Amostra de Domicilios (PNAD) de 2007, dos idosos viviam com seus filhos na condição de chefe de domicílio. No cntanvovuào é somente pelwunotivagüw-.econômicw-que terceira idade Os idosos querem sentir mais produtivos. perfil do idoso de hoje é permanecer economicamente ativo. idosos estavam Fles possuem melhor saúde e do De,- disposição e brigam mais pelos seus direitos e cidadania\" , disse Lúcia tatísticaeEgudos Soçioggonômicos- Cunha, da Coordenação de População (Dieese), feitoapedidode ISTOÉ. O elndicadoresSociaisdolBGE. A FORçA DA TERCEIRA IDADE Crescimento de 1998 a 2008 Populacao Ecõr:omicarnente 25,3% Total (todasa5U±S) t 56,1% 60 ams rrurS Ocupados 32,4% Total (todasusidudes) 50anoscurrais FOTO: MURILLO CONSTANXINO 134 ISTOE 2087, 11/11/2009.",
    "sourceImage": "/writing/insumos/2011-2-t3.jpg",
    "keyFacts": [
      "as implicações dessa iniciativa para os idosos",
      "as empresas"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de subsídio (reunião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2011-2-t4",
    "cycle": "2011/2",
    "number": "Tarefa 4",
    "title": "Mão Pesada",
    "shortLabel": "2011/2 · T4",
    "genre": "post no blog (argumentativo",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você é membro de um grupo de apoio às pessoas com obesidade e colabora com suas ações. Escreva um texto para o blog do grupo, com base nas informações da reportagem, argumentando contrária ou favoravelmente à intenção da Agência Nacional de Vigilância Sanitária – ANVISA de proibir a venda de inibidores de apetite.",
    "sourceKicker": "Insumo · prova 2011/2 · Tarefa 4",
    "sourceTitle": "Mão Pesada",
    "sourceText": "s EEM-ESTAR OBESIDADE Mão Pesada A Anvisa quer proibir a venda de inibidores de apetites O que os obesos perdem com isso? Cristiane Segatto uem 'Vive Contra a. balança tem mais um pro- blema peta frente. A Anvisa anunciou na semana passada que pretende poibir a venda de inibidores de apetites entre eles a sibutramina. apresentareAIUiscos_cardiacos.L,) tuedi.mentgz_gue atua no cérebrzg aumenta a sensação de saciedadç=éa Frincipál escolha dos médicos que prescrevent drogas contra a obesi- dade. mas o sucesso é ince:to. Alguns pacientes não emagrecem nada Outros chegam a perder 20 quilos. Nesta quarta-feira. possivel proibição será _dgbat_icJg._ apdiência_nÚblicaawBrasiIia4mas, desde já, desperta uma questão: será que a agência regulatória brasileira está exagerando? \"Se a Anvisa seguir com essa ideia, vai Causar imenso prejuízo a milhões de bmsileiros que não conseguem emagrecer de outra forma\", diz Ricardo Meirelles, presidente da Sociedade Brasileira de Endocrinologia e Metabologias A principal justificativa da agência a favor da proibição da sibutramina é um estudo de seis anos realizado pelo póprio fabricante (o laboratório Abbott) com 10 mil pacientes, a pe- dido da Agência Européia de Medicamentos (Emea). Foram incluídos apenas obesos acitna de anos, com diabetes e histólieo de problemas cardiovasculares. NO grupo que recebeu placebo (comprimidos sem efeito), o índice dc infarto, AVC ou outros Trablgvn:w Carüovasculates foi grupo que tomou sGhuzramina, o índice foi de Ou seja: o risco aament0ü 16%. Nenhuma morte foi Embora o estudo tenha sido realizado com um grupo de alto risco, as autoridades europeias estenderam as Conclusões para a população geral e proibiram a venda do remédio em janeiro de 2010. \"Esse Caso é um exemplo grave de má interpretação da evidência cientifica pelas autoridades regulatórias. A agência europeia enou\", afirma Meirelles. A decisão provocou efeito cascata. A A bott foi pressionada pela agência americana FDA e decidiu retirar a droga dos Estados Unidos, O mesmo ocorreu ao Brasil no final de 2010, mas a sibutramina continuou disponivel forma de produtos genéticos ou similares, Agora, além deles. a Anvisa pretende banir outros inibidores de apetite da ciasse dos anfetaminicos — anfepramona, femproporex e mazindol.Eles podem eausaf dependência c já não são vendidos na Europa e nos Estados Unidos. Restaria nas farmácias apenas 0 orlistats conhecido pela marca Xenical. Ele não atua no cérebro e tem efeito emagrecedor menor. \"Esses remédios precisam ser banidos. Não vamos esperar alguém pata tornar uma atitade\". diz Maria Eugênia CüiY, do núcleo de investigação em vigilância sanitária da Anvisa, A sibutratnina não pode usada por pessoas que têm ou tiveram arritmias ou insuficiência cardíaca, AVC, doença atterial periférica, hipe:tensào fora de Não existe milagre controle, infarto, angina. \"A decisão de retirada dos remédios é correta\", Outros métodos de diz Raul Dias Santos Filho, do emagrecimento também têm Instituto do Coração (InCor). \"Não desvantagens. Os principais: compensa tomar remédio para perder • DIETA E EXERCiCtOS pouco peso e correr risco cardia- vascular, ainda que pequeno\". A Metade dos obesos não consegue perda média de peso com a emagrecer e manter o peso por muito sibutramina é de Segundo os tempo endocrinologistas, a proibição trará ORUSTAT problemas mais graves. \"Os Emagrece menos gize a sibutramina, pacientes vão engorda: mais ou causa diarréia, flattlléncia e inchaço recorrer fórmulas perigosas como . CIRURGIA É indicada apenas aos muito obesos os hormônios tireoidianos\". diz Walmir Coutinho, presidente eleito (IMC acima de 35). Pode causar da Asociaçüo Internacional pata o problemas neurológicos e perda óssea Estudo da Obesidade. \"Isso, sim, pode matar\". 21 de fevereiro de 2011, ÉPOCA, p.95.",
    "sourceImage": "/writing/insumos/2011-2-t4.jpg",
    "keyFacts": [
      "da reportagem"
    ],
    "mustDo": [
      "escrever no gênero pedido: post no blog (argumentativo",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2011-1-t1",
    "cycle": "2011/1",
    "number": "Tarefa 1",
    "title": "Alimentação Saudável",
    "shortLabel": "2011/1 · T1",
    "genre": "texto para mural",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Depois de ver a reportagem e ciente da importância do assunto apresentado, você decide escrever um texto para ser afixado no mural de seu local de trabalho. Em seu texto, você deverá chamar a atenção para o problema exposto no vídeo, bem como divulgar o trabalho que vem sendo realizado pela Fundação Oswaldo Cruz.",
    "sourceKicker": "Insumo · prova 2011/1 · Tarefa 1",
    "sourceTitle": "Alimentação Saudável",
    "sourceText": "Falante 1: No Brasil, mais de trinta e nove milhões de adultos estão acima do peso, de acordo com a Organização Mundial de Saúde. Mas a maior preocupação mesmo é com o número de meninos e meninas que padecem deste mal. Dados do IBGE são preocupantes. Nas duas últimas décadas, a obesidade infantil cresceu cinco vezes no país. Hoje, quase dezoito por cento das crianças estão obesas, problema considerado de saúde pública pela Organização Mundial de Saúde. Preocupada com esses índices, a Fundação Oswaldo Cruz de Brasília criou uma oficina para ensinar as crianças a comer. Hoje, elas ingerem mais calorias do que necessitam.\n\nFalante 2: A gente vê hoje um choque, aonde práticas que eram tradicionais de famílias que mantinham o seu alimento preparado dentro de aspectos de prazer, de cultura, de, de até mesmo de um certo equilíbrio de convivência, hoje são rompidos pra atender uma certa prática, que é de uma escolha de alimentos rápida, aonde se voltam pra alimentos processados e esses, consequentemente, trazendo males importantes.\n\nFalante 1: O ponto crítico da alimentação infantil ocorre dos sete aos doze anos. Fase em que a criança sente mais fome, estimulada pelo metabolismo do crescimento. E aí que está o perigo, porque a maioria delas opta por alimentos mais calóricos e essa combinação resulta em obesidade. Num estande da Fiocruz montado na Feira de Ciência e Tecnologia, na Esplanada dos Ministérios, crianças das escolas públicas de Brasília aprendem de forma lúdica a comer alimentos saudáveis.\n\nFalante 3: Saudável, tem que comer frutas ou legumes e, e feijão e arroz.\n\nFalante 4: Eu como arroz, feijão, tomate, macarrão e alface.\n\nFalante 1: Para essa nutricionista, é possível fazer uma alimentação saudável sem proibir.\n\nFalante 5: Pra alimentação ser saudável, elas podem comer de todos os alimentos, inclusive sorvete, chocolate. Só que essas coisas não são coisas que a gente come todos os dias, porque não são coisas muito saudáveis. Então a gente estimula pra que elas comem, é, um prato com-- que contenha tudo: arroz, feijão, salada e, e evite refrigerante. Mas a gente não coloca muito essa coisa de obrigar a criança a comer verdura, restringir a com-- a tomar refrigerante, porque a gente sabe que a criança também ela tem o estímulo dos pais, então não funciona muito a gente obrigar.",
    "keyFacts": [
      "apresentado",
      "você decide escrever um texto para ser afixado no mural de seu local de trabalho"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para mural",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2011-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2011-1-t2",
    "cycle": "2011/1",
    "number": "Tarefa 2",
    "title": "Novo Livro de Boris Fausto",
    "shortLabel": "2011/1 · T2",
    "genre": "texto de divulgação",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Baseando-se nas informações contidas no áudio, escreva um texto de divulgação da obra, para ser publicado no principal jornal de sua cidade, apresentando o autor e a justificativa para o título do livro.",
    "sourceKicker": "Insumo · prova 2011/1 · Tarefa 2",
    "sourceTitle": "Novo Livro de Boris Fausto",
    "sourceText": "Falante 1: [vinheta jornalística] Metrópole Entrevista.\n\nFalante 2: Pois é, com alegria que nós vamos agora para São Paulo conversar com o historiador, professor, escritor Boris Fausto. Professor Fausto, bom dia.\n\nFalante 3: Bom dia, Jorge.\n\nFalante 2: Tudo bem com o senhor?\n\nFalante 3: Tudo bem, tudo em ordem. Tudo bem com você?\n\nFalante 2: Também, também. Alegre aqui de ver o senhor produzindo muito, trabalhando e lançando mais um livro.\n\nFalante 3: Pois é.\n\nFalante 2: Memórias de um historiador de domingo. Como é que é essa história do historiador de domingo, professor?\n\nFalante 3: A história do historiador de domingo é porque eu profissionalmente fui grande parte da minha carreira, advogado.\n\nFalante 2: Hã.\n\nFalante 3: E eu me dediquei à história paralelamente, fiz um curso de, de história depois de ter feito o curso de direito.\n\nFalante 2: Uhum.\n\nFalante 3: Então fui escrevendo os meus textos, hã, hum, as co-- é que eram as coisas que eu tinha mais prazer em fazer, é, indo em busca das minhas pesquisas e daí foram resultando os livros. Por que historiador de domingo? Porque [pigarreando] como a minha profissão era, hã, outra por longo tempo da minha vida.\n\nFalante 2: Uhum.\n\nFalante 3: Eu usava para me dedicar à história, que era uma opção de prazer preferencial, eu usava os nichos do tempo que eu podia. Naturalmente, não foi só o domingo, porque se fosse só o domingo-\n\nFalante 2: Aham.\n\nFalante 3: É, seria impossível.\n\nFalante 2: É, o senhor é de origem judaica, a sua família de imigrantes que chegou no Brasil, o senhor sempre viveu em São Paulo, professor?\n\nFalante 3: Tirando os poucos, hã, períodos em que eu vivi no exterior e não foram por muito tempo, acho que o período mais longo foi de uns dez meses, eu sempre vivi em São Paulo.\n\nFalante 2: E São Paulo tá muito presente nessas memórias de um historiador de domingo?\n\nFalante 3: Está, está. É, está muito presente nas memórias do historiador de domingo, no meu-- na primeira parte das minhas memórias, que é Negócios e Ócios. São Paulo está presente no meu livro O Crime do Restaurante Chinês. Enfim, São Paulo, é, pra bem ou pra mal, é uma parte muito, é, sensível, uma parte integrante da minha vida.\n\nFalante 2: Um grande abraço pro senhor, professor, viu?\n\nFalante 3: Grande abraço. Tudo de bom, hein.\n\nFalante 2: Tá bom, pro senhor também. Conversamos diretamente de São Paulo com Boris Fausto. Ele tem quase oitenta anos, vai fazer oitenta anos agora. Historiador, professor, escritor, lança mais um livro agora, Memórias de um historiador de domingo. Vale a pena, viu?",
    "keyFacts": [
      "a justificativa para o título do livro"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto de divulgação",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2011-1/tarefa2-audio.mp4"
    }
  },
  {
    "id": "2011-1-t3",
    "cycle": "2011/1",
    "number": "Tarefa 3",
    "title": "Cosméticos para homens",
    "shortLabel": "2011/1 · T3",
    "genre": "texto para a diretoria",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você trabalha no departamento de marketing de uma empresa fabricante de cosméticos que pretende ampliar sua produção. Com base nas informações da reportagem abaixo, escreva um texto para a diretoria dessa empresa, salientando o perfil do homem contemporâneo e sugerindo a criação de uma linha completa de produtos para o público masculino.",
    "sourceKicker": "Insumo · prova 2011/1 · Tarefa 3",
    "sourceTitle": "Cosméticos para homens",
    "sourceText": "• MONITOR • LUIZ ALBERTO VARIN*O• Beleza é fundamental (para eles) PESQUISA APONTA QUE DOS BRASILEIROS SE PREOCUPAM COM ESTÉTICA UMA PESQUISA feita em 2002 nos Estados Unidos pela agen- cia de publicidade Euro RCSG comprovou que a vaidade dos homens no começo do século 21 estava em alta. A divulgação desse trabalho popularizou uma expressáo que havia sido criada alguns anos antes pelo jornalista inglês Mark Simpson para definir o novo perfil masculino — começava a era dos metrossexuais. habitantes das grandes cidades, sensiveis e ligados a temas antes exclusivamente femininos. como moda. gastronomia e decoração. Durante muito tempo não se falou em outra E outros 19% delegam as suas companheiras nào apenas a compra como também a escolha desses produtos. Por outro lado. já chega a 38% o percentual dos que escolhem e corn- pram eles mesmos suas marcas. Há ainda um grupo de 13% que não vào às lojas mas deixam claro para as companheiras o que querem que elas comprem para eles. A tendência é que os desleixados tornem-se minoria. Afinal. a preocupação com estética não é mais exclusivamente femi- nina — o estudo da Kantar mostrou que. se o assunto mobiliza 91% das mulheres. também afeta 85% dos homens. É natural. Existe hoje uma cultura coisa. Aos poucos, os machos tradicionais II Produtos para começaram a reagir à ideia de decadência da da beleza que não obedece barreiras de masculinidade. Um exemplo de tal mudança terão cada sexo. idade ou nivel socioeconômico. Para é a campanha de publicidade que ganhou o Grand Prix no Festival de Cannes deste ano: uma linha de produtos de cuidados pessoais que promete deixar homens .com cheiro de homem\". Todas essas teses sobre o compor- tamento dos machos modernos deixaram mais espaço, desde que adequados ao consumidor sermos bem-sucedidos. seja no plano social ou profissional. precisamos todos estar em forma e bem cuidados. Mas algumas dife- renças persistem. é claro. Enquanto para os homens as maiores preocupações são com a aparência dos dentes. o mau hálito e a uma dúvida no ar: para onde caminharia. afinal, o mercado de produtos masculinos de beleza e cuidados pessoais? Pelo menos no que diz respeito ao Brasil. a resposta pode estar nas páginas do relatório de uma pesquisa realizada este ano pela Kantar Worldpanel. Ela revelou que nosso país ainda está polarizado entre vaidosos e desleixados quando o assunto é o cuidado com a aparência. Nada menos do que 31% dos rapazes entrevistados usam o que encontram em casa. REVISTAGOL transpiração, o que tira o sono das mulheres são. pela ordem, a obesidade. os dentes. manchas na pele, rugas e flacidez. A conclusão da Kantar é que existirá cada vez mais espaço para produtos masculinos, desde que adequados especifi- camente às necessidades dos homens. Isso porque, como já previra o poeta Vinicius de Moraes, beleza é fundamental. •Luiz Alberto Marinho é consultor em marketing de vareo. Mande seus comentários para o e-mail: got@tnp.com.br",
    "sourceImage": "/writing/insumos/2011-1-t3.jpg",
    "keyFacts": [
      "da reportagem abaixo",
      "escreva um texto para a diretoria dessa empresa",
      "salientando o perfil do homem contemporâneo",
      "sugerindo a criação de uma linha completa de produtos para o p"
    ],
    "mustDo": [
      "escrever no gênero pedido: texto para a diretoria",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2011-1-t4",
    "cycle": "2011/1",
    "number": "Tarefa 4",
    "title": "Pedra Preciosa",
    "shortLabel": "2011/1 · T4",
    "genre": "e-mail de persuasão",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Imagine que você seja o proprietário de uma loja virtual de gemas brasileiras. Um comprador pediu desconto sobre o valor de uma ametista, alegando não se tratar de uma pedra preciosa, como a esmeralda ou o diamante. Com base no texto, escreva um e-mail para esse comprador, a fim de convencê-lo a pagar o preço anunciado.",
    "sourceKicker": "Insumo · prova 2011/1 · Tarefa 4",
    "sourceTitle": "Pedra Preciosa",
    "sourceText": "O Brasil não possui pedras semipreciosas Pércio de Moraes Branco* O título acima pode surpreender muita gente, uma vez que o nosso pais é reconhecidamente um grande produtor de gemas e o Rio Grande do Sul destaca-se pela produção de ágata e ametista. A afirmativa, propositalmente provocadora, justifica-se, porém, pois não é mais admissível — se é que alguma vez o foi — separar as gemas em preciosas e semipreciosas. Embora esteja correta a denominação pedra preciosa, o mesmo não se dá com pedra semipreciosa, e são várias as razões para isso. A principal delas é que nunca houve consenso sobre quais pedras seriam consideradas preciosas. Normalmente, eram assim classificados o rubi, a safira, a esmeralda e o diamante. Alguns autores, porém, incluíam também a opala preciosa e o crisoberilo, por exemplo. E outros, a pérola. Outra razão para não se separar as gemas em semipreciosas e preciosas é a inutilidade dessa distinção. Para o Brasil, que produz boa quantidade de esmeralda e diamante mas quase nada de rubi e safira, a distinção, mais do que inútil, é muito prejudicial. Mas não ficam aí os argumentos contra a classificação semipreciosa. Embora esmeralda, rubi, safira e diamante sejam usualmente gemas caras, uma esmeralda e mesmo um diamante podem valer menos que uma granada mais rara, por exemplo. Por esses motivos, o termo semipreciosa caiu em desuso em quase todo o mundo, sobrevivendo apenas em alguns países, entre eles o Brasil. Gemólogos de renome internacional condenam de modo enfático seu emprego. Robert Webster considera-o insatisfatório, lembrando que foi abandonado por consenso geral. Walter Schumann afirma que a designação ainda é usada no comércio mas não é uma expressão correta porque muitas pedras chamadas semipreciosas são mais valiosas que as preciosas, não havendo uma linha divisória real entre as pedras mais ou menos valiosas. Joel Arem lembra que, no passado, os termos preciosa e semipreciosa foram amplamente usados, mas que hoje seu uso cria confusão. Mas não são apenas os gemólogos que condenam o termo. Também os joalheiros mais bem informados o fazem. Diz Erich Merget que a denominação semipreciosa, atualmente muito utilizada, deveria ser totalmente abandonada. Até hoje, ninguém foi capaz de explicar a origem dessa expressão absurda, completa ele. O termo gema tomou-se designação comumente aceita para todas as pedras ornamentais de valor, eliminando a anterior distinção artificial entre as chamadas pedras preciosas e semipreciosas, afirma Jules Sauer. (... Coerente com esses posicionamentos, a Associação Brasileira de Normas Técnicas (ABNT) recomenda evitar sempre o uso da palavra semipreciosa, substituindo-a por preciosa, salvo nos casos de exigências comerciais ou legais (NBR 10630). A ressalva justifica-se porque a Itália dá um tratamento diferenciado às gemas importadas, com taxação menor para as que chegam ao país classificadas na origem como semipreciosas. Portanto, não se constranja de chamar ágata, ametista, citrino, topázio, água-marinha, turmalina, etc. de pedras preciosas. E chame de joia, não de bijuteria, seu brinco, anel ou outra peça confeccionada com gemas que você considera baratas. O setor joalheiro, como qualquer outro ramo de vendas, trabalha com produtos caros e baratos e o preço nunca foi motivo para uma gema deixar de ser preciosa. Disoonivel em: em: 23 fev",
    "sourceImage": "/writing/insumos/2011-1-t4.jpg",
    "keyFacts": [
      "Pedra Preciosa"
    ],
    "mustDo": [
      "escrever no gênero pedido: e-mail de persuasão",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2010-2-t1",
    "cycle": "2010/2",
    "number": "Tarefa 1",
    "title": "Museu da Língua Portuguesa",
    "shortLabel": "2010/2 · T1",
    "genre": "sugestão de passeio",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Um dos clientes da agência de viagens em que você trabalha lhe pediu uma sugestão de passeio na cidade de São Paulo. Com base nas informações veiculadas no vídeo, sugira uma visita ao Museu da Língua Portuguesa, dando destaque aos aspectos que fazem a diferença desse Museu.",
    "sourceKicker": "Insumo · prova 2010/2 · Tarefa 1",
    "sourceTitle": "Museu da Língua Portuguesa",
    "sourceText": "Falante 1: [ruído estático] Um museu diferente atrai um público cada vez maior em São Paulo. Em vez de objetos em vitrines, expõe palavras.\n\nFalante 2: É o Museu da Língua Portuguesa, instalado num prédio que faz parte do patrimônio histórico nacional.\n\nFalante 1: [vinheta jornalística] É dentro do prédio da centenária Estação da Luz, um dos marcos de São Paulo, que funciona o Museu da Língua Portuguesa. Uma árvore de palavras recebe o visitante. Das raízes até a copa, termos em latim, grego, que deram origem a palavras do nosso idioma.\n\nFalante 3: Uma das palavras que nós usamos, né, cotidianamente, é paixão. Paixão vem de passio, que é latim. E em latim, passio quer dizer sofrimento.\n\nFalante 1: O museu, que se propõe a contar a história da nossa língua, não tem um livro sequer, não tem objetos em vitrines. O acervo é feito de palavras, e algumas só ganham sentido dependendo do ponto de vista de quem olha. A armação de arame traz uma lente imaginária.\n\nFalante 4: Quando a gente olha assim pela suposta luneta, a gente consegue encaixar direitinho o texto, assim.\n\nFalante 1: O texto faz sentido?\n\nFalante 4: Faz sentido.\n\nFalante 1: O texto de Guimarães Rosa precisa do espelho pra ser entendido.\n\nFalante 3: Criativa, é uma outra forma de você, é, in-interpretar a obra dele.\n\nFalante 1: [música instrumental] A história de Riobaldo e Diadorim está pendurada no teto, nas mais de quatrocentas páginas ampliadas de Grande Sertão Veredas, que o visitante pode puxar e ler. E até no banheiro, nas palavras que percorrem as paredes. A tecnologia ajuda a compor um espaço vivo pra entender como se dá a dinâmica da nossa língua, de onde ela veio, pra onde ela vai.\n\nFalante 3: Uma palavra como cutucar, por exemplo, vem do tupinambá. E em tupinambá quer dizer, é, tentar furar alguém com alguma coisa pontuda, tá? Pra nós, cutucar virou chamar a atenção, tá? Nós pegamos uma palavra indígena, misturamos e transformamos uma nova palavra pro nosso português.\n\nFalante 1: [música instrumental] Num painel de cem metros de extensão, dez filmes simultâneos mostram a língua em movimento, no cotidiano, no futebol, no carnaval, na religião. Sotaques e regionalismos. No computador, o visitante é quem escolhe o que quer saber.\n\nFalante 5: Quanto mais o público interagir com a arte, mais ele se interessa hoje em dia, assim, por causa de mídia, por causa de um monte de coisa. Então eu acho que é, acho que é uma ideia muito boa, muito boa mesmo.\n\nFalante 1: [música jornalística] [ruído estático] Um museu diferente atrai um público cada vez maior em São Paulo. Em vez de objetos em vitrines, expõe palavras.\n\nFalante 2: É o Museu da Língua Portuguesa, instalado num prédio que faz parte do patrimônio histórico nacional.\n\nFalante 1: [vinheta jornalística] É dentro do prédio da centenária Estação da Luz, um dos marcos de São Paulo, que funciona o Museu da Língua Portuguesa. Uma árvore de palavras recebe o visitante. Das raízes até a copa, termos em latim, grego, que deram origem a palavras do nosso idioma.\n\nFalante 3: Uma das palavras que nós usamos, né, cotidianamente, é paixão. Paixão vem de passio, que é latim. E em latim, passio quer dizer sofrimento.\n\nFalante 1: O museu, que se propõe a contar a história da nossa língua, não tem um livro sequer, não tem objetos em vitrines. O acervo é feito de palavras, e algumas só ganham sentido dependendo do ponto de vista de quem olha. A armação de arame traz uma lente imaginária.\n\nFalante 4: Quando a gente olha assim pela suposta luneta, a gente consegue encaixar direitinho o texto, assim.\n\nFalante 1: O texto faz sentido?\n\nFalante 4: Faz sentido.\n\nFalante 1: O texto de Guimarães Rosa precisa do espelho pra ser entendido.\n\nFalante 3: Criativa, é uma outra forma de você, é, in-interpretar a obra dele.\n\nFalante 1: [música jornalística] A história de Riobaldo e Diadorim está pendurada no teto, nas mais de quatrocentas páginas ampliadas de Grande Sertão Veredas, que o visitante pode puxar e ler. E até no banheiro, nas palavras que percorrem as paredes. A tecnologia ajuda a compor um espaço vivo pra entender como se dá a dinâmica da nossa língua, de onde ela veio, pra onde ela vai.\n\nFalante 3: Uma palavra como cutucar, por exemplo, vem do tupinambá. E em tupinambá quer dizer, é, tentar furar alguém com alguma coisa pontuda, tá? Pra nós, cutucar virou chamar a atenção, tá? Nós pegamos uma palavra indígena, misturamos e transformamos uma nova palavra pro nosso português.\n\nFalante 1: [música jornalística] Num painel de cem metros de extensão, dez filmes simultâneos mostram a língua em movimento, no cotidiano, no futebol, no carnaval, na religião. Sotaques e regionalismos. No computador, o visitante é quem escolhe o que quer saber.\n\nFalante 5: Quanto mais o público interagir com a arte, mais ele se interessa hoje em dia, assim, por causa de mídia, por causa de um monte de coisa. Então eu acho que é, acho que é uma ideia muito boa, muito boa mesmo. [música jornalística] [ruído estático]",
    "keyFacts": [
      "veiculadas no vídeo",
      "sugira uma visita ao Museu da Língua Portuguesa",
      "dando destaque aos aspectos que fazem a diferença desse Museu"
    ],
    "mustDo": [
      "escrever no gênero pedido: sugestão de passeio",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2010-2/tarefa1-video.mp4"
    }
  },
  {
    "id": "2010-2-t2",
    "cycle": "2010/2",
    "number": "Tarefa 2",
    "title": "Indústria da tecnologia",
    "shortLabel": "2010/2 · T2",
    "genre": "relatório",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Sendo funcionário de uma loja de eletro-eletrônicos, você decidiu convencer seu chefe a investir mais no setor de computadores. Baseado nas informações do áudio, escreva um relatório descrevendo o perfil do consumidor brasileiro e falando das vantagens de se investir nesse setor.",
    "sourceKicker": "Insumo · prova 2010/2 · Tarefa 2",
    "sourceTitle": "Indústria da tecnologia",
    "sourceText": "Falante 1: [som de news] Giro Business, com Sérgio Waid.\n\nFalante 2: Olá ouvinte da Rádio Band News, o tema da semana, a indústria da tecnologia. E conosco, Cássio Tietê, da Intel. Cássio, hoje o Brasil ocupa a quarta posição no ranking mundial em venda de computadores. O Brasil vem conquistando posições ano após ano e isso se dá por diversas vantagens competitivas, como por exemplo, a medida provisória do bem, que gerou uma isenção de imposto representativo, tornando assim o computador mais acessível. Além disso, existem os atributos da população, que cada vez mais buscam conhecimento e outras vantagens que se dão através dos computadores. De que forma a Intel percebe este autoconsumo?\n\nFalante 3: Olha, Sérgio, o que tá acontecendo aqui no Brasil é algo muito interessante. Nós devemos terminar 2010 na terceira posição em termos de número de computadores vendidos no país. Na verdade, por que isso? O consumidor, o brasileiro, adora estar conectado, adora consumir conteúdo. Ele, antes, ficava muito tempo na televisão, ele continua ficando, mas cada vez mais ele está conectado, ele tá se comunicando, ele tá consumindo conteúdo, ele tá baixando foto, editando imagens. Além disso, buscando mais produtividade pessoal e profissional. Por isso, investindo na computação, ter um computador ou um notebook como um próximo passo na evolução na carreira.\n\nFalante 2: Ainda dentro do tema, se percebe uma conscientização das famílias com relação à relevância do computador pra disseminar educação e assim conseguir levar informações importantes de um contexto global, através da banda larga ou da conectividade, seja ela qual for, e atribuir isso também às vendas de computador?\n\nFalante 3: Não há a menor sombra de dúvida. As pessoas, as famílias estão percebendo que o acesso à informação na ponta do clique do mouse, permite que elas consigam acessar o mundo, ter acesso a conteúdos que elas jamais teriam, mas de uma forma interativa, criativa e colaborativa, por não dizer.\n\nFalante 2: Este é Cássio Tietê, da Intel, que está conosco durante toda a semana na coluna Giro Business, discutindo a indústria da tecnologia e que amanhã voltará com muito mais.",
    "keyFacts": [
      "Indústria da tecnologia"
    ],
    "mustDo": [
      "escrever no gênero pedido: relatório",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2010-2/tarefa2-audio.m4v"
    }
  },
  {
    "id": "2010-2-t3",
    "cycle": "2010/2",
    "number": "Tarefa 3",
    "title": "Movimento contra o Botox",
    "shortLabel": "2010/2 · T3",
    "genre": "carta ao médico",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Atendendo aos apelos da indústria da estética, você havia decidido aplicar Botox. Ao ler a reportagem “Movimento contra o Botox”, você decidiu escrever para seu médico, desistindo do procedimento. Em seu texto, defenda a sua decisão, ressaltando os efeitos colaterais do uso da toxina botulínica e os riscos que a substância traz para a saúde.",
    "sourceKicker": "Insumo · prova 2010/2 · Tarefa 3",
    "sourceTitle": "Movimento contra o Botox",
    "sourceText": "Medicina & Bem-estar MOVIMENTO CONTRA O Por causa dos efeitos colaterais, artistas e mulheres comuns levantam bandeira contra o produto que pode modificar as expressões faciais á mais de dez anos, o botox promete felicidade instantâ- nea a pessoas que sofrem só de imaginar o aparecimento das primeiras linhas de expressão. Fácil e rápida. com apenas uma agulhada a toxina botulínica apaga os tão indesejados sinais da idade. Em tempos onde ser jovem é passaporte para a aceitação social, não é unanimidade. Por razões que váo desde os riscos à saúde até a necessidade de se manter as expressões faciais, cada vez mais, artistas consagrados e gente comum tornarr•l pública a sua aversão à substância. Agentes de atores, diretores de cinema e estúdios de Hollywood estão encampando um movimento contra a onda das estrelas retocadas. Sua principal critica é que o uso desenfreado alterou a fisionomia e congelou a expressão dos atores. Na tela. no lugar de expressoes de tristeza, raiva. felicidade e prazer, observam- se rostos esticados, lisos, estáticos e sem vida. \"Nao há atrizes com mais de 35 anos que consigam expressar raiva\", disparou o diretor americano Martin Scorcese. A última a se declarar contra o uso da toxina para fins estéticos foi a atriz americana Drew Barrymore. 35 anos. \"Prefiro ter a pele de um cão basset hound\", disse. Dias antes, a apresentadora Xuxa, 47 anos. disse que não recorria a ela porque temia que seu rosto ficasse igual a um tamanco. A insatisfação também atinge os altos executivos da indústria de cinema americana. A Warner está privilegiando o recrutamento de artistas na Europa e no Canadá, onde a cultura do botox é menor. A Fox, por sua vez, está fazendo uma série de testes de vídeo. \"Estamos atrás de autenticidade\", declarou Márcia Shulman, vice-presidente de casting da Fox. ao jornal britânico \"Daily Mail\", \"Se o papel é de uma mãe, precisamos de uma atriz que se pareça com uma\". O excesso de botox pode prejudicar em definitivo os movimentos da face. \"Uso exagerado ou apli- cações frequentes ocasionam atrofia muscular\", diz o cirur- giáo plástico Sebastião Guerra, presidente da Sociedade Brasileira de Cirurgia Plástica. \"Também há riscos de migração da substância para outras mus- culaturas, quando aplicada em dose excessi-va\", CARA LIMPA afirma o cirur-gião Maira Jung, plástico Alexandre 47, quer Senra (leia no preservar a quadro outras sua história, implica-çóes)\". contada pelas rugas. Mas é dificil em nossa sociedade nadar contra a corrente e engrossar o movimento. \"Se você tem dinheiro, é complicado resistir\". diz Denise Santanna, historiadora da Pontifícia Universidade Católica de São Paulo (PUC-SP). \"A pressao pelo corpo jovem é absurda\". Ainda assim, o levante encontra eco fora do meio artístico. Aos 47 anos, a perfumista carioca Maira Jung afirma que jamais recorreria a práticas extremas em nome de uma pele lisa. \"Levei tantos anos para construir minhas rugas, que acho um absurdo comprometer minha história com uma substância química.\" A bióloga paulista Regiane de Paula, 44 anos. tem pavor de pensar na possibilidade de perder sua identidade. \"O envelhecimento é um processo natural. que quero vivercom dignidade\". A esperança de quem tem argumentos contra o uso da toxina é de que seu discurso influencie outras pessoas. \" Para isso, só aprendendo a envelhecer sem medo e culpa\", diz Denise. em excesso faal pdp&ra Migraçao da substartia para outra n.1*l.Àatwa Reaçao alérgjca m botox ISTOÉ 2110, 21/04/2010, p. 90",
    "sourceImage": "/writing/insumos/2010-2-t3.jpg",
    "keyFacts": [
      "Movimento contra o Botox"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta ao médico",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2010-2-t4",
    "cycle": "2010/2",
    "number": "Tarefa 4",
    "title": "Relacionamento empresa e cliente",
    "shortLabel": "2010/2 · T4",
    "genre": "avaliação de afirmações",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Com o objetivo de responder a uma pesquisa de opinião sobre relacionamento entre empresa e cliente, da qual você participará como consumidor informante, complete o quadro no Caderno de Respostas, baseando-se nas informações do texto que leu. Avalie cada uma das afirmações e justifique seu ponto de vista, conforme o exemplo.",
    "sourceKicker": "Insumo · prova 2010/2 · Tarefa 4",
    "sourceTitle": "Relacionamento empresa e cliente",
    "sourceText": "MARKETING Gratos pela preferência! uitas empresas já sabem que quando surgem problemas no relaciona- mento com os clientes elas devem ficar do lado deles, e não adotar uma postura do tipo você ai e eu aqui. \"Esse problema é seu e vou ver se posso ajudar em alguma coisa\". As organizações que sabem do valor do relacionamento evitam. nessa hora, palavras ou frases tais como: as regras não permitem; isto são normas da casa; impossível, não pode; isso é o máximo que podemos fazer; e outras que somente servem para destruir relacionamentos, que, em muitos casos, demoraram anos para ser construídos ou podem impedir processos de fidelização que deveriam durar longos anos. Os clientes esperam que o vendedor, o atendente, o técnico, o instalador, os profissionais do telemarketing façam tudo para ajudá-lo. sinceramente. a resolver aquilo que o aflige. Quando esse processo é bem conduzido e há a percepção de que realmente está se trabalhando para isso, ele se torna mais flexível e cordato. E o processo de relacionamento continua e até se fortalece. É comum os empresários apresentarem dúvidas sobre como podem conquistar novos clientes e manter os atuais. Continuamente. recomendo que a confiança do consumidor deva ser conquistada no primeiro momento. Creio fortemente que ainda seja possivel chamar as pessoas pelo nome. É impres- cindível mostrar boa-fé, oferecer produtos e serviços que realmente vão levar uma solução a eles. Confiança não se conquista com observações e detalhes colocados em letras miúdas, deixando para o novo comprador o ônus das restrições e limitações do uso do produto ou serviço. Isso dá muito trabalho e, em caso de empresas muito grande, não passa de pormenores aos quais elas nem pensam mais. Joga-se na mídia um oceano de ofertas imprecisas e colocam-se pessoas mal preparadas para ofertá-las. Impede-se, assim, um relacionamento de longo prazo, que poderia ser muito mais lucrativo do que o vender e correr. O marketing está cada vez precisando de profissionais competentes. Tem-se que ter muita habilidade tática e segurança para que se permita sugerir um concorrente quando não se tem aquilo que o cliente necessita. Quando o cliente sai de um ponto de venda levando um notebook, por exemplo, ele está na expectativa de ter tomado a decisão certa. Espera que aquela experiência de compra seja garantida pela loja e pelo fabricante. Quando um deles falha, ou ambos, vem o processo de frustração e, consequen- temente, o abandono da loja e da marca do fabricante. O retorno que o cliente espera não é somente o funcionamento do produto, mas, de confiança e de proteçà0 da sua decisão. A consolidação de uma marca ou empresa depende diretamente do desenvolvimento de um elo emocional com o cliente. A qualidade fisica de um produto já não garante mais nada, é apenas um pré-requisito. Muitos têm qualidade técnica, mas não sabem criar uma abordagem emocional cada vez mais decisiva no processo de relacionamento. Árduo é conquistar a conexão emocional. É manter por longo tempo a credibilidade. Rogério Tobias Empresas como as fabricantes de computadores ou aquelas ligadas à telefonia precisam urgentemente criar táticas para garantir o senti- mento positivo dos clientes. A atraçao de compradores pelo uso massivo da mídia, sem a correspondente capacitação no atendimento ao cliente, sem a adequada distribuição e garantia e. pior, com a adoção da postura de que esse problema é seu, são falhas que podem ser fatais para a imagem da marca e. consequen- temente, para o seu futuro, em mercados de consumidores mais exigentes. Deve-se investir no cliente. Criar meios para aumentar o controle deles nas compras, para facilitar a sua vida com o produto ou o serviço adquirido. É importante fazê-lo ganhar tempo. Uma re- comendaçào importante: \"re- compensar os clientes que dão preferência à sua empresa. Ele deve sentir-se premiado. Deve- se tornar real aquela antiga frase: gratos pela sua preferência!\" Estado de Minas, 8 de agosto de 2010, p.6.",
    "sourceImage": "/writing/insumos/2010-2-t4.jpg",
    "keyFacts": [
      "Relacionamento empresa e cliente"
    ],
    "mustDo": [
      "escrever no gênero pedido: avaliação de afirmações",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2010-1-t1",
    "cycle": "2010/1",
    "number": "Tarefa 1",
    "title": "Dia do Trabalhador",
    "shortLabel": "2010/1 · T1",
    "genre": "carta",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Na empresa em que você trabalha, na área de recursos humanos, seu chefe o encarregou de organizar as comemorações do Dia do Trabalhador. Com o objetivo de mobilizar os seus colegas para participarem do evento, escreva-lhes uma carta, com base nas informações do vídeo, explicando a origem e a relevância da data de 1º de maio para todos os trabalhadores.",
    "sourceKicker": "Insumo · prova 2010/1 · Tarefa 1",
    "sourceTitle": "Dia do Trabalhador",
    "sourceText": "Falante 1: [música de abertura jornalística]\n\nFalante 2: Em muitos países, no dia primeiro de maio é celebrado o Dia do Trabalhador, sendo esta data feriado nacional. Mas por que a escolha do dia primeiro de maio como o Dia do Trabalhador?\n\nFalante 3: Uma longa história, né, que remonta ao ano de 1886, é, nos Estados Unidos, na cidade de Chicago, que era um grande centro industrial, é, naquele momento. Desde o, do ano anterior, 1885, o movimento sindical, ééé, americano já tinha definido que ia começar uma série de manifestações, uma greve geral, inclusive, no sentido de reivindicar as oito horas de trabalho, né? Porque até aquele momento se trabalhava de dez a treze horas. Então eles começam, é, a-- iniciam essa, essa jornada de lutas e, hããã, o 1 de maio de 1886 foi o momento de início dessa, dessa mobilização. Esse movimento enfrenta, enfrenta a polícia e, hããã, no dia, é, 4 de maio, inclusive, você tem, é, de 1886, você tem, é, uma bomba é lançada contra, ééé, as tropas da polícia que tavam enfrentando os trabalhadores. Alguns policiais, é, morrem e atacam mais violentamente ainda os trabalhadores e uma dezena de trabalhadores são assassinados nesse processo. Além disso, é, oito militantes, que eram militantes importantes na organização do movimento, foram presos e foram processados sob acusação de terem organizado, é, o lançamento da bomba que matou aqueles policiais. Se descobre tempos depois de que eles não tinham nada a ver com isso, efetivamente, mas, é, desses oito, três foram condenados a trabalhos forçados e, hã, cinco à pena de morte, não é? É, um desses condenados à pena de morte se suicida e os outros são enforcados, inclusive numa cena que, que é descrita, inclusive que foram enforcados nas suas celas cantando a Marselhesa. E se a gente olhar a história do 1 de maio ao longo de todo o tempo, apesar de ter muito essa característica da luta e do luto, tinha um momento também de celebração da força dos trabalhadores, da sua própria cultura, não é? É a França que dá o pontapé inicial em 1919, quando o Senado aprova a, as oito horas de trabalho e decreta, naquele ano de 19, o 1 de maio como, como feriado. No ano seguinte, a Rússia já, já soviética decreta, é, um feriado, né, pra celebração do Dia do Trabalho e a partir daí vários outros países, é, seguem, é, esse mesmo exemplo. No caso do Brasil, em 1925.\n\nFalante 4: O 1 de maio é pra levar a população pra rua, pra ela reivindicar as mudanças sociais. Representa, é, dia de luta. Não é dia de comemoração, porque o 1 de maio, para que ocorresse, né, o primeiro de muitos colegas morreram, muitos colegas foram presos, muitos colegas, é, foram torturados.",
    "keyFacts": [
      "do vídeo",
      "explicando a origem",
      "a relevância da data de 1º de maio para todos os trabalhadores"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "video",
      "src": "/api/writing-media/2010-1/tarefa1-video.mp4"
    }
  },
  {
    "id": "2010-1-t2",
    "cycle": "2010/1",
    "number": "Tarefa 2",
    "title": "Feijão com arroz",
    "shortLabel": "2010/1 · T2",
    "genre": "carta",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Tendo ouvido a reportagem veiculada pela Rádio UEL-FM sobre o arroz com feijão, você se lembrou de um amigo que se interessa pelo Brasil e sua cultura. Com base nas informações da reportagem, escreva para o seu amigo, salientando a importância do arroz com feijão para o povo brasileiro.",
    "sourceKicker": "Insumo · prova 2010/1 · Tarefa 2",
    "sourceTitle": "Feijão com arroz",
    "sourceText": "Falante 1: [som de água fervendo]\n\nFalante 2: Manga na Cozinha: Gastronomia e Cultura com Bernardo Kister.\n\nFalante 1: [vinheta musical]\n\nFalante 2: Caros ouvintes, nada diz mais a respeito do povo brasileiro e do anil Brasil do que feijão com arroz. É algo que já merecia um estudo sério. E foi o que aconteceu no livro DNA Brasil, uma recente publicação do SENAI CICETIQ pela editora Estação das Letras. O feijão com arroz transita por todas as classes sociais. Vai de norte a sul e em todas as estações. Se for inverno, o feijão vai travestido de feijoada. O feijão com arroz é uma identidade social brasileira. É o denominador gastronômico comum para praticamente cento e noventa milhões de brazucas. Meses no exterior é a causa mais conhecida para a epidemia nostálgica do feijão com arroz, que consome aqueles que longe da pátria ficam. Dizem que, assim que chegarem ao Brasil, colocarão um par de Havaianas e irão logo, logo comer uma feijoada. Querem correr para o colo da mamãe e pedir aquele feijão bem temperadinho, com arroz soltinho pra chuchu. O arroz com feijão é tão forte e é associado à família, é associado ao carinho, é associado ao amor. Claro que também é associado ao trabalho, mas hoje menos, pois a, os boias-frias estão cada vez mais sendo substituídos por absurdas máquinas de milhares de dólares. Para dizer em números, noventa e seis por cento dos brasileiros afirmam comer arroz todos os dias. Assustou? E que tal saber que noventa e quatro por cento deles, ou seja, nós, declaram comer feijão todos os dias? Olha, essa semana no restaurante em que trabalho, uma pessoa chegou a mim e me perguntou se não poderia dar a dinheiro, pois ela precisava comprar comida para os filhos. Aí eu lhe perguntei gentilmente de quanto ela precisava. Quanto seria o bastante? Aí então ela, ao invés de me dizer a quantia de que necessitava, me disse: \"Ah, senhor, o bastante pra comprar um feijãozinho com arroz pras crianças\". Eu fiquei emocionado e dei-lhe uma quantia na hora. Ela poderia ter dito \"o bastante pra dar de comer às crianças\" ou mesmo \"um tanto que dê pra fazer uma mistura pra minha família\", mas não. Ela queria feijão com arroz. E é disso que eu tô falando. É da importância nutricional, da relevância social do feijão com arroz em nossas vidas. Parece exagero, mas experimente acrescer um real no pacote de arroz ou feijão. Seria uma revolução, seria guerra civil na certa. Mas se os preços subirem, não fique nervoso, não, pois isso já virou aquele mesmo arroz com feijão.\n\nFalante 1: [vinheta musical] [som de água fervendo]\n\nFalante 2: Contato com esta coluna pelo blog manganacozinha.blogspot.com.\n\nFalante 1: [som de água fervendo]",
    "keyFacts": [
      "da reportagem",
      "escreva para o seu amigo",
      "salientando a importância do arroz com feijão para o povo brasileiro"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ],
    "sourceMedia": {
      "kind": "audio",
      "src": "/api/writing-media/2010-1/tarefa2-audio.mp3"
    }
  },
  {
    "id": "2010-1-t3",
    "cycle": "2010/1",
    "number": "Tarefa 3",
    "title": "Banho de Lua",
    "shortLabel": "2010/1 · T3",
    "genre": "post de blog",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Você gosta de viajar e costuma postar em seu blog informações sobre lazer e diversão em todo o mundo. Ao ler a reportagem “Banho de Lua”, na Revista Isto É, você decidiu escrever uma mensagem em seu blog, a partir das informações do texto, incentivando os internautas a praticarem essa nova modalidade de banho de mar.",
    "sourceKicker": "Insumo · prova 2010/1 · Tarefa 3",
    "sourceTitle": "Banho de Lua",
    "sourceText": "À NOITE Areia morna, água limpida, clima ameno. E a orla torna-se irresistível BANHO DE Com um verão de 40 graus no Rio, a praia noturna vira o grande programa da temporada Maíra Magro om o calor batendo recorde no Rio de Janeiro a temperatura média de fevereiro beira os 40 graus, frequentar a praia à noite virou o grande programa deste verão para os cariocas. Quando o sol começa a se pôr, por volta das 19h45, e a areia já não queima os pés, a orla ganha um segundo turno de frequentadores: moradores e turistas ávidos por refrescar o corpo ao fim do dia, aproveitando o ar mais ameno e o espelho dágua iluminado pelos holofotes do calçadão. Não é preciso protetor solar, não há disputa feroz por vaga para estacionar o carro e a pouca luz deixa todo mundo mais à vontade. O banho noturno tem como points o Arpoador, na ponta de Ipanema, e o Leme, na outra ponta, só que de Copacabana, escolhidos por serem bem iluminados e, portanto, mais seguros. No clima de descontração, há famílias, grupos de amigos tocando violão, namorados trocando carícias e solitários caminhando à beira d'água. Para completar o cenário, a água está límpida e azul, por causa da falta de chuva. \"Parece o mar do Caribe\", descreve a psicóloga Andréa Sena, 42 anos, que frequenta as noites do Arpoador quatro vezes por semana. A publicitária Mariana Campos, 27 anos, chega à praia às 20h com amigos e não sai antes da meia-noite. \"Levamos biscoitos, bebidas-. Fazemos uma farofada\". 40 graus é a temperatura média da cidade do Rio de Janeiro neste mês de fevereiro n. assume. Algumas vezes, mergulham até as duas da manhã. \"Não faz frio\", garante. Outro que gostou da proposta foi o ator Alexandre Borges, que, de seu apartamento em Ipanema. caminha até a praia para ver o pôr do sol com a esposa, a atriz Júlia Lemmertz, e o filho, Miguel, 9 anos, e depois aproveita para pular no mar. 'Ê maravilhoso\" , diz. \"Mergulhar à noite traz uma sensaçác de aventura e mistério, como na infância. \" Mas o Corpo de Bombeiros não está gostando dessa moda. \"Não recomendamos o banho de mar à noite porque não temos como garantir a segurança das pessoas\" , diz o tenente- coronel Alexandre Rocna. Segundo ele, nesse horário a visibilidade da água não é boa e, além disso, os salva-vidas deixam a praia às 20h. Porém, parece que sob a lua os banhistas sao mais cautelosos. Enquanto a corporação já resgatou, neste ano. duas mil pessoas em risco de afogamento durante o dia, nunca recebeu um pedido de socorro à noite. \"O mar tem estado calmo\", pondera o coronel Ricardo Nunes. Só se tor do ponto de vista dele. Porque, para cs milhares de turistas e cariocas que vão à praia à noite, tem estado fervendo- de gente e badalação. Revista ISTO É, 17 de fevereiro de 2010, p. 57.",
    "sourceImage": "/writing/insumos/2010-1-t3.jpg",
    "keyFacts": [
      "Banho de Lua"
    ],
    "mustDo": [
      "escrever no gênero pedido: post de blog",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  },
  {
    "id": "2010-1-t4",
    "cycle": "2010/1",
    "number": "Tarefa 4",
    "title": "Carta a um jovem internauta",
    "shortLabel": "2010/1 · T4",
    "genre": "carta de opinião",
    "audience": "interlocutor indicado no enunciado",
    "timeHint": "parte escrita",
    "prompt": "Ler jornais e revistas online é um dos seus hábitos. A “Carta a um jovem internauta”, publicada na versão eletrônica do Jornal Estado de Minas, chamou a sua atenção por se dirigir ao público internauta. Levando em conta os argumentos apresentados por Frei Betto, escreva para o jornal, emitindo sua opinião sobre a advertência feita pelo autor.",
    "sourceKicker": "Insumo · prova 2010/1 · Tarefa 4",
    "sourceTitle": "Carta a um jovem internauta",
    "sourceText": "CARTA A UM JOVEM INTERNAUTA Sei que você passa longas horas no computador navegando a bordo de todas as ferramentas disponíveis. Não lhe invejo a adolescência. Na sua idade, eu me iniciava na militância estudantil e injetava utopia na veia. Já tinha lido todo o Monteiro Lobato e me adentrava pelas obras de Jorge Amado guiado pelos \"Capitães de areia\". A TV não me atraía e, após o jantar, eu me juntava à turma de rua, entregue às emoções de flertes juvenis ou sentar com meus amigos à mesa de uma lanchonete para falar de Cinema Novo, bossa nova porque tudoera novo ou das obras de Jean Paul Sartre. Sei que a internet é uma imensa janela para o mundo e a história, e costumo parafrasear que o Google é meu pastor, nada me há de faltar... O que me preocupa em você é a falta de síntese cognitiva. Ao se postar diante do computador, você recebe uma avalanche de informaçóes e imagens, como as lavas de um vulcão se precipitam sobre uma aldeia. Sem clareza do que realmente suscita o seu interesse, você não consegue transformar informaçào em conhecimento e entretenimento em cultura. Você borboleteia por inúmeros nichos, enquanto sua mente navega à deriva qual bote sem remos jogado ao sabor das ondas. Quanto tempo você perde percorrendo nichos de conversa fiada? Sim. é bom trocar mensagens com os amigos. Mas, no mínimo, convém ter o que dizer e perguntar. É excitante enveredar-se pelos corredores virtuais de pessoas anônimas acostumadas ao jogo do esconde-esconde. Cuidado! Aquela garota que o fascina com tanto palavreado picante talvez nà0 passe de um velho pedófilo que, acobertado pelo anonimato, se fantasia de beldade. Desconfie de quem não tem o que fazer, exceto entrincheirar-se horas seguidas na digitação compulsivaà caça de incautos que se deixam ludibriar por mensagens eróticas. Faça bom uso da internet. Use-a como ferramenta de pesquisa para aprofundar seus estudos: visite os nichos que emitem cultura; conheça a biografia de pessoas que você admira; saiba a história de seu time preferido; veja as incríveis imagens do Universo captadas pelo telescópio Hubble; ouça sintonias e música pop. Mas fique alerta à saúde! O uso prolongado do computador pode causar-lhe, nas mãos, lesão por estorço repetitivo (ler) e torná-lo sedentário, obeso, sobretudo se, ao lado do teclado, você mantém uma garrafa de refrigerante e um pacote de batatas fritas... Cuide sua vista. aumente o corpo das letras, deixe seus olhos se distraírem periodicamente em alguma paisagem que não seja a que o monitor exibe. E preste atençào: não existe almoço grátis. Não se iluda com a idéia de que o computador lhe custa apenas a taxa de consumo de energia elétrica, as mensalidades do provedor e do acesso à internet. O que mantém em funcionamento esta máquina na qual redijo este artigo é a publicidade. Repare como há anúncios por todos os cantos! São eles que bancam o Google, as noticias, a wikipédia etc. É a poluição consumista mordiscando o nosso inconsciente. Não se deixe escravizar pelo computador. Não permita que ele roube seu tempo de lazer, de ler um bom livro (de papel, e não virtual), de convivência com a família e os amigos. Submeta-o à sua qualidade de vida. Saiba fazê-lo funcionar apenas em determinadas horas do dia Vença a compulsáo que ele provoca em muitas pessoas. E não se deixe iludir. Jamais a máquina será mais inteligente que o ser humano. Ela contém milhares de informaçóes, mas nada sabe. Ela é capaz de vencê-lo no xadrez - porque alguém semelhante a você e a mim a programou para jogar. Ela exibe os melhores filmes e nos permite escutar as mais emocionantes músicas, mas nunca se deliciará com o amplo cardápio que nos oferece. Se você prefere a máquina às pessoas e a usa como refúgio de sua aversão à sociabilidade, trate de procurar um médico. Porque sua auto-estima está lá embaixo e o computador não haverá de encará-lo como se tosse um verme. Ou sua auto-estima atingiu os pincaros e você acredita que nác existem pessoas à sua altura, melhor ficar sozinho. Nas duas hipóteses você está sendo canibalizado pelo computador. E, aos poucos, se transformará num ser meramente virtual. O que não é uma virtude. Antes, é a comprovação de que já sofre de uma doença grave: a síndrome do onanismo eletrônico. Frei Betto é escritor, autor do livro de contos \"Aquário Negro\" (Agir), entre outras obras. Disponivel em: http://www.correiocidadania.com.br/content!view/3938/55/. Acesso em: 01/03/2010.",
    "sourceImage": "/writing/insumos/2010-1-t4.jpg",
    "keyFacts": [
      "por Frei Betto",
      "escreva para o jornal",
      "emitindo sua opinião sobre a advertência feita pelo autor"
    ],
    "mustDo": [
      "escrever no gênero pedido: carta de opinião",
      "usar informações do insumo, sem inventar dados",
      "dirigir o texto ao interlocutor do enunciado"
    ]
  }
];
