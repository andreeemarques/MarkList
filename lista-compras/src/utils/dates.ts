import type { IsoDateString } from '@/types/models';

const WEEKDAYS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const pad = (value: number) => String(value).padStart(2, '0');

/** Data e hora atuais em ISO 8601 UTC, o formato em que guardamos todas as datas. */
export function nowIso(): IsoDateString {
  return new Date().toISOString();
}

/** "2026-10-24T14:30:00.000Z" → "24/10/2026" (no fuso horário do telemóvel). */
export function formatDate(iso: IsoDateString): string {
  const date = new Date(iso);

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** "Sexta-feira, 23 de outubro", usado no cabeçalho do Início. */
export function formatLongDate(date: Date = new Date()): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}

function countWithUnit(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

/**
 * Tempo decorrido em português: "agora mesmo", "há 5 min", "há 2 horas",
 * "há 4 dias", "há 3 semanas", "há 2 meses", "há 1 ano".
 * O parâmetro `now` existe para os testes poderem fixar a data atual.
 */
export function formatRelativeTime(iso: IsoDateString, now: Date = new Date()): string {
  const elapsed = now.getTime() - new Date(iso).getTime();

  // Inclui datas no futuro (relógio do telemóvel dessincronizado).
  if (elapsed < MINUTE) return 'agora mesmo';
  if (elapsed < HOUR) return `há ${Math.floor(elapsed / MINUTE)} min`;
  if (elapsed < DAY) return `há ${countWithUnit(Math.floor(elapsed / HOUR), 'hora', 'horas')}`;

  const days = Math.floor(elapsed / DAY);

  if (days < 7) return `há ${countWithUnit(days, 'dia', 'dias')}`;
  if (days < 30) return `há ${countWithUnit(Math.floor(days / 7), 'semana', 'semanas')}`;
  if (days < 365) return `há ${countWithUnit(Math.floor(days / 30), 'mês', 'meses')}`;

  return `há ${countWithUnit(Math.floor(days / 365), 'ano', 'anos')}`;
}