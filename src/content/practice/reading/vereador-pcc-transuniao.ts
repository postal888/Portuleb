import type { ReadingArticle } from "./types";
import { vereadorPccTransuniaoExpressionGuide } from "./vereador-pcc-transuniao-expressions";
import {
  DEFAULT_ADAPTATION_NOTE,
  DEFAULT_DIDACTIC_DISCLAIMER,
} from "./comidas-gigantes-legal";
import { vereadorPccTransuniaoSourceCredits } from "./vereador-pcc-transuniao-legal";

export const vereadorPccTransuniao: ReadingArticle = {
  meta: {
    slug: "vereador-pcc-transuniao",
    categoryPath: "compreensao-leitura",
    title: "Vereador e empresa de ônibus ligada ao PCC — texto anotado",
    seoTitle: "Vereador preso e PCC no transporte — leitura anotada",
    seoDescription:
      "Texto jornalístico sobre a Operação Última Parada e a Transunião, com expressões destacadas e glossário para prática de leitura avançada.",
    eyebrow: "Prática · Compreensão escrita",
    level: "Avançado",
    duration: "25–30 min",
    tags: ["leitura", "vocabulário", "jornalismo", "política", "São Paulo"],
  },
  hero: {
    kicker: "Leitura anotada",
    title: "Vereador é preso por envolvimento com empresa de ônibus ligada ao PCC",
    lead:
      "Passe o mouse sobre as expressões sublinhadas para ver a tradução. A lista à direita reúne o vocabulário-chave do texto jornalístico.",
    objectives: [
      "Identificar vocabulário jornalístico e jurídico em texto longo",
      "Relacionar trechos em português com equivalentes em inglês",
      "Praticar leitura de notícia sobre crime organizado e política local",
    ],
  },
  annotatedText: {
    sectionTitle: "Texto com expressões sublinhadas",
    intro:
      "O texto permanece em português; as traduções aparecem ao passar o mouse sobre as expressões.",
    blocks: [
    {
        "id": "lead",
        "segments": [
            {
                "text": "Senival Moura (PT) é acusado de lavar dinheiro do crime organizado"
            }
        ]
    },
    {
        "id": "par-1",
        "segments": [
            {
                "text": "Uma ação investiga nesta quinta-feira, 25, a infiltração do Primeiro Comando da Capital (PCC) no transporte público de São Paulo. A Operação Última Parada "
            },
            {
                "text": "foi deflagrada",
                "highlight": true,
                "expressionId": "foi-deflagrada"
            },
            {
                "text": " pelo Grupo de Atuação Especial de Combate ao Crime Organizado (Gaeco), do Ministério Público Estadual, e pelo Departamento Estadual de Investigações Criminais (Deic), da Polícia Civil."
            }
        ]
    },
    {
        "id": "par-2",
        "segments": [
            {
                "text": "É a quarta empresa de ônibus que atua na capital paulista "
            },
            {
                "text": "investigada por elo com a facção",
                "highlight": true,
                "expressionId": "investigada-por-elo-com-a-faccao"
            },
            {
                "text": ". "
            },
            {
                "text": "Pela primeira vez",
                "highlight": true,
                "expressionId": "pela-primeira-vez"
            },
            {
                "text": ", um vereador da capital — Senival Moura (PT), 1º secretário da Câmara Municipal — foi preso sob a acusação de lavar dinheiro do crime organizado na empresa de ônibus Transunião, cujo presidente, Lourival de França Monário, também foi alvo da operação."
            }
        ]
    },
    {
        "id": "par-3",
        "segments": [
            {
                "text": "A reportagem "
            },
            {
                "text": "procurou",
                "highlight": true,
                "expressionId": "procurou"
            },
            {
                "text": " a defesa dos acusados, mas ainda não conseguiu localizá-los. Também procurou a empresa e a Prefeitura de São Paulo. "
            },
            {
                "text": "O espaço segue aberto.",
                "highlight": true,
                "expressionId": "o-espaco-segue-aberto"
            }
        ]
    },
    {
        "id": "par-4",
        "segments": [
            {
                "text": "Ao todo",
                "highlight": true,
                "expressionId": "ao-todo"
            },
            {
                "text": ", foram "
            },
            {
                "text": "expedidos",
                "highlight": true,
                "expressionId": "expedidos"
            },
            {
                "text": " cinco mandados de prisão temporária e 103 de busca e apreensão em 13 cidades de São Paulo e de Minas Gerais. A 2ª Vara de Crimes Tributários, organização criminosa e Lavagem de Bens e Valores da Capital "
            },
            {
                "text": "decretou o bloqueio de bens",
                "highlight": true,
                "expressionId": "decretou-o-bloqueio-de-bens"
            },
            {
                "text": " dos investigados de até R$ 194 milhões, 117 ônibus, 21 imóveis e três embarcações dos investigados, "
            },
            {
                "text": "além da intervenção",
                "highlight": true,
                "expressionId": "alem-da-intervencao"
            },
            {
                "text": " e o "
            },
            {
                "text": "afastamento",
                "highlight": true,
                "expressionId": "afastamento"
            },
            {
                "text": " dos seis "
            },
            {
                "text": "integrantes",
                "highlight": true,
                "expressionId": "integrantes"
            },
            {
                "text": " da cúpula da Transunião, cuja direção passará à SPTrans."
            }
        ]
    },
    {
        "id": "par-5",
        "segments": [
            {
                "text": "Em 2024, durante a Operação Fim de Linha, a Transwolff e a UPbus foram alvos da polícia pelo mesmo motivo. Investigada desde 2022, a Transunião recebeu só entre janeiro e maio deste ano R$ 182,1 milhões da Prefeitura de São Paulo como remuneração pelos cerca de 6 milhões de passageiros que transporta todos os meses."
            }
        ]
    },
    {
        "id": "par-6",
        "segments": [
            {
                "text": "Além disso, em 2025, o secretário municipal de Transportes, Celso Jorge Caldeira, "
            },
            {
                "text": "empenhou",
                "highlight": true,
                "expressionId": "empenhou"
            },
            {
                "text": " R$ 163 milhões para a eletrificação de parte da frota da empresa, que opera 614 ônibus em dois lotes do chamado grupo de distribuição local do sistema de transporte, em um total de 57 linhas, na zona leste da cidade."
            }
        ]
    },
    {
        "id": "par-7",
        "segments": [
            {
                "text": "Para o Deic, a análise das movimentações financeiras e as transferências de recursos da empresa passavam pelo "
            },
            {
                "text": "vereador",
                "highlight": true,
                "expressionId": "vereador"
            },
            {
                "text": ", "
            },
            {
                "text": "embora ele não integrasse",
                "highlight": true,
                "expressionId": "embora-ele-nao-integrasse"
            },
            {
                "text": " oficialmente o quadro societário da Transunião. O político exerceria o “controle tático da gestão” e, "
            },
            {
                "text": "sobretudo",
                "highlight": true,
                "expressionId": "sobretudo"
            },
            {
                "text": ", da “estrutura financeira da empresa” e é "
            },
            {
                "text": "descrito pelos policiais como",
                "highlight": true,
                "expressionId": "descrito-pelos-policiais-como"
            },
            {
                "text": " o principal responsável por fazer da companhia um instrumento do sistema clandestino que funcionava para dar suporte à lavagem de dinheiro de indivíduos que "
            },
            {
                "text": "orbitavam o PCC",
                "highlight": true,
                "expressionId": "orbitavam-o-pcc"
            },
            {
                "text": "."
            }
        ]
    },
    {
        "id": "par-8",
        "segments": [
            {
                "text": "De acordo com",
                "highlight": true,
                "expressionId": "de-acordo-com"
            },
            {
                "text": " relatórios técnicos do Laboratório de Lavagem de Dinheiro (Lab-LD) da Polícia Civil, a Transunião Transportes S.A movimentou aproximadamente R$ 545 milhões em créditos e R$ 546 milhões em débitos durante o período investigado, que segundo os "
            },
            {
                "text": "peritos",
                "highlight": true,
                "expressionId": "peritos"
            },
            {
                "text": " foi marcado por "
            },
            {
                "text": "elevada pulverização bancária",
                "highlight": true,
                "expressionId": "elevada-pulverizacao-bancaria"
            },
            {
                "text": ", intensa fragmentação de operações e circulação cruzada de recursos entre pessoas físicas e jurídicas vinculadas ao mesmo núcleo econômico."
            }
        ]
    },
    {
        "id": "par-9",
        "segments": [
            {
                "text": "Além disso, existiriam R$ 24.759.905,59 em créditos sem identificação adequada de origem, o que, para os policiais e os promotores do Gaeco, é uma "
            },
            {
                "text": "circunstância incompatível",
                "highlight": true,
                "expressionId": "circunstancia-incompativel"
            },
            {
                "text": " com padrões mínimos de transparência empresarial e altamente relevante "
            },
            {
                "text": "sob a ótica da prevenção e repressão",
                "highlight": true,
                "expressionId": "sob-a-otica-da-prevencao-e-repressao"
            },
            {
                "text": " à lavagem de capitais."
            }
        ]
    },
    {
        "id": "sec-historico",
        "title": "Histórico da organização",
        "segments": [
            {
                "text": "Histórico da organização"
            }
        ]
    },
    {
        "id": "par-10",
        "segments": [
            {
                "text": "A história da Transunião está ligada ao vereador "
            },
            {
                "text": "petista",
                "highlight": true,
                "expressionId": "petista"
            },
            {
                "text": " assim como à inclusão dos "
            },
            {
                "text": "perueiros",
                "highlight": true,
                "expressionId": "perueiros"
            },
            {
                "text": " no sistema público de transporte da capital — por onde o crime organizado se "
            },
            {
                "text": "infiltrou",
                "highlight": true,
                "expressionId": "infiltrou"
            },
            {
                "text": ", recebendo bilhões do Poder Público por meio de empresas que funcionavam como caixa do crime organizado. O contexto ainda envolve assassinatos, "
            },
            {
                "text": "extorsões",
                "highlight": true,
                "expressionId": "extorcoes"
            },
            {
                "text": ", ladrões de banco e lavagem de dinheiro, em uma série de acusações que se "
            },
            {
                "text": "arrastam",
                "highlight": true,
                "expressionId": "arrastam"
            },
            {
                "text": " há quase duas décadas."
            }
        ]
    },
    {
        "id": "par-11",
        "segments": [
            {
                "text": "Exemplo disso é o inquérito "
            },
            {
                "text": "que deu origem",
                "highlight": true,
                "expressionId": "inquerito-que-deu-origem"
            },
            {
                "text": " à Operação Última Parada. Ele nasceu em 2020 "
            },
            {
                "text": "em razão",
                "highlight": true,
                "expressionId": "em-razao"
            },
            {
                "text": " do assassinato de Adauto Soares Jorge, então presidente da empresa, morto a tiros em 4 de março de 2020, por um pistoleiro em um estacionamento da rua Cônego Antonio Manzi, no Lajeado, na zona Leste."
            }
        ]
    },
    {
        "id": "par-12",
        "segments": [
            {
                "text": "Adauto estava acompanhado por Devanil Souza Nascimento, o Sapo, um antigo funcionário da Transunião. Devanil era motorista do vereador, um dos fundadores da Transunião, que afirmava ter se desligado da empresa em 2020."
            }
        ]
    },
    {
        "id": "par-13",
        "segments": [
            {
                "text": "Devanil foi investigado no inquérito sobre o homicídio "
            },
            {
                "text": "por suspeita de",
                "highlight": true,
                "expressionId": "por-suspeita-de"
            },
            {
                "text": " ter "
            },
            {
                "text": "conduzido",
                "highlight": true,
                "expressionId": "conduzido"
            },
            {
                "text": " Adauto até o estacionamento, sabendo da armadilha que havia sido montada contra a vítima. "
            },
            {
                "text": "Ele foi denunciado",
                "highlight": true,
                "expressionId": "ele-foi-denunciado"
            },
            {
                "text": " pelo crime assim como outro personagem dessa história, Jair Ramos de Freitas, o Cachorrão, também diretor da empresa e homem apontado como o autor dos tiros."
            }
        ]
    },
    {
        "id": "par-14",
        "segments": [
            {
                "text": "Durante a investigação do homicídio, foram apreendidos um celular e um "
            },
            {
                "text": "pendrive",
                "highlight": true,
                "expressionId": "pendrive"
            },
            {
                "text": " que estavam com Adauto. Foi o material ali encontrado que serviu de base para o inquérito atual, aberto em 2022, sobre a lavagem de dinheiro do PCC. No pendrive havia duas planilhas. Uma delas tinha o nome de “Contato” e a outra de “Contato3”. Elas relacionavam os ônibus existentes na Transunião aos nomes de seus donos, "
            },
            {
                "text": "fossem eles laranjas ou não",
                "highlight": true,
                "expressionId": "fossem-eles-laranjas-ou-nao"
            },
            {
                "text": "."
            }
        ]
    },
    {
        "id": "par-15",
        "segments": [
            {
                "text": "Os "
            },
            {
                "text": "acionistas",
                "highlight": true,
                "expressionId": "acionistas"
            },
            {
                "text": " da empresa eram donos dos ônibus porque a empresa "
            },
            {
                "text": "surgiu",
                "highlight": true,
                "expressionId": "surgiu"
            },
            {
                "text": " para substituir uma cooperativa de perueiros, muitos dos quais entraram para o negócio integrando seus veículos como parte do capital da companhia. Foi dessa forma que a Prefeitura conseguiu regularizar o sistema de transportes na capital, que "
            },
            {
                "text": "convivia",
                "highlight": true,
                "expressionId": "convivia"
            },
            {
                "text": " então com perueiros clandestinos. Mas entre os donos de ônibus havia criminosos ligados ao PCC."
            }
        ]
    },
    {
        "id": "par-16",
        "segments": [
            {
                "text": "Ao cruzar as duas planilhas",
                "highlight": true,
                "expressionId": "ao-cruzar-as-duas-planilhas"
            },
            {
                "text": " com os dados achados no celular de Adauto Jorge, o Deic descobriu que os mesmos ônibus estavam indicados em cada uma das planilhas a pessoas diferentes. Em uma delas, a pessoa era chamada de “cooperado” e na outra de “cooperado oficial”."
            }
        ]
    },
    {
        "id": "par-17",
        "segments": [
            {
                "text": "Para os policiais, as duas tabelas mostraram a existência de uma "
            },
            {
                "text": "dissociação deliberada",
                "highlight": true,
                "expressionId": "dissociacao-deliberada"
            },
            {
                "text": " entre a titularidade dos veículos e o domínio econômico associado à exploração da frota. Assim, comparando os dados, foi possível identificar quem seriam os beneficiários reais das receitas geradas pela empresa, mostrando como era feita a divisão dos recursos pagos à Transunião."
            }
        ]
    },
    {
        "id": "sec-assessora",
        "title": "Assessora dos Tatto e ladrão de banco",
        "segments": [
            {
                "text": "Assessora dos Tatto e ladrão de banco"
            }
        ]
    },
    {
        "id": "par-18",
        "segments": [
            {
                "text": "Foi na lista de contatos do telefone de Adauto Jorge que os policiais identificaram o número que "
            },
            {
                "text": "pertencia",
                "highlight": true,
                "expressionId": "pertencia"
            },
            {
                "text": " a outro personagem dessa história: Leonel Moreira Martins, que exercia oficialmente a função de supervisor na empresa, mas que executava uma espécie de gestão paralela dos recursos da Transunião."
            }
        ]
    },
    {
        "id": "par-19",
        "segments": [
            {
                "text": "Leonel "
            },
            {
                "text": "determinava",
                "highlight": true,
                "expressionId": "determinava"
            },
            {
                "text": " a Adauto que fizesse depósitos bancários e cobrava valores e "
            },
            {
                "text": "repasses",
                "highlight": true,
                "expressionId": "repasses"
            },
            {
                "text": " a terceiros desde 2017. "
            },
            {
                "text": "Este pagava até despesas",
                "highlight": true,
                "expressionId": "este-pagava-ate-despesas"
            },
            {
                "text": " de familiares de Leonel, que não tinham nenhuma relação com o sistema de transportes."
            }
        ]
    },
    {
        "id": "par-20",
        "segments": [
            {
                "text": "Esse é o caso de Ingrid Bernardino, ex-mulher de Leonel. Beneficiária de depósitos feitos a mando do ex-marido, ela foi assessora de Senival e, depois, trabalhou como secretária e assessora dos deputados federais Nilto e Jilmar Tatto, ambos do PT. Ainda segundo os investigadores, é possível verificar nas "
            },
            {
                "text": "conversas",
                "highlight": true,
                "expressionId": "conversas"
            },
            {
                "text": " de Adauto que os pagamentos tinham a "
            },
            {
                "text": "anuência",
                "highlight": true,
                "expressionId": "anuencia"
            },
            {
                "text": " ou a participação de pessoas de fora da direção da empresa, como o vereador Senival, nominado nas conversas como “presidente”, “véio”, “velhinho” e “vereador”."
            }
        ]
    },
    {
        "id": "par-21",
        "segments": [
            {
                "text": "Senival tem na cidade do sul de Minas Gerais uma casa — "
            },
            {
                "text": "descrita como de “elevado padrão”",
                "highlight": true,
                "expressionId": "descrita-como-de-elevado-padrao"
            },
            {
                "text": " — no bairro Juncal, na zona rural da cidade."
            }
        ]
    },
    {
        "id": "par-22",
        "segments": [
            {
                "text": "Em uma terceira conversa entre Adauto e Leonel, o primeiro afirmou que só podia passar até R$ 70 mil e que qualquer valor acima disso dependeria da anuência “dele”, referência a Senival, segundo as autoridades. Leonel respondeu que esse montante era “o dos caras”, da direção informal da empresa, mas que existiria uma “situação a mais”. “Essa situação a mais é o meu que tem de chegar”."
            }
        ]
    },
    {
        "id": "par-23",
        "segments": [
            {
                "text": "Para o Deic, essa referência se relacionaria ao dinheiro da facção. A polícia descobriu que as transferências feitas por Leonel se destinavam a pagamentos para pessoas com antecedentes criminais, como Anderson de Cássia Pereira, o Perigo ou Careca, um ladrão de banco vinculado ao PCC acusado de roubos a carros-fortes."
            }
        ]
    },
    {
        "id": "sec-salve",
        "title": "O “salve” e o desvio de dinheiro",
        "segments": [
            {
                "text": "O “salve” e o desvio de dinheiro"
            }
        ]
    },
    {
        "id": "par-24",
        "segments": [
            {
                "text": "Os policiais descrevem ainda que encontraram na casa de Cachorrão uma carta manuscrita relacionada à morte de Adauto Jorge. Com a estrutura dos “salves” emitidos pelo PCC, o documento trata de conflitos na direção da Transunião e da acusação de desvio de R$ 15 milhões da garagem da empresa."
            }
        ]
    },
    {
        "id": "par-25",
        "segments": [
            {
                "text": "De acordo com o que estava escrito na carta, R$ 200 mil teriam sido apropriados por Leonel. Adauto teria dito em sua defesa que sua atuação "
            },
            {
                "text": "se restringia a cumprir ordens",
                "highlight": true,
                "expressionId": "se-restringia-a-cumprir-ordens"
            },
            {
                "text": " do “Véio” e do “Cabeça Branca”, que seriam, "
            },
            {
                "text": "respectivamente",
                "highlight": true,
                "expressionId": "respectivamente"
            },
            {
                "text": ", Senival e Leonel."
            }
        ]
    },
    {
        "id": "par-26",
        "segments": [
            {
                "text": "Por conta disso, o “salve” informava a determinação do afastamento dos envolvidos em razão de uma situação “deselegante” de cobranças indevidas. Para a polícia, o desvio do dinheiro da empresa motivou o assassinato de Adauto. Senival também estava na mira da facção, que só não o matou por ele ser político. Na época, o vereador chegou a pedir proteção policial. "
            },
            {
                "text": "Tanto ele quanto Leonel foram afastados",
                "highlight": true,
                "expressionId": "tanto-ele-quanto-leonel-foram-afastados"
            },
            {
                "text": " da empresa."
            }
        ]
    }
],
  },
  expressionGuide: vereadorPccTransuniaoExpressionGuide,
  didacticDisclaimer: DEFAULT_DIDACTIC_DISCLAIMER,
  adaptationNote: DEFAULT_ADAPTATION_NOTE,
  sourceCredits: vereadorPccTransuniaoSourceCredits,
  closingNote: {
    title: "Próximo passo",
    body: "Depois de ler, volte às provas anteriores do Celpe-Bras e identifique estruturas semelhantes em textos longos. Você também pode praticar vocabulário na seção Polir a base.",
    links: [
      { label: "Voltar a Ler", href: "/pt-br/pratica/compreensao-leitura" },
      { label: "Polir a base", href: "/pt-br/pratica/polimento-de-base" },
      { label: "Hub Prática", href: "/pt-br/pratica" },
    ],
  },
} satisfies ReadingArticle;
