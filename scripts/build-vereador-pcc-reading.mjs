import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src", "content", "practice", "reading");

/** @type {import("../src/content/practice/reading/types.ts").ReadingExpressionGuideEntry[]} */
const expressionEntries = [
  { id: "foi-deflagrada", portuguese: "foi deflagrada (operação)", english: "was launched (operation)", example: "A Operação Última Parada foi deflagrada pelo Gaeco.", explanation: "Journalistic formula: an official police operation was started." },
  { id: "investigada-por-elo-com-a-faccao", portuguese: "investigada por elo com a facção", english: "investigated for links to the faction", example: "É a quarta empresa de ônibus investigada por elo com a facção.", explanation: "Under investigation for connection to a criminal organization." },
  { id: "pela-primeira-vez", portuguese: "Pela primeira vez", english: "For the first time", example: "Pela primeira vez, um vereador da capital foi preso.", explanation: "Marks an unprecedented event." },
  { id: "procurou", portuguese: "procurou", english: "contacted / sought out", example: "A reportagem procurou a defesa dos acusados.", explanation: "Journalistic: tried to reach someone for comment." },
  { id: "o-espaco-segue-aberto", portuguese: "O espaço segue aberto", english: "The space remains open", example: "Também procurou a empresa. O espaço segue aberto.", explanation: "Formula keeping the door open for a later response." },
  { id: "ao-todo", portuguese: "Ao todo", english: "In total", example: "Ao todo, foram expedidos cinco mandados de prisão.", explanation: "Summing up a total amount or number." },
  { id: "expedidos", portuguese: "expedidos", english: "issued (officially)", example: "Foram expedidos cinco mandados de prisão temporária.", explanation: "Officially issued orders or warrants." },
  { id: "decretou-o-bloqueio-de-bens", portuguese: "decretou o bloqueio de bens", english: "ordered the blocking of assets", example: "A vara decretou o bloqueio de bens de até R$ 194 milhões.", explanation: "A court decision to freeze property." },
  { id: "alem-da-intervencao", portuguese: "além da intervenção", english: "in addition to the intervention", example: "…além da intervenção e o afastamento dos integrantes.", explanation: "Besides placing the company under external control." },
  { id: "afastamento", portuguese: "afastamento", english: "removal from office", example: "…o afastamento dos seis integrantes da cúpula.", explanation: "Temporary or formal removal from a position." },
  { id: "integrantes", portuguese: "integrantes", english: "members", example: "…afastamento dos seis integrantes da cúpula da Transunião.", explanation: "People who belong to a group or leadership." },
  { id: "empenhou", portuguese: "empenhou", english: "allocated (public funds)", example: "O secretário empenhou R$ 163 milhões para a eletrificação.", explanation: "Officially committed budget resources." },
  { id: "vereador", portuguese: "vereador", english: "city councillor", example: "…passavam pelo vereador, embora ele não integrasse o quadro societário.", explanation: "Elected member of the municipal chamber." },
  { id: "embora-ele-nao-integrasse", portuguese: "embora ele não integrasse", english: "although he was not part of", example: "…pelo vereador, embora ele não integrasse oficialmente o quadro societário.", explanation: "Concessive clause with subjunctive; contrasts two facts." },
  { id: "sobretudo", portuguese: "sobretudo", english: "above all / especially", example: "…controle tático da gestão e, sobretudo, da estrutura financeira.", explanation: "Emphasizes what matters most." },
  { id: "descrito-pelos-policiais-como", portuguese: "descrito pelos policiais como", english: "described by police as", example: "…é descrito pelos policiais como o principal responsável.", explanation: "How authorities characterize someone in reports." },
  { id: "orbitavam-o-pcc", portuguese: "orbitavam o PCC", english: "were linked to the PCC", example: "…indivíduos que orbitavam o PCC.", explanation: "Moved in the orbit of the criminal faction." },
  { id: "de-acordo-com", portuguese: "De acordo com", english: "According to", example: "De acordo com relatórios técnicos do Lab-LD…", explanation: "Introduces a source or basis for a claim." },
  { id: "peritos", portuguese: "peritos", english: "forensic experts", example: "…período investigado, que segundo os peritos foi marcado por…", explanation: "Technical specialists who produce expert reports." },
  { id: "elevada-pulverizacao-bancaria", portuguese: "elevada pulverização bancária", english: "high fragmentation across bank accounts", example: "…marcado por elevada pulverização bancária.", explanation: "Splitting money across many accounts to hide trails." },
  { id: "circunstancia-incompativel", portuguese: "circunstância incompatível", english: "incompatible circumstance", example: "…é uma circunstância incompatível com padrões mínimos de transparência.", explanation: "A situation that does not fit normal standards." },
  { id: "sob-a-otica-da-prevencao-e-repressao", portuguese: "sob a ótica da prevenção e repressão", english: "from the perspective of prevention and enforcement", example: "…altamente relevante sob a ótica da prevenção e repressão à lavagem.", explanation: "Viewed through anti–money laundering policy." },
  { id: "petista", portuguese: "petista", english: "linked to the PT party", example: "A história da Transunião está ligada ao vereador petista.", explanation: "Associated with the Partido dos Trabalhadores." },
  { id: "perueiros", portuguese: "perueiros", english: "van/minibus operators", example: "…inclusão dos perueiros no sistema público de transporte.", explanation: "Informal alternative transport drivers/owners." },
  { id: "infiltrou", portuguese: "infiltrou", english: "infiltrated", example: "…por onde o crime organizado se infiltrou.", explanation: "Entered a system covertly." },
  { id: "extorcoes", portuguese: "extorsões", english: "extortion crimes", example: "…assassinatos, extorsões, ladrões de banco e lavagem de dinheiro.", explanation: "Crimes of demanding money through threats." },
  { id: "arrastam", portuguese: "arrastam", english: "drag on / have lasted", example: "…acusações que se arrastam há quase duas décadas.", explanation: "Continue unresolved for a long time." },
  { id: "inquerito-que-deu-origem", portuguese: "inquérito que deu origem", english: "inquiry that gave rise to", example: "…inquérito que deu origem à Operação Última Parada.", explanation: "The initial investigation that led to the operation." },
  { id: "em-razao", portuguese: "em razão", english: "because of / due to", example: "Ele nasceu em 2020 em razão do assassinato de Adauto.", explanation: "States the cause of something." },
  { id: "por-suspeita-de", portuguese: "por suspeita de", english: "on suspicion of", example: "…investigado por suspeita de ter conduzido Adauto.", explanation: "Under the hypothesis that someone did something." },
  { id: "conduzido", portuguese: "conduzido", english: "taken / led (to a place)", example: "…por suspeita de ter conduzido Adauto até o estacionamento.", explanation: "Brought someone to a location." },
  { id: "ele-foi-denunciado", portuguese: "Ele foi denunciado", english: "He was formally charged", example: "Ele foi denunciado pelo crime assim como Cachorrão.", explanation: "Formal accusation presented in court." },
  { id: "pendrive", portuguese: "pendrive", english: "USB flash drive", example: "…apreendidos um celular e um pendrive.", explanation: "Portable storage device." },
  { id: "fossem-eles-laranjas-ou-nao", portuguese: "fossem eles laranjas ou não", english: "whether or not they were fronts", example: "…relacionavam os ônibus aos donos, fossem eles laranjas ou não.", explanation: "Whether people were straw owners hiding the real beneficiary." },
  { id: "acionistas", portuguese: "acionistas", english: "shareholders", example: "Os acionistas da empresa eram donos dos ônibus.", explanation: "Owners of company shares." },
  { id: "surgiu", portuguese: "surgiu", english: "emerged / was created", example: "…porque a empresa surgiu para substituir uma cooperativa.", explanation: "Came into being." },
  { id: "convivia", portuguese: "convivia", english: "coexisted with", example: "…que convivia então com perueiros clandestinos.", explanation: "Existed alongside another reality." },
  { id: "ao-cruzar-as-duas-planilhas", portuguese: "Ao cruzar as duas planilhas", english: "When cross-checking the two spreadsheets", example: "Ao cruzar as duas planilhas com os dados do celular…", explanation: "Comparing data from two tables." },
  { id: "dissociacao-deliberada", portuguese: "dissociação deliberada", english: "deliberate dissociation", example: "…existência de uma dissociação deliberada entre a titularidade e o domínio.", explanation: "Intentional separation to hide real control." },
  { id: "pertencia", portuguese: "pertencia", english: "belonged to", example: "…identificaram o número que pertencia a Leonel.", explanation: "Was linked to or owned by someone." },
  { id: "determinava", portuguese: "determinava", english: "ordered / dictated", example: "Leonel determinava que Adauto fizesse depósitos.", explanation: "Gave orders about what to do." },
  { id: "repasses", portuguese: "repasses", english: "transfers (of money)", example: "…cobrava valores e repasses a terceiros.", explanation: "Passing funds to other people." },
  { id: "este-pagava-ate-despesas", portuguese: "Este pagava até despesas", english: "This one even paid expenses", example: "Este pagava até despesas de familiares de Leonel.", explanation: "Paid personal or family costs from company money." },
  { id: "conversas", portuguese: "conversas", english: "conversations / messages", example: "…verificar nas conversas de Adauto que os pagamentos tinham anuência.", explanation: "Chats used as evidence." },
  { id: "anuencia", portuguese: "anuência", english: "consent / approval", example: "…pagamentos tinham a anuência de Senival.", explanation: "Agreement or authorization." },
  { id: "descrita-como-de-elevado-padrao", portuguese: "descrita como de \"elevado padrão\"", english: "described as \"high standard\"", example: "…casa descrita pelos investigadores como de elevado padrão.", explanation: "Characterized as a high-value property." },
  { id: "se-restringia-a-cumprir-ordens", portuguese: "se restringia a cumprir ordens", english: "limited himself to following orders", example: "…sua atuação se restringia a cumprir ordens do Véio.", explanation: "Acted only by obeying others." },
  { id: "respectivamente", portuguese: "respectivamente", english: "respectively", example: "…respectivamente, Senival e Leonel.", explanation: "In the same order as items mentioned." },
  { id: "tanto-ele-quanto-leonel-foram-afastados", portuguese: "Tanto ele quanto Leonel foram afastados", english: "Both he and Leonel were removed", example: "Tanto ele quanto Leonel foram afastados da empresa.", explanation: "Both people were taken out of the company." },
];

