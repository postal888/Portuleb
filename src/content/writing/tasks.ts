export const WRITING_TASK_IDS = [
  "mandacaru-2025-2",
  "vendedor-sincero-2025-2",
  "nota-musical-2025-1",
  "eu-mereco-2025-1",
  "preciosidades-2024-2",
  "amor-aceitacao-2024-2",
  "zona-livre-2023-2",
  "cotas-usp-2023-2",
  "kaka-jecupe-2000-1",
  "hans-rio-2000-2",
] as const;

export type WritingTaskId = (typeof WRITING_TASK_IDS)[number];

export type WritingTask = {
  id: WritingTaskId;
  cycle: string;
  number: string;
  title: string;
  shortLabel: string;
  genre: string;
  audience: string;
  timeHint: string;
  prompt: string;
  sourceKicker: string;
  sourceTitle: string;
  sourceText: string;
  keyFacts: string[];
  mustDo: string[];
};

export const WRITING_TASKS: Record<WritingTaskId, WritingTask> = {
  "mandacaru-2025-2": {
    id: "mandacaru-2025-2",
    cycle: "2025/2",
    number: "Tarefa 3",
    title: "Assentamento Mandacaru",
    shortLabel: "2025/2 · T3",
    genre: "texto de homenagem no site da prefeitura",
    audience: "leitores do site da Prefeitura de Petrolina",
    timeHint: "15–20 minutos",
    prompt:
      "A assessoria de imprensa de Petrolina, onde você trabalha, divulga no site da prefeitura textos em homenagem a moradores ilustres da cidade. Você ficou responsável por escrever o texto em homenagem a Ozaneide Gomes dos Santos. Com base na matéria que você leu, apresente a história da agricultora, destacando a importância de seu trabalho para as pessoas da região e ressaltando a relevância do assentamento Mandacaru para a produção agroecológica.",
    sourceKicker: "Insumo · caderno oficial 2025/2",
    sourceTitle: "Assentamento Mandacaru, em Petrolina (PE), produz toneladas de alimentos orgânicos",
    sourceText: [
      "Toneladas de uva orgânica, acerola, mandioca, banana, xique-xique. Moios fartos de alface, coentro, cenoura, beterraba, cebolinha, rúcula e hortelã. São seis toneladas de frutas e hortaliças orgânicas colhidas durante o ano inteiro nas terras do assentamento Mandacaru, na cidade de Petrolina, interior de Pernambuco (PE).",
      "A safra abundante é o maior motivo de orgulho e de celebração para as 70 famílias de agricultoras e agricultores que, em 6 de abril de 1999, ocuparam os 482 hectares, até então improdutivos, no coração do Vale do São Francisco, em Pernambuco. De lá para cá, o assentamento, que fica a 700 quilômetros de Recife, se tornou pioneiro e referência na produção orgânica e certificada de hortaliças e frutas.",
      "A história da agricultora Ozaneide Gomes dos Santos se mistura com a história de luta nas terras de Mandacaru. Nascida em Cabrobó, cidade que fica a duas horas de Petrolina, Ozaneide chegou por lá com a mãe e os irmãos aos 19 anos, no ano da fundação do assentamento. Hoje é a presidenta da Associação das Agricultoras e Agricultores e Familiares do Assentamento Mandacaru (AAFAM). Ela conta os desafios encontrados no início para ocupar e produzir nessas terras de maneira agroecológica.",
      "“O assentamento Mandacaru foi criado pela necessidade dos agricultores e agricultoras que moravam nas periferias da cidade de Petrolina e que saíram de suas comunidades em busca de emprego, mas acabaram ficando desempregados. Depois disso, nós trabalhamos coletivamente com algumas parcerias, a exemplo da Universidade do Vale do Rio São Francisco, que é nossa parceira até hoje. Uma das coisas mais difíceis foi a gente trabalhar a questão da agroecologia, sobretudo os produtos orgânicos, porque aqui é uma região conhecida nacional e internacionalmente por ser polo da fruticultura irrigada e muitos produtores grandes e médios produzem com um alto índice de agrotóxico.”",
      "Com as parcerias e as diversas capacitações com as famílias agricultoras, vieram as primeiras hortas de frutas e hortaliças plantadas e cultivadas sem nenhuma espécie de veneno. Ozaneide conta que o segundo passo foi se organizar coletivamente e trabalhar em rede com a Federação dos Trabalhadores da Agricultura do Estado de Pernambuco (Fetape) para escoar a produção para o comércio e para a população da região.",
      "“Com isso, a gente iniciou um trabalho de formação de feiras agroecológicas. Então hoje, no município, a gente tem um mercado de produtores orgânicos. A gente também criou uma associação de produtores orgânicos que não é apenas os agricultores do assentamento Mandacaru e sim toda uma região que contempla esse mercado de produtores de orgânicos, que é o primeiro do Nordeste inclusive. A gente produz basicamente para as feiras aqui da região e fornece para rede de supermercados aqui do município. E também já enviamos uva para o mercado de São Paulo.”",
      "Na prática é assim: um grupo de mulheres faz da uva suco e geleia, outro grupo trabalha com as hortaliças. Outras fazem artesanato da colheita da palha da bananeira e de sementes, o grupo da mandioca faz biscoito e bolos.",
      "“A lida com a terra faz com que as agricultoras do assentamento amadureçam na sabedoria dos tempos dos solos, dos climas, das safras, das estações, das colheitas, dos descansos necessários das plantações. Do Ministério Público Federal foi que conseguimos a concessão da água e aí, por isso, estamos ampliando a nossa produção. A terra é o bem maior que nós temos e que, com certeza, será o futuro dos nossos filhos, dos nossos netos, então essa terra, para a gente, é tudo”, explica a presidenta da AAFAM.",
      "Disponível em: brasildefato.com.br (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "história do assentamento Mandacaru e da ocupação em Petrolina",
      "Ozaneide e a produção agroecológica na região",
      "organização coletiva, parcerias e venda da produção",
      "importância da terra para as famílias",
    ],
    mustDo: [
      "escrever homenagem para o site da prefeitura",
      "contar a história de Ozaneide",
      "mostrar a importância do trabalho dela para a região",
      "ressaltar o assentamento Mandacaru na produção agroecológica",
    ],
  },
  "vendedor-sincero-2025-2": {
    id: "vendedor-sincero-2025-2",
    cycle: "2025/2",
    number: "Tarefa 4",
    title: "O vendedor sincero",
    shortLabel: "2025/2 · T4",
    genre: "crônica",
    audience: "leitores do jornal Zero Hora",
    timeHint: "15–20 minutos",
    prompt:
      "Imagine que você seja o vendedor retratado na crônica abaixo, publicada no jornal Zero Hora. Escreva uma outra crônica, para ser publicada no mesmo jornal, narrando, do ponto de vista do vendedor, a sua versão dos fatos e se posicionando a respeito deles.",
    sourceKicker: "Insumo · caderno oficial 2025/2",
    sourceTitle: "O vendedor sincero — Claudia Tajes",
    sourceText: [
      "A loja estava vazia, tanto que o único vendedor de plantão naquele domingo demorou a me perceber no balcão, entretido com um joguinho de celular. Na verdade, não percebeu. Eu é que chamei por ele, e não foi uma vez só. Quando enfim rolou a interação, vi que era muito jovem, um menino com barba nenhuma e o colarinho fechado até o último botão, sem mais o que fazer senão jogar Free Fire na loja às moscas. Às 17 horas, faltando três para fechar, ele me disse que eu era a primeira pessoa a cruzar o umbral naquele domingo de sol.",
      "Eu precisava de um fone de ouvido. Junto com os pés de meia, os óculos e os guarda-chuvas, o fone de ouvido deve ser o objeto que mais some no mundo. Do nada desaparece, esquecido em algum banco, engolido pelo sofá, enroscado sabe-se onde.",
      "O fone de ouvido que o jovem vendedor tinha para oferecer era daqueles de enfiar no pobre do pavilhão auditivo. Desconfortável, mas azar. Pelo menos estaria no bolso para qualquer eventualidade. Se não tem tu, vai tu mesmo, grande lema.",
      "— A senhora conhece essa marca?",
      "— Claro, é a famosa marca diabo.",
      "— Pois então. Isso aí não vai durar três dias.",
      "Eram mais de cinco horas e ninguém havia entrado na loja. Tudo indicava que a venda do fone seria a única naquele domingo de sol. Não que o estabelecimento, lotado de bugigangas, não tivesse os seus encantos. No meio de tanta tralha, qualquer consumidor poderia encontrar uma utilidade — ou uma futilidade, vá lá.",
      "— E tem algum que dure mais?",
      "— Pior que não. Mas esse aí não vale a pena. É jogar dinheiro no lixo.",
      "A gente se acostuma a vestir uma calça que ficou o ó do borogodó e ouvir da vendedora: “Nossa, como caiu bem”. E quantas vezes leva gato por lebre, e com a garantia do dono? Foi porque eu precisava, mas foi muito mais pela sinceridade do rapaz. Comprei o fone de ouvido e mais um pano de prato com um elefante em duas patas recitando uma passagem bíblica. Não existe pano de prato laico hoje em dia. Também entrei no site da loja e deixei um elogio para o funcionário. Se um dia tiver uma empresa, é ele que eu quero contratar.",
      "Faz cinco dias e o fone continua funcionando.",
      "Disponível em: gauchazh.clicrbs.com.br (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "loja vazia e o encontro com o vendedor",
      "o fone frágil e a sinceridade da venda",
      "a compra e o elogio à honestidade",
    ],
    mustDo: [
      "escrever uma crônica, não um resumo",
      "narrar do ponto de vista do vendedor",
      "retomar os fatos da crônica original",
      "posicionar-se sobre o que aconteceu",
      "manter o tom de jornal / crônica",
    ],
  },
  "nota-musical-2025-1": {
    id: "nota-musical-2025-1",
    cycle: "2025/1",
    number: "Tarefa 3",
    title: "Uma nota musical que salva",
    shortLabel: "2025/1 · T3",
    genre: "e-mail",
    audience: "prefeito da cidade",
    timeHint: "15–20 minutos",
    prompt:
      "Você é um(a) ex-aluno(a) beneficiado(a) pelo projeto de música da organização não governamental (ONG) Uma Nota Musical que Salva. Após ler a reportagem, você decidiu solicitar apoio financeiro para a ONG. Escreva um e-mail ao prefeito da cidade, apresentando o histórico da ONG e algumas de suas conquistas.",
    sourceKicker: "Insumo · caderno oficial 2025/1",
    sourceTitle: "Uma nota musical que salva",
    sourceText: [
      "Cansada de ver crianças vítimas do tráfico em João Pessoa, Lauriceia Rodrigues fundou a ONG Uma Nota Musical que Salva.",
      "Em 2007, a funcionária pública Lauriceia Rodrigues, 43 anos, perdeu seu sobrinho para o crack. Na época, morando em Mandacaru, na periferia de João Pessoa, ela oferecia sopa aos moradores da região na garagem de sua casa. Ouvia histórias de mães cujos filhos estavam envolvidos com drogas, mas, até então, achava que já fazia a sua parte. Quando a tragédia atingiu a sua família, ela decidiu repensar a questão. “Estava enxugando gelo com o sopão, não resolvendo um problema”, afirma. Mas como ajudar de fato? “Criança fora da escola precisa de atividade.” Garotos na rua são mais facilmente aliciados por traficantes, pensava.",
      "Foi então que Lauriceia começou um “trabalho de formiguinha”. Em 2010, fez uma rifa para comprar violões e ensinar música às crianças. Terminou com sete instrumentos. Em 2011, criou a ONG Uma Nota Musical que Salva, também na garagem de sua casa. Hoje, ela atende a 55 alunos de 4 a 17 anos. A única obrigação é estarem no ensino fundamental.",
      "Se alguém chega sem sapato, Lauriceia logo busca um tênis. As crianças se alimentam na ONG e muitas vezes pedem para entrar fora do horário de aula. “Elas veem a minha casa como um segundo pouso”, conta. Nesse segundo pouso vivem Lauriceia, seu marido, José Severino Silva, 42, e a filha, Adassa Ester, 10 — que tem o saxofone como instrumento preferido. “Aqui entra quem quer. E o que eu sirvo para a minha filha, ofereço para todos”, diz.",
      "Nesses anos de ONG, Lauriceia já colhe frutos. “Você não sabe a felicidade que é ver um garoto que estudou música com a gente trabalhando com carteira assinada”, emociona-se. Na comunidade, o clima é de confiança: a maioria das mães entrega seus filhos de olhos fechados. Há cerca de dois meses, a Nota Musical passou a oferecer também aulas de capoeira.",
      "A ONG é mantida por doações de empresas e da comunidade. Lauriceia usa parte de seu salário como fiscal de limpeza urbana e vende trufas para pagar despesas. “Aqui, todos são meus filhos. Faço tudo por essas crianças.”",
      "Disponível em: SILVA, Luisa Alcantara e. Mães de coração. Revista GOL, n. 170, mai. 2016 (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "origem da ONG e a história de Lauriceia",
      "o que o projeto oferece às crianças hoje",
      "conquistas e como a ONG se mantém",
    ],
    mustDo: [
      "escrever e-mail ao prefeito",
      "pedir apoio financeiro",
      "apresentar o histórico da ONG",
      "citar conquistas concretas do insumo",
      "escrever como ex-aluno(a) beneficiado(a)",
    ],
  },
  "eu-mereco-2025-1": {
    id: "eu-mereco-2025-1",
    cycle: "2025/1",
    number: "Tarefa 4",
    title: "Eu mereço",
    shortLabel: "2025/1 · T4",
    genre: "carta do leitor",
    audience: "revista que publicou o artigo",
    timeHint: "15–20 minutos",
    prompt:
      "Após ler o texto Meu filho, você não merece nada, escreva uma carta do leitor para a revista em que ele foi publicado, expondo a sua opinião em relação à tese defendida pela autora e discutindo os principais exemplos apresentados no texto.",
    sourceKicker: "Insumo · caderno oficial 2025/1",
    sourceTitle: "Meu filho, você não merece nada",
    sourceText: [
      "A crença de que a felicidade é um direito tem tornado despreparada a geração mais preparada.",
      "Há uma geração de classe média que estudou em bons colégios, é fluente em outras línguas, viajou para o exterior e teve acesso à tecnologia. Uma geração que teve muito mais do que seus pais e cresceu com a ilusão de que a vida é fácil. Ou que já nascem prontos — bastaria apenas que o mundo reconhecesse a sua genialidade. Quando isso não acontece — porque obviamente não acontece — sentem-se traídos, revoltam-se com a “injustiça” e boa parte se emburra e desiste. Foram ensinados a pensar que merecem, seja lá o que for que queiram. É a geração do “eu mereço”, que cresceu na ilusão de que a felicidade é uma espécie de direito.",
      "Eu tenho testemunhado a angústia de muitos pais para garantir que os filhos sejam “felizes”. Pais que fazem malabarismos para dar tudo aos filhos e protegê-los de todos os perrengues — sem esperar nenhuma responsabilização nem reciprocidade. Pais e filhos têm pagado caro pela crença de que a felicidade é um direito.",
      "É como se os filhos nascessem e imediatamente os pais já se tornassem devedores. Para estes, frustrar os filhos é sinônimo de fracasso pessoal. Nossa classe média parece desprezar o esforço. Prefere a genialidade. O valor está no dom, naquilo que já nasce pronto. Dizer que “fulano é esforçado” é quase uma ofensa.",
      "Se os filhos têm o direito de ser felizes simplesmente porque existem — e aos pais caberia garantir esse direito — que tipo de relação pais e filhos podem ter? Se a relação está construída sobre uma ilusão, só é possível fingir. Aos filhos cabe fingir felicidade — e, como não conseguem, passam a exigir cada vez mais de tudo, especialmente coisas materiais — e aos pais cabe fingir ter a possibilidade de garantir a felicidade.",
      "Seria muito bacana que os pais de hoje entendessem que tão importante quanto uma boa escola ou um curso de línguas ou um iPad é dizer de vez em quando: “Te vira, meu filho. Você sempre poderá contar comigo, mas essa briga é tua”. Assim como sentar para jantar e falar da vida como ela é: “Estou com dúvidas, estou com medo, estou confuso” ou “Não sei o que fazer, mas estou tentando descobrir”. Agora, se os pais mentirem que a felicidade é um direito e que seu filho merece tudo simplesmente por existir, paciência. A vida vai mostrar a verdade.",
      "Disponível em: revistaepoca.globo.com (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "tese da geração do “eu mereço”",
      "relação entre pais, filhos e consumo",
      "proposta de responsabilizar sem abandonar",
    ],
    mustDo: [
      "escrever carta do leitor",
      "expor opinião sobre a tese da autora",
      "discutir os exemplos do texto",
      "não resumir só: posicionar-se",
    ],
  },
  "preciosidades-2024-2": {
    id: "preciosidades-2024-2",
    cycle: "2024/2",
    number: "Tarefa 3",
    title: "Preciosidades da Amazônia",
    shortLabel: "2024/2 · T3",
    genre: "e-mail",
    audience: "coordenação geral de uma Feira de Moda",
    timeHint: "15–20 minutos",
    prompt:
      "Você é um dos organizadores de uma Feira de Moda e, por meio da matéria, conheceu o projeto “Preciosidades da Amazônia”. Escreva um e-mail para a coordenação geral do evento, sugerindo que as artesãs do Projeto sejam convidadas a expor seus produtos na Feira. Em seu texto, apresente o Projeto e saliente sua relevância socioambiental.",
    sourceKicker: "Insumo · caderno oficial 2024/2",
    sourceTitle: "Mulheres utilizam produtos da natureza para confeccionar joias e garantir sustento da família",
    sourceText: [
      "Uma tendência que chama a atenção do mundo fashion é a moda sustentável. As biojoias fazem parte de um universo que vem cada vez mais ganhando espaço no mercado. Com a crescente necessidade de conscientização ambiental, as marcas têm passado a investir em novas estratégias e lógicas de produção. As biojoias são produzidas com uma única proposta de serem acessórios que valorizam a natureza e que preservam o meio ambiente e as comunidades locais em que são produzidas. As peças costumam ser exclusivas e bastante duráveis.",
      "Visando garantir a valorização do trabalho desenvolvido por artesãs da cidade de Parauapebas, sudeste do Pará, o projeto batizado como “Preciosidades da Amazônia” também tem como objetivo ganhar o mundo por meio de peças que utilizam a matéria-prima vinda direto da natureza e, nas mãos das artesãs, ganha forma e cor e se transforma em acessórios ricos em sustentabilidade.",
      "As peças são produzidas com folhas, sementes, capim dourado e pedras naturais. As sementes passam por um processo de eliminação de fungos e parasitas. Todo material está logo ali pertinho das artesãs, que realizam o trabalho de formiguinha em busca das sementes, desde a mais simples, como a do açaí, até as mais raras. Esse é um trabalho realizado sempre preservando e respeitando o ecossistema.",
      "Além de acessórios confeccionados de sementes e caroços extraídos da natureza, as peças produzidas trazem consigo histórias e experiências de vida, já que são confeccionadas por mulheres que vivem em situação de vulnerabilidade social. O Projeto visa resgatar a autoestima de mulheres vítimas de violência doméstica e oportunizar a elas independência financeira, abrindo-lhes novos horizontes.",
      "O Projeto já beneficiou cerca de 120 mulheres de Parauapebas, com cursos de biojoias que incentivam o empreendedorismo feminino. A artesã Sandra Brasil reforça a importância do resgate da autoestima das alunas com a valorização do conhecimento e incentivo para os negócios. Só no quiosque “Preciosidades da Amazônia”, estão expostos os trabalhos confeccionados por cerca de 10 artesãs que, após participarem do curso, colocaram em prática o que aprenderam e, hoje, são beneficiadas financeiramente com a venda das peças.",
      "Disponível em: oliberal.com (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "o projeto de biojoias em Parauapebas",
      "matéria-prima da floresta e respeito ao ecossistema",
      "impacto social para as artesãs",
    ],
    mustDo: [
      "escrever e-mail à coordenação da feira",
      "sugerir convite às artesãs",
      "apresentar o projeto",
      "salientar relevância socioambiental",
    ],
  },
  "amor-aceitacao-2024-2": {
    id: "amor-aceitacao-2024-2",
    cycle: "2024/2",
    number: "Tarefa 4",
    title: "Amor é aceitação",
    shortLabel: "2024/2 · T4",
    genre: "carta ao jornal",
    audience: "jornal Pioneiro",
    timeHint: "15–20 minutos",
    prompt:
      "Após ler o texto “Amor é aceitação”, você decidiu escrever uma carta para o jornal Pioneiro, expressando sua opinião sobre o tema. Em seu texto, retome os argumentos apresentados pela autora e concorde ou discorde da opinião por ela sustentada no artigo.",
    sourceKicker: "Insumo · caderno oficial 2024/2",
    sourceTitle: "Amor é aceitação — Trissia Ordovás Sartori",
    sourceText: [
      "Com vitrines, espaços e programações repletas de coraçõezinhos graças à proximidade do Dia dos Namorados, aproveito para pensar em todas as possibilidades amorosas que permeiam nossa vida. Na música “Mundo dos negócios”, Zeca Baleiro canta que “canções de amor se parecem porque não existe outro amor”, mas eu discordo: amor é personalizado e cada um o recebe de uma forma diferente. O primeiro e o último namorado de alguém não ganham o mesmo tipo de amor, mas ambos são bem importantes e intensos.",
      "Lembro, então, de uma história que ouvi há algum tempo sobre o significado da palavra amor na língua fongbé, falada principalmente na África ocidental: wan (essência) yinyin (aceitação). Amor é, portanto, um processo racional experimentado por quem descobriu a essência de uma pessoa e, ainda assim, decidiu aceitá-la. Transcende, inclusive, a verbalização do esperado “eu te amo”.",
      "Ele pode aparecer na mãe que faz a comida favorita da filha para recebê-la, no pai compartilhando com amigos as pequenas conquistas dos filhos, na namorada deixando uma mesa ao lado da cama cheia de remédios e guloseimas para o namorado acamado, nas frutas que o marido corta e coloca em um potinho para a esposa levar ao trabalho, no filho acompanhando o pai no jogo do time do coração, mesmo sem gostar tanto de futebol, no amigo que ajuda a carregar a mudança do outro.",
      "Iniciativas de quem, em meio a tanta correria e a tanta gente, decidiu olhar para algumas pessoas especiais e enxergá-las como elas são. E escolhe permanecer, apesar de tudo. Entender que, nessas circunstâncias, podemos ser exatamente como somos — cansados, chatos, brabos, falantes, animados, esperançosos, doentes, inquietos, ansiosos — e sermos acolhidos é um sinal de termos bem mais do que supomos. Proponho o exercício de começar a prestar atenção nos gestos, nos abraços, nos olhares e em todo tipo de declaração que só pode ser lida por quem decidiu ficar e perceber quanto amor — bem além dos corações datados das vitrines — existe ao nosso redor.",
      "Disponível em: gauchazh.clicrbs.com.br/pioneiro (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "amor como aceitação da essência do outro",
      "gestos do cotidiano em vez da data comercial",
      "escolher permanecer apesar de tudo",
    ],
    mustDo: [
      "escrever carta ao Pioneiro",
      "retomar argumentos da autora",
      "concordar ou discordar com justificativa",
    ],
  },
  "zona-livre-2023-2": {
    id: "zona-livre-2023-2",
    cycle: "2023/2",
    number: "Tarefa 3",
    title: "Zona livre para incluir",
    shortLabel: "2023/2 · T3",
    genre: "texto de inscrição em concurso",
    audience: "Secretaria Estadual de Educação de Minas Gerais",
    timeHint: "15–20 minutos",
    prompt:
      "A Secretaria Estadual de Educação de Minas Gerais está promovendo um concurso para premiar projetos relacionados à inclusão no ambiente escolar. Como produtor do programa “Zona livre para incluir”, escreva o texto a ser enviado na inscrição, explicando o que é esse programa, como é feito, quais são os principais tópicos abordados e por que ele merece ser premiado.",
    sourceKicker: "Insumo · caderno oficial 2023/2",
    sourceTitle: "Gestores escolares têm programa de educação inclusiva em rádio",
    sourceText: [
      "Na Escola Estadual Adalgisa de Paula Duque, temos nos dedicado continuamente ao tema da inclusão, especialmente a de pessoas com deficiência. A unidade, localizada em Lima Duarte, região da Zona da Mata Mineira, atende mais de 700 estudantes nos anos finais do ensino fundamental e no ensino médio. Entre os adolescentes matriculados, temos cerca de 40 estudantes público-alvo da educação especial. Dentro desse contexto, para além do trabalho que realizamos na escola, eu, como diretor, os demais gestores e toda a equipe docente discutimos a inclusão há mais de quatro anos na rádio comunitária Serrana, da qual somos parceiros no programa semanal “Zona Livre para Incluir”.",
      "O programa é um trabalho pedagógico para a comunidade, porque discutimos a importância da inclusão de estudantes com deficiência na sala comum a partir da nossa prática e de experiências de outras escolas. No ar todo sábado, o projeto tem sido uma ponte entre o trabalho docente, as famílias e a comunidade escolar. Nesse espaço, colocamos como pauta assuntos relacionados à inclusão escolar, tais como acessibilidade e trabalho colaborativo, e damos orientações para a população, como o direito das pessoas com deficiência à matrícula em escolas comuns e ao profissional de apoio, quando necessário.",
      "Em alguns encontros, levamos docentes para tratar de temas específicos relacionados ao dia a dia escolar, esclarecendo às famílias como funcionam as aulas no contraturno e como auxiliar o desenvolvimento das habilidades de seus filhos em casa. Também damos espaços aos profissionais da rede de assistência do município para dialogarem sobre os desafios da inclusão.",
      "O trabalho desempenhado de forma colaborativa tem trazido retornos positivos. Temos relatos de diferentes famílias que começaram a se dar conta da necessidade de acompanhar seus filhos a partir das conversas que realizamos na rádio. Sempre mostramos que a deficiência não impede que nenhuma criança esteja na escola, o que impede são as barreiras. Nosso objetivo é influenciar ações no município e no estado que promovam a educação inclusiva e o direito de todas e todos a frequentarem os espaços públicos.",
      "Disponível em: diversa.org.br (adaptado).",
    ].join("\n\n"),
    keyFacts: [
      "o programa de rádio e a escola em Lima Duarte",
      "temas de inclusão e o trabalho com as famílias",
      "por que o projeto merece o prêmio",
    ],
    mustDo: [
      "escrever texto de inscrição no concurso",
      "explicar o que é o programa",
      "dizer como é feito e quais tópicos aborda",
      "argumentar por que merece o prêmio",
    ],
  },
  "cotas-usp-2023-2": {
    id: "cotas-usp-2023-2",
    cycle: "2023/2",
    number: "Tarefa 4",
    title: "Cotas para professores na universidade",
    shortLabel: "2023/2 · T4",
    genre: "carta aberta",
    audience: "reitoria da universidade do candidato",
    timeHint: "15–20 minutos",
    prompt:
      "Você é representante da associação docente de uma universidade brasileira que ainda não implementou efetivamente a lei de cotas para professores. Inspirado no exemplo da USP, escreva uma carta aberta à reitoria da sua instituição. Com base nas informações da reportagem, ressalte os principais aspectos trazidos pelas ações afirmativas, solicitando a implementação de cotas nos próximos concursos.",
    sourceKicker: "Insumo · caderno oficial 2023/2",
    sourceTitle: "USP aprova cotas para pretos, pardos e indígenas em concursos de professores",
    sourceText: [
      "A Universidade de São Paulo (USP), mais conceituada instituição de ensino do país, aprovou cotas para pretos, pardos e indígenas em seus concursos públicos para professores e servidores. As próximas seleções deverão separar 20% das vagas para esse público. Atualmente, a USP tem 119 docentes pretos e pardos e um indígena, em um total de 5 mil.",
      "Quando as pesquisas são feitas por um grupo muito homogêneo de pessoas, ficam limitadas aos temas que importam a ele. Com maior diversidade, amplia seus horizontes, suas perguntas e fica mais próximo da sociedade, disse ao Estadão o reitor da USP, Gilberto Carlotti Junior. A intenção é ter mais qualidade nas pesquisas. Além disso, a universidade pretende tentar refletir a diversidade dos alunos entre professores e técnicos. A USP tem cerca de 45% de seus estudantes autodeclarados pretos, pardos e indígenas, por causa de um programa de cotas.",
      "Segundo o reitor, a USP vai abrir cerca de 500 vagas até 2025 para professores. Com as cotas, o número de docentes pretos, pardos e indígenas deve dobrar, com mais cerca de 100 contratados. O índice de 20% será aplicado para concursos que tiverem mais de 3 vagas abertas. No caso em que houver menos, a universidade vai usar a chamada pontuação diferenciada. A autodeclaração como preto ou pardo feita pelo candidato vai estar sujeita à confirmação de uma banca de heteroidentificação.",
      "A USP já havia sido questionada três vezes na Justiça, com concursos paralisados, por não estipular cotas, já que uma lei estadual estabelecia a obrigatoriedade. “Se não fizermos de maneira induzida, vai demorar dezenas de anos para ter maior diversidade na universidade”, afirmou o reitor. Recentemente, a instituição lançou uma bolsa de pós-doutorado, de R$ 8 mil, para pesquisadores negros.",
      "Em abril, a Pontifícia Universidade Católica de São Paulo (PUC-SP) aprovou uma meta de ter 37% de seus professores negros em seis anos. Atualmente, esse índice é de 5,34%. As universidades federais também precisam seguir a lei para concursos da União, que estabelece 20% das vagas para pretos, pardos e indígenas, mas há disputas na Justiça para que ela seja cumprida efetivamente.",
    ].join("\n\n"),
    keyFacts: [
      "cotas da USP para docentes pretos, pardos e indígenas",
      "descompasso entre alunos e professores",
      "argumentos das ações afirmativas e o pedido à reitoria",
    ],
    mustDo: [
      "escrever carta aberta à reitoria",
      "usar o exemplo da USP",
      "pedir cotas nos próximos concursos",
      "ressaltar os argumentos das ações afirmativas",
    ],
  },
  "kaka-jecupe-2000-1": {
    id: "kaka-jecupe-2000-1",
    cycle: "2000/1",
    number: "Tarefa 3",
    title: "500 anos de desencontros",
    shortLabel: "2000/1 · T3",
    genre: "recomendações a governantes",
    audience: "governantes do século XXI",
    timeHint: "15–20 minutos",
    prompt:
      "Leia os segmentos de texto retirados de entrevista dada por Kaká Werá Jecupe à revista Isto É, em 21 de julho de 1999. Se você pudesse fazer três sugestões aos governantes do século XXI, para que pudéssemos viver em um mundo que equilibrasse o ser com o ter, o progresso com a natureza, o que recomendaria? Apoie-se nas ideias do entrevistado.",
    sourceKicker: "Insumo · caderno oficial 2000/1",
    sourceTitle: "500 Anos de Desencontros — Kaká Werá Jecupe",
    sourceText: [
      "Para o escritor Kaká Jecupe, a semente do distanciamento entre brancos e índios está na estrutura das sociedades: uma cultua o ter e a outra o ser.",
      "Kaká Werá Jecupe é um caso raríssimo de escritor no Brasil. Índio tapuia, ou txucarramãe (guerreiro sem arma), como ele prefere, filho legítimo dos ancestrais habitantes das terras descobertas pelos portugueses, resolveu romper o silêncio de cinco séculos e escrever a história vista pela ótica dos que habitavam o Novo Mundo há milhares de anos.",
      "ISTO É — O Brasil está se preparando para comemorar seus 500 anos. Para os povos indígenas, são anos de descoberta ou de invasão?",
      "Kaká Werá Jecupe — De desencontro. Desencontro que provocou e continua provocando situações gravíssimas. A realidade atual indígena não é fácil.",
      "ISTO É — E qual é a razão desse desencontro?",
      "Kaká — A semente desse desencontro está numa sociedade que tem na sua estrutura de cultura a questão do ter e encontrou uma cultura aqui voltada para o ser.",
      "ISTO É — Os europeus chegaram trazendo o progresso, trataram os que estavam aqui como primitivos. Como você pensa esta relação?",
      "Kaká — Para quem fundamenta a sua cultura no ter, a noção de progresso está em ver ao seu redor o acúmulo de bens materiais. A noção de progresso dos indígenas está em desenvolver a sua capacidade criativa, a sua expressão no mundo. É preciso que a civilização olhe para os índios com menos prepotência, até para perceber que ela está em colapso.",
    ].join("\n\n"),
    keyFacts: [
      "desencontro entre a cultura do ter e a do ser",
      "duas noções de progresso",
      "recomendações que equilibrem ser, ter e natureza",
    ],
    mustDo: [
      "escrever três recomendações a governantes",
      "equilibrar ser e ter, progresso e natureza",
      "apoiar-se na entrevista, não em slogans vazios",
    ],
  },
  "hans-rio-2000-2": {
    id: "hans-rio-2000-2",
    cycle: "2000/2",
    number: "Tarefa 3",
    title: "Mensagem eletrônica",
    shortLabel: "2000/2 · T3",
    genre: "mensagem eletrônica",
    audience: "Hans, amigo estrangeiro",
    timeHint: "15–20 minutos",
    prompt:
      "Imagine que você mora no Rio de Janeiro e, às 7h da manhã de um sábado, abre seu correio eletrônico, encontrando a seguinte mensagem enviada na sexta-feira por um amigo estrangeiro que está no Brasil. Você, que está livre no fim de semana, abre o jornal, lê as informações sobre o tempo e, baseando-se nelas, responda imediatamente a mensagem de seu amigo e dê sua opinião sobre a programação planejada por ele.",
    sourceKicker: "Insumo · caderno oficial 2000/2",
    sourceTitle: "Mensagem de Hans + previsão do tempo",
    sourceText: [
      "Oi.",
      "Estou viajando pela Amazônia há dez dias e já terminei a reportagem que vim fazer aqui. Amanhã de manhã, estou pensando em pegar um voo direto de Manaus para o Rio de Janeiro. Deu vontade de rever os amigos e curtir a cidade. Se você achar boa ideia, amanhã de tarde, podemos ir ao Pão de Açúcar para ver a cidade lá do alto. Na outra vez que estive no Rio, não deu tempo, lembra? No domingo de noite, acho que vou seguir viagem para o nordeste, onde pretendo ficar uma semana. Quero muito sol e praia antes de voltar para Munique. O que acha da programação? Responda o mais cedo possível.",
      "Até breve.",
      "Hans",
      "O TEMPO — Somar Meteorologia (página seguinte do caderno)",
      "A nebulosidade aumenta e ocorre chuva isolada em forma de pancadas, devido à propagação de uma frente fria de fraca atividade próxima ao litoral do Estado.",
      "Previsão para os próximos 5 dias do Rio de Janeiro (hoje, amanhã, segunda, terça e quarta): variação entre sol, nebulosidade e chuva isolada.",
      "Notas por região no caderno: Região Sul, tempo ameno; Região Sudeste, tempo estável, com temperaturas elevadas no Rio; Região Centro-Oeste, tempo seco; Região Norte, pancadas de chuva; Região Nordeste, continuação de tempo seco, com sol.",
    ].join("\n\n"),
    keyFacts: [
      "o plano de viagem do Hans",
      "o tempo no Rio e no Nordeste",
      "opinião sobre a programação",
    ],
    mustDo: [
      "responder imediatamente por e-mail",
      "usar a previsão do tempo",
      "dar opinião sobre a programação de Hans",
      "escrever como amigo que mora no Rio",
    ],
  },
};

export const DEFAULT_WRITING_TASK_ID: WritingTaskId = "mandacaru-2025-2";

export function isWritingTaskId(value: string): value is WritingTaskId {
  return (WRITING_TASK_IDS as readonly string[]).includes(value);
}

export function getWritingTask(id?: string | null): WritingTask {
  if (id && isWritingTaskId(id)) return WRITING_TASKS[id];
  return WRITING_TASKS[DEFAULT_WRITING_TASK_ID];
}

export function listWritingTasks(): WritingTask[] {
  return WRITING_TASK_IDS.map((id) => WRITING_TASKS[id]);
}
