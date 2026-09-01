import type { Locale } from "@/i18n/locales";

export type ReaderMessages = {
  kicker: string;
  title: string;
  lead: string;
  breadcrumb: string;
  dropTitle: string;
  dropHint: string;
  chooseFile: string;
  accepted: string;
  parsing: string;
  errorGeneric: string;
  errorType: string;
  empty: string;
  // controls
  play: string;
  pause: string;
  speed: string;
  fontSize: string;
  decrease: string;
  increase: string;
  toTop: string;
  newFile: string;
  words: string;
  // privacy note
  privacy: string;
};

const pt: ReaderMessages = {
  kicker: "Ferramenta de leitura",
  title: "Leitor com rolagem automática",
  lead: "Carregue um PDF, Word (.docx) ou texto e leia com rolagem automática — ajuste a velocidade e o tamanho da letra para treinar a leitura em português.",
  breadcrumb: "Leitor",
  dropTitle: "Arraste um arquivo aqui",
  dropHint: "ou clique para escolher — PDF, Word (.docx) ou texto (.txt, .md)",
  chooseFile: "Escolher arquivo",
  accepted: "Aceita PDF, .docx, .txt e .md",
  parsing: "Processando o arquivo…",
  errorGeneric: "Não foi possível ler este arquivo. Tente outro.",
  errorType: "Formato não suportado. Use PDF, .docx, .txt ou .md.",
  empty: "Nenhum texto foi encontrado neste arquivo.",
  play: "Rolar",
  pause: "Pausar",
  speed: "Velocidade",
  fontSize: "Tamanho da letra",
  decrease: "Diminuir",
  increase: "Aumentar",
  toTop: "Voltar ao topo",
  newFile: "Outro arquivo",
  words: "palavras",
  privacy: "Os arquivos são processados no seu navegador — nada é enviado para o servidor.",
};

const en: ReaderMessages = {
  kicker: "Reading tool",
  title: "Reader with auto-scroll",
  lead: "Upload a PDF, Word (.docx) or text file and read with auto-scroll — adjust the speed and font size to practise reading in Portuguese.",
  breadcrumb: "Reader",
  dropTitle: "Drag a file here",
  dropHint: "or click to choose — PDF, Word (.docx) or text (.txt, .md)",
  chooseFile: "Choose file",
  accepted: "Accepts PDF, .docx, .txt and .md",
  parsing: "Processing the file…",
  errorGeneric: "Could not read this file. Try another one.",
  errorType: "Unsupported format. Use PDF, .docx, .txt or .md.",
  empty: "No text was found in this file.",
  play: "Scroll",
  pause: "Pause",
  speed: "Speed",
  fontSize: "Font size",
  decrease: "Decrease",
  increase: "Increase",
  toTop: "Back to top",
  newFile: "Another file",
  words: "words",
  privacy: "Files are processed in your browser — nothing is uploaded to the server.",
};

const ru: ReaderMessages = {
  kicker: "Инструмент для чтения",
  title: "Читалка с автопрокруткой",
  lead: "Загрузите PDF, Word (.docx) или текст и читайте с автопрокруткой — настройте скорость и размер шрифта для тренировки чтения на португальском.",
  breadcrumb: "Читалка",
  dropTitle: "Перетащите файл сюда",
  dropHint: "или нажмите для выбора — PDF, Word (.docx) или текст (.txt, .md)",
  chooseFile: "Выбрать файл",
  accepted: "Поддерживаются PDF, .docx, .txt и .md",
  parsing: "Обработка файла…",
  errorGeneric: "Не удалось прочитать файл. Попробуйте другой.",
  errorType: "Формат не поддерживается. Используйте PDF, .docx, .txt или .md.",
  empty: "В этом файле не найден текст.",
  play: "Прокрутка",
  pause: "Пауза",
  speed: "Скорость",
  fontSize: "Размер шрифта",
  decrease: "Уменьшить",
  increase: "Увеличить",
  toTop: "Наверх",
  newFile: "Другой файл",
  words: "слов",
  privacy: "Файлы обрабатываются в браузере — на сервер ничего не отправляется.",
};

export function getReaderMessages(locale: Locale): ReaderMessages {
  if (locale === "en") return en;
  if (locale === "ru") return ru;
  return pt;
}