function seg(text, id) {
  return { text, highlight: true, expressionId: id };
}

const blocks = [
  { id: "lead", segments: [{ text: "Senival Moura (PT) é acusado de lavar dinheiro do crime organizado" }] },
  {
    id: "par-1",
    segments: [
      { text: "Uma ação investiga nesta quinta-feira, 25, a infiltração do Primeiro Comando da Capital (PCC) no transporte público de São Paulo. A Operação Última Parada " },
      seg("foi deflagrada", "foi-deflagrada"),
      { text: " pelo Grupo de Atuação Especial de Combate ao Crime Organizado (Gaeco), do Ministério Público Estadual, e pelo Departamento Estadual de Investigações Criminais (Deic), da Polícia Civil." },
    ],
  },
  {
    id: "par-2",
    segments: [
      { text: "É a quarta empresa de ônibus que atua na capital paulista " },
      seg("investigada por elo com a facção", "investigada-por-elo-com-a-faccao"),
      { text: ". " },
      seg("Pela primeira vez", "pela-primeira-vez"),
      { text: ", um vereador da capital — Senival Moura (PT), 1º secretário da Câmara Municipal — foi preso sob a acusação de lavar dinheiro do crime organizado na empresa de ônibus Transunião, cujo presidente, Lourival de França Monário, também foi alvo da operação." },
    ],
  },
  {
    id: "par-3",
    segments: [
      { text: "A reportagem " },
      seg("procurou", "procurou"),
      { text: " a defesa dos acusados, mas ainda não conseguiu localizá-los. Também procurou a empresa e a Prefeitura de São Paulo. " },
      seg("O espaço segue aberto.", "o-espaco-segue-aberto"),
    ],
  },
  {
    id: "par-4",
    segments: [
      seg("Ao todo", "ao-todo"),
      { text: ", foram " },
      seg("expedidos", "expedidos"),
      { text: " cinco mandados de prisão temporária e 103 de busca e apreensão em 13 cidades de São Paulo e de Minas Gerais. A 2ª Vara de Crimes Tributários, organização criminosa e Lavagem de Bens e Valores da Capital " },
      seg("decretou o bloqueio de bens", "decretou-o-bloqueio-de-bens"),
      { text: " dos investigados de até R$ 194 milhões, 117 ônibus, 21 imóveis e três embarcações dos investigados, " },
      seg("além da intervenção", "alem-da-intervencao"),
      { text: " e o " },
      seg("afastamento", "afastamento"),
      { text: " dos seis " },
      seg("integrantes", "integrantes"),
      { text: " da cúpula da Transunião, cuja direção passará à SPTrans." },
    ],
  },
  {
    id: "par-5",
    segments: [
      { text: "Em 2024, durante a Operação Fim de Linha, a Transwolff e a UPbus foram alvos da polícia pelo mesmo motivo. Investigada desde 2022, a Transunião recebeu só entre janeiro e maio deste ano R$ 182,1 milhões da Prefeitura de São Paulo como remuneração pelos cerca de 6 milhões de passageiros que transporta todos os meses." },
    ],
  },
  {
    id: "par-6",
    segments: [
      { text: "Além disso, em 2025, o secretário municipal de Transportes, Celso Jorge Caldeira, " },
      seg("empenhou", "empenhou"),
      { text: " R$ 163 milhões para a eletrificação de parte da frota da empresa, que opera 614 ônibus em dois lotes do chamado grupo de distribuição local do sistema de transporte, em um total de 57 linhas, na zona leste da cidade." },
    ],
  },
  {
    id: "par-7",
    segments: [
      { text: "Para o Deic, a análise das movimentações financeiras e as transferências de recursos da empresa passavam pelo " },
      seg("vereador", "vereador"),
      { text: ", " },
      seg("embora ele não integrasse", "embora-ele-nao-integrasse"),
      { text: " oficialmente o quadro societário da Transunião. O político exerceria o “controle tático da gestão” e, " },
      seg("sobretudo", "sobretudo"),
      { text: ", da “estrutura financeira da empresa” e é " },
      seg("descrito pelos policiais como", "descrito-pelos-policiais-como"),
      { text: " o principal responsável por fazer da companhia um instrumento do sistema clandestino que funcionava para dar suporte à lavagem de dinheiro de indivíduos que " },
      seg("orbitavam o PCC", "orbitavam-o-pcc"),
      { text: "." },
    ],
  },
  {
    id: "par-8",
    segments: [
      seg("De acordo com", "de-acordo-com"),
      { text: " relatórios técnicos do Laboratório de Lavagem de Dinheiro (Lab-LD) da Polícia Civil, a Transunião Transportes S.A movimentou aproximadamente R$ 545 milhões em créditos e R$ 546 milhões em débitos durante o período investigado, que segundo os " },
      seg("peritos", "peritos"),
      { text: " foi marcado por " },
      seg("elevada pulverização bancária", "elevada-pulverizacao-bancaria"),
      { text: ", intensa fragmentação de operações e circulação cruzada de recursos entre pessoas físicas e jurídicas vinculadas ao mesmo núcleo econômico." },
    ],
  },
  {
    id: "par-9",
    segments: [
      { text: "Além disso, existiriam R$ 24.759.905,59 em créditos sem identificação adequada de origem, o que, para os policiais e os promotores do Gaeco, é uma " },
      seg("circunstância incompatível", "circunstancia-incompativel"),
      { text: " com padrões mínimos de transparência empresarial e altamente relevante " },
      seg("sob a ótica da prevenção e repressão", "sob-a-otica-da-prevencao-e-repressao"),
      { text: " à lavagem de capitais." },
    ],
  },
  { id: "sec-historico", title: "Histórico da organização", segments: [{ text: "Histórico da organização" }] },
  {
    id: "par-10",
    segments: [
      { text: "A história da Transunião está ligada ao vereador " },
      seg("petista", "petista"),
      { text: " assim como à inclusão dos " },
      seg("perueiros", "perueiros"),
      { text: " no sistema público de transporte da capital — por onde o crime organizado se " },
      seg("infiltrou", "infiltrou"),
      { text: ", recebendo bilhões do Poder Público por meio de empresas que funcionavam como caixa do crime organizado. O contexto ainda envolve assassinatos, " },
      seg("extorsões", "extorcoes"),
      { text: ", ladrões de banco e lavagem de dinheiro, em uma série de acusações que se " },
      seg("arrastam", "arrastam"),
      { text: " há quase duas décadas." },
    ],
  },
  {
    id: "par-11",
    segments: [
      { text: "Exemplo disso é o inquérito " },
      seg("que deu origem", "inquerito-que-deu-origem"),
      { text: " à Operação Última Parada. Ele nasceu em 2020 " },
      seg("em razão", "em-razao"),
      { text: " do assassinato de Adauto Soares Jorge, então presidente da empresa, morto a tiros em 4 de março de 2020, por um pistoleiro em um estacionamento da rua Cônego Antonio Manzi, no Lajeado, na zona Leste." },
    ],
  },
  {
    id: "par-12",
    segments: [
      { text: "Adauto estava acompanhado por Devanil Souza Nascimento, o Sapo, um antigo funcionário da Transunião. Devanil era motorista do vereador, um dos fundadores da Transunião, que afirmava ter se desligado da empresa em 2020." },
    ],
  },
  {
    id: "par-13",
    segments: [
      { text: "Devanil foi investigado no inquérito sobre o homicídio " },
      seg("por suspeita de", "por-suspeita-de"),
      { text: " ter " },
      seg("conduzido", "conduzido"),
      { text: " Adauto até o estacionamento, sabendo da armadilha que havia sido montada contra a vítima. " },
      seg("Ele foi denunciado", "ele-foi-denunciado"),
      { text: " pelo crime assim como outro personagem dessa história, Jair Ramos de Freitas, o Cachorrão, também diretor da empresa e homem apontado como o autor dos tiros." },
    ],
  },
  {
    id: "par-14",
    segments: [
      { text: "Durante a investigação do homicídio, foram apreendidos um celular e um " },
      seg("pendrive", "pendrive"),
      { text: " que estavam com Adauto. Foi o material ali encontrado que serviu de base para o inquérito atual, aberto em 2022, sobre a lavagem de dinheiro do PCC. No pendrive havia duas planilhas. Uma delas tinha o nome de “Contato” e a outra de “Contato3”. Elas relacionavam os ônibus existentes na Transunião aos nomes de seus donos, " },
      seg("fossem eles laranjas ou não", "fossem-eles-laranjas-ou-nao"),
      { text: "." },
    ],
  },
  {
    id: "par-15",
    segments: [
      { text: "Os " },
      seg("acionistas", "acionistas"),
      { text: " da empresa eram donos dos ônibus porque a empresa " },
      seg("surgiu", "surgiu"),
      { text: " para substituir uma cooperativa de perueiros, muitos dos quais entraram para o negócio integrando seus veículos como parte do capital da companhia. Foi dessa forma que a Prefeitura conseguiu regularizar o sistema de transportes na capital, que " },
      seg("convivia", "convivia"),
      { text: " então com perueiros clandestinos. Mas entre os donos de ônibus havia criminosos ligados ao PCC." },
    ],
  },
  {
    id: "par-16",
    segments: [
      seg("Ao cruzar as duas planilhas", "ao-cruzar-as-duas-planilhas"),
      { text: " com os dados achados no celular de Adauto Jorge, o Deic descobriu que os mesmos ônibus estavam indicados em cada uma das planilhas a pessoas diferentes. Em uma delas, a pessoa era chamada de “cooperado” e na outra de “cooperado oficial”." },
    ],
  },
  {
    id: "par-17",
    segments: [
      { text: "Para os policiais, as duas tabelas mostraram a existência de uma " },
      seg("dissociação deliberada", "dissociacao-deliberada"),
      { text: " entre a titularidade dos veículos e o domínio econômico associado à exploração da frota. Assim, comparando os dados, foi possível identificar quem seriam os beneficiários reais das receitas geradas pela empresa, mostrando como era feita a divisão dos recursos pagos à Transunião." },
    ],
  },
  { id: "sec-assessora", title: "Assessora dos Tatto e ladrão de banco", segments: [{ text: "Assessora dos Tatto e ladrão de banco" }] },
  {
    id: "par-18",
    segments: [
      { text: "Foi na lista de contatos do telefone de Adauto Jorge que os policiais identificaram o número que " },
      seg("pertencia", "pertencia"),
      { text: " a outro personagem dessa história: Leonel Moreira Martins, que exercia oficialmente a função de supervisor na empresa, mas que executava uma espécie de gestão paralela dos recursos da Transunião." },
    ],
  },
  {
    id: "par-19",
    segments: [
      { text: "Leonel " },
      seg("determinava", "determinava"),
      { text: " a Adauto que fizesse depósitos bancários e cobrava valores e " },
      seg("repasses", "repasses"),
      { text: " a terceiros desde 2017. " },
      seg("Este pagava até despesas", "este-pagava-ate-despesas"),
      { text: " de familiares de Leonel, que não tinham nenhuma relação com o sistema de transportes." },
    ],
  },
  {
    id: "par-20",
    segments: [
      { text: "Esse é o caso de Ingrid Bernardino, ex-mulher de Leonel. Beneficiária de depósitos feitos a mando do ex-marido, ela foi assessora de Senival e, depois, trabalhou como secretária e assessora dos deputados federais Nilto e Jilmar Tatto, ambos do PT. Ainda segundo os investigadores, é possível verificar nas " },
      seg("conversas", "conversas"),
      { text: " de Adauto que os pagamentos tinham a " },
      seg("anuência", "anuencia"),
      { text: " ou a participação de pessoas de fora da direção da empresa, como o vereador Senival, nominado nas conversas como “presidente”, “véio”, “velhinho” e “vereador”." },
    ],
  },
  {
    id: "par-21",
    segments: [
      { text: "Senival tem na cidade do sul de Minas Gerais uma casa — " },
      seg("descrita como de “elevado padrão”", "descrita-como-de-elevado-padrao"),
      { text: " — no bairro Juncal, na zona rural da cidade." },
    ],
  },
  {
    id: "par-22",
    segments: [
      { text: "Em uma terceira conversa entre Adauto e Leonel, o primeiro afirmou que só podia passar até R$ 70 mil e que qualquer valor acima disso dependeria da anuência “dele”, referência a Senival, segundo as autoridades. Leonel respondeu que esse montante era “o dos caras”, da direção informal da empresa, mas que existiria uma “situação a mais”. “Essa situação a mais é o meu que tem de chegar”." },
    ],
  },
  {
    id: "par-23",
    segments: [
      { text: "Para o Deic, essa referência se relacionaria ao dinheiro da facção. A polícia descobriu que as transferências feitas por Leonel se destinavam a pagamentos para pessoas com antecedentes criminais, como Anderson de Cássia Pereira, o Perigo ou Careca, um ladrão de banco vinculado ao PCC acusado de roubos a carros-fortes." },
    ],
  },
  { id: "sec-salve", title: "O “salve” e o desvio de dinheiro", segments: [{ text: "O “salve” e o desvio de dinheiro" }] },
  {
    id: "par-24",
    segments: [
      { text: "Os policiais descrevem ainda que encontraram na casa de Cachorrão uma carta manuscrita relacionada à morte de Adauto Jorge. Com a estrutura dos “salves” emitidos pelo PCC, o documento trata de conflitos na direção da Transunião e da acusação de desvio de R$ 15 milhões da garagem da empresa." },
    ],
  },
  {
    id: "par-25",
    segments: [
      { text: "De acordo com o que estava escrito na carta, R$ 200 mil teriam sido apropriados por Leonel. Adauto teria dito em sua defesa que sua atuação " },
      seg("se restringia a cumprir ordens", "se-restringia-a-cumprir-ordens"),
      { text: " do “Véio” e do “Cabeça Branca”, que seriam, " },
      seg("respectivamente", "respectivamente"),
      { text: ", Senival e Leonel." },
    ],
  },
  {
    id: "par-26",
    segments: [
      { text: "Por conta disso, o “salve” informava a determinação do afastamento dos envolvidos em razão de uma situação “deselegante” de cobranças indevidas. Para a polícia, o desvio do dinheiro da empresa motivou o assassinato de Adauto. Senival também estava na mira da facção, que só não o matou por ele ser político. Na época, o vereador chegou a pedir proteção policial. " },
      seg("Tanto ele quanto Leonel foram afastados", "tanto-ele-quanto-leonel-foram-afastados"),
      { text: " da empresa." },
    ],
  },
];

