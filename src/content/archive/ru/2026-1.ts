import type { ArchiveSession } from "../types";
import { session2026_1 } from "../2026-1";

/** RU page wrapper - exam tasks and oral topic labels stay in Portuguese. */
export const session2026_1_ru: ArchiveSession = {
  ...session2026_1,
  eyebrow: "Прошлые экзамены / 2026 / Сессия 1",
  title: "Celpe-Bras 2026/1",
  lead:
    "Celpe-Bras — официальный экзамен Inep/MEC на получение сертификата владения португальским как иностранным. На этой странице собраны письменный сборник, видео/аудио-инсумы, устная часть и edital сессии 2026/1.",
  notice:
    "celpe-depe.com — независимый проект, не связанный с Inep/MEC. Материалы здесь воспроизводят официальные или учебные файлы; регистрация и официальный архив — на Portal Gov.br и в Sistema Celpe-Bras (celpebras.inep.gov.br).",
  application: "28 апр – 1 мая 2026",
  applicationNote:
    "В аккредитованных пунктах в Бразилии и за рубежом (официальный список на Inep). В сессии — 3513 кандидатов из 44 стран; экзамены завершились 1 мая 2026.",
  resultDate: "30 июня 2026",
  resultNote:
    "Официальная публикация в Diário Oficial da União и индивидуальный просмотр в Sistema Celpe-Bras (celpebras.inep.gov.br).",
  stats: { available: 6, missing: 0, missingLabel: "всё на месте" },
  blogAnalysis: {
    href: "/ru/blog/analise-tarefa-1-festival-fartura-2026-1",
    label: "Разбор задания 1 (блог)",
  },
  guideLink: {
    href: "/ru/celpe-bras",
    label: "Что такое Celpe-Bras и как устроен экзамен",
  },
  materials: session2026_1.materials.map((m) => ({
    ...m,
    title:
      m.id === "caderno"
        ? "Сборник заданий"
        : m.id === "audio-t2"
          ? "Аудио/видео задания 2"
          : m.id === "roteiros"
            ? "Сценарии взаимодействия"
            : m.id === "elementos"
              ? "Элементы-провокаторы"
              : m.id === "edital"
                ? "Edital nº 8/2026 — Inep/MEC"
                : m.id === "video-t1"
                  ? "Видео задания 1"
                  : m.title,
    description:
      m.id === "caderno"
        ? "Письменный экзамен с четырьмя интегрированными заданиями."
        : m.id === "audio-t2"
          ? "Меню QR Code — аудио/видео для письменного задания."
          : m.id === "roteiros"
            ? "Вопросы и ориентиры для устного взаимодействия."
            : m.id === "elementos"
              ? "Набор из 20 тем для очного взаимодействия."
              : m.id === "edital"
                ? "Edital nº 8 от 20 февраля 2026 (опубликован в DOU): расписание, регистрация, структура, оценка и сертификация Celpe-Bras 2026/1."
                : m.id === "video-t1"
                  ? "Festival Fartura — видео для письменного задания."
                  : m.description,
    category:
      m.category === "Parte escrita"
        ? "Письменная часть"
        : m.category === "Parte oral"
          ? "Устная часть"
          : m.category === "Edital"
            ? "Edital"
            : m.category.startsWith("Tarefa")
              ? m.category.replace("Tarefa", "Задание")
              : m.category,
    action:
      m.action === "Abrir PDF"
        ? "Открыть PDF"
        : m.action === "Assistir"
          ? "Смотреть"
          : m.action === "Ler edital"
            ? "Читать edital"
            : m.action,
  })),
  tasks: session2026_1.tasks.map((t) => ({
    ...t,
    number: t.number.replace("Tarefa", "Задание"),
    stateLabel:
      t.stateLabel === "Vídeo" ? "Видео" : t.stateLabel === "Áudio" ? "Аудио" : "В сборнике",
    input: t.input
      .replace("Insumo: vídeo", "Материал: видео")
      .replace("Insumo: áudio/vídeo", "Материал: аудио/видео")
      .replace("Insumo: texto", "Материал: текст"),
    materialAction:
      t.materialAction === "Assistir vídeo"
        ? "Смотреть видео"
        : t.materialAction === "Ouvir / assistir"
          ? "Слушать / смотреть"
          : "Смотреть в сборнике",
  })),
  asideNote:
    "Регистрация 2026/1: 24.02–06.03.2026 через Sistema Celpe-Bras (celpebras.inep.gov.br), включая оплату, особые условия и имя по имени социальному — по edital. Сертификат может требоваться для PEC-G/PEC-PLE — смотрите edital конкретной программы.",
  oralTopics: {
    roteiros: ["20 минут", "2 этапа", "аудиозапись"],
    temas: session2026_1.oralTopics.temas,
  },
  faq: [
    {
      question: "Что есть в полном объёме?",
      answer:
        "Сборник заданий, видео заданий, сценарии взаимодействия, элементы-провокаторы и edital nº 8/2026 — всё доступно на этой странице.",
    },
    {
      question: "Чего не хватает?",
      answer:
        "Эта сессия полностью представлена в локальном архиве по перечисленным файлам. Новые материалы будут добавлены после официальной публикации Inep.",
    },
    {
      question: "Как пользоваться?",
      answer:
        "Открывайте карточки во встроенном просмотрщике (PDF, видео или аудио). Каждый файл открывается на сайте; скачивание необязательно.",
    },
    {
      question: "Где регистрироваться на официальный экзамен?",
      answer:
        "В Sistema Celpe-Bras (celpebras.inep.gov.br) по edital сессии. Этот сайт не принимает заявки и не выдаёт сертификаты.",
    },
    {
      question: "Это официальный сайт?",
      answer:
        "Нет. celpe-depe.com — независимая подготовка. Материалы и даты здесь для учёбы; нормативный источник — Inep/MEC (Portal Gov.br и Diário Oficial da União).",
    },
    {
      question: "Как это связано с практикой?",
      answer:
        "К каждому блоку можно привязать упражнения и разборы на сайте (например, анализ задания 1 в блоге), не подменяя официальный архив Inep.",
    },
  ],
};
