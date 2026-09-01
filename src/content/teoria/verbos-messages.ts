import type { Locale } from "@/i18n/locales";
import type { VerbosMessages } from "./verbos-types";

const pt: VerbosMessages = {
  tabTables: "Tabelas",
  tabQuiz: "Teste",
  title: "Verbos e conjugações",
  intro:
    "Tabela interativa: a coluna Forma mostra as pessoas marcadas, as linhas seguem os tempos marcados. Passe o mouse sobre o exemplo para ver a tradução em inglês.",
  legendPersons: "Forma — pessoas",
  legendVerbs: "Verbos",
  legendTenses: "Tempos / construções",
  all: "Todos",
  clear: "Limpar",
  colTense: "Tempo",
  colForm: "Forma",
  colExample: "Exemplo",
  warnNoVerb: "Selecione pelo menos um verbo.",
  warnNoTense: "Marque pelo menos um tempo.",
  warnNoPerson: "(marque pelo menos uma pessoa)",
  enHead: "EN",
  quizIntro:
    "Escolha verbos e pessoas. Em cada pergunta aparecem o tempo e a pessoa; escolha a forma correta entre quatro.",
  quizCount: "Número de perguntas",
  quizCountMax: "(máx. {n})",
  quizCombos: "Combinações possíveis:",
  quizStart: "Começar teste",
  quizSetupError: "Marque verbos e pessoas com formas disponíveis.",
  quizQuestion: "Pergunta {i} / {n}",
  quizPrompt: "Qual forma está correta?",
  quizPerson: "Pessoa:",
  quizExit: "Sair",
  quizDone: "Teste concluído",
  quizResult: "Resultado:",
  quizSetup: "Configurar",
  quizRetry: "De novo",
  loading: "Carregando verbos…",
  loadError: "Não foi possível carregar os dados dos verbos.",
};

const en: VerbosMessages = {
  tabTables: "Tables",
  tabQuiz: "Quiz",
  title: "Verbs and conjugations",
  intro:
    "Interactive table: the Form column shows the selected persons, rows follow the selected tenses. Hover an example to see the English translation.",
  legendPersons: "Form — persons",
  legendVerbs: "Verbs",
  legendTenses: "Tenses / constructions",
  all: "All",
  clear: "Clear",
  colTense: "Tense",
  colForm: "Form",
  colExample: "Example",
  warnNoVerb: "Select at least one verb.",
  warnNoTense: "Select at least one tense.",
  warnNoPerson: "(select at least one person)",
  enHead: "EN",
  quizIntro:
    "Pick verbs and persons. Each question shows a tense and a person; choose the correct form out of four.",
  quizCount: "Number of questions",
  quizCountMax: "(max. {n})",
  quizCombos: "Possible combinations:",
  quizStart: "Start quiz",
  quizSetupError: "Select verbs and persons with available forms.",
  quizQuestion: "Question {i} / {n}",
  quizPrompt: "Which form is correct?",
  quizPerson: "Person:",
  quizExit: "Exit",
  quizDone: "Quiz finished",
  quizResult: "Score:",
  quizSetup: "Setup",
  quizRetry: "Again",
  loading: "Loading verbs…",
  loadError: "Could not load verb data.",
};

const ru: VerbosMessages = {
  tabTables: "Таблицы",
  tabQuiz: "Тест",
  title: "Глаголы и спряжения",
  intro:
    "Интерактивная таблица: колонка «Форма» показывает выбранные лица, строки — выбранные времена. Наведите на пример, чтобы увидеть перевод на английский.",
  legendPersons: "Форма — лица",
  legendVerbs: "Глаголы",
  legendTenses: "Времена / конструкции",
  all: "Все",
  clear: "Сбросить",
  colTense: "Время",
  colForm: "Форма",
  colExample: "Пример",
  warnNoVerb: "Выберите хотя бы один глагол.",
  warnNoTense: "Отметьте хотя бы одно время.",
  warnNoPerson: "(отметьте хотя бы одно лицо)",
  enHead: "EN",
  quizIntro:
    "Выберите глаголы и лица. В каждом вопросе — время и лицо; выберите верную форму из четырёх.",
  quizCount: "Число вопросов",
  quizCountMax: "(макс. {n})",
  quizCombos: "Возможных комбинаций:",
  quizStart: "Начать тест",
  quizSetupError: "Отметьте глаголы и лица с доступными формами.",
  quizQuestion: "Вопрос {i} / {n}",
  quizPrompt: "Какая форма верна?",
  quizPerson: "Лицо:",
  quizExit: "Выйти",
  quizDone: "Тест завершён",
  quizResult: "Результат:",
  quizSetup: "Настройка",
  quizRetry: "Ещё раз",
  loading: "Загрузка глаголов…",
  loadError: "Не удалось загрузить данные глаголов.",
};

export function getVerbosMessages(locale: Locale): VerbosMessages {
  if (locale === "en") return en;
  if (locale === "ru") return ru;
  return pt;
}