const legalTs = `import type { ReadingSourceCredits } from "./types";

export const vereadorPccTransuniaoSourceCredits: ReadingSourceCredits = {
  originalTitle:
    "Vereador é preso por envolvimento com empresa de ônibus ligada ao PCC",
  author: "redacao@odia.com.br (Estadão Conteúdo)",
  publication: "O Dia",
  sourceUrl:
    "https://odia.ig.com.br/brasil/2026/06/7269314-vereador-e-preso-por-envolvimento-com-empresa-de-onibus-ligada-ao-pcc.html",
};
`;

const expressionsTs = `import type { ReadingExpressionGuide } from "./types";

export const vereadorPccTransuniaoExpressionGuide: ReadingExpressionGuide = {
  sectionTitle: "Expressões do texto",
  intro:
    "Glossário com tradução, trecho do artigo e explicação em inglês — use depois da leitura para fixar vocabulário jornalístico e jurídico.",
  entries: ${JSON.stringify(expressionEntries, null, 4).replace(/^/gm, "  ").trim()},
};
`;

const articleTs = `import type { ReadingArticle } from "./types";
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
    blocks: ${JSON.stringify(blocks, null, 4)},
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
`;

fs.writeFileSync(path.join(outDir, "vereador-pcc-transuniao-legal.ts"), legalTs, "utf8");
fs.writeFileSync(path.join(outDir, "vereador-pcc-transuniao-expressions.ts"), expressionsTs, "utf8");
fs.writeFileSync(path.join(outDir, "vereador-pcc-transuniao.ts"), articleTs, "utf8");
console.log("Generated vereador-pcc-transuniao reading article");
